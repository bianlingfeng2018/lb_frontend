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
      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="clientNum" label="客户编号" min-width="150" />
      <el-table-column prop="name" label="客户中文名称" min-width="150" />
      <el-table-column prop="name" label="授信额度" min-width="150" />
      <el-table-column prop="name" label="可用额度" min-width="150" />
      <el-table-column prop="name" label="未核销金额" min-width="150" />
      <el-table-column prop="name" label="剩余收款金额" min-width="150" />
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">设置授信额度
          </el-button>
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">应收账明细
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

    <el-dialog :visible.sync="dialogVisible" title="设置授信额度">
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="客户名称">{{ creditInfo.identityId }}</el-form-item>
        <el-form-item label="未核销金额">{{ creditInfo.identityId }}</el-form-item>
        <el-form-item label="授信额度" prop="username">
          <el-input v-model="creditInfo.username" placeholder="输入授信额度" width="120" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      tableData: {},
      dialogVisible: false,
      creditInfo: {},
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
    // 设置授信额度
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
    }
  }
}
</script>

<style>

</style>
