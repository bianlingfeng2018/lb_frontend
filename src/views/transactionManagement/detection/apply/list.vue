<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <span class="lh32">申请单列表</span>
      <!--      <el-button-->
      <!--        type="primary"-->
      <!--        plain-->
      <!--        size="small"-->
      <!--        @click="handleCreate"-->
      <!--      >新建申请单-->
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
      <el-table-column prop="applicationName" label="申请单位名称" min-width="120" />
      <el-table-column prop="applicationAddress" label="申请单位地址" min-width="120" />
      <el-table-column prop="reportTitle" label="报告抬头" min-width="120" />
      <el-table-column prop="sameAsApplicant" label="同申请方" min-width="120" />
      <el-table-column prop="otherName" label="其他名称" min-width="120" />
      <el-table-column prop="otherAddress" label="其他地址" min-width="120" />
      <el-table-column prop="contact" label="联系人" min-width="120" />
      <el-table-column prop="tel" label="电话" min-width="120" />
      <el-table-column prop="fax" label="传真" min-width="120" />
      <el-table-column prop="email" label="电邮" min-width="120" />
      <el-table-column prop="deliveredTo" label="报告邮寄地址" min-width="120" />
      <el-table-column prop="reportType" label="报告类型" min-width="120" />
      <el-table-column prop="payer" label="付款方" min-width="120" />
      <el-table-column prop="invoiceTitle" label="发票抬头" min-width="120" />
      <el-table-column fixed="right" label="状态">
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
          <el-dropdown>
            <el-button type="primary" size="small" plain>
              更多
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleAssignCS(scope.row)">分配客服</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
        .dispatch("transaction/queryTestApplicationFormList", queryParam)
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
            .dispatch("transaction/deleteTestApply", { testApplyId: row.id })
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
        path: "/tm/detection/apply/create"
      })
    },
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/apply/show/" + data.testTradeId
      })
    },
    handleEdit(data) {
      this.$router.push({
        path: "/tm/detection/apply/edit/" + data.testTradeId
      })
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/apply/audit/" + data.testTradeId
      })
    },
    handleAssignCS(data) {
      console.log('HandleAssignCS')
      this.$router.push({
        path: "/tm/detection/as-cs",
        query: { testTradeId: data.testTradeId }
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
<style lang="scss" scoped>
.el-dropdown {
  margin-left: 10px;
}
</style>
