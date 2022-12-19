<template>
  <div>
    <el-row>
      <el-col :sm="24" :lg="12">
        <el-result icon="success" title="审核成功" sub-title="请根据提示进行操作">
          <template slot="extra">
            <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
            <el-button type="primary" size="medium" @click="goBackToTradeList()">返回交易列表</el-button>
            <el-button
              v-loading="downloadLoading"
              type="primary"
              size="medium"
              @click="handleDownLoad()"
            >下载</el-button>
            <el-button
              v-loading="previewLoading"
              type="primary"
              size="medium"
              @click="handlePreview()"
            >预览</el-button>
          </template>
        </el-result>
      </el-col>
      <!--      <el-col :sm="12" :lg="6">-->
      <!--        <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">-->
      <!--          <template slot="extra">-->
      <!--            <el-button type="primary" size="medium">返回</el-button>-->
      <!--          </template>-->
      <!--        </el-result>-->
      <!--      </el-col>-->
      <!--      <el-col :sm="12" :lg="6">-->
      <!--        <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">-->
      <!--          <template slot="extra">-->
      <!--            <el-button type="primary" size="medium">返回</el-button>-->
      <!--          </template>-->
      <!--        </el-result>-->
      <!--      </el-col>-->
      <!--      <el-col :sm="12" :lg="6">-->
      <!--        <el-result icon="info" title="信息提示" subTitle="请根据提示进行操作">-->
      <!--          <template slot="extra">-->
      <!--            <el-button type="primary" size="medium">返回</el-button>-->
      <!--          </template>-->
      <!--        </el-result>-->
      <!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>

import { getToken } from "@/utils/auth"
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]

export default {
  data() {
    return {
      downloadParam: {
        testTradeId: -1
      },
      downloadLoading: false,
      previewLoading: false
    }
  },
  created() {
    this.downloadParam.testTradeId = this.$route.query.tradeId
  },
  methods: {
    handlePreview() {
      fetch(prefix.lb +
        "/api/test/previewTestReport?testTradeId=" +
        this.downloadParam.testTradeId,
      {
        method: "GET",
        responseType: "application/pdf",
        headers: new Headers({
          "token": getToken().toString()
        })
      }) // FETCH BLOB FROM IT
        .then((response) => response.blob())
        .then((blob) => { // RETRIEVE THE BLOB AND CREATE LOCAL URL
          var _url = window.URL.createObjectURL(blob)
          window.open(_url, "_blank").focus() // window.open + focus
        }).catch((err) => {
          console.log(err)
        })
    },
    handleDownLoad() {
      this.downloadLoading = true
      console.log('handleDownLoad')
      const fileName = '报告单-' + this.downloadParam.testTradeId
      fetch(
        prefix.lb +
        "/api/test/downloadTestReport?testTradeId=" +
        this.downloadParam.testTradeId,
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
          a.download = fileName + ".pdf"
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
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/report/list"
      })
    },
    goBackToTradeList() {
      this.$router.push({
        path: "/tm/detection/list"
      })
    }
  }

}
</script>

<style scoped>

</style>
