<template>
  <div class="login-container">
    <div class="lb-flex login-content">
      <el-carousel trigger="click" height="320px" class="lb-login-carousel">
        <el-carousel-item>
          <img
            class="pic-404__parent"
            src="@/assets/images/img1.jpg"
            alt="404"
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="pic-404__parent"
            src="@/assets/images/img2.jpg"
            alt="404"
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="pic-404__parent"
            src="@/assets/images/img3.jpg"
            alt="404"
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="pic-404__parent"
            src="@/assets/images/img4.jpg"
            alt="404"
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="pic-404__parent"
            src="@/assets/images/img5.jpg"
            alt="404"
          >
        </el-carousel-item>
      </el-carousel>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <span>
            <img
              class="pic-404__parent"
              src="@/assets/images/libiao.png"
              alt="404"
            >
          </span>
          <span class="title">立标检测</span>
        </div>
        <p class="login-desc">
          立标检测是一家业内领先的提供检测、认证的综合性机构
        </p>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="大写已打开"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
        >登录</el-button>
        <div class="lb-text-color-secondary f12">
          您可以输入序列号，进行证书
          <span
            class="yn-primary-color pointer"
            @click="openCertDownloadModal()"
          >查验></span>
        </div>
      </el-form>
    </div>
    <div class="login-footer-copyright">
      &copy;立标检测检验认证集团（英文：Lab Testing & Inspection Group
      简称LTI）是一家业内领先的提供检测、认证的综合性机构
    </div>
    <el-dialog title="证书查验" :visible.sync="dialogFormVisible" width="510px">
      <div style="position: relative">
        <el-input
          v-model="encryptionKey"
          placeholder=" 请输入序列号"
          clearable
          style="width: 400px; border: 1px solid #dcdfe6; border-radius: 4px"
        />
        <el-button
          style="position: absolute; left: 398px; border-radius: 0 4px 4px 0"
          type="primary"
          @click="previewCert()"
        >查验</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]
import { validUsername } from "@/utils/validate"

export default {
  name: "Login",
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请正确输入用户名"))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error("密码不能少于六位数字"))
      } else {
        callback()
      }
    }
    return {
      prefix: prefix,
      dialogFormVisible: false,
      encryptionKey: "",
      pdfSrc: "",
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus()
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z"
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = ""
      } else {
        this.passwordType = "password"
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              const { success } = res
              if (success) {
                console.log(this.redirect)
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery
                })
              }
            })
            .catch(() => {})
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    openCertDownloadModal() {
      this.dialogFormVisible = true
    },
    previewCert() {
      if (this.encryptionKey === "") {
        this.$message.warning("请输入序列号")
      } else {
        window.open(
          prefix.lb +
            "/api/certification/previewByEncryptionKey?encryptionKey=" +
            this.encryptionKey,
          "_blank"
        )
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@supports (-webkit-mask: none) and
  (not (cater-color: rgba(255, 255, 255, 0.85))) {
  .login-container .el-input input {
    color: rgba(255, 255, 255, 0.85);
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 4px 5px 4px 15px;
      color: rgb(23 23 23 / 85%);
      height: 36px;
      //caret-color: #eee;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.1) inset !important;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.1) !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgb(0 0 0 / 20%);
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #f0f2f5;
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  overflow: hidden;

  .login-content {
    width: 66%;
    margin: 140px auto;
  }

  .lb-login-carousel {
    width: 50%;
    margin-right: 20px;

    img {
      width: 100%;
      height: 320px;
    }
  }

  .login-form {
    width: 40%;
    margin: 0 20px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: rgb(23 23 23 / 85%);
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    margin: 0 auto;
    display: table;

    img {
      width: 44px;
      height: 44px;
      display: tabel-cell;
      vertical-align: middle;
      margin-right: 8px;
    }

    .title {
      display: tabel-cell;
      vertical-align: middle;
      font-size: 26px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: bold;
    }
  }

  .login-desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    //color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    user-select: none;
  }

  .login-footer-copyright {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
  }
}
</style>
