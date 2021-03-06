/*
 * author kcz
 * date 2019-11-20
 * description 表单控件项
 */
// 基础控件
export const basicsList = [
  {
    type: 'input', // 表单类型
    label: '输入框', // 标题文字
    icon: 'icon-write',
    options: {
      type: 'text',
      width: '100%', // 宽度
      defaultValue: '', // 默认值
      placeholder: '请输入', // 没有输入时，提示文字
      allowClear: false,
      maxLength: null,
      addonBefore: '',
      addonAfter: '',
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false // 是否禁用，false不禁用，true禁用
    },
    style: '',
    class: '',
    model: '', // 数据字段
    key: '',
    help: '',
    rules: [
      //验证规则
      {
        required: false, // 必须填写
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'textarea', // 表单类型
    label: '文本框', // 标题文字
    icon: 'icon-edit',
    options: {
      width: '100%', // 宽度
      autoSize: {
        minRows: 4,
        maxRows: 6
      },
      maxLength: null,
      defaultValue: '',
      allowClear: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      placeholder: '请输入'
    },
    style: '',
    class: '',
    model: '', // 数据字段
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'number', // 表单类型
    label: '数字输入框', // 标题文字
    icon: 'icon-number',
    options: {
      width: '100%', // 宽度
      defaultValue: 0, // 默认值
      min: 0, // 可输入最小值
      max: 999, // 可输入最大值
      precision: 0,
      step: 1, // 步长，点击加减按钮时候，加减多少
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, //是否禁用
      placeholder: '请输入'
    },
    style: '',
    class: '',
    model: '', // 数据字段
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'select', // 表单类型
    label: '下拉选择器', // 标题文字
    icon: 'icon-xiala',
    options: {
      width: '100%', // 宽度
      defaultValue: undefined, // 下拉选框请使用undefined为默认值
      multiple: false, // 是否允许多选
      disabled: false, // 是否禁用
      allowClear: false, // 是否显示清除按钮
      hidden: false, // 是否隐藏，false显示，true隐藏
      placeholder: '请选择', // 默认提示文字
      dataKey: 'options',
      dynamicKey: '',
      dynamic: false,
      options: [
        // 下拉选择项配置
        {
          value: '1',
          label: '下拉框1'
        },
        {
          value: '2',
          label: '下拉框2'
        }
      ],
      showSearch: false // 是否显示搜索框，搜索选择的项的值，而不是文字
    },
    style: '',
    class: '',
    optionsConfig: {
      type: 'static',
      name: '',
      key: 'options'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'checkbox',
    label: '多选框',
    icon: 'icon-duoxuan1',
    options: {
      disabled: false, //是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: [],
      dynamicKey: '',
      dataKey: 'options',
      dynamic: false,
      options: [
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        },
        {
          value: '3',
          label: '选项3'
        }
      ]
    },
    style: '',
    class: '',
    optionsConfig: {
      type: 'static',
      name: '',
      key: 'options'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'radio', // 表单类型
    label: '单选框', // 标题文字
    icon: 'icon-danxuan-cuxiantiao',
    options: {
      disabled: false, //是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: '', // 默认值
      dataKey: 'options',
      dynamicKey: '',
      dynamic: false,
      options: [
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        },
        {
          value: '3',
          label: '选项3'
        }
      ]
    },
    style: '',
    class: '',
    optionsConfig: {
      type: 'static',
      name: '',
      key: 'options'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'date', // 表单类型
    label: '日期选择框', // 标题文字
    icon: 'icon-calendar',
    options: {
      width: '100%', // 宽度
      defaultValue: '', // 默认值，字符串 12:00:00
      rangeDefaultValue: [], // 默认值，字符串 12:00:00
      range: false, // 范围日期选择，为true则会显示两个时间选择框（同时defaultValue和placeholder要改成数组），
      showTime: false, // 是否显示时间选择器
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      allowClear: false, // 是否显示清除按钮
      placeholder: '请选择',
      rangePlaceholder: ['开始时间', '结束时间'],
      format: 'YYYY-MM-DD', // 展示格式  （请按照这个规则写 YYYY-MM-DD HH:mm:ss，区分大小写）
      valueFormat: 'x'
    },
    style: '',
    class: '',
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'time', // 表单类型
    label: '时间选择框', // 标题文字
    icon: 'icon-time',
    options: {
      width: '100%', // 宽度
      defaultValue: '', // 默认值，字符串 12:00:00
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      allowClear: false, // 是否显示清除按钮
      placeholder: '请选择',
      format: 'HH:mm:ss', // 展示格式
      valueFormat: 'x'
    },
    style: '',
    class: '',
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'rate', // 表单类型
    label: '评分', // 标题文字
    icon: 'icon-pingfen_moren',
    options: {
      defaultValue: 0,
      max: 5, // 最大值
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      allowHalf: false // 是否允许半选
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'slider', // 表单类型
    label: '滑动输入条', // 标题文字
    icon: 'icon-menu',
    options: {
      width: '100%', // 宽度
      defaultValue: 0, // 默认值， 如果range为true的时候，则需要改成数组,如：[12,15]
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      min: 0, // 最小值
      max: 100, // 最大值
      step: 1, // 步长，取值必须大于 0，并且可被 (max - min) 整除
      showInput: false // 是否显示输入框，range为true时，请勿开启
      // range: false // 双滑块模式
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'uploadFile', // 表单类型
    label: '上传文件', // 标题文字
    icon: 'icon-upload',
    options: {
      defaultValue: '[]',
      multiple: false,
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      drag: false,
      downloadWay: 'a',
      dynamicFun: '',
      width: '100%',
      limit: 3,
      data: '{}',
      fileName: 'file',
      headers: {},
      action: 'http://cdn.kcz66.com/uploadFile.txt',
      placeholder: '上传'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'uploadImg',
    label: '上传图片',
    icon: 'icon-image',
    options: {
      defaultValue: '[]',
      multiple: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      width: '100%',
      data: '{}',
      limit: 3,
      placeholder: '上传',
      fileName: 'image',
      headers: {},
      action: 'http://cdn.kcz66.com/upload-img.txt',
      listType: 'picture-card'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'treeSelect', // 表单类型
    label: '树选择器', // 标题文字
    icon: 'icon-tree',
    options: {
      disabled: false, //是否禁用
      defaultValue: undefined, // 默认值
      multiple: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      allowClear: false, // 是否显示清除按钮
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
      treeCheckable: false,
      placeholder: '请选择',
      dataKey: 'options',
      dynamicKey: '',
      dynamic: true,
      treeData: [
        {
          value: '1',
          label: '选项1',
          children: [
            {
              value: '11',
              label: '选项11'
            }
          ]
        },
        {
          value: '2',
          label: '选项2',
          children: [
            {
              value: '22',
              label: '选项22'
            }
          ]
        }
      ]
    },
    style: '',
    class: '',
    optionsConfig: {
      type: 'static',
      name: '',
      key: 'treeData'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'cascader', // 表单类型
    label: '级联选择器', // 标题文字
    icon: 'icon-guanlian',
    options: {
      disabled: false, //是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: undefined, // 默认值
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
      placeholder: '请选择',
      allowClear: false, // 是否显示清除按钮
      dataKey: 'options',
      dynamicKey: '',
      dynamic: true,
      options: [
        {
          value: '1',
          label: '选项1',
          children: [
            {
              value: '11',
              label: '选项11'
            }
          ]
        },
        {
          value: '2',
          label: '选项2',
          children: [
            {
              value: '22',
              label: '选项22'
            }
          ]
        }
      ]
    },
    style: '',
    class: '',
    optionsConfig: {
      type: 'static',
      name: '',
      key: 'options'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ],
    events: []
  },
  {
    type: 'batch',
    label: '动态表格',
    icon: 'icon-biaoge',
    list: [],
    options: {
      scrollY: 0,
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      showLabel: false,
      hideSequence: false,
      width: '100%'
    },
    model: '',
    key: '',
    help: ''
  },
  {
    type: 'selectInputList',
    label: '选择输入列',
    icon: 'icon-biaoge',
    columns: [
      {
        value: '1',
        label: '选项1',
        list: []
      },
      {
        value: '2',
        label: '选项2',
        list: []
      }
    ],
    options: {
      disabled: false,
      multiple: true, // 是否允许多选
      hidden: false, // 是否隐藏，false显示，true隐藏
      showLabel: false,
      width: '100%'
    },
    model: '',
    key: '',
    help: ''
  },
  {
    type: 'editor',
    label: '富文本',
    icon: 'icon-LC_icon_edit_line_1',
    list: [],
    options: {
      height: 300,
      placeholder: '请输入',
      defaultValue: '',
      chinesization: true,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      showLabel: false,
      width: '100%'
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'switch', // 表单类型
    label: '开关', // 标题文字
    icon: 'icon-kaiguan3',
    options: {
      defaultValue: false, // 默认值 Boolean 类型
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false // 是否禁用
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'button', // 表单类型
    label: '按钮', // 标题文字
    icon: 'icon-button-remove',
    options: {
      type: 'primary',
      handle: 'submit',
      dynamicFun: '',
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false // 是否禁用，false不禁用，true禁用
    },
    key: ''
  },
  {
    type: 'alert',
    label: '警告提示',
    icon: 'icon-zu',
    options: {
      type: 'success',
      description: '',
      showIcon: false,
      banner: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      closable: false
    },
    key: ''
  },
  {
    type: 'text',
    label: '文字',
    icon: 'icon-zihao',
    options: {
      textAlign: 'left',
      hidden: false, // 是否隐藏，false显示，true隐藏
      showRequiredMark: false,
      color: 'rgb(0, 0, 0)',
      fontFamily: 'PingFangSC-Regular',
      fontSize: '10.5pt'
    },
    key: '',
    style: '',
    class: '',
    events: []
  },
  {
    type: 'html',
    label: 'HTML',
    icon: 'icon-ai-code',
    options: {
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: '<strong>HTML</strong>'
    },
    key: '',
    style: '',
    class: '',
    events: []
  }
];

// 高级控件
// export const highList = [];

import HUploader from '../../customeComponents/uploadFile/SimpleUploader';
import hCommentOptions from '../../customeComponents/commonOptions/commonOptions';
import HDatePicker from '../../customeComponents/HDatePicker/HDatePicker';

// 自定义组件
export const customComponents = {
  title: '自定义组件',
  list: [
    {
      type: 'hUpload', // 表单类型
      label: '自定义上传', // 标题文字
      icon: 'icon-upload',
      component: HUploader,
      options: {
        defaultValue: undefined,
        disabled: false,
        width: '100%',
        text: '',
        uploadOptions: {},
        downloadUrl: '',
        openPdfUrl: '',
        uploadMergeFileUrl: '',
        attrs: {},
        fileNumber: null
      },
      style: '',
      class: '',
      model: '',
      key: '',
      rules: [
        {
          required: false,
          message: '必填项'
        }
      ]
    },
    {
      type: 'hCommentOptions', // 表单类型
      label: '常用意见', // 标题文字
      icon: 'icon-edit',
      component: hCommentOptions,
      options: {
        defaultValue: undefined,
        disabled: false,
        width: '100%',
        listData: [
          {
            value: '1',
            label: '第一条意见'
          },
          {
            value: '2',
            label: '第二条意见'
          }
        ],
        hidden: false, // 是否隐藏，false显示，true隐藏
        placeholder: '请输入', // 默认提示文字
        autoSize: {
          minRows: 4,
          maxRows: 6
        },
        maxLength: null,
        allowClear: false
      },
      style: '',
      class: '',
      optionsConfig: {
        type: 'static',
        name: '',
        key: 'listData'
      },
      model: '',
      key: '',
      rules: [
        {
          required: false,
          message: '必填项'
        }
      ],
      events: []
    },
    {
      type: 'hDatePicker', // 表单类型
      label: '日期选择框', // 标题文字
      icon: 'icon-calendar',
      component: HDatePicker,
      options: {
        width: '100%', // 宽度
        defaultValue: '', // 默认值，字符串 12:00:00
        showTime: false, // 是否显示时间选择器
        disabled: false, // 是否禁用
        hidden: false, // 是否隐藏，false显示，true隐藏
        allowClear: false, // 是否显示清除按钮
        placeholder: '请选择',
        format: 'YYYY-MM-DD', // 展示格式  （请按照这个规则写 YYYY-MM-DD HH:mm:ss，区分大小写）
        valueFormat: 'x'
      },
      style: '',
      class: '',
      model: '',
      key: '',
      help: '',
      rules: [
        {
          required: false,
          message: '必填项'
        }
      ],
      events: []
    }
  ]
};
window.$customComponentList = customComponents.list;

// 布局控件
export const layoutList = [
  {
    type: 'divider',
    label: '分割线',
    icon: 'icon-fengexian',
    options: {
      orientation: 'left'
    },
    key: '',
    model: ''
  },
  {
    type: 'card',
    label: '卡片布局',
    icon: 'icon-qiapian',
    list: [],
    key: '',
    model: ''
  },
  {
    type: 'tabs',
    label: '标签页布局',
    icon: 'icon-tabs',
    options: {
      tabBarGutter: null,
      type: 'line',
      tabPosition: 'top',
      size: 'default',
      animated: true,
      events: []
    },
    columns: [
      {
        type: 'tabPane',
        value: '1',
        label: '选项1',
        list: []
      },
      {
        type: 'tabPane',
        value: '2',
        label: '选项2',
        list: []
      }
    ],
    key: '',
    model: ''
  },
  {
    type: 'grid',
    label: '栅格布局',
    icon: 'icon-zhage',
    columns: [
      {
        type: 'col',
        span: 12,
        list: []
      },
      {
        type: 'col',
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      events: []
    },
    key: '',
    model: ''
  },
  {
    type: 'table',
    label: '表格布局',
    icon: 'icon-biaoge',
    trs: [
      {
        type: 'tr',
        tds: [
          {
            type: 'td',
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            type: 'td',
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      },
      {
        type: 'tr',
        tds: [
          {
            type: 'td',
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            type: 'td',
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      }
    ],
    options: {
      width: '100%',
      bordered: true,
      bright: false,
      small: true,
      customStyle: '',
      events: []
    },
    key: '',
    model: ''
  }
];
