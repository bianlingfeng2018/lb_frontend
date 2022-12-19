<template>
  <div class="app-container ohn">
    <el-form :inline="true" :model="columnParam" class="demo-form-inline">
      <el-form-item label="检测名称">
        <el-input
          v-model="columnParam.testName"
          placeholder="请输入检测名称"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-loading="tableLoading"
          type="primary"
          @click="onSearch"
        >查询
        </el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="lb-flex lb-flex-bw">
      <span class="lh32">交易列表</span>
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate"
      >新建交易
      </el-button>
    </div>
    <el-table
      :v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      class="mt8"
    >
      <el-table-column align="center" type="index" label="#" min-width="80" />
      <el-table-column prop="testName" label="交易名称" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.testName }}
        </template>
      </el-table-column>
      <el-table-column prop="testDesc" label="交易描述" min-width="150" />
      <el-table-column prop="status" label="交易状态" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusTextFilter }}</span>
          <el-button
            type="text"
            size="small"
            @click="handleToSteps(scope.row)"
          >{{ scope.row.status | statusHandleTextFilter }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="client" label="客户名称" min-width="150" />
      <el-table-column prop="contact" label="联系方式" min-width="150" />
      <el-table-column prop="clientAccount" label="客户账户" min-width="150" />
      <el-table-column prop="owner" label="交易负责人" min-width="100" />
      <el-table-column prop="gmtCreate" label="创建时间" min-width="100" />
      <el-table-column prop="gmtModify" label="修改时间" min-width="100" />
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleShow(scope.row)"
          >查看
          </el-button>
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleShowAll(scope.row)"
          >进度
          </el-button>
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleEdit(scope.row)"
          >编辑
          </el-button>
          <!--          <el-button-->
          <!--            type="primary"-->
          <!--            size="small"-->
          <!--            plain-->
          <!--            @click="handleDelete(scope.row)"-->
          <!--          >删除-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr mt20"
      :current-page="pagination.currPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  filters: {
    statusHandleTextFilter(val) {
      if (val === "testTradeCreated") {
        // 检测交易创建完成  testTradeCreated
        return "创建报价单"
      } else if (val === "testQuotationCreated") {
        // 报价单创建完成 testQuotationCreated
        return "确认报价单"
      } else if (val === "testQuotationConfirmed") {
        // 报价单确认完成 testQuotationConfirmed
        return "创建申请单"
      } else if (val === "testApplicationFormCreated") {
        // 申请单创建完成 testApplicationFormCreated
        return "确认申请单"
      } else if (val === "testApplicationFormConfirmed") {
        // 申请单确认完成 testApplicationFormConfirmed.
        return "创建工作单"
      } else if (val === "testWorkOrderCreated") {
        // 工作单创建完成 testWorkOrderCreated
        return "确认工作单"
      } else if (val === "testWorkOrderConfirmed") {
        // 工作单确认完成 testWorkOrderConfirmed
        return "创建报告单"
      } else if (val === "testReportCreated") {
        return "编制报告单"
      } else if (val === "testReportConfirmed") {
        return "审核报告单"
      } else if (val === "testReportSecondConfirmed") {
        return "批准报告单"
      }
    },
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
        return "报告单已编制"
      } else if (val === "testReportSecondConfirmed") {
        return "报告单已审核"
      } else if (val === "testReportThirdConfirmed") {
        return "报告单已批准"
      }
    }
  },
  data() {
    return {
      columnParam: {
        testName: "",
        client: "",
        status: ""
      },
      tableLoading: false,
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
    handleToSteps(data) {
      if (data.status === "testTradeCreated") {
        this.$router.push({
          path: "/tm/detection/quotation/create",
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testQuotationCreated") {
        this.$router.push({
          path: "/tm/detection/quotation/audit/" + data.id,
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testQuotationConfirmed") {
        this.$router.push({
          path: "/tm/detection/apply/create",
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testApplicationFormCreated") {
        this.$router.push({
          path: "/tm/detection/apply/audit/" + data.id,
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testApplicationFormConfirmed") {
        this.$router.push({
          path: "/tm/detection/worksheet/create",
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testWorkOrderCreated") {
        this.$router.push({
          path: "/tm/detection/worksheet/audit/" + data.id,
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testWorkOrderConfirmed") {
        this.$router.push({
          path: "/tm/detection/report/create",
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testReportCreated") {
        this.$router.push({
          path: "/tm/detection/report/audit/" + data.id,
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testReportConfirmed") {
        this.$router.push({
          path: "/tm/detection/report/second-audit/" + data.id,
          query: { id: data.id, name: data.testName, status: data.status }
        })
      } else if (data.status === "testReportSecondConfirmed") {
        this.$router.push({
          path: "/tm/detection/report/third-audit/" + data.id,
          query: { id: data.id, name: data.testName, status: data.status }
        })
      }
    },
    handleSearchTestTradeList() {
      this.tableLoading = true
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize,
        testName: this.columnParam.testName,
        client: this.columnParam.client,
        status: this.columnParam.status
      }
      this.$store
        .dispatch("transaction/queryTestTradeList", queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
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
            .dispatch("transaction/deleteTestTrade", { testTradeId: row.id })
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
        path: "/tm/detection/create"
      })
    },
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/show/" + data.id
      })
    },
    handleShowAll(data) {
      this.$router.push({
        path: "/tm/detection/showall/" + data.id
      })
    },
    handleEdit(data) {
      this.$router.push({
        path: "/tm/detection/edit/" + data.id
      })
    },
    onSearch() {
      this.handleSearchTestTradeList()
    },
    resetForm() {
      this.columnParam.testName = ""
      this.columnParam.client = ""
      this.columnParam.status = ""
      this.handleSearchTestTradeList()
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
