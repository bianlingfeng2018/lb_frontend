<template>
  <div class="app-container ohn">
    <div class="ohn">
      <span class="fl pointer" @click="goBack()">
        <i class="el-icon-arrow-left" />
        交易进度
      </span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="检测交易单" name="detection">
        <DetectionDetail />
      </el-tab-pane>
      <el-tab-pane label="检测报价单" name="quotation">
        <QuotationDetail />
      </el-tab-pane>
      <el-tab-pane label="检测申请单" name="apply">
        <ApplyDetail />
      </el-tab-pane>
      <el-tab-pane label="检测工作单" name="worksheet">
        <WorksheetDetail />
      </el-tab-pane>
      <el-tab-pane label="检测报告单" name="report">
        <ReportDetail />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DetectionDetail from "./components/DetectionDescription.vue"
import QuotationDetail from "./quotation/components/QuotationDescription.vue"
import ApplyDetail from "./apply/components/ApplyDescription"
import WorksheetDetail from "./worksheet/components/WorksheetDescription"
import ReportDetail from "./report/components/ReportDescription"
export default {
  components: {
    DetectionDetail,
    QuotationDetail,
    ApplyDetail,
    WorksheetDetail,
    ReportDetail
  },
  data() {
    return {
      activeName: "detection",
      testTrade: {
        id: ""
      },
      testTradeDetail: {}
    }
  },
  created() {
    this.testTrade.id = this.$route.params.id
    this.handleSearchTestTradeDetail()
  },
  mounted() {},
  methods: {
    handleSearchTestTradeDetail() {
      this.tableLoading = true
      this.$store
        .dispatch("transaction/queryTestTradeDetail", {
          testTradeId: this.testTrade.id
        })
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.testTradeDetail = data || {}
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoading = false
        })
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/list"
      })
    }
  }
}
</script>
