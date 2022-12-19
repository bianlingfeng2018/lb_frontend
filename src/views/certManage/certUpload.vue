<template>
  <div class="app-container">
    <el-form
      ref="fileForm"
      v-loading="formLoading"
      :model="fileForm"
      status-icon
      :rules="rules"
      style="width: 400px"
      label-width="100px"
    >
      <el-form-item label="文件上传" prop="name">
        <el-upload
          class="upload-demo"
          :action="prefix.lb + '/api/certification/uploadFile'"
          :on-success="handleFileSuccess"
          :before-upload="beforeFlieUpload"
          :file-list="fileList"
          :multiple="false"
          :headers="headers"
          :limit="1"
        >
          <el-button size="small" type="primary" plain>点击上传</el-button>
          <span slot="tip" class="el-upload__tip ml8">
            <!-- 只能上传jpg/png文件，且不超过20M -->
          </span>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户选择" prop="username">
        <el-select
          v-model="fileForm.username"
          style="width: 300px"
          placeholder="请选择用户"
        >
          <el-option
            v-for="(item, index) in customerOptions"
            :key="item.id + index"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文件描述" prop="desc">
        <el-input
          v-model="fileForm.desc"
          type="textarea"
          placeholder="请填写文件描述"
          :rows="2"
          maxlength="100"
          show-word-limit
          clearable
        />
      </el-form-item>
      <el-form-item class="tc">
        <el-button
          v-loading="submitLoading"
          type="primary"
          @click="submitForm('fileForm')"
        >提交</el-button>
        <el-button @click="resetForm('fileForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from "@/utils/config"
import { getToken } from "@/utils/auth"
const { prefix } = config[process.env.NODE_ENV]
export default {
  data() {
    return {
      prefix: prefix,
      headers: {
        authorization: "authorization-text",
        token: getToken()
        // contentType: "multipart/form-data",
      },
      formLoading: false,
      submitLoading: false,
      fileList: [],
      customerOptions: [],
      fileForm: {
        name: "",
        username: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请上传文件", trigger: "change" }],
        username: [
          { required: true, message: "请选择用户", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写文件描述", trigger: "blur" },
          { min: 3, message: "长度至少3 个字符", trigger: "blur" }
        ]
      }
    }
  },
  created() {
    this.getCustomerList()
  },
  methods: {
    getCustomerList() {
      this.formLoading = true
      this.$store
        .dispatch("cert/getCustomerList")
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.customerOptions = data || []
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {})
        .finally(() => {
          this.formLoading = false
        })
    },
    beforeFlieUpload(file, fileList) {
      // const isJpgOrPng =
      //   file.type === "image/jpeg" ||
      //   file.type === "image/png" ||
      //   file.type === "image/bmp" ||
      //   file.type === "image/jpg"

      // const isLt2M = file.size / 1024 / 1024 < 20
      // if (!isJpgOrPng) {
      //   this.$message.error("仅支持PNG、JPG、JPEG、BMP格式的图片")
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!")
      // }
      // return isJpgOrPng && isLt2M
    },
    handleFileSuccess(file) {
      this.fileForm.name = file.data.fileName
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.$store
            .dispatch("cert/uploadVertification", this.fileForm)
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$confirm("序列号:" + data.encryptionKey, "操作成功", {
                  confirmButtonText: "知道了",
                  type: "success",
                  showCancelButton: false
                }).then(() => {
                  this.fileList = []
                  this.$refs["fileForm"].resetFields()
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
    }
  }
}
</script>
