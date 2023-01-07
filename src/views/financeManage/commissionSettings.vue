<template>
  <!--客户佣金设置-->
  <div class="app-container ohn">
    <div class="mb20">
      <el-radio-group v-model="radio">
        <el-radio-button label="客户佣金设置" @click.native="chooseIdClick($event,1)" />
        <el-radio-button label="客户佣金记录" @click.native="chooseIdClick($event,2)" />
      </el-radio-group>
    </div>
    <!--客户佣金设置-->
    <el-form
      v-if="visible1==true"
      ref="searchForm"
      :inline="true"
      :model="columnParam2"
      class="demo-form-inline mt8"
      label-width="150px"
    >
      <el-form-item label="客户编号">
        <el-input
          v-model="columnParam2.clientId"
          placeholder="请输入客户编号"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <!--        <el-input
          v-model="columnParam2.clientName"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />-->
        <el-autocomplete
          v-model="columnParam2.clientName"
          :fetch-suggestions="queryClientCom"
          placeholder="请输入客户中文名称"
          clearable
          style="width: 240px"
          @select="onSelect"
        />
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

    <div v-if="visible1==true" class="lb-flex" style="position: relative;">
      <el-tabs v-if="visible1==true" v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="待审核" name="1" />
        <el-tab-pane label="审核通过" name="2" />
        <el-tab-pane label="审核不通过" name="3" />
      </el-tabs>
      <el-button
        type="primary"
        plain
        size="small"
        style="position: absolute;right:10px;top:5px;"
        @click="handleCreate(2)"
      >设置客户佣金
      </el-button>
    </div>

    <el-table
      v-if="visible1==true"
      key="tabel1"
      :v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      class="mt8"
    >
      <el-table-column prop="clientId" label="客户编号" min-width="150" />
      <el-table-column prop="clientName" label="客户中文名称" min-width="150" />
      <el-table-column label="佣金比例" min-width="150">
        <template v-slot="scope">
          <span v-if="scope.row.status == 'inApprove'">{{ scope.row.rate }}% -> {{ scope.row.inreviewRate }}%</span>
          <span v-else>{{ scope.row.rate }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="150">
        <template v-slot="scope">
          <span v-if="scope.row.status == 'inApprove'">审核中</span>
          <span v-else-if="scope.row.status == 'Reject'">审核被拒</span>
          <span v-else-if="scope.row.status == 'Accept'">审核通过</span>
          <el-tooltip v-if="scope.row.status == 'Reject'" class="item" effect="dark" placement="right">
            <i class="el-icon-question" style="font-size: 16px; vertical-align: middle;" />
            <div slot="content">
              <p>{{ scope.row.reason }}</p>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row,true)">编辑
          </el-button>
          <el-button v-if="scope.row.status =='inApprove'" type="primary" plain size="small" @click="handleShow(scope.row,false)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="visible1===true"
      class="fr mt20"
      :current-page="pagination.currPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!--客户佣金记录-->
    <el-form
      v-if="visible2==true"
      ref="searchForm"
      :inline="true"
      :model="columnParam"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="交易名称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入交易名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-autocomplete
          v-model="columnParam2.clientName"
          :fetch-suggestions="queryClientCom"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          clearable
          @select="onSelect"
        />
      </el-form-item>
      <br>
      <el-form-item label="结算状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px">
          <el-option key="0" label="未结算" value="0" />
          <el-option key="1" label="已结算" value="1" />
        </el-select>
      </el-form-item>

      <el-form-item :label="'结算日期'">
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
    <div v-if="visible2===true" class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate(1)"
      >标识已结算
      </el-button>
    </div>
    <el-table
      v-if="visible2==true"
      key="tabel2"
      :v-loading="tableLoading2"
      :data="tableData2"
      stripe
      border
      style="width: 100%"
      class="mt8"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="tradeId" label="报价单编号" min-width="150" />
      <el-table-column prop="tradeName" label="交易名称" min-width="150" />
      <el-table-column prop="clientName" label="客户中文名称" min-width="150" />
      <el-table-column prop="tradeAmt" :label="'交易金额\n（不含税检测费）'" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.tradeAmt /100 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="佣金比例" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.rate }}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="佣金" min-width="150">
        <template v-slot="scope">
          <span>{{ scope.row.amount /100 }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" min-width="150">
        <template v-slot="scope">
          <span v-if="scope.row.status==0">未结算</span>
          <span v-else-if="scope.row.status==1">未核销</span>
          <span v-else>已核销</span>
        </template>
      </el-table-column>

      <el-table-column prop="operTime" label="结算日期" width="150" />
    </el-table>
    <el-pagination
      v-if="visible2===true"
      class="fr mt20"
      :current-page="pagination2.currPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination2.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination2.pageTotal"
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
    />

    <!--弹窗  设置客户佣金-->
    <el-dialog :visible.sync="dialogVisible_set" title="设置客户佣金">
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="客户名称" prop="username">

          <el-autocomplete v-model="creditInfo.clientName" :fetch-suggestions="queryClientCom" placeholder="输入客户名称" width="120" @select="handleClick" />
        </el-form-item>
        <el-form-item label="佣金比例" prop="rate">
          <el-input-number v-model="creditInfo.rate" width="120" :max="50" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_set = false">取消</el-button>

        <el-button type="primary" size="small" plain @click="handleSetCommission(1)">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  编辑-->
    <el-dialog :visible.sync="dialogVisible_edit" title="编辑">
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="客户名称" prop="username">{{ creditInfo.clientName }}</el-form-item>
        <el-form-item label="佣金比例" prop="rate">

          <el-input v-model="creditInfo.rate" width="120" />

        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_edit = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="handleSetCommission(2)">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  审核-->
    <el-dialog :visible.sync="dialogVisible_check" title="审核">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="审核结果：" prop="email">
          <el-select v-model="creditInfo.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="Accept" />
            <el-option key="1" label="审核不通过" value="Reject" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="creditInfo.status=='Reject'" label="原因：" prop="username">
          <el-input v-model="creditInfo.reason" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="handleSetCommission(3)">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  标识已结算-->
    <el-dialog :visible.sync="dialogVisible_settlement" title="标识已结算">
      <span>是否确认所选报价单已结算佣金？</span>
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="结算日期" prop="username">
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

        <el-button size="small" plain @click="dialogVisible_settlement = false">取消</el-button>

        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCommissionList, getCommissionRecordList, updateCommission, setCommission, approveCommission, settleCommissionRecordBatch } from "@/api/balance"
import { getClientByName } from "@/api/clientCompany"
import { deepClone } from "../../utils"
export default {
  name: "CommissionSettings",
  data() {
    return {
      tableLoading: false,
      tableLoading2: false,
      tableData: [],
      tableData2: [],
      visible1: true,
      visible2: false,
      dialogVisible_set: false,
      dialogVisible_edit: false,
      dialogVisible_check: false,
      dialogVisible_settlement: false,
      creditInfo: {},
      activeIndex: '0', // 默认全部
      // 搜索条件
      columnParam: {
        cnameOrAbbr: "",
        startDate: "",
        endDate: ""
      },
      columnParam2: {
        clientId: "",
        clientName: '',
        status: ''
      },
      radio: '客户佣金设置',

      // 审核
      auditRulesForm: {
        name: '',
        type: '',
        resource: ''
      },
      auditRules: {
        type: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
        resource: [{ required: true, message: '请输入审核不通过原因', trigger: 'blur' }]
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
      restaurants: [],
      selectTrade: [],
      batchTime: ""
    }
  },
  created() {
    this.getListDate()
  },
  methods: {
    // 切换头部标签==客户佣金设置/查看
    chooseIdClick(e, val) {
      if (e.target.tagName !== 'INPUT') {
        return
      }
      this.visible1 = val === 1
      this.visible2 = val === 2
      this.getListDate()
    },
    handleClick(tab, event) {
      console.log(this.activeIndex)
      let status = ''
      switch (this.activeIndex) {
        case "1":
          status = 'inApprove'
          break
        case "2":
          status = 'Accept'
          break
        case "3":
          status = 'Reject'
          break
      }
      this.columnParam2.status = status
      this.getListDate()
    },
    // 获取列表数据
    getListDate() {
      this.tableData = []
      this.tableData2 = []
      this.tableLoading = true
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      let columnParam = {}
      let queryList = null
      if (this.visible1) {
        columnParam = deepClone(this.columnParam2)
        queryList = getCommissionList
      } else {
        columnParam = deepClone(this.columnParam)
        queryList = getCommissionRecordList
      }

      queryList(Object.assign({}, queryParam, columnParam))
        .then((res) => {
          console.log(res)
          const { data, status } = res
          if (status == 200) {
            if (this.visible1 == true) {
              this.tableData = data.dataList
              this.pagination.currPage = data.pageNum
              this.pagination.pageTotal = data.total
            } else {
              this.tableData2 = data.dataList
              this.pagination2.currPage = data.pageNum
              this.pagination2.pageTotal = data.total
            }
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
    // 核销
    setCreditInfo() {
      const sendArray = []
      this.selectTrade.forEach(data => {
        const sendData = {
          id: data.id,
          settleTime: this.batchTime
        }
        sendArray.push(sendData)
      })
      const param = {
        list: sendArray
      }
      settleCommissionRecordBatch(param).then((res) => {
        if (res.status == 200) {
          this.dialogVisible_settlement = false
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `操作成功`,
            type: 'success'
          })
          this.getListDate()
        }
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.dialogVisible_settlement = false
      })
    },
    handleSelectionChange(data) {
      this.selectTrade = data
    },
    handleSetCommission(state) {
      let fuc
      if (state == 1) {
        fuc = setCommission
      } else if (state == 2) {
        fuc = updateCommission
      } else {
        fuc = approveCommission
      }

      fuc(this.creditInfo).then(res => {
        if (res.status == 200) {
          this.dialogVisible_set = false
          this.dialogVisible_edit = false
          this.dialogVisible_settlement = false
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `操作成功`,
            type: 'success'
          })
          this.getListDate()
        }
      }).catch(e => {
        this.$message.error(e)
      }).finally(() => {
        this.dialogVisible_set = false
        this.dialogVisible_edit = false
        this.dialogVisible_settlement = false
      })
    },
    queryClientCom(s, cb) {
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
      if (this.dialogVisible_set) {
        this.creditInfo.clientId = item.clientId
        this.creditInfo.clientName = item.value
      } else if (this.visible1) {
        this.columnParam2.clientId = item.clientId
      } else {
        this.columnParam.clientId = item.clientId
      }
    },
    handleShow(row, isEdit) {
      // this.dialogVisible = true
      this.creditInfo = row
      this.dialogVisible_edit = isEdit
      this.dialogVisible_check = !isEdit
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getListDate()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getListDate()
    },
    handleSizeChange2(val) {
      this.pagination2.pageSize = val
      this.getListDate()
    },
    handleCurrentChange2(val) {
      this.pagination2.currPage = val
      this.getListDate()
    },
    handleCreate(show) {
      this.dialogVisible_set = show == 2
      this.dialogVisible_settlement = show == 1
    },

    // 搜索
    onSearch() {
      console.log('search')
      this.getListDate()
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
      const url = "/api/cli-all-export"
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
