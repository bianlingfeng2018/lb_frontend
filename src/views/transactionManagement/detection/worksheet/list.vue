<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <span class="lh32">工作单列表</span>
      <!--      <el-button-->
      <!--        type="primary"-->
      <!--        plain-->
      <!--        size="small"-->
      <!--        @click="handleCreate"-->
      <!--      >新建工作单-->
      <!--      </el-button>-->
    </div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      class="mt8"
    >
      <el-table-column align="center" type="index" label="#" min-width="80" />
      <el-table-column prop="workOrderNum" label="报告编号" min-width="120" />
      <el-table-column prop="issuer" label="开单人" min-width="120" />
      <el-table-column prop="busyStatus" label="加急情况" min-width="120" />
      <el-table-column prop="gmtCreate" label="开单时间" min-width="120" />
      <el-table-column prop="gmtOutput" label="出单时间" min-width="120" />
      <el-table-column prop="withdraw" label="是否退样" min-width="120" />
      <el-table-column prop="employee" label="负责人" min-width="120" />
      <el-table-column fixed="right" label="状态" min-width="90">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.confirmed"
            type="success"
            plain
            size="small"
            disabled
          >已发送
          </el-button>
          <el-button
            v-else
            type="primary"
            plain
            size="small"
            @click="handleAudit(scope.row)"
          >发送
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
    handleSearchTestTradeList() {
      this.tableLoading = true
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      this.$store
        .dispatch("transaction/queryTestWordOrderList", queryParam)
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
            .dispatch("transaction/deleteTestWorkOrder", { testWorkOrderId: row.id })
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
        path: "/tm/detection/worksheet/create"
      })
    },
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/worksheet/show/" + data.testTradeId
      })
    },
    handleEdit(data) {
      this.$router.push({
        path: "/tm/detection/worksheet/edit/" + data.testTradeId
      })
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/worksheet/audit/" + data.testTradeId
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
