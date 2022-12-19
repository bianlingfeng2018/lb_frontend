<template>
  <div class="block">
    <el-form
      ref="postForm"
      :v-loading="formLoading"
      :model="postForm"
      status-icon
      :rules="rules"
      :label-position="labelPosition"
    >
      <el-form-item label="电子签名图片" prop="imgList">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-change="handleChangeFile"
          :on-remove="handleChangeFile"
          :auto-upload="false"
          :file-list="postForm.imgList"
          :limit="1"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item class="tl">
        <el-button
          :v-loading="submitLoading"
          type="primary"
          @click="submitForm('postForm')"
        >提交</el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserSignature, uploadSignature } from "@/api/user"
import { mapGetters } from "vuex"
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: ''
        }
      }
    }
  },
  data() {
    return {
      disabled: false,
      labelPosition: 'top',
      dialogImageUrl: '',
      dialogVisible: false,
      formLoading: false,
      submitLoading: false,
      postForm: {
        imgList: []
      },
      rules: {
        imgList: [{ required: true, message: "请上传电子签名", trigger: "change" }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    downloadImage(url, name) {
      fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          // the filename you want
          a.download = name
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
        .catch(() => alert('An error sorry'))
    },
    getFileBlobUrl(file) {
      console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    fetchData() {
      getUserSignature({ "username": this.name })
        .then(res => {
          console.log(res)
          this.postForm.imgList = res.data.data
          for (const img of this.postForm.imgList) {
            img.url = this.getFileBlobUrl(img)
          }
        })
        .catch(reason => {
          console.log(reason)
        })
        .finally(() => {})
    },
    handleRemove(file) {
      let _index = -1
      for (let i = 0; i < this.postForm.imgList.length; i++) {
        const img = this.postForm.imgList[i]
        if (img.uid === file.uid) {
          _index = i
          break
        }
      }
      if (_index !== -1) {
        console.log('slice')
        this.postForm.imgList.splice(_index, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      this.downloadImage(file.url, file.name)
    },
    handleChangeFile(file, fileList) {
      this.postForm.imgList = fileList
    },
    submitForm(formName) {
      console.log(this.user)
      // 移除表单中文件上传部分的验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.postForm)
          const formData = new FormData()
          formData.append("username", this.user.username)
          for (let i = 0; i < this.postForm.imgList.length; i++) {
            formData.append("imgList", this.postForm.imgList[i].raw)
          }
          console.log(formData)
          this.submitLoading = true
          uploadSignature(formData)
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$message.success(data.msg)
                this.$refs["postForm"].resetFields()
                this.fetchData()
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
