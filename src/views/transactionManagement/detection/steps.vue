<template>
  <div class="app-container ohn">
    <el-steps :active="curSteps(testTrade.status)" finish-status="success">
      <el-step title="确认报价单" icon="el-icon-edit" />
      <el-step title="确认申请单" icon="el-icon-upload" />
      <el-step title="确认工单" icon="el-icon-picture" />
      <el-step title="报告生成" icon="el-icon-picture" />
    </el-steps>
    <!-- <QuotationConfirm v-show="testTrade.status == 'testQuotationCreated'" /> -->
    <QuotationConfirm />
    <ApplyConfirm v-show="testTrade.status == 'testApplicationFormCreated'" />
    <WorksheetConfirm v-show="testTrade.status == 'testWorkOrderCreated'" />
    <ReportConfirm v-show="testTrade.status == 'testWorkOrderConfirmed'" />
    <el-button style="margin-top: 12px" @click="next">确认</el-button>
  </div>
</template>

<script>
import QuotationConfirm from "./quotation/components/QuotationAudit.vue"
import ApplyConfirm from "./apply/components/ApplyAudit"
import WorksheetConfirm from "./worksheet/components/WorksheetAudit"
import ReportConfirm from "./report/components/ThirdReportAudit"
export default {
  components: {
    QuotationConfirm,
    ApplyConfirm,
    WorksheetConfirm,
    ReportConfirm
  },
  data() {
    return {
      active: 0,
      testTrade: {
        name: "",
        id: "",
        status: ""
      }
    }
  },
  created() {
    this.testTrade.name = this.$route.query.name
    this.testTrade.id = this.$route.query.id
    this.testTrade.status = this.$route.query.status
  },
  methods: {
    curSteps(val) {
      if (val === "testQuotationCreated") {
        // 报价单创建完成
        return 0
      } else if (val === "testQuotationConfirmed") {
        // 报价单确认完成
        return 0
      } else if (val === "testApplicationFormCreated") {
        // 申请单创建完成
        return 1
      } else if (val === "testApplicationFormConfirmed") {
        // 申请单确认完成
        return 1
      } else if (val === "testWorkOrderCreated") {
        // 工作单创建完成
        return 2
      } else if (val === "testWorkOrderConfirmed") {
        // 工作单确认完成
        return 3
      }
    },
    next() {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>
