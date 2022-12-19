<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测工作单信息</div>
    <el-divider content-position="left">基本信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border :label-style="{'width': '150px'}" :content-style="{'width': '200px'}">
      <el-descriptions-item>
        <template slot="label">{{ "报告编号\nWorkOrder No" }}</template>
        {{ postForm.workOrderNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "开单人\nIssuer" }}</template>
        {{ postForm.issuer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "负责人\nEmployee" }}</template>
        {{ postForm.employee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户\nCustomer" }}</template>
        {{ postForm.customer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "加急情况\nUrgent" }}</template>
        {{ postForm.busyStatus }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "开单时间\nDate" }}</template>
        {{ postForm.gmtCreate | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "出单时间\nDate" }}</template>
        {{ postForm.gmtOutput | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "是否退样\nWithdraw" }}</template>
        {{ postForm.withdraw }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "编制人\nEditor" }}</template>
        {{ tmpForm.editor }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "审核人\nReviewer" }}</template>
        {{ tmpForm.reviewer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "批准人\nApprover" }}</template>
        {{ tmpForm.approver }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">样品单明细</el-divider>
    <vxe-table
      ref="xTable"
      border
      show-footer
      show-overflow
      class="editable-footer mb20"
      :row-config="{ isHover: true }"
      :export-config="{}"
      :data="postForm.testWorkOrderItemList"
    >
      <vxe-column type="seq" width="60" :title="'序号 Num'" align="right" />
      <vxe-column field="sampleDesc" :title="'样品描述\nSampleDesc'" />
      <vxe-column
        field="sampleLocation"
        :title="'取样部位(位置)\nSampleLocation'"
      />
      <vxe-column
        field="testItemsMethod"
        :title="'测试项目及测试方法\nTestItemsMethod'"
      />
      <vxe-column field="remark" :title="'备注\nremark'" />
    </vxe-table>
    <el-divider content-position="left">其他</el-divider>
    <my-flex-table ref="myFlexTable" :flex-obj="postForm.flexObj" />
    <p />
    <el-button
      v-loading="submitLoading"
      type="primary"
      size="small"
      plain
      @click="handleDownLoad()"
    >下载</el-button>
    <el-button
      type="primary"
      size="small"
      plain
      @click="handlePreview()"
    >预览</el-button>
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
        .finally(() => {})
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
      const title = '查看检测工作单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tempRoute.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看检测工作单'
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
</style>
