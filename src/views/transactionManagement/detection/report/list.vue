<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="报告单编号">
        <el-input
          v-model="columnParam.reportNum"
          placeholder="请输入报告单编号"
          clearable
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-autocomplete
          v-model="columnParam.client"
          :fetch-suggestions="queryClientCom"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          clearable
          @select="onSelect"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">

      <el-tabs v-model="columnParam.reportStatus" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="-1" />
        <el-tab-pane label="待审核" name="0" />
        <el-tab-pane label="审核通过" name="1" />
        <el-tab-pane label="审核不通过" name="2" />
      </el-tabs>

      <el-button
        type="primary"
        plain
        size="small"
        style="position: absolute;right:10px;top:5px;"
        @click="handleShow"
      >审核
      </el-button>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="reportNum" label="报告单编号" min-width="120" />
      <el-table-column prop="client" label="客户名称" min-width="120" />
      <el-table-column prop="tester" label="测试人员" min-width="120" />
      <el-table-column prop="planDate" label="要求日期" min-width="120" />
      <el-table-column prop="reportDate" label="报告日期" min-width="120" />
      <el-table-column prop="reportStatus" label="状态" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.reportStatus == 0">待审核</span>
          <span v-else-if="scope.row.reportStatus == 1">审核通过</span>
          <span v-else-if="scope.row.reportStatus == 2">审核不通过</span>
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

    <!--弹窗  审核-->
    <el-dialog :visible.sync="dialogVisible_check" title="审核">
      <el-form
        ref="creditInfo"
        :model="creditInfo"
        status-icon
        :rules="auditRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="审核结果：" prop="checkResult">
          <el-select v-model="creditInfo.checkResult" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="1" />
            <el-option key="1" label="审核不通过" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="原因："
          prop="reason"
          :rules="creditInfo.checkResult == '0'?auditRules.reason:[{required:false}]"
        >
          <el-input v-model="creditInfo.reason" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="handleCheckConfirm('creditInfo')">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from "../../../../utils"
import {
  getReportList
} from "@/api/worksheet"
import { getClientByName } from "@/api/clientCompany"
export default {

  data() {
    return {
      creditInfo: {
        checkResult: '',
        quotationNum: '',
        reason: '',
        requestId: Math.random().toString(24)
      },
      auditRules: {
        checkResult: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
        reason: [{ required: true, message: '请输入审核不通过原因', trigger: 'blur' }]
      },
      columnParam: {
        reportStatus: '-1'// 默认全部
      },
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
        requestId: Math.random().toString(24),
        page: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const colParam = deepClone(this.columnParam)
      if (this.columnParam.reportStatus == '-1') {
        colParam.reportStatus = ""
      }
      getReportList(Object.assign({}, queryParam, colParam))
        .then((res) => {
          console.log(res)
          this.tableLoading = false
          const { data, status } = res
          if (status == 200) {
            this.tableData = data.dataList
            this.pagination.pageTotal = data.total
          } else {
            this.$message.error(data.errMsg)
          }
        })
        .catch(() => {
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    queryClientCom(s, cb) {
      this.columnParam.client = ''
      const params = {
        clientName: s
      }
      getClientByName(params).then(res => {
        if (res.status == 200) {
          this.restaurants = res.data.dataList
          const cliets = []
          this.restaurants.forEach(client => {
            var mer = {}
            mer.value = client.name
            mer.clientId = client.clientNum
            cliets.push(mer)
          })
          cb(cliets)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    onSelect(item) {
      this.columnParam.client = item.clientId
    },
    handleClick(tab) {
      this.columnParam.reportStatus = tab.name
      this.pagination.currPage = 1
      this.handleSearchTestTradeList()
    },
    // 查看详情
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/report/show/" + data.id
      })
    },
    // 审核
    handleEdit(data) {
      this.dialogVisible_check = true
      this.creditInfo = deepClone(row)
    },
    // 审核
    async handleCheckConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getQuotationExamine(this.creditInfo)
            .then((res) => {
              const { data, status } = res
              if (status == 200) {
                this.dialogVisible_check = false
                this.$notify({
                  title: '成功',
                  dangerouslyUseHTMLString: true,
                  message: `操作成功`,
                  type: 'success'
                })
              } else {
                this.$message.error(res.errMsg)
              }
            })
            .catch((e) => {
              this.$message.error(e)
            })
            .finally(() => {
              this.dialogVisible_check = false
            })
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.handleSearchTestTradeList()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.handleSearchTestTradeList()
    },
    onSearch() {
      this.handleSearchTestTradeList()
    }
  }
}
</script>
