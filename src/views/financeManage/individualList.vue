<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="交易名称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入交易名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="核销状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="(item,i) in statusList"
            :key="i"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="'上传水单日期'">
        <el-date-picker
          v-model="columnParam.lastTraceDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'实际收款日期'">
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
      >批量核销
      </el-button>
    </div>
    <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="clientNum" label="报价单编号" min-width="150" />
      <el-table-column prop="name" label="交易名称" min-width="150" />
      <el-table-column prop="name" label="客户中文名称" min-width="150" />
      <el-table-column prop="name" label="交易金额" min-width="150" />
      <el-table-column prop="name" label="回款金额" min-width="150" />
      <el-table-column prop="name" label="上传水单日期" min-width="150" />
      <el-table-column prop="name" label="实际收款日期" min-width="150" />
      <el-table-column prop="name" label="核销日期" min-width="150" />
      <el-table-column prop="name" label="状态" min-width="150" />
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">核销
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
        <el-form-item label="客户名称">{{ creditInfo.identityId }}</el-form-item>
        <el-form-item label="报价单编号">{{ creditInfo.identityId }}</el-form-item>
        <el-form-item label="回款金额" prop="username">
          <el-input v-model="creditInfo.username" placeholder="输入授信额度" width="120" />
        </el-form-item>
        <el-form-item label="水单" prop="username">
          <el-input v-model="creditInfo.username" width="120" />
        </el-form-item>
        <el-form-item label="实际收款日期" prop="username">
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
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="客户名称">{{ creditInfo.identityId }}</el-form-item>
        <el-form-item label="报价单编号">{{ creditInfo.identityId }}</el-form-item>
        <el-form-item label="回款金额" prop="username">{{ creditInfo.identityId }}</el-form-item>
        <el-form-item label="水单" prop="username">{{ creditInfo.identityId }}</el-form-item>
      </el-form>
      <div>
        <el-button type="danger" size="small" plain @click="dialogVisible_look = false">关闭</el-button>
      </div>
    </el-dialog>

    <!--弹窗  批量核销-->
    <el-dialog :visible.sync="dialogVisible_checkall" title="批量核销">
      <span>是否确认所选报价单收款金额无误？</span>
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="实际收款日期" prop="username">
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
        <el-button type="danger" size="small" plain @click="dialogVisible_checkall = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认已收款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "IndividualList",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      dialogVisible_check: false,
      dialogVisible_checkall: false,
      dialogVisible_look: false,
      creditInfo: [],
      statusList: [],
      // 搜索条件
      columnParam: {
        cnameOrAbbr: "",
        startDate: "",
        endDate: ""
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
    this.getDate()
  },
  methods: {
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
    // 搜索
    onSearch() {
      console.log('search')
      this.getDate()
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

<style scoped>

</style>
