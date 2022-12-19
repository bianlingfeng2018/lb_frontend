<template>
  <div class="app-container ohn transaction-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />付款记录单</div>
    <el-divider class="mt50" content-position="left">基本信息</el-divider>
    <el-form
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="150px"
    >
      <el-form-item :label="'订单编号\nProtocol No'" prop="quotationNum">
        <el-input
          v-model="postForm.proNum"
          placeholder="请输入订单编号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'是否分包\nAgreeToSubcontract'" prop="isSubcontract">
        <el-input
          v-model="postForm.agreeToSubcontract"
          placeholder="请输入是否分包"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'日期\nProtocol Date'" prop="quotationNum">
        <el-input
          v-model="postForm.proDate"
          placeholder="请输入日期"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'面价\nPrice'" prop="quotationNum">
        <el-input
          v-model="postForm.price"
          placeholder="请输入面价"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'成交金额\nDeal'" prop="quotationNum">
        <el-input
          v-model="postForm.deal"
          placeholder="请输入成交金额"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'付款方式\nPay'" prop="quotationNum">
        <el-input
          v-model="postForm.pay"
          placeholder="请输入付款方式"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'到账金额\nIncome'" prop="quotationNum">
        <el-input
          v-model="postForm.income"
          placeholder="请输入到账金额"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <!--      <el-form-item :label="'客服确认\nService Confirm'" prop="quotationNum">-->
      <!--        <el-input-->
      <!--          v-model="postForm.serviceConfirm"-->
      <!--          placeholder="请输入客服确认"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'财务确认\nFinance Confirm'" prop="quotationNum">-->
      <!--        <el-input-->
      <!--          v-model="postForm.financeConfirm"-->
      <!--          placeholder="请输入财务确认"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item :label="'订单类型\nType'" prop="quotationNum">
        <el-input
          v-model="postForm.type"
          placeholder="请输入订单类型"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'客户名称\nClient'" prop="quotationNum">
        <el-input
          v-model="postForm.client"
          placeholder="请输入客户名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'成交日期\nApply Date'" prop="quotationNum">
        <el-date-picker
          v-model="postForm.applyDate"
          placeholder="请输入成交日期"
          value-format="yyyy-MM-dd"
          type="date"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'出单日期\nReport Date'" prop="quotationNum">
        <el-date-picker
          v-model="postForm.reportDate"
          placeholder="请输入出单日期"
          value-format="yyyy-MM-dd"
          type="date"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'付款日期\nVerify Date'" prop="quotationNum">
        <el-date-picker
          v-model="postForm.verifyDate"
          placeholder="请输入付款日期"
          value-format="yyyy-MM-dd"
          type="date"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'折扣系数\nDiscount'" prop="quotationNum">
        <el-input
          v-model="postForm.discount"
          placeholder="请输入折扣系数"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'回款系数\nCoefficient'" prop="quotationNum">
        <el-input
          v-model="postForm.coefficient"
          placeholder="请输入回款系数"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'分包价格\nSubcontract Price'" prop="subcontractPrice">
        <el-input
          v-model="postForm.subcontractPrice"
          placeholder="请输入分包价格"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'报告编号\nReport Num'" prop="subcontractPrice">
        <el-input
          v-model="postForm.reportNum"
          placeholder="请输入报告编号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="申请单文件（已盖章）" prop="pdfFileList" style="width: 100%">
        <div v-for="(file, i) in pdfFileList" :key="file.path" class="block">
          <el-link :href="getFileBlobUrl(file)" target="_blank">{{ '['+(i+1)+'] ' + file.name }};</el-link>
          <br>
        </div>
      </el-form-item>
      <el-form-item :label="'付款凭证图片'" prop="imageFileList" style="width: 100%">
        <div v-for="img in imageFileList" :key="img.path" class="block">
          <el-image
            style="width: 100px; height: 100px"
            :src="getFileBlobUrl(img)"
            :preview-src-list="[getFileBlobUrl(img)]"
            fit="cover"
          />
        </div>
      </el-form-item>
      <!--      <el-form-item label="申请单文件（已盖章）" prop="pdfFileList" style="width: 100%">-->
      <!--        <el-upload-->
      <!--          action="#"-->
      <!--          :auto-upload="false"-->
      <!--          :file-list="pdfFileList"-->
      <!--          disabled-->
      <!--        >-->
      <!--          <el-button size="small" type="primary" disabled>点击上传</el-button>-->
      <!--          &lt;!&ndash;            <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</div>&ndash;&gt;-->
      <!--        </el-upload>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'付款凭证图片'" prop="imageFileList" style="width: 100%">-->
      <!--        <el-upload-->
      <!--          action="#"-->
      <!--          list-type="picture-card"-->
      <!--          :auto-upload="false"-->
      <!--          :file-list="imageFileList"-->
      <!--          disabled-->
      <!--        >-->
      <!--          <i slot="default" class="el-icon-plus" />-->
      <!--        </el-upload>-->
      <!--      </el-form-item>-->
      <el-form-item>
        <div class="tc">
          <el-button
            v-loading="formLoading"
            type="primary"
            @click="submitForm('postForm')"
          >保存
          </el-button>
          <el-button @click="resetForm('postForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
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
      this.setTagsViewTitle()
      this.setPageTitle()
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
