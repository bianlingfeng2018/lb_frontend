<template>
  <div class="app-container ohn">
    <div>
      <el-radio-group v-model="radio" @change="findPage">

        <el-radio-button label="消费账" />
        <el-radio-button label="收款账" />
      </el-radio-group>
    </div>
    <!--消费账-->
    <el-form
      v-if="radio='消费账'"
      ref="searchForm"
      :inline="true"
      :model="columnParam"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="客户名称">{{ name }}</el-form-item>

      <br>
      <el-form-item label="交易名称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入交易名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item :label="'发生日期'">
        <el-date-picker
          v-model="columnParam.lastTraceDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <br>
      <el-form-item label="核销状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px">

          <el-option key="0" label="未核销" value="0" />
          <el-option key="1" label="已核销" value="1" />

        </el-select>
      </el-form-item>

      <el-form-item :label="'最晚收款日期'">
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

    <div class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate"
      >核销
      </el-button>
    </div>

    <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">

      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="clientNum" label="报价单编号" min-width="150" />
      <el-table-column prop="name" label="交易名称" min-width="150" />
      <el-table-column prop="name" label="挂账金额" min-width="150" />
      <el-table-column prop="name" label="未核销金额" min-width="150" />
      <el-table-column prop="name" label="挂账日期" min-width="150" />
      <el-table-column prop="name" label="最晚收款日期" min-width="150" />
      <el-table-column prop="name" label="状态" min-width="150" />
      <el-table-column prop="name" label="核销日期" min-width="150" />

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

    <!--收款账-->
    <el-form
      v-else-if="'收款账'"
      ref="searchForm"
      :inline="true"
      :model="columnParam"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="客户名称">{{ name }}</el-form-item>
      <el-form-item label="剩余收款金额">52,843.69</el-form-item>
      <br>
      <el-form-item :label="'操作日期'">
        <el-date-picker
          v-model="columnParam.lastTraceDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="操作类型" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px">

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
    <div class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate"
      >入账
      </el-button>
    </div>
    <el-table :v-loading="tableLoading2" :data="tableData2" stripe border style="width: 100%" class="mt8">
      <el-table-column prop="clientNum" label="操作类型" min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">入账</span>
          <span v-else-if="scope.row.status==1">核销</span>
        </template>
      </el-table-column>

      <el-table-column prop="clientNum" label="收款公司" min-width="150" />
      <el-table-column prop="name" label="期初金额" min-width="150" />
      <el-table-column prop="name" label="发生额" min-width="150" />
      <el-table-column prop="name" label="期末余额" min-width="150" />
      <el-table-column prop="name" label="操作人" min-width="150" />
      <el-table-column prop="name" label="操作时间" width="150" />
      <el-table-column prop="name" label="备注" width="150" />

    </el-table>
    <el-pagination
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
        <el-form-item label="核销金额" prop="username">{{ creditInfo.name }}</el-form-item>
        <el-form-item label="结余金额" prop="username">{{ creditInfo.name }}</el-form-item>
      </el-form>
      <span>结余金额不足，请核实</span>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible_edit = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  入账-->
    <el-dialog :visible.sync="dialogVisible_set" title="入账">

      <el-form ref="setRulesForm" :model="creditInfo" label-width="80px" label-position="left" :rules="setRules">

        <el-form-item label="收款公司" prop="username">
          <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px">
            <el-option
              v-for="(item,i) in statusList"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="收款金额" prop="username">

          <el-input v-model="creditInfo.username" width="120" />
        </el-form-item>
        <el-form-item label="备注" prop="username">
          <el-input
            v-model="creditInfo.username"
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
export default {
  name: "Details",
  data() {
    return {
      tableLoading: false,
      tableLoading2: false,
      tableData: {},
      tableData2: {},
      dialogVisible_set: false,
      dialogVisible_edit: false,
      creditInfo: {},
      // 搜索条件
      columnParam: {
        cnameOrAbbr: "",
        startDate: "",
        endDate: ""
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
      }

    }
  },
  created() {
    this.getDate()
  },
  methods: {

    // 切换头部标签==客户佣金设置/查看
    findPage() {

    },
    handleClick(tab, event) {
      this.getDate()
    },
    // 获取列表数据
    getDate() {

    },
    // 核销
    setCreditInfo() {

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
