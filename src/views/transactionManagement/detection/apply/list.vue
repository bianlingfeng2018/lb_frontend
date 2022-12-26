<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="申请单编号">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入申请单编号"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="申请单位名称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入申请单位名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="收样状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="已收样" value="0" />
          <el-option key="1" label="未收样" value="1" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="合同评审状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="未支付" value="0" />
          <el-option key="1" label="已挂账" value="1" />
          <el-option key="2" label="已付部分" value="2" />
          <el-option key="3" label="已全付" value="3" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button v-loading="tableLoading" type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="待合同评审" name="1" />
        <el-tab-pane label="评审通过" name="2" />
        <el-tab-pane label="评审不通过" name="3" />
        <el-tab-pane label="已下单" name="4" />
      </el-tabs>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column prop="applicationName" label="申请单编号" min-width="120" />
      <el-table-column prop="applicationName" label="申请单位名称" min-width="120" />
      <el-table-column prop="reportTitle" label="申请日期" min-width="120" />
      <el-table-column prop="sameAsApplicant" label="收样状态" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed == 1">已收样</span>
          <span v-else-if="scope.row.confirmed == 2">未收样</span>
        </template>
      </el-table-column>
      <el-table-column prop="otherName" label="样品接收日期" min-width="120" />
      <el-table-column prop="otherAddress" label="要求完成日期" min-width="120" />
      <el-table-column prop="contact" label="合同评审状态" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed == 1">待评审</span>
          <span v-else-if="scope.row.confirmed == 2">评审通过</span>
          <span v-else-if="scope.row.confirmed == 3">评审不通过</span>
          <span v-else-if="scope.row.confirmed == 4">已下单</span>
        </template>
      </el-table-column>
      <el-table-column prop="tel" label="跟进人" min-width="120" />
      <el-table-column prop="fax" label="评审人" min-width="120" />
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button type="primary" plain size="small" @click="handleCheck(scope.row)">评审
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">创建工作单
          </el-button>
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

    <!--弹窗  评审-->
    <el-dialog :visible.sync="dialogVisible_check" title="评审">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="评审结果：" prop="email">
          <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="评审通过" value="0" />
            <el-option key="1" label="评审不通过" value="1" />
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
      columnParam: [],
      dialogVisible_check: false,
      creditInfo: [],
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
    handleCheck() {
      this.dialogVisible_check = true
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
