<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <span class="lh32">报价单列表</span>
      <!--      <el-button-->
      <!--        type="primary"-->
      <!--        plain-->
      <!--        size="small"-->
      <!--        @click="handleCreate"-->
      <!--      >新建报价单-->
      <!--      </el-button>-->
    </div>
    <el-table
      :v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      class="mt8"
    >
      <el-table-column align="center" type="index" label="#" min-width="80" />
      <el-table-column prop="quotationNum" label="报价单编号" min-width="120" />
      <el-table-column prop="client" label="客户" min-width="120" />
      <el-table-column prop="attn" label="联络人" min-width="120" />
      <el-table-column prop="telClient" label="客户电话" min-width="120" />
      <el-table-column prop="faxClient" label="客户传真" min-width="120" />
      <el-table-column prop="email" label="客户邮箱" min-width="120" />
      <el-table-column prop="invoiceTitle" label="发票抬头" min-width="120" />
      <el-table-column prop="fromCom" label="公司" min-width="120" />
      <el-table-column prop="telCom" label="公司电话" min-width="120" />
      <el-table-column prop="faxCom" label="公司传真" min-width="120" />
      <el-table-column prop="gmtCreate" label="报价日期" min-width="120" />
      <el-table-column prop="reportType" label="报告类型" min-width="120" />
      <el-table-column prop="deliveryAddress" label="报告邮寄地址" min-width="120" />
      <el-table-column prop="testPeroid" label="测试周期" min-width="100" />
      <el-table-column prop="reportFee" label="报告费" min-width="100" />
      <el-table-column prop="courierFee" label="快递费" min-width="100" />
      <el-table-column prop="taxFee" label="税率" min-width="100" />
      <el-table-column prop="discount" label="折扣" min-width="100" />
      <el-table-column prop="totalCost" label="总费用" min-width="100" />
      <el-table-column prop="bankAccountName" label="户名" min-width="120" />
      <el-table-column prop="bankAccount" label="账号" min-width="120" />
      <el-table-column prop="bankName" label="银行名称" min-width="120" />
      <!--      <el-table-column prop="clientComSignature" label="公司签名" min-width="120" />-->
      <!--      <el-table-column prop="libiaoRepresentativeSignature" label="立标代表签名" min-width="120" />-->
      <!--      <el-table-column prop="clientComChop" label="盖章" min-width="120" />-->
      <!--      <el-table-column prop="audit" label="审核人员签名" min-width="120" />-->
      <el-table-column prop="clientSignatureDate" label="客户签名日期" min-width="120" />
      <el-table-column prop="libiaoSignatureDate" label="立标签名日期" min-width="120" />
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
        .dispatch("transaction/queryTestQuotationList", queryParam)
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
            .dispatch("transaction/deleteTestQuotation", { testQuotationId: row.id })
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
        path: "/tm/detection/quotation/create"
      })
    },
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/quotation/show/" + data.testTradeId
      })
    },
    handleEdit(data) {
      this.$router.push({
        path: "/tm/detection/quotation/edit/" + data.testTradeId
      })
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/quotation/audit/" + data.testTradeId
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
