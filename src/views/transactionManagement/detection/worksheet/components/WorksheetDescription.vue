<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack">返回上一页</el-button>
    <div id="pdfCentent">
      <el-divider content-position="left">工作单信息</el-divider>
      <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
        <el-descriptions-item>
          <template slot="label">客户</template>
          {{ postForm.clientName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">检测公司名称</template>
          {{ postForm.comName }}
        </el-descriptions-item>
        <br>
        <el-descriptions-item>
          <template slot="label">开单人</template>
          {{ postForm.createName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">开单时间</template>
          {{ postForm.orderDate | timeFormatFilter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">加急情况</template>
          {{ postForm.service }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">出单时间</template>
          {{ postForm.outputDate | timeFormatFilter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">是否退样</template>
          {{ postForm.sampleStatus }}
        </el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="left">样品单明细</el-divider>

      <div v-for="(item, index) in postForm.itemList" :key="index">

        <el-descriptions
          class="margin-top"
          title=""
          :column="3"
          :content-style="{ 'width': '200px' }"
          :style="{ 'margin-top': '20px' }"
        >
          <el-descriptions-item>
            <template slot="label">样品部位名称</template>
            {{ item.sampleLocation }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">样品型号</template>
            {{ item.sampleModel }}
          </el-descriptions-item>
          <br>
          <el-descriptions-item>
            <template slot="label">材质</template>
            {{ item.sampleMaterial }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">取样部位描述</template>
            {{ item.sampleDesc }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">测试项目</template>
            {{ item.testItem }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">测试方法</template>
            {{ item.testItemMethod }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">测试条件</template>
            {{ postForm.testItemCase }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">备注</template>
            {{ postForm.remark }}
          </el-descriptions-item>
        </el-descriptions>

      </div>

      <div class="mt36">样品照片</div>
      <div class="flex-direction">

        <div v-for="item in postForm.fileNameList" :key="item" class="block">
          <el-image class="img" :src="item" />
        </div>
      </div>
    </div>
    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="ExportSavePdf(htmlTitle,Date.now())">下载</el-button>
    <!--    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>-->
  </div>
</template>

<script>
import { getworkDetail } from "@/api/worksheet"
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
      htmlTitle: 0,
      postForm: {
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.downloadParam.testTradeId = this.tempRoute.params.id
    this.htmlTitle = `工作单-${id}-`
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
      getworkDetail(Object.assign({}, { id: id })).then(response => {
        this.postForm = response.data
        if (this.postForm.fileNameList.length > 0) {
          const newList = []
          this.postForm.fileNameList.forEach(item => {
            item = prefix.lb + '/workOrder/download?' + item
            newList.push(item)
          })
          this.postForm.fileNameList = newList
        }
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    goBack() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    setTagsViewTitle() {
      const title = '查看工作单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tempRoute.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看工作单'
      document.title = `${title} - ${this.tempRoute.params.id}`
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
