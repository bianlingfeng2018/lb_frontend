<template>
  <div class="app-container ohn transaction-box">
    分配客服
    <el-form
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="110px"
    >
      <el-form-item :label="'客服'" prop="serviceId">
        <el-select
          v-model="postForm.serviceId"
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in customServiceList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="tr">
          <el-button
            v-loading="saveBtnLoading"
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

import { getAllUsersByRole } from "@/api/user"

export default {
  name: 'AssignCS',
  data() {
    return {
      formLoading: false,
      saveBtnLoading: false,
      rules: {
        serviceId: [
          { required: true, message: '属性不能为空' }
        ]
      },
      postForm: {
        testTradeId: -1,
        serviceId: undefined
      },
      tmpTestTradeId: -1,
      customServiceList: []
    }
  },
  created() {
    this.tmpTestTradeId = this.$route.query.testTradeId
    this.postForm.testTradeId = Number(this.tmpTestTradeId)
    this.getAllCustomService()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.saveBtnLoading = true
          this.$store
            .dispatch(
              "transaction/updateTestCustomService",
              this.postForm
            )
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
              this.saveBtnLoading = false
            })
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
        path: "/tm/detection/apply/list"
      })
    },
    async getAllCustomService() {
      const res = await getAllUsersByRole({
        role: '客服'
      })
      console.log(res)
      this.customServiceList = res.data
    }
  }
}
</script>

