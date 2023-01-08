<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">

    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack">返回上一页</el-button>
    <div v-if="postForm.status == 3" class="mt20" style="background-color: #F56C6C;padding:10px">
      <span class="mt20 mb20 ml16 ">原始记录单被{{ postForm.reviewName }}评审不通过，不通过原因：{{ postForm.reviewReason }}(评审人：{{ postForm.reviewName
      }} 评审时间：{{ postForm.reviewTime }})</span>
    </div>
    <div id="pdfCentent">
      <el-divider content-position="left">原始记录单信息</el-divider>
      <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
        <el-descriptions-item>
          <template slot="label">测试项目</template>
          {{ postForm.testItem }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">检测公司名称</template>
          {{ postForm.testom }}
        </el-descriptions-item>
        <br>
        <el-descriptions-item>
          <template slot="label">测试人员</template>
          {{ postForm.testPerson }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">检测设备</template>
          {{ postForm.testDeviceName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">检测设备号</template>
          {{ postForm.testDeviceNo }}
        </el-descriptions-item>
        <br>
        <el-descriptions-item>
          <template slot="label">测试方法</template>
          {{ postForm.testMethod }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">测试条件</template>
          {{ postForm.testCase }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">备注</template>
          {{ postForm.remark }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">收样日期</template>
          {{ postForm.sampleDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">要求完成日期</template>
          {{ postForm.planDate }}
        </el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="left">测试结果</el-divider>
      <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
        <el-descriptions-item>
          <template slot="label">测试结果</template>
          {{ postForm.testResult }}
        </el-descriptions-item>
        <br>
        <el-table :data="postForm.subList" stripe border style="width: 100%" class="mt8">
          <el-table-column type="seq" label="序号" width="60" />
          <el-table-column prop="subTestItem" label="测试子项目" min-width="120" />
          <el-table-column prop="cas" label="CAS号" min-width="120" />
          <el-table-column prop="avgValue" label="平均值" min-width="120" />
          <el-table-column prop="limitValue" label="限值" min-width="120" />
          <el-table-column prop="testResult" label="测试结果" min-width="120" />
        </el-table>
        <br>
        <el-descriptions-item>
          <template slot="label">报告人</template>
          {{ postForm.reportPerson }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">报告日期</template>
          {{ postForm.reportDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">纸质原始记录表</template>
          {{ postForm.oriReportFile }}
          <el-image v-if="postForm.type ==2 " class="img" :src="postForm.oriReportFile" />
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="ExportSavePdf(htmlTitle,Date.now())">下载</el-button>
    <!--    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>-->
  </div>
</template>

<script>
import { getoriDetail } from "@/api/worksheet"
import { getToken } from "@/utils/auth"
import config from "@/utils/config"
import { getUserById } from "@/api/user"
import { timeFormatFilter } from "@/utils/simple-util"
import MyFlexTable from "@/views/components/MyFlexTable"
const { prefix } = config[process.env.NODE_ENV]

export default {
  components: {
    MyFlexTable
  },
  filters: {
    timeFormatFilter
  },
  data() {
    return {
      fits: ['1', '2', '3'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      submitLoading: false,
      downloadParam: {
        testTradeId: -1
      },
      postForm: {
        flexObj: []
      },
      tmpForm: {
        editor: '',
        reviewer: '',
        approver: ''
      },
      htmlTitle: 0,
      mergeFooterItems: [{ row: 0, col: 0, rowspan: 0, colspan: 8 }]
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.downloadParam.testTradeId = this.tempRoute.params.id
    this.htmlTitle = `原始记录单-${id}-`
  },
  methods: {
    handlePreview() {
      window.open(
        "/api/certification/previewByEncryptionKey?encryptionKey=" +
        "0fdb7ea8-7598-417d-82d4-6085002e5c11",
        "_blank"
      )
    },
    handleDownLoad() {
      console.log('handleDownLoad')
      const fileName = '工作单-' + this.downloadParam.testTradeId
      fetch(
        prefix.lb +
        "/api/test/downloadTestWorkOrder?testTradeId=" +
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
        .finally(() => { })
    },

    fetchData: function(id) {
      getoriDetail(Object.assign({}, { id: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data
        if(this.postForm.oriReportFile.indexOf("pdf") != -1){
          this.postForm.type = 1
        }else{
          this.postForm.type = 2
          this.postForm.oriReportFile = prefix.lb + '/ori/download?' +  this.postForm.oriReportFile
        }

      }).catch(err => {
        console.log(err)
      })
    },

    goBack() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.quotation-box {
  .remark-content {
    font-size: 12px;
    color: #808080;
    line-height: 20px;
  }

  ::v-deep .el-descriptions-item__label {
    white-space: pre-line;
  }
}

.flex-direction {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.block{margin: 15px;}
.img {
  width: 100px;
  height: 100px;
  border: 0.5px rgb(39, 39, 39) solid;
}
</style>
