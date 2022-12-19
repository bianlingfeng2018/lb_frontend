<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="客户中文名称或简称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入客户中文名称或简称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="行业分类" prop="email">
        <el-select v-model="columnParam.industry" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in industryList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in statusList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户分类" prop="email">
        <el-select v-model="columnParam.type" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in typeList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户来源" prop="email">
        <el-select v-model="columnParam.source" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in sourceList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'最后跟进日期'">
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
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item></el-form>
    <div class="lb-flex lb-flex-bw">
      <!--      <span class="lh32">客户公司列表</span>-->
      <!--      <el-button-->
      <!--        type="primary"-->
      <!--        plain-->
      <!--        size="small"-->
      <!--        @click="handleUnlock"-->
      <!--      >放出-->
      <!--      </el-button>-->
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate"
      >添加客户
      </el-button>
    </div>
    <el-table
      :v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      class="mt8"
    >
      <el-table-column align="center" type="index" label="#" min-width="80" />
      <el-table-column prop="clientNum" label="客户编号" min-width="150" />
      <el-table-column prop="name" label="客户中文名称" min-width="150" />
      <el-table-column prop="abbr" label="客户简称" min-width="150" />
      <el-table-column prop="industClass" label="行业分类" min-width="150" />
      <el-table-column prop="source" label="客户来源" min-width="150" />
      <el-table-column prop="clientClass" label="客户分类" min-width="150" />
      <el-table-column prop="status" label="客户状态" min-width="150" />
      <el-table-column prop="oppNumb" label="商机数" min-width="150" />
      <el-table-column prop="notCompQuot" label="未完结报价单" min-width="150" />
      <el-table-column prop="lastFinishDate" label="上次成交日期" min-width="150" />
      <el-table-column prop="invoiceName" label="最后跟进日期" min-width="150" />
      <el-table-column prop="reserveDays" label="剩余保护天数" min-width="150" />
      <!--      <el-table-column prop="addr" label="客户地址" min-width="150" />-->
      <!--      <el-table-column prop="nickname" label="昵称" min-width="100" />-->
      <!--      <el-table-column prop="assoCom" label="关联公司名称" min-width="100" />-->
      <!--      <el-table-column prop="invoiceName" label="发票抬头" min-width="100" />-->
      <!--      <el-table-column prop="invoiceTaxNum" label="纳税人识别号" min-width="100" />-->
      <!--      <el-table-column prop="invoiceAddr" label="地址" min-width="100" />-->
      <!--      <el-table-column prop="invoiceTel" label="电话" min-width="100" />-->
      <!--      <el-table-column prop="invoiceBank" label="开户行" min-width="100" />-->
      <!--      <el-table-column prop="invoiceAcc" label="账号" min-width="100" />-->
      <!--      <el-table-column prop="invoiceIsSpec" label="是否专票" min-width="100" />-->
      <!--      <el-table-column prop="clientLevel" label="客户等级" min-width="100" />-->
      <el-table-column fixed="right" label="操作" width="220">
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
          <el-dropdown>
            <el-button type="primary" size="small" plain>
              更多
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUnlock(scope.row)">放出</el-dropdown-item>
              <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import { deepClone } from "@/utils"
import { deleteClientCom, queryClientComPageMy, unlockClient } from "@/api/clientCompany"
import { appendParamsToUrl } from "@/utils/simple-util"

const defaultData = [
  {
    clientNum: "C001",
    name: "张三",
    addr: "北京路",
    abbr: "",
    nickname: "",
    source: "",
    assoCom: "",
    invoiceName: "",
    invoiceTaxNum: "",
    invoiceAddr: "",
    invoiceTel: "",
    invoiceBank: "",
    invoiceAcc: "",
    invoiceIsSpec: "",
    clientClass: "",
    industClass: "",
    clientLevel: ""
  }
]
const defaultColumnParam = {
  cnameOrAbbr: "",
  industry: "",
  status: "",
  type: "",
  source: "",
  lastTraceDate: [],
  startDate: "",
  endDate: ""
}
export default {
  filters: {
  },
  data() {
    return {
      // 搜索条件
      columnParam: {
        cnameOrAbbr: "",
        industry: "",
        status: "",
        type: "",
        source: "",
        lastTraceDate: [],
        startDate: "",
        endDate: ""
      },
      industryList: ["服装"],
      typeList: ["工厂", "贸易公司", "电商平台", "国外买家", "国内品牌商", "电商商家"],
      statusList: ["成交客户", "重要客户", "一般客户"],
      sourceList: ["客户介绍", "百度推广", "电话营销", "陌生拜访", "展会"],
      tableLoading: false,
      tableData: Object.assign([], defaultData),
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const colParam = deepClone(this.columnParam)
      const range = colParam.lastTraceDate
      if (range && range.length > 1) {
        colParam.startDate = range[0]
        colParam.endDate = range[1]
      }
      colParam.lastTraceDate = null
      queryClientComPageMy(Object.assign({}, queryParam, colParam))
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
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
          deleteClientCom(row.id)
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$message({
                  message: data.msg,
                  type: "success"
                })
                this.fetchData()
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
        path: "/clm/client-com-create"
      })
    },
    handleShow(data) {
      this.$router.push({
        path: "/clm/client-com-show/" + data.id
      })
    },
    handleEdit(data) {
      this.$router.push({
        path: "/clm/client-com-edit/" + data.id
      })
    },
    handleUnlock(row) {
      this.$confirm("是否确定放出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 放出客户
          unlockClient(row)
            .then(res => {
              console.log(res.data)
              const { data, success, errorMessage } = res
              if (success) {
                this.$message({
                  message: data.msg,
                  type: "success"
                })
                this.fetchData()
              } else {
                this.$message.error(errorMessage)
              }
            })
            .catch(reason => {
              console.log(reason)
            })
            .finally(() => {})
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消放出"
          })
        })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.fetchData()
    },
    // 搜索
    onSearch() {
      console.log('search')
      this.fetchData()
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
      const fileName = 'export-my.xlsx'
      const url = "/api/cli-my-export"
      const urlWithParam = appendParamsToUrl(url, colParam)
      this.$router.push({
        path: "/clm/cli-com-export",
        query: Object.assign({}, colParam, { url: urlWithParam, fileName: fileName })
      })
    },
    resetForm() {
      console.log('reset search form')
      this.columnParam = deepClone(defaultColumnParam)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown {
  margin-left: 10px;
}
</style>
