<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="报告单编号">
        <el-input v-model="columnParam.cnameOrAbbr" placeholder="请输入报告单编号" style="width: 240px"
          @keydown.enter.native="onSearch" />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-input v-model="columnParam.cnameOrAbbr" placeholder="请输入客户中文名称" style="width: 240px"
          @keydown.enter.native="onSearch" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="tableLoading" type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="activeIndex" @tab-click="handleClick" style="width: 100%">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="待审核" name="1" />
        <el-tab-pane label="审核通过" name="2" />
        <el-tab-pane label="审核不通过" name="3" />
      </el-tabs>
      <el-button type="primary" plain size="small" style="position: absolute;right:10px;top:5px;"
        @click="handleCreate">审核
      </el-button>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="reportNum" label="报告编号" min-width="120" />
      <el-table-column prop="client" label="客户名称" min-width="120" />
      <el-table-column prop="address" label="测试人员" min-width="120" />
      <el-table-column prop="testStartDate" label="要求日期" min-width="120" />
      <el-table-column prop="testEndDate" label="报告日期" min-width="120" />
      <el-table-column fixed="right" label="状态" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed == 1">待审核</span>
          <span v-else-if="scope.row.confirmed == 2">审核通过</span>
          <span v-else-if="scope.row.confirmed == 3">审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr mt20" :current-page="pagination.currPage" :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.pageTotal"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!--弹窗  审核-->
    <el-dialog :visible.sync="dialogVisible_check" title="审核">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="审核结果：" prop="email">
          <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="0" />
            <el-option key="1" label="审核不通过" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因：" prop="username">
          <el-input v-model="creditInfo.username" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  filters: {
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
        return "报告单确认完成"
      }
    }
  },
  data() {
    return {
      creditInfo: [],
      columnParam: [],
      tableLoading: false,
      dialogVisible_check: false,
      tableData: [],
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  created() {
    this.handleSearchTestTradeList()
  },
  methods: {
    handleSearchTestTradeList() {
      this.tableLoading = true
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      this.$store
        .dispatch("transaction/queryTestReportList", queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            console.log(data)
            this.tableData = data.list
            this.pagination.currPage = data.pageNum
            this.pagination.pageTotal = data.total
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("transaction/deleteTestReport", { testReportId: row.id })
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$message({
                  message: data.msg,
                  type: "success"
                })
                this.handleSearchTestTradeList()
              } else {
                this.$message.error(errorMessage)
              }
            })
            .catch(() => {
            })
            .finally(() => {
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    handleCreate() {
      this.$router.push({
        path: "/tm/detection/report/create"
      })
    },
    //查看详情
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/report/show/" + data.testTradeId
      })
    },
    //审核
    handleEdit(data) {
      this.dialogVisible_check = true
      // this.$router.push({
      //   path: "/tm/detection/report/edit/" + data.testTradeId
      // })
    },
    handleAudit1(data) {
      this.$router.push({
        path: "/tm/detection/report/audit/" + data.testTradeId
      })
    },
    handleAudit2(data) {
      this.$router.push({
        path: "/tm/detection/report/second-audit/" + data.testTradeId
      })
    },
    handleAudit3(data) {
      this.$router.push({
        path: "/tm/detection/report/third-audit/" + data.testTradeId
      })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.handleSearchTestTradeList()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.handleSearchTestTradeList()
    }
  }
}
</script>
