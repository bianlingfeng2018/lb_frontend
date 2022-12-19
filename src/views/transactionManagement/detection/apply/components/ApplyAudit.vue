<template>
  <div class="app-container ohn">
    <!--    <p>检测交易编号：{{ postForm.testTradeId }}</p>-->
    <div v-if="testTradeState==='testApplicationFormCreated'">
      <el-form
        ref="postForm"
        :v-loading="formLoading"
        :model="postForm"
        status-icon
        :rules="rules"
        :label-position="labelPosition"
      >
        <el-form-item label="申请单文件（已盖章）" prop="applyFileList">
          <el-upload
            action="#"
            :on-change="handleChangeApplyFile"
            :on-remove="handleChangeApplyFile"
            :auto-upload="false"
            :file-list="postForm.applyFileList"
          >
            <el-button size="small" type="primary" plain>点击上传</el-button>
            <!--            <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
        <el-form-item label="付款凭证图片" prop="payFileList">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-change="handleChangePayFile"
            :on-remove="handleChangePayFile"
            :auto-upload="false"
            :file-list="postForm.payFileList"
          >
            <i slot="default" class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <!--        <el-form-item class="tc">-->
        <!--          <el-button-->
        <!--            :v-loading="submitLoading"-->
        <!--            type="primary"-->
        <!--            @click="submitForm('postForm')"-->
        <!--          >提交</el-button>-->
        <!--          <el-button @click="resetForm('postForm')">重置</el-button>-->
        <!--        </el-form-item>-->
      </el-form>
      <p style="font-family: '仿宋',Arial,sans-serif;">
        <!-- 确认测试报价单 -->
        客服可以代劳上传签字或盖章的申请单PDF、付款单截图，并且完成付款确认。
      </p>
      <!--      <p>-->
      <!--        &lt;!&ndash; 确认测试申请单 &ndash;&gt;-->
      <!--        需要客户【客服代劳】上传签字或盖章的申请单的pdf-->
      <!--        ，并且完成付款确认【付款要推送给财务】-->
      <!--      </p>-->
      <el-button
        type="primary"
        size="small"
        plain
        @click="submitForm('postForm')"
      >确认付款并发送
      </el-button>
    </div>
    <div v-else>
      <p>已审核</p>
    </div>
  </div>
</template>

<script>

import { getTestTradeStatus } from "@/api/transaction"

export default {
  data() {
    return {
      testTradeState: "",
      labelPosition: 'top',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      formLoading: false,
      submitLoading: false,
      postForm: {
        testTradeId: -1,
        applyFileList: [],
        payFileList: []
      },
      queryParam: {
        testTradeId: -1
      },
      rules: {
        applyFileList: [{ required: true, message: "请上传申请文件", trigger: "change" }],
        payFileList: [{ required: true, message: "请上传凭据图片", trigger: "change" }]
      }
    }
  },
  created() {
    this.postForm.testTradeId = this.$route.params.id
    this.queryParam.testTradeId = this.postForm.testTradeId

    this.tempRoute = Object.assign({}, this.$route)
    this.setTagsViewTitle()
    this.setPageTitle()

    this.getTestTradeState()
  },
  methods: {
    getTestTradeState() {
      getTestTradeStatus(this.queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.testTradeState = data.status
            console.log(data)
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
        })
    },
    handleChangeApplyFile(file, fileList) {
      this.postForm.applyFileList = fileList
    },
    handleChangePayFile(file, fileList) {
      this.postForm.payFileList = fileList
    },
    // handleRemove(file) {},
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleDownload(file) {
    //   console.log(file)
    // },
    submitForm(formName) {
      // 移除表单中文件上传部分的验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.postForm)
          const formData = new FormData()
          formData.append("testTradeId", this.postForm.testTradeId)
          formData.append("testTradeStatus", "testApplicationFormConfirmed")
          for (let i = 0; i < this.postForm.applyFileList.length; i++) {
            formData.append("applyFileList", this.postForm.applyFileList[i].raw)
          }
          for (let i = 0; i < this.postForm.payFileList.length; i++) {
            formData.append("payFileList", this.postForm.payFileList[i].raw)
          }
          console.log(formData)
          this.submitLoading = true
          this.$store
            .dispatch("transaction/auditTestApply", formData)
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$message.success(data.msg)
                this.$refs["postForm"].resetFields()
                this.$router.push({
                  path: "/tm/detection/apply/result"
                })
              } else {
                this.$message.error(errorMessage)
              }
            })
            .catch(() => {})
            .finally(() => {
              this.submitLoading = false
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleAudit() {
      this.$store
        .dispatch(
          "transaction/updateTestTradeStatus",
          this.queryParam
        )
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.$message.success(data.msg)
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
        })
    },
    setTagsViewTitle() {
      const title = '审核检测申请单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.testTradeId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '审核检测申请单'
      document.title = `${title} - ${this.postForm.testTradeId}`
    }
  }
}
</script>
