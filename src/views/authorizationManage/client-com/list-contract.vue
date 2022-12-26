<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="客户中文名称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="合同结束日期">
        <el-date-picker
          v-model="columnParam.lastTraceDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="tableLoading" type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="待审核" name="1" />
        <el-tab-pane label="生效中" name="2" />
        <el-tab-pane label="审核不通过" name="3" />
        <el-tab-pane label="已失效" name="4" />
      </el-tabs>
      <el-button
        type="primary"
        plain
        size="small"
        style="position: absolute;right:10px;top:5px;"
        @click="handleCreate"
      >添加合同
      </el-button>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column prop="applicationName" label="客户编号" min-width="120" />
      <el-table-column prop="applicationName" label="客户中文名称" min-width="120" />
      <el-table-column prop="reportTitle" label="合同开始日期" min-width="120" />
      <el-table-column prop="reportTitle" label="合同结束日期" min-width="120" />
      <el-table-column prop="sameAsApplicant" label="合同状态" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed == 1">待审核</span>
          <span v-else-if="scope.row.confirmed == 2">生效中</span>
          <span v-else-if="scope.row.confirmed == 3">审核不通过</span>
          <span v-else-if="scope.row.confirmed == 42">已失效</span>
        </template>
      </el-table-column>
      <el-table-column prop="otherName" label="可用额度" min-width="120" />
      <el-table-column prop="otherAddress" label="未核销金额" min-width="120" />
      <el-table-column prop="tel" label="结算周期" min-width="120" />
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button type="primary" plain size="small" @click="handleCheck(scope.row)">审核
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

    <!--弹窗  添加//编辑客户合同-->
    <el-dialog :visible.sync="add_dialogVisible" :title="add_dialogType==='new'?'添加客户合同':'编辑客户合同'">
      <el-form ref="auditRulesForm" :model="add_creditInfo" :rules="auditRules" label-width="140px" label-position="left">
        <el-form-item label="客户名称：" prop="username">
          <el-input v-model="add_creditInfo.name" placeholder="" />
        </el-form-item>
        <el-form-item label="合同有效期：" prop="username">
          <el-date-picker
            v-model="columnParam.lastTraceDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="是否挂账：" prop="username">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="结算周期(天)：" prop="username">
          <el-input v-model="add_creditInfo.name" placeholder="" />
        </el-form-item>
        <el-form-item label="合同附件：" prop="username" />
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="add_dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  查看//审核客户合同-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='new'?'查看客户合同':'审核客户合同'">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="140px" label-position="left">
        <el-form-item label="客户名称：" prop="username">宁波至朗科技有限公司</el-form-item>
        <el-form-item label="合同有效期：" prop="username">2021-12-5 至 2022-12-3</el-form-item>
        <el-form-item label="是否挂账：" prop="username">是</el-form-item>
        <el-form-item label="结算周期：" prop="username">30</el-form-item>
        <el-form-item label="合同附件：" prop="username" />
        <el-form-item v-if="dialogType==='edit'" label="审核结果：" prop="email">
          <el-select v-model="creditInfo.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="0" />
            <el-option key="1" label="审核不通过" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogType==='edit'" label="原因：" prop="username">
          <el-input v-model="creditInfo.username" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnParam: [],
      add_dialogType: 'new',
      add_dialogVisible: false,
      add_creditInfo: [],
      radio: '1',
      dialogType: 'new',
      dialogVisible: false,
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
    // 审核合同
    handleCheck() {
      this.dialogType = 'edit'
      this.dialogVisible = true
    },

    // 添加合同
    handleCreate() {
      this.add_dialogType = 'new'
      this.add_dialogVisible = true
    },
    // 查看合同
    handleShow(data) {
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    // 编辑合同
    handleEdit(data) {
      this.add_dialogType = 'edit'
      this.add_dialogVisible = true
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/apply/audit/" + data.testTradeId
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
