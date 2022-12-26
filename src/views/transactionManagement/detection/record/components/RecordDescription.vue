<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack()">返回上一页</el-button>
    <el-divider content-position="left">工作单信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
      <el-descriptions-item>
        <template slot="label">客户</template>
        {{ postForm.customer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">检测公司名称</template>
        {{ postForm.issuer }}
      </el-descriptions-item>
      <br>
      <el-descriptions-item>
        <template slot="label">开单人</template>
        {{ postForm.employee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">开单时间</template>
        {{ postForm.gmtCreate | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">加急情况</template>
        {{ postForm.busyStatus }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">出单时间</template>
        {{ postForm.gmtOutput | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">是否退样</template>
        {{ postForm.withdraw }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">样品单明细</el-divider>

    <div v-for="(item, index) in postForm" :key="index">

      <el-descriptions
        class="margin-top"
        title=""
        :column="3"
        :content-style="{ 'width': '200px' }"
        :style="{ 'margin-top': '20px' }"
      >
        <el-descriptions-item>
          <template slot="label">样品部位名称</template>
          {{ item.customer }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品型号</template>
          {{ item.issuer }}
        </el-descriptions-item>
        <br>
        <el-descriptions-item>
          <template slot="label">材质</template>
          {{ item.employee }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">取样部位描述</template>
          {{ item.gmtCreate | timeFormatFilter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">测试项目</template>
          {{ item.busyStatus }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">测试方法</template>
          {{ item.gmtOutput }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">测试条件</template>
          {{ postForm.withdraw }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">备注</template>
          {{ postForm.withdraw }}
        </el-descriptions-item>
      </el-descriptions>

    </div>

    <div class="mt36">样品照片</div>
    <div class="flex-direction">
      <div v-for="fit in fits" :key="fit" class="block">
        <el-image class="img" :src="url" />
      </div>
    </div>

    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="handleDownLoad()">下载</el-button>
    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>
  </div>
</template>

<script>
import { queryTestTradeDetail } from "@/api/transaction"
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
      mergeFooterItems: [{ row: 0, col: 0, rowspan: 0, colspan: 8 }]
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.downloadParam.testTradeId = this.tempRoute.params.id
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
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testWorkOrder
        const uid1 = this.postForm.editorId
        const uid2 = this.postForm.reviewerId
        const uid3 = this.postForm.approverId
        const postForm = this.tmpForm
        getUserById({ id: uid1 })
          .then(res => {
            const { data } = res
            console.log(data)
            postForm.editor = data.nickname
          })
          .catch(reason => {
            console.log(reason)
          })
        getUserById({ id: uid2 })
          .then(res => {
            const { data } = res
            console.log(data)
            postForm.reviewer = data.nickname
          })
          .catch(reason => {
            console.log(reason)
          })
        getUserById({ id: uid3 })
          .then(res => {
            const { data } = res
            console.log(data)
            postForm.approver = data.nickname
          })
          .catch(reason => {
            console.log(reason)
          })

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '查看工作单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tempRoute.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看工作单'
      document.title = `${title} - ${this.tempRoute.params.id}`
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/worksheet/list"
      })
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
