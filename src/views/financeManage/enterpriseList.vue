<template>
  <!--企业应收账管理-->
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="客户中文名称">
        <el-input
          v-model="columnParam.client"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item :label="'合同结束日期'">
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

    <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column align="center" type="selection" min-width="80"/>
      <el-table-column prop="clientId" label="客户编号" min-width="150"/>
      <el-table-column prop="name" label="客户中文名称" min-width="150"/>
      <el-table-column prop="creditLimit" label="授信额度" min-width="150">
        <template slot-scope="scope">
          <span class="rflex">{{scope.row.creditLimit | changePrice2money}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="balanceAmt" label="可用额度" min-width="150">
        <template slot-scope="scope">
          <span class="rflex">{{scope.row.balanceAmt | changePrice2money}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unsettledAmt" label="未核销金额" min-width="150">
        <template slot-scope="scope">
          <span class="rflex">{{scope.row.unsettledAmt | changePrice2money}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unsettledAmt" label="剩余收款金额" min-width="150">
        <template slot-scope="scope">
          <span class="rflex">{{scope.row.unsettledAmt | changePrice2money}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope)">设置授信额度
          </el-button>
          <el-button type="primary" plain size="small" @click="handleShow(scope)">应收账明细
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
      @current-change="handleCurrentChange"/>

    <el-dialog :visible.sync="dialogVisible" title="设置授信额度">
      <el-form :model="creditInfo" label-width="120px" label-position="left">
        <el-form-item label="客户名称">{{ creditInfo.name }}</el-form-item>
        <el-form-item label="未核销金额">{{ creditInfo.unsettledAmt | changePrice2money}}</el-form-item>
        <el-form-item label="授信额度" prop="creditLimit">
          <el-input v-model="creditInfo.creditLimit" placeholder="输入授信额度" width="120"/>
          <span>注意：授信额度不能小于未核销金额</span>
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
  import { changePrice2money } from "@/utils/simple-util"
  import { setCreditLimit, getBalanceList } from "@/api/balance"
  import { deepClone } from "../../utils"

  export default {
    filters: {
      changePrice2money
    },
    name: "EnterpriseList",
    data() {
      return {
        tableLoading: false,
        tableData: [],
        dialogVisible: false,
        creditInfo: {
          clientId: '',
          clientName: '',
          unsettledAmt: '',
          creditLimit: '',//授信额度
          requestId: Math.random().toString(24)
        },
        // 搜索条件
        columnParam: {
          client: "",
          startTime: "",
          endTime: "",
          lastTraceDate: []
        },
        // 分页
        pagination: {
          currPage: 1,
          pageSize: 10,
          pageTotal: 0
        }
      }
    },
    created() {
      this.getListDate()
  },
  methods: {
    getListDate() {
      this.tableLoading = true
      const queryParam = {
        requestId: Math.random().toString(24),
        page: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const colParam = deepClone(this.columnParam)
      const range = colParam.lastTraceDate
      if (range && range.length > 1) {
        colParam.startTime = range[0]
        colParam.endTime = range[1]
      }
      colParam.lastTraceDate = null
      getBalanceList(Object.assign({}, queryParam, colParam))
        .then((res) => {
          console.log(res)
          const { data, status } = res
          if (status == 200) {
            this.tableData = data.dataList
            this.pagination.currPage = data.pageNum
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
    // 设置授信额度
    async setCreditInfo() {
      this.creditInfo.creditLimit = this.creditInfo.creditLimit*100
      await setCreditLimit(this.creditInfo)
        .then((res) => {
          const { data, status } = res
          if (status == 200) {
            this.dialogVisible = false
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
          this.dialogVisible = false
        })
    },
    handleShow(scope) {
      this.dialogVisible = true
      this.creditInfo = deepClone(scope.row)
      this.creditInfo.creditLimit = this.creditInfo.creditLimit/100
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getListDate()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getListDate()
    },
    // 搜索
    onSearch() {
      this.getListDate()
    }
  }
}
</script>

<style>

</style>
