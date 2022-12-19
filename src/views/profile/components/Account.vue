<template>
  <el-form>
    <el-form-item label="旧密码">
      <el-input v-model.trim="postForm.oldPassword" type="password" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model.trim="postForm.newPassword" type="password" />
    </el-form-item>
    <el-form-item label="再次输入新密码">
      <el-input v-model.trim="postForm.confirmPassword" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPassword } from "@/api/user"

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
      postForm: {
        username: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    }
  },
  created() {
  },
  methods: {
    submit() {
      if (this.postForm.newPassword !== this.postForm.confirmPassword) {
        this.$message.warning("两次输入密码不一致")
        return
      }
      this.postForm.username = this.user.username
      updateUserPassword(this.postForm)
        .then((res) => {
          console.log(res)
          this.$message.success("修改成功")
        })
        .catch((reason) => {
          console.log(reason)
        })
        .finally(() => {})
    }
  }
}
</script>
