<template>
  <div class="app-container ohn">
    <div>
      <el-radio-group v-model="radio">

        <el-radio-button label="消费账" @click.native="findPage($event,'消费账')" />
        <el-radio-button label="收款账" @click.native="findPage($event,'收款账')" />
      </el-radio-group>
    </div>
    <!--消费账-->
    <el-form
      v-if="radio=='消费账'"
      ref="searchForm"
      :inline="true"
      :model="columnParam"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="客户名称">{{ routeData.name }}</el-form-item>

      <br>
      <el-form-item label="交易名称">
        <el-autocomplete
          v-model="columnParam.tradeName"
          :fetch-suggestions="queryClientTrade"
          placeholder="请输入交易名称"
          style="width: 240px"
          clearable
          @select="onSelectTrade"
        />
      </el-form-item>
      <el-form-item :label="'发生日期'">
        <el-date-picker
          v-model="operTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <br>
      <el-form-item label="核销状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px" clearable>

          <el-option key="0" label="未核销" value="0" />
          <el-option key="1" label="已核销" value="1" />

        </el-select>
      </el-form-item>

      <el-form-item :label="'挂账日期'">
        <el-date-picker
          v-model="lastTime"
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

    <div v-if="radio =='消费账'" class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate(1)"
      >核销
      </el-button>
    </div>

    <el-table
      v-if="radio=='消费账'"
      key="table1"
      :v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      class="mt8"
      @selection-change="handleSelectionChange"
    >

      <el-table-column align="center" type="selection" min-width="80" :selectable="canSelect" />
      <el-table-column prop="tradeId" label="报价单编号" min-width="150" />
      <el-table-column prop="tradeName" label="交易名称" min-width="150" />
      <el-table-column prop="onaccountAmt" label="挂账金额" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.onaccountAmt/100 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unAmt" label="未核销金额" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.unAmt/100 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="挂账日期" min-width="150" />
      <el-table-column prop="lastTime" label="最晚收款日期" min-width="150" />
      <el-table-column prop="status" label="状态" min-width="150">
        <template v-slot="scope">
          <span v-if="scope.row.status==0">未核销</span>
          <span v-else-if="scope.row.status==1">已核销</span>
        </template>
      </el-table-column>
      <el-table-column prop="operTime" label="核销日期" min-width="150" />

    </el-table>
    <el-pagination
      v-if="radio =='消费账'"
      class="fr mt20"
      :current-page="pagination.currPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.pageTotal"
      @size-change="handleSizeChange"

      @current-change="handleCurrentChange"
    />

    <!--收款账-->
    <el-form
      v-if="radio =='收款账'"
      ref="searchForm"
      :inline="true"
      :model="columnParam"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="客户名称">{{ routeData.name }}</el-form-item>
      <el-form-item label="剩余收款金额">{{ routeData.leftIncomeAmt /100 }}</el-form-item>
      <br>
      <el-form-item :label="'操作日期'">
        <el-date-picker
          v-model="operTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="操作类型" prop="email">
        <el-select v-model="columnParam.oprationType" placeholder="请选择" style="display: block; width: 240px">

          <el-option key="0" label="入账" value="0" />
          <el-option key="1" label="核销" value="1" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          v-loading="tableLoading"
          type="primary"
          @click="onSearch"
        >查询
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="radio =='收款账'" class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate(2)"
      >入账
      </el-button>
    </div>
    <el-table v-if="radio =='收款账'" key="table2" :v-loading="tableLoading2" :data="tableData2" stripe border style="width: 100%" class="mt8">
      <el-table-column prop="oprationType" label="操作类型" min-width="150">
        <template v-slot="scope">
          <span v-if="scope.row.oprationType==0">入账</span>
          <span v-else-if="scope.row.oprationType==1">核销</span>
        </template>
      </el-table-column>

      <el-table-column prop="incomeComp" label="收款公司" min-width="150" />
      <el-table-column prop="originAmount" label="期初金额" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.originAmount/100 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operationAmount" label="发生额" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.operationAmount/100 }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="finalAmount" label="期末余额" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.finalAmount/100 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operUser" label="操作人" min-width="150" />
      <el-table-column prop="operationTime" label="操作时间" width="150" />
      <el-table-column prop="descp" label="备注" width="150" />

    </el-table>
    <el-pagination
      v-if="radio =='收款账'"
      class="fr mt20"
      :current-page="pagination2.currPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination2.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination2.pageTotal"
      @size-change="handleSizeChange2"

      @current-change="handleCurrentChange2"
    />

    <!--弹窗  核销-->
    <el-dialog :visible.sync="dialogVisible_edit" title="核销">
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="核销金额" prop="username">{{ creditInfo.amount /100 }}</el-form-item>
        <el-form-item label="结余金额" prop="username">{{ (routeData.creditLimit+routeData.balanceAmt- creditInfo.amount) /100}}</el-form-item>
      </el-form>
      <span v-if="creditInfo.amount>(routeData.creditLimit+routeData.balanceAmt- creditInfo.amount)" class="lb-error">结余金额不足，请核实</span>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible_edit = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="onBatchOut">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  入账-->
    <el-dialog :visible.sync="dialogVisible_set" title="入账">

      <el-form ref="setRulesForm" :model="creditInfo" label-width="80px" label-position="left" :rules="setRules">

        <el-form-item label="收款公司" prop="username">
          <el-select v-model="creditInfo.incomeComp" placeholder="请选择" style="display: block; width: 240px">
            <el-option
              v-for="(item,i) in statusList"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="收款金额" prop="username">
          <el-input v-model="creditInfo.showAmt" width="120" placeholder="请输入金额" @change="inputChange" />
          <span width="120">注：可录入负数，冲减之前金额</span>
        </el-form-item>
        <el-form-item label="备注" prop="username">
          <el-input
            v-model="creditInfo.descp"
            width="120"
            maxlength="100"
            show-word-limit
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />

        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible_set = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAllIncomeBill, getAllOutBill, addOutBillBatch, addOneIncomeBill } from "@/api/bill"
import {allCompany, getQuotationByName} from "@/api/organizations"
import { deepClone} from "@/utils"
import { appendParamsToUrl , changePrice2money } from "@/utils/simple-util"
export default {
  name: "Details",
  data() {
    return {
      visible: 1,
      tableLoading: false,
      tableLoading2: false,
      tableData: [],
      tableData2: [],
      dialogVisible_set: false,
      dialogVisible_edit: false,
      creditInfo: {},
      // 搜索条件
      columnParam: {
        tradeId: "",
        clientId: "",
        status: "",
        uploadStartTime: "",
        uploadEndTime: "",
        startTime: "",
        endTime: ""
      },
      radio: '消费账',

      // 入账
      setRulesForm: {
        name: '',
        type: '',
        resource: ''
      },
      setRules: {
        name: [{ required: true, message: '请选择收款公司', trigger: 'change' }],
        type: [{ required: true, message: '请输入实际收款金额', trigger: 'blur' }],
        resource: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      // 分页
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      // 分页2
      pagination2: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      routeData: {},
      statusList: [],
      operTime: [],
      lastTime: [],
      selectData: []
    }
  },
  created() {
    this.routeData = this.$route.query.data
    this.getDate()
    allCompany({}).then(res => {
      console.log(res)
      const { data, status } = res
      if (status == 200) {
        this.statusList = []
        data.forEach(item => {
          this.statusList.push(item.comName)
        })
      }
    })
  },
  methods: {

    // 切换头部标签==客户佣金设置/查看
    findPage(event, data) {
      this.visible = data
      this.columnParam = {}
      this.getDate()
    },
    // 获取列表数据
    getDate() {
      this.columnParam.clientId = this.routeData.clientId
      let columnParam = {}
      if (this.visible == 1) {
        this.tableLoading = true
        this.tableData = []
        const queryParam = {
          pageNum: this.pagination.currPage,
          pageSize: this.pagination.pageSize
        }
        columnParam = deepClone(this.columnParam)
        columnParam.lastStartTime = this.lastTime[0]
        columnParam.lastEndTime = this.lastTime[1]
        columnParam.startTime = this.operTime[0]
        columnParam.endTime = this.operTime[1]
        getAllOutBill(Object.assign({}, queryParam, columnParam)).then(res => {
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
      } else {
        this.tableLoading2 = true
        this.tableData2 = []
        const queryParam = {
          pageNum: this.pagination2.currPage,
          pageSize: this.pagination2.pageSize
        }
        columnParam = deepClone(this.columnParam)
        columnParam.startTime = this.operTime[0]
        columnParam.endTime = this.operTime[1]
        getAllIncomeBill(Object.assign({}, queryParam, columnParam)).then(res => {
          console.log(res)
          const { data, status } = res
          if (status == 200) {
            this.tableData2 = data.dataList
            this.pagination2.currPage = data.pageNum
            this.pagination2.pageTotal = data.total
          } else {
            this.$message.error(data.errMsg)
          }
        })
          .catch(() => {
          })
          .finally(() => {
            this.tableLoading2 = false
          })
      }
    },
    // 核销
    setCreditInfo() {
      const param = deepClone(this.creditInfo)
      param.clientId = this.routeData.clientId
      param.operType = "0"
      console.log(param)
      addOneIncomeBill(param).then((res) => {
        const { data, status } = res
        if (status == 200) {
          this.dialogVisible_set = false
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `操作成功`,
            type: 'success'
          })
          this.getDate()
        } else {
          this.$message.error(res.errMsg)
        }
      })
        .catch((e) => {
          this.$message.error(e)
        })
        .finally(() => {
          this.dialogVisible_set = false
        })
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
    inputChange(e) {
      console.log(e)
      this.creditInfo.operAmount = Number(e) * 100
    },

    onBatchOut() {
      if (this.selectData.length == 0) {
        this.$message.error("请选择核销条目")
        return
      }
      const ids = []
      this.selectData.forEach(item => {
        ids.push(item.id)
      })
      const params = {
        ids: ids,
        clientId: this.routeData.clientId
      }
      addOutBillBatch(params).then((res) => {
        const { data, status } = res
        if (status == 200) {
          this.dialogVisible_edit = false
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `操作成功`,
            type: 'success'
          })
          this.getDate()
        } else {
          this.$message.error(res.errMsg)
        }
      })
        .catch((e) => {
          this.$message.error(e)
        })
        .finally(() => {
          this.dialogVisible_edit = false
        })
    },
    handleSelectionChange(data) {
      this.selectData = data
      this.creditInfo.amount = 0
      data?.forEach(item => {
        this.creditInfo.amount += Number(item.unAmt)
      })
    },
    canSelect(row, index) {
      return row.status == 0
    },
    handleCreate(state) {
      this.dialogVisible_edit = state == 1
      this.dialogVisible_set = state == 2
    },
    handleShow(row) {
      this.dialogVisible = true
      this.creditInfo = row
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getDate()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getDate()
    },
    handleSizeChange2(val) {
      this.pagination2.pageSize = val
      this.getDate()
    },
    handleCurrentChange2(val) {
      this.pagination2.currPage = val
      this.getDate()
    },

    // 搜索
    onSearch() {
      console.log('search')
      this.getDate()
    },
    // 导出
    onExport() {
      const colParam = deepClone(this.columnParam)
      const range = colParam.lastTraceDate
      if (range && range.length > 1) {
        colParam.startDate = range[0]
        colParam.endDate = range[1]
      }
      colParam.lastTraceDate = null
      this.tableLoading = true
      const fileName = 'export-all.xlsx'
      const url = "/bill/api/bill-out-export"
      const urlWithParam = appendParamsToUrl(url, colParam)
      this.$router.push({
        path: "/clm/cli-com-export",

        query: Object.assign({}, colParam, { url: urlWithParam, fileName: fileName })
      })
    }
  }
}
</script>

<style scoped>

</style>
