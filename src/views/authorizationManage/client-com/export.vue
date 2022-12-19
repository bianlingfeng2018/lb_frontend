<template>
  <div>
    <p style="font-family: '仿宋',Arial,sans-serif;">
      点击按钮开始导出 <span style="font-weight: bold;">{{ message }}</span>
    </p>
    <el-button
      v-loading="downloadLoading"
      type="primary"
      size="medium"
      @click="onExport()"
    >开始导出</el-button>
  </div>
</template>

<script>

import { getToken } from "@/utils/auth"
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]

export default {
  data() {
    return {
      downloadLoading: false,
      message: '',
      query: {
        url: undefined,
        fileName: undefined
      }
    }
  },
  created() {
    const query = this.$route.query
    this.query.url = query.url
    this.query.fileName = query.fileName
    if (this.query.fileName.indexOf('pub') !== -1) {
      this.message = '公共客户'
    } else if (this.query.fileName.indexOf('my') !== -1) {
      this.message = '我的客户'
    } else {
      this.message = '所有客户'
    }
  },
  methods: {
    // 导出
    onExport() {
      fetch(
        prefix.lb + this.query.url,
        {
          method: "GET",
          responseType: "blob",
          headers: new Headers({
            "token": getToken().toString()
          })
        }
      )
        .then((res) => res.blob())
        .then((data) => {
          const blobUrl = window.URL.createObjectURL(data)
          const a = document.createElement("a")
          a.download = this.query.fileName
          a.href = blobUrl
          a.click()
          this.$message({
            type: "success",
            message: "文件下载成功"
          })
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "文件下载失败，请稍后再试~"
          })
        })
        .finally(() => {
          this.downloadLoading = false
        })
    }
  }

}
</script>

<style scoped>

</style>
