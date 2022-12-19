<template>
  <div class="app-container ohn">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测交易信息</div>
    <el-divider content-position="left">基本信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border>
      <el-descriptions-item>
        <template slot="label">{{ "交易名称\nTest Name" }}</template>
        {{ postForm.testName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "交易状态\nState" }}</template>
        {{ postForm.status | statusTextFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户名称\nClient" }}</template>
        {{ postForm.client }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联系方式\nTel" }}</template>
        {{ postForm.contact }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户账户\nAccount" }}</template>
        {{ postForm.clientAccount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联系销售\nSalesman" }}</template>
        {{ postForm.owner }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "创建时间\nCreate Time" }}</template>
        {{ postForm.gmtCreate | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "修改时间\nModify Time" }}</template>
        {{ postForm.gmtModify | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "交易描述\nTest Desc" }}</template>
        {{ postForm.testDesc }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { queryTestTradeDetail } from "@/api/transaction"
import { timeFormatFilter } from "@/utils/simple-util"

const defaultForm = {
  testName: "",
  testDesc: "",
  client: "",
  contact: "",
  clientAccount: ""
}

export default {
  filters: {
    timeFormatFilter,
    statusTextFilter(val) {
      if (val === "testTradeCreated") {
        // 检测交易创建完成  testTradeCreated
        return "检测交易创建完成"
      } else if (val === "testQuotationCreated") {
        // 报价单创建完成 testQuotationCreated
        return "报价单创建完成"
      } else if (val === "testQuotationConfirmed") {
        // 报价单确认完成 testQuotationConfirmed
        return "报价单确认完成"
      } else if (val === "testApplicationFormCreated") {
        // 申请单创建完成 testApplicationFormCreated
        return "申请单创建完成"
      } else if (val === "testApplicationFormConfirmed") {
        // 申请单确认完成 testApplicationFormConfirmed.
        return "申请单确认完成"
      } else if (val === "testWorkOrderCreated") {
        // 工作单创建完成 testWorkOrderCreated
        return "工作单创建完成"
      } else if (val === "testWorkOrderConfirmed") {
        // 工作单确认完成 testWorkOrderConfirmed
        return "工作单确认完成"
      } else if (val === "testReportCreated") {
        // 报告单创建完成
        return "报告单创建完成"
      } else if (val === "testReportConfirmed") {
        // 报告单确认完成
        return "报告单审核（1）完成"
      } else if (val === "testReportSecondConfirmed") {
        // 报告单确认完成
        return "报告单审核（2）完成"
      }
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm)
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testTrade

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '查看检测交易'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看检测交易'
      document.title = `${title} - ${this.postForm.id}`
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/list"
      })
    }
  }
}
</script>
<style scoped>
/deep/ .el-descriptions-item__label {
  white-space: pre-line;
}
</style>
