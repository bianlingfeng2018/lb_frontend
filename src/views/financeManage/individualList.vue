<template>
  <!--个人账款核销-->
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="交易名称">
        <!--        <el-input-->
        <!--          v-model="columnParam.tradeId"-->
        <!--          placeholder="请输入交易名称"-->
        <!--          style="width: 240px"-->
        <!--          @keydown.enter.native="onSearch"-->
        <!--        />-->
        <el-autocomplete
          v-model="columnParam.tradeName"
          :fetch-suggestions="queryClientTrade"
          placeholder="请输入交易名称"
          style="width: 240px"
          clearable
          @select="onSelectTrade"
        />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-autocomplete
          v-model="columnParam.clientName"
          :fetch-suggestions="queryClientCom"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          clearable
          @select="onSelect"
        />
      </el-form-item>
      <el-form-item label="核销状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px" clearable>
          <el-option
            v-for="(item,i) in statusList"
            :key="i"
            :label="item.name"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="'上传水单日期'">
        <el-date-picker
          v-model="uploadTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'实际收款日期'">
        <el-date-picker
          v-model="truelyTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-loading="tableLoading"
          type="primary"
          @click="onSearch"
        >查询
        </el-button>
        <el-button
          v-loading="tableLoading"
          type="primary"
          @click="onExport"
        >导出
        </el-button>
      </el-form-item>
    </el-form>
    <div class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate"
      >批量核销
      </el-button>
    </div>
    <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" min-width="80" :selectable="canSelect" />
      <el-table-column prop="tradeId" label="报价单编号" min-width="150" />
      <el-table-column prop="tradeName" label="交易名称" min-width="150" />
      <el-table-column prop="clientName" label="客户中文名称" min-width="150" />
      <el-table-column prop="orderAmt" label="交易金额" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.orderAmt | changePrice2money }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="incomeAmt" label="回款金额" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.incomeAmt | changePrice2money }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadTime" label="上传水单日期" min-width="150" />
      <el-table-column prop="incomeTime" label="实际收款日期" min-width="150" />
      <el-table-column prop="operTime" label="核销日期" min-width="150" />
      <el-table-column prop="status" label="状态" min-width="150">
        <template v-slot="scope">
          <span v-if="scope.row.status==0">未核销</span>
          <span v-if="scope.row.status==1">已核销</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row,1)">查看
          </el-button>
          <el-button v-if="scope.row.status == 0" type="primary" plain size="small" @click="handleShow(scope.row,2)">核销
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

    <!--核销弹窗-->
    <el-dialog :visible.sync="dialogVisible_check" title="核销">
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="客户名称" label-width="150px">{{ creditInfo.clientName }}</el-form-item>
        <el-form-item label="报价单编号" label-width="150px">{{ creditInfo.tradeId }}</el-form-item>
        <el-form-item label="回款金额" prop="incomeAmt" label-width="150px">
          <el-input v-model="inputIncomeAmt" placeholder="输入回款金额" width="120" />
        </el-form-item>
        <el-form-item label="水单" label-width="150px" prop="username">
          <el-input v-model="creditInfo.billPath" width="120" />
        </el-form-item>
        <el-form-item label="实际收款日期" label-width="150px" prop="username">
          <el-date-picker
            v-model="columnParam.lastTraceDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="width: 120px"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认已收款</el-button>
      </div>
    </el-dialog>

    <!--查看弹窗-->
    <el-dialog :visible.sync="dialogVisible_look" title="查看">
      <el-form :model="creditInfo" label-width="120px" label-position="left">
        <el-form-item label="客户名称">{{ creditInfo.clientName }}</el-form-item>
        <el-form-item label="报价单编号">{{ creditInfo.tradeId }}</el-form-item>
        <el-form-item label="回款金额" prop="username">{{ creditInfo.incomeAmt |changePrice2money }}</el-form-item>
        <el-form-item label="水单" prop="username">
          <img :src="creditInfo.billPath">
        </el-form-item>
      </el-form>
      <div>
        <el-button type="danger" size="small" plain @click="dialogVisible_look = false">关闭</el-button>
      </div>
    </el-dialog>

    <!--弹窗  批量核销-->
    <el-dialog :visible.sync="dialogVisible_checkall" title="批量核销">
      <span>是否确认所选报价单收款金额无误？</span>
      <el-form label-width="80px" label-position="left">
        <el-form-item label="实际收款日期" prop="username" label-width="120px">
          <el-date-picker
            v-model="batchTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="width: 240px"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible_checkall = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfoBatch">确认已收款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPersonalBillList, updatePersonalBillBatch, updatePersonalBill } from "@/api/bill"
import { deepClone } from "@/utils"
import { changePrice2money } from "@/utils/simple-util"
import { getClientByName } from "@/api/clientCompany"
import { getQuotationByName } from "@/api/organizations"
export default {
  name: "IndividualList",
  filters: {
    changePrice2money
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      dialogVisible_check: false,
      dialogVisible_checkall: false,
      dialogVisible_look: false,
      creditInfo: [],
      statusList: [{ key: 0, name: "未核销" }, { key: 1, name: "已核销" }],
      uploadTime: [],
      truelyTime: [],
      selectData: [],
      inputIncomeAmt: 0,
      batchTime: '',
      // 搜索条件
      columnParam: {
        tradeId: "",
        clientId: "",
        status: "",
        uploadStartTime: "",
        uploadEndTime: "",
        lastTraceDate: "",
        startTime: "",
        endTime: ""
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
    // 获取列表数据
    getListDate() {
      this.tableData = []
      this.tableLoading = true
      const colParam = deepClone(this.columnParam)
      colParam.uploadStartTime = this.uploadTime[0]
      colParam.uploadEndTime = this.uploadTime[1]
      colParam.startTime = this.truelyTime[0]
      colParam.endTime = this.truelyTime[1]
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      getPersonalBillList(Object.assign({}, queryParam, colParam))
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
        .catch(() => {
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    queryClientCom(s, cb) {
      this.columnParam.clientId = ''
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
      this.columnParam.clientId = item.clientId
    },
    canSelect(row, index) {
      return row.status == 0
    },
    queryClientTrade(s, cb) {
      this.columnParam.tradeId = ''
      const params = {
        name: s
      }
      getQuotationByName(params).then(res => {
        if (res.status == 200) {
          this.restaurantsTrade = res.data
          const cliets = []
          this.restaurantsTrade.forEach(trade => {
            var mer = {}
            mer.value = trade.tradeName
            mer.tradeId = trade.tradeId
            cliets.push(mer)
          })
          cb(cliets)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    onSelectTrade(item) {
      this.columnParam.tradeId = item.tradeId
      this.columnParam.tradeName = item.value
    },
    // 核销
    setCreditInfo() {
      console.log(this.creditInfo)
      const param = deepClone(this.creditInfo)
      param.status = 1
      param.incomeAmt = this.inputIncomeAmt * 100
      updatePersonalBill(param).then((res) => {
        const { data, status } = res
        if (status == 200) {
          this.dialogVisible_check = false
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `操作成功`,
            type: 'success'
          })
          this.getListDate()
        }
      }).catch((e) => {
        this.$message.error(e)
      })
        .finally(() => {
          this.dialogVisible_check = false
        })
    },

    // 核销
    setCreditInfoBatch() {
      const sendArray = []
      this.selectData.forEach(data => {
        const sendData = {
          id: data.id,
          clientId: data.clientId,
          incomeTime: this.batchTime,
          status: 1,
          incomeAmt: data.orderAmt - data.incomeAmt
        }
        sendArray.push(sendData)
      })
      const param = {
        list: sendArray
      }
      updatePersonalBillBatch(param).then((res) => {
        const { data, status } = res
        if (status == 200) {
          this.dialogVisible_checkall = false
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `操作成功`,
            type: 'success'
          })
          this.getListDate()
        }
      }).catch((e) => {
        this.$message.error(e)
      })
        .finally(() => {
          this.dialogVisible_checkall = false
        })
    },
    handleSelectionChange(data) {
      console.log(data)
      this.selectData = data
    },
    handleCreate() {
      this.dialogVisible_checkall = true
    },
    handleShow(row, state) {
      this.dialogVisible_look = state == 1
      this.dialogVisible_check = state == 2
      this.creditInfo = row
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
      console.log('search')
      this.getListDate()
    },
    // 导出
    onExport() {
      // const colParam = deepClone(this.columnParam)
      // const range = colParam.lastTraceDate
      // if (range && range.length > 1) {
      //   colParam.startDate = range[0]
      //   colParam.endDate = range[1]
      // }
      // colParam.lastTraceDate = null
      // this.tableLoading = true
      // const fileName = 'export-all.xlsx'
      // const url = "/api/cli-all-export"
      // const urlWithParam = appendParamsToUrl(url, colParam)
      // this.$router.push({
      //   path: "/clm/cli-com-export",
      //   query: Object.assign({}, colParam, { url: urlWithParam, fileName: fileName })
      // })
    }

  }
}
</script>
