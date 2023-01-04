const methods = {
  userValidate: {
    username: [
      { required: true, message: '属性不能为空', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '属性不能为空', trigger: 'blur' }
    ],
    nickname: [
      { required: true, message: '属性不能为空', trigger: 'blur' }
    ],
    phoneNum: [
      { required: true, message: '属性不能为空', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '属性不能为空', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
    ],
    'role.id': [
      { required: true, message: '属性不能为空', trigger: 'blur' }
    ]
  },
  detectionCreateValidate: {
    testNum: [
      { required: true, message: '请输入交易编号', trigger: 'blur' }
    ],
    testName: [
      { required: true, message: '请输入检测名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' }
    ],
    client: [
      { required: true, message: '请输入客户名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' }
    ],
    contact: [
      { required: true, message: '请输入联系方式', trigger: 'blur' },
      { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'change' }
    ],
    // clientAccount: [
    //   { required: true, message: '请输入客户账户', trigger: 'blur' },
    //   { type: 'number', message: '请输入正确的账户', trigger: 'change' }
    // ],
    owner: [
      { required: true, message: '请输入交易负责人', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 5 个字符', trigger: 'change' }
    ]
  },
  quotationCreateValidate: {
    tradeName: [
      { required: true, message: '请输入交易名称', trigger: 'blur' },
    ],
    payType: [
      { required: true, message: '请选择支付方式', trigger: 'change' }
    ],

    clientName: [
      { required: true, message: '请选择客户公司', trigger: 'change' }
    ],
    attn: [
      { required: true, message: '请输入客户联系人', trigger: 'blur' }
    ],
    deliveryAddress: [
      { required: true, message: '请输入邮寄地址', trigger: 'blur' },
      { min: 2, max: 100, message: '长度在 3 到 100 个字符', trigger: 'change' }
    ],
    // testPeriod: [
    //   { required: true, message: '请输入测试周期', trigger: 'blur' }
    // ],
    // sampleNum: [
    //   { required: true, message: '请输入总样品量', trigger: 'blur' },
    // ],
    // testPrice: [
    //   { required: true, message: '请输入检测价格', trigger: 'blur' },
    // ],
    reportTypes: [
      { required: true, message: '请选择报告类型', trigger: 'change' },
    ],
    clientComSignature: [
      { required: true, message: '请输入公司签名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    libiaoRepresentativeSignature: [
      { required: true, message: '请输入立标代表签名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    clientComChop: [
      { required: true, message: '请输入盖章', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    audit: [
      { required: true, message: '请输入审核人员签名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    clientSignatureDate: [
      { required: true, message: '请选择客户签名日期', trigger: 'blur' }
    ],
    libiaoSignatureDate: [
      { required: true, message: '请选择立标签名日期', trigger: 'blur' }
    ],
    employee: [
      { required: true, message: '请输入员工名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    customer: [
      { required: true, message: '请输入客户名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '请输入注意事项', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    reportFee: [
      { required: true, message: '请输入报告费用', trigger: 'blur' },
      { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' }
    ],
    courierFee: [
      { required: true, message: '请输入快递费', trigger: 'blur' },
      { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' }
    ],
    taxFee: [
      { required: true, message: '请输入税率(%)', trigger: 'blur' },
      { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' }
    ],
    discount: [
      { required: true, message: '请输入折扣(%)', trigger: 'blur' },
      { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' }
    ]
  },
  applyCreateValidate: {
    comAddrCn: [
      { required: true, message: '请输入申请单位地址', trigger: 'blur' }
    ],
    radioStandard: [
      { required: true, message: '请选择报告抬头', trigger: 'blur' }
    ],
    invoiceTitle: [
      { required: true, message: '请输入发票抬头', trigger: 'blur' }
    ],
    sampleNameCn: [
      { required: true, message: '请输入样品名称', trigger: 'blur' }
    ],
    sampleQuantity: [
      { required: true, message: '请输入样品数量', trigger: 'blur' }
    ],
    sampleModelCn: [
      { required: true, message: '请输入样品型号', trigger: 'blur' }
    ],
    sampleName: [
      { required: true, message: '请输入样品部位名称', trigger: 'blur' }
    ],
    sampleDescription: [
      { required: true, message: '请输入取样部位描述', trigger: 'blur' }
    ],
  },
  worksheetCreateValidate: {
    testId: [
      { required: true, message: '请选择测试人员', trigger: 'blur' }
    ],
    employee: [
      { required: true, message: '请选择负责人', trigger: 'blur' }
    ],
    gmtCreate: [
      { required: true, message: '请选择开单时间', trigger: 'blur' }
    ],
    gmtOutput: [
      { required: true, message: '请选择出单时间', trigger: 'blur' }
    ],
    editorId: [
      { required: true, message: '请选择编制人', trigger: 'blur' }
    ],
    reviewerId: [
      { required: true, message: '请选择审核人', trigger: 'blur' }
    ],
    approverId: [
      { required: true, message: '请选择批准人', trigger: 'blur' }
    ]
  },
  reportCreateValidate: {},
  quotationTableValidate: {
    reportNum: [
      { required: true, message: '属性不能为空' }
    ],
    productDes: [
      { required: true, message: '属性不能为空' }
    ],
    style: [
      { required: true, message: '属性不能为空' }
    ],
    materialColor: [
      { required: true, message: '属性不能为空' }
    ],
    testItem: [
      { required: true, message: '属性不能为空' }
    ],
    unitPrice: [
      { required: true, message: '属性不能为空' }
    ],
    qty: [
      { required: true, message: '属性不能为空' }
    ],
    amountRmb: [
      { required: true, message: '属性不能为空' }
    ]
  }
}

export default methods
