import 'moment/locale/zh-cn';

import Schema from 'async-validator';
import { bind, get, has, pick, values } from 'lodash';

import {
  componentMap,
  constantComponentMap,
  childrenKeys,
  excludeFormElementTypes,
  jsonMinimumVersion,
  dataTemplate
} from './config';
import {
  getDefaultValueParsers,
  addDefaultValueParser,
  removeDefaultValueParser
} from './modules/DefaultValueParser';
import {
  parseOptionsConfig,
  addOptionsConfigParser,
  removeOptionsConfigParser
} from './modules/OptionsParser';
import ComponentPropParser from '../Parsers/ComponentPropParser';
import { VueData, VueDataParser } from '../Parsers/VueDataParser';
import { checkVersion, addCSSPrefixSelector } from './modules/Util';

import { getParser } from '../Parsers';

const globalLifecycle = {};

const runLifecycle = function(name) {
  if (has(globalLifecycle, name)) {
    globalLifecycle[name]();
  }
};

function install(Vue) {
  Vue.component('form-parser', FormParser);
}

const FormParser = {
  name: 'form-parser',
  install: function(Vue) {
    Vue.component(this.name, this);
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {};
      }
    },
    formId: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    extendConfigs: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      error: false,
      errorMessage: '解析过程中出现错误',
      loadingCount: 0,
      antFormModalItemAttrs: {},
      defaultValueParsers: getDefaultValueParsers(),
      constantRender: {
        table: this._renderTable,
        td: this._renderTd,
        'a-tab-pane': this._renderAntTabPane,
        text: this._renderText,
        'h-html': this._renderHtml
      },
      vueDatas: [],
      originalData: {},
      data: {},
      elementConfigs: {},
      optionsMap: {}
    };
  },
  computed: {
    loading: function() {
      return this.loadingCount > 0;
    },
    rules: function() {
      const result = {};
      values(this.elementConfigs).forEach(elementConfig => {
        if (!get(elementConfig, 'options.disabled') && elementConfig.model && elementConfig.rules) {
          result[elementConfig.model] = elementConfig.rules;
        }
      });
      return result;
    }
  },
  watch: {
    loadingCount: function(newVal) {
      if (newVal === 0) this.resetFields();
    }
  },
  filter: {},
  methods: {
    /**
     * @description: 表单校验, 调用表单自身方法(目前仅支持ant)
     * @param {Function} callback 回调函数, 参数为验证结果
     */
    validate(callback) {
      new Schema();
      this.$refs.form.validate((valid, result) => {
        callback(valid, result);
      });
    },
    /**
     * @description: 表单提交, 先校验再提交(目前仅支持ant)
     * @param {Function} callback 回调函数, 参数为[校验结果, 表单数据]
     */
    submit(callback) {
      this.$refs.form.validate((valid, object) => {
        callback(valid, valid ? this.data : object);
      });
    },
    /**
     * @description: 表单重置
     */
    resetFields() {
      this.data = Object.assign({}, this.originalData);
    },
    /**
     * @description: 根据json配置
     * @param {Array} elements 树形结构元素配置json
     */
    _parseData(elements) {
      if (!elements) {
        return;
      }
      elements.forEach(element => {
        if (element.model) this._parseModel(element);
        if (element.optionsConfig) this._parseOptions(element);
        if (element.events) element.listeners = getParser('event').parseList(element.events, this);
        childrenKeys.forEach(key => {
          if (element[key]) {
            this._parseData(element[key]);
          }
        });
      });
    },
    /**
     * @description: 解析json的model属性, 包括表单数据对象和元素Map
     * @param {Object} element 元素配置json
     */
    _parseModel(element) {
      const key = element.model;
      has(this.value, key)
        ? this.$set(this.originalData, key, this.value[key])
        : this._parseDefaultValue(key, element.options.defaultValue);
      this.$set(this.elementConfigs, key, element);
    },
    /**
     * @description: 解析默认值
     * @param {String} key 默认值对应属性名称
     * @param {String} defaultValue 默认值表达式
     */
    _parseDefaultValue(key, defaultValue) {
      let result = defaultValue;
      for (const parser of this.defaultValueParsers) {
        if (parser.test(defaultValue)) {
          result = parser.parse(defaultValue, this);
          break;
        }
      }
      this.vueDatas.push(new VueData(result, 'originalData', key));
    },
    /**
     * @description: 解析选项配置
     * @param {Object} element 表单元素Json
     */
    _parseOptions(element) {
      this.vueDatas.push(new VueData(parseOptionsConfig(element, this), 'optionsMap', element.key));
    },
    /**
     * @description: 解析ant design中a-form-model-item样式, 适配KFormDesign编辑器
     * @param {Object} formConfig 表单配置
     */
    _parseAntFormModalItemAttrs(formConfig) {
      return {
        labelCol:
          formConfig.layout === 'horizontal'
            ? formConfig.labelLayout === 'flex'
              ? { style: `width:${formConfig.labelWidth}px` }
              : formConfig.labelCol
            : {},
        wrapperCol:
          formConfig.layout === 'horizontal'
            ? formConfig.labelLayout === 'flex'
              ? { style: 'width:auto;flex:1' }
              : formConfig.wrapperCol
            : {},
        style:
          formConfig.layout === 'horizontal' && formConfig.labelLayout === 'flex'
            ? { display: 'flex' }
            : {}
      };
    },
    /**
     * @description: 批量渲染元素
     * @param {Array} elements 树形结构元素配置json
     * @return {*} 渲染结果
     */
    _renderElements(elements) {
      const result = [];
      elements.forEach(element => {
        if (!get(element, 'options.hidden', false)) {
          result.push(
            excludeFormElementTypes.includes(element.type)
              ? this._renderElement(element)
              : this._renderFormElement(element)
          );
        }
      });
      return result;
    },
    /**
     * @description: 渲染表单元素
     * @param {Object} element 表单元素配置json
     * @return {*} 渲染结果
     */
    _renderFormElement(element) {
      const FormTag = this._getTag('formItem');
      return (
        <FormTag
          v-show={element.options && !element.options.hidden}
          {...{
            props: ComponentPropParser.parse(
              FormTag,
              element,
              this.antFormModalItemAttrs,
              {
                prop: element.model
              },
              { rules: get(element, 'options.disabled') ? undefined : element.rules }
            )
          }}
          style={this.antFormModalItemAttrs.style}>
          {this._renderElement(element)}
        </FormTag>
      );
    },
    /**
     * @description: 渲染元素
     * @param {Object} element 元素配置json
     * @return {*} 渲染结果
     */
    _renderElement(element) {
      const Tag = this._getTag(element.type);
      if (has(this.constantRender, Tag)) {
        return this.constantRender[Tag](element);
      }
      const attrs = this._renderTagAttrs(Tag, element);
      if (element.model) {
        return (
          <Tag v-model={this.data[element.model]} {...attrs}>
            {this._renderChildren(element)}
          </Tag>
        );
      }
      return <Tag {...attrs}>{this._renderChildren(element)}</Tag>;
    },
    /**
     * @description: 渲染组件参数
     * @param {String} Tag 组件标签名称
     * @param {Object} element 元素配置json
     * @return {Object} 参数对象, 包含[props, on]
     */
    _renderTagAttrs(Tag, element) {
      return {
        ref: element.key,
        class: element.class ? element.class.split(',') : '',
        style: this._renderStyle(element),
        props: this._renderTagProps(Tag, element),
        on: element.listeners
      };
    },
    _renderStyle(element) {
      return element.options && element.options.width
        ? element.style + `width: ${element.options.width};`
        : element.style;
    },
    /**
     * @description: 渲染组件props
     * @param {String} Tag 组件标签名称
     * @param {Object} element 元素配置json
     * @return {Object} 组件props对象
     */
    _renderTagProps(Tag, element) {
      const options = [element, element.options, { locale: this.locale }];
      this.extendConfigs.forEach(extendConfig => {
        const key = element.model || element.key;
        if (has(extendConfig, key)) {
          options.push(extendConfig[key]);
        }
      });
      const result = ComponentPropParser.parse(Tag, ...options);
      if (element.optionsConfig) {
        result[element.optionsConfig.key] = this.optionsMap[element.key];
      }
      delete result['type'];
      return result;
    },
    /**
     * @description: 渲染表格元素
     * @param {Object} tableElement 表格元素配置json
     * @return {*} 渲染结果
     */
    _renderTable(tableElement) {
      const attr = {
        class: pick(tableElement.options, ['bright', 'small', 'bordered']),
        style: tableElement.options.customStyle
      };
      return (
        <table class="kk-table-9136076486841527" {...attr}>
          {this._renderElements(tableElement.trs)}
        </table>
      );
    },
    /**
     * @description: 渲染表单列元素
     * @param {Object} tdElement 表单列元素配置json
     * @return {*} 渲染结果
     */
    _renderTd(tdElement) {
      if (tdElement.colspan && tdElement.rowspan) {
        return (
          <td class="table-td" colSpan={tdElement.colspan} rowSpan={tdElement.rowspan}>
            {this._renderChildren(tdElement)}
          </td>
        );
      }
    },
    /**
     * @description: ant-design的a-tab-pane存在问题, 未找到解决办法, 暂时进行特殊处理
     * @param {Object} element a-tab-pane配置对象
     * @return {*} 渲染结果
     */
    _renderAntTabPane(element) {
      return (
        <a-tab-pane key={element.value} tab={element.label}>
          {this._renderChildren(element)}
        </a-tab-pane>
      );
    },
    /**
     * @description: 渲染文本元素
     * @param {Object} textElement 文本元素配置json
     * @return {*} 渲染结果
     */
    _renderText(textElement) {
      const divAttrs = {
        style: `text-align: ${textElement.options.textAlign}`
      };
      const labelAttrs = {
        class: { 'ant-form-item-required': textElement.options.showRequiredMark },
        style: pick(textElement.options, ['fontFamily', 'fontSize', 'color'])
      };
      return (
        <div {...divAttrs}>
          <label {...labelAttrs} class={textElement.class} style={textElement.style}>
            {textElement.label}
          </label>
        </div>
      );
    },
    /**
     * @description: 渲染html元素
     * @param {Object} htmlElement html元素配置json
     * @return {*} 渲染结果
     */
    _renderHtml(htmlElement) {
      return <h-html v-model={this.data} {...this._renderTagAttrs('h-html', htmlElement)}></h-html>;
    },
    /**
     * @description: 渲染子元素
     * @param {Object} element 元素配置数组
     * @return {Array} 所有子元素渲染结果
     */
    _renderChildren(element) {
      let result = [];
      childrenKeys.forEach(childrenKey => {
        if (element[childrenKey]) {
          result = result.concat(this._renderElements(element[childrenKey]));
        }
      });
      return result;
    },
    /**
     * @description: 根据元素类型获取组件标签, 如不存在则使用原值
     * @param {String} type 元素类型
     * @return {String} 组件标签名称
     */
    _getTag(type) {
      return constantComponentMap[type] || this.componentMap[type] || type;
    }
  },
  render(h) {
    if (this.error) {
      return <h1 style="text-align: center">{this.errorMessage}</h1>;
    }
    const { config: formConfig, list: elements } = this.$props.config;
    const Tag = this._getTag('form');
    return (
      <section>
        <a-spin spinning={this.loading} size="large">
          <Tag
            class={['k-form-build-9136076486841527', `form-${this.formId}`]}
            ref="form"
            {...{
              props: ComponentPropParser.parse(Tag, formConfig, { model: this.data })
            }}>
            {...this._renderElements(elements)}
          </Tag>
        </a-spin>
        <style>{addCSSPrefixSelector(formConfig.customStyle, `form-${this.formId}`)}</style>
      </section>
    );
  },
  beforeCreate() {
    const { config: jsonCofing } = this.$options.propsData;
    if (!checkVersion(jsonCofing.version)) {
      const errorMessage = `Json配置版本不匹配: 当前版本[${jsonCofing.version}], 解析器支持最低版本[${jsonMinimumVersion}]`;
      console.error(errorMessage);
      this.$options.data = function() {
        return {
          error: true,
          errorMessage: errorMessage
        };
      };
      this.$options.created = undefined;
      this.$options.mounted = undefined;
      return;
    }
    this.$options.data = function() {
      return Object.assign({}, dataTemplate, { defaultValueParsers: getDefaultValueParsers() });
    };
    const { component } = jsonCofing.config;
    for (const key in component) {
      const parser = getParser(key);
      if (parser) {
        const data = component[key];
        this.$options[key] = Object.assign(
          {},
          this.$options[key],
          data instanceof Array ? parser.parseList(data) : parser.parse(data)
        );
      }
    }
  },
  created() {
    this.loadingCount += 1;
    const { frame, config: formConfig, list: elements } = this.$props.config;
    const { lifecycle } = formConfig;
    lifecycle.forEach(one => {
      globalLifecycle[one.name] = bind(getParser('method').parse(one), this);
    });
    this.componentMap = componentMap[frame] || componentMap['ant'];
    if (frame === 'ant') {
      this.antFormModalItemAttrs = this._parseAntFormModalItemAttrs(formConfig);
    }
    runLifecycle('created');
    this._parseData(elements);
    VueDataParser.parseList(this.vueDatas, this);
  },
  mounted() {
    runLifecycle('mounted');
    this.loadingCount -= 1;
  }
};

export {
  FormParser,
  addDefaultValueParser,
  removeDefaultValueParser,
  addOptionsConfigParser,
  removeOptionsConfigParser
};

export default {
  install,
  FormParser,
  addDefaultValueParser,
  removeDefaultValueParser,
  addOptionsConfigParser,
  removeOptionsConfigParser
};