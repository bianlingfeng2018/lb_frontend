<template>
  <div class="app-container ohn transaction-box">
    订单创建
  </div>
</template>

<script>
import {
  addFinance,
  getFinanceById,
  getTestTradeApplicationFormImages,
  getTestTradeApplicationFormPDFs,
  updateFinance
} from "@/api/finance"
import { getToken } from "@/utils/auth"
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgSrc: "",
      pdfFileList: [],
      imageFileList: [],
      formLoading: false,
      // rules: methods.quotationCreateValidate,
      rules: {},
      postForm: {
        proNum: "001",
        proDate: "2022-01-31 23:10:12",
        price: 1600,
        deal: 1500,
        pay: "日结",
        income: 1500,
        serviceConfirm: 1500,
        financeConfirm: 1500,
        type: "检测",
        client: "xxx公司",
        discount: "0.95",
        applyDate: "2022-01-31 23:10:12",
        reportDate: "2022-01-31 23:10:12",
        verifyDate: "2022-01-31 23:10:12",
        quotation: "",
        receipt: "",
        coefficient: "",
        reportNum: "",
        agreeToSubcontract: "",
        subcontractPrice: ""
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    if (this.isEdit) {
      // edit
      const id = this.$route.query.id
      this.tmpTestTradeId = this.$route.params.id
      this.fetchData(id)
      this.fetchAttachments(this.tmpTestTradeId)
    } else {
      // create
      this.tmpTestTradeId = this.$route.params.id
    }
    this.postForm.testTradeId = this.tmpTestTradeId
  },
  methods: {
    getFileBlobUrl(file) {
      console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    fetchFile: function(file, fileList) {
      fetch(prefix.lb +
        "/api/file",
      {
        method: "POST",
        body: JSON.stringify(file),
        responseType: "image/jpg",
        headers: new Headers({
          "token": getToken().toString(),
          "Content-Type": "application/json"
        })
      })
        // FETCH BLOB FROM IT
        .then((response) => response.blob())
        .then((blob) => { // RETRIEVE THE BLOB AND CREATE LOCAL URL
          var _url = window.URL.createObjectURL(blob)
          // window.open(_url, "_blank").focus() // window.open + focus
          // this.imgSrc = _url
          fileList.push(
            {
              'name': file.name,
              'url': _url
            })
        }).catch((err) => {
          console.log(err)
        })
    },
    fetchAttachments: function(tradeId) {
      // 获取PDF文件列表
      getTestTradeApplicationFormPDFs({ tradeId: tradeId })
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.pdfFileList = data.data
          } else {
            console.log(errorMessage)
          }
        })
        .catch((reason) => {
          console.log(reason)
        })
      // 获取Image文件列表
      getTestTradeApplicationFormImages({ tradeId: tradeId })
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.imageFileList = data.data
          } else {
            console.log(errorMessage)
          }
        })
        .catch((reason) => {
          console.log(reason)
        })
        .finally(() => {})
    },
    fetchData: function(id) {
      // 获取postForm
      getFinanceById(id).then(response => {
        console.log(response.data)
        this.postForm = response.data

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑付款记录'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tmpTestTradeId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑付款记录'
      document.title = `${title} - ${this.tmpTestTradeId}`
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.formLoading = true
          if (this.isEdit) {
            updateFinance(this.postForm.id, this.postForm)
              .then((res) => {
                const { data, success, errorMessage } = res
                if (success) {
                  this.resetForm(formName)
                  this.$message.success(data.msg)
                  this.goBack()
                } else {
                  this.$message.error(errorMessage)
                }
              })
              .catch(() => {
              })
              .finally(() => {
                this.formLoading = false
              })
          } else {
            addFinance(this.postForm)
              .then((res) => {
                const { data, success, errorMessage } = res
                if (success) {
                  this.resetForm(formName)
                  this.$message.success(data.msg)
                } else {
                  this.$message.error(errorMessage)
                }
              })
              .catch(() => {
              })
              .finally(() => {
                this.formLoading = false
              })
          }
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: "/fm/pay"
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.transaction-box {
  .el-form .el-form-item__label {
    background-color: red;
    line-height: 20px !important;
  }

  .el-form-item--medium .el-form-item__label {
    line-height: 20px !important;
  }

  .remark-content {
    font-size: 12px;
    color: #808080;
    line-height: 20px;
  }
}
</style>
