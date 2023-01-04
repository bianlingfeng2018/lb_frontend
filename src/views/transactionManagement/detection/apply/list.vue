<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="申请单编号">
        <el-input
          v-model="columnParam.applicationNum"
          placeholder="请输入申请单编号"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="申请单位名称">
        <el-input
          v-model="columnParam.applicationName"
          placeholder="请输入申请单位名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="收样状态">
        <el-select v-model="columnParam.sampleStatus" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="已收样" value="1"/>
          <el-option key="1" label="未收样" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">

      <el-tabs v-model="columnParam.contractStatus" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="-1"/>
        <el-tab-pane label="待合同评审" name="0"/>
        <el-tab-pane label="评审通过" name="1"/>
        <el-tab-pane label="评审不通过" name="2"/>
        <el-tab-pane label="已下单" name="3"/>
      </el-tabs>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column prop="applicationNum" label="申请单编号" min-width="130"/>
      <el-table-column prop="applicationName" label="申请单位名称" min-width="120"/>
      <el-table-column prop="applicationDate" label="申请日期" min-width="120"/>
      <el-table-column prop="sampleStatus" label="收样状态" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.sampleStatus  == 1">已收样</span>
          <span v-else-if="scope.row.sampleStatus  == 0">未收样</span>
        </template>
      </el-table-column>
      <el-table-column prop="sampleDate" label="样品接收日期" min-width="120"/>
      <el-table-column prop="planDate" label="要求完成日期" min-width="120"/>
      <el-table-column prop="contractStatus" label="合同评审状态" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.contractStatus == 0">待评审</span>
          <span v-else-if="scope.row.contractStatus == 1">评审通过</span>
          <span v-else-if="scope.row.contractStatus == 2">评审不通过</span>
          <span v-else-if="scope.row.contractStatus == 3">已下单</span>
        </template>
      </el-table-column>
      <el-table-column prop="serviceName " label="跟进人" min-width="120"/>
      <el-table-column prop="reviewName " label="评审人" min-width="120"/>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button v-if="scope.row.contractStatus == 0 || scope.row.contractStatus == 2" type="primary" plain size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="scope.row.contractStatus == 0" type="primary" plain size="small" @click="handleCheck(scope.row)">评审
          </el-button>
          <el-button v-if="scope.row.contractStatus == 1" type="primary" plain size="small" @click="handleEdit(scope.row)">创建工作单
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
    <!--弹窗  评审-->
    <el-dialog :visible.sync="dialogVisible_check" title="评审">
      <el-form ref="creditInfo" :model="creditInfo" status-icon :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="评审结果：" prop="reviewResult">
          <el-select v-model="creditInfo.reviewResult" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="1" label="评审通过" value="1" />
            <el-option key="2" label="评审不通过" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因：" prop="reason" :rules="creditInfo.reviewResult == '2'?auditRules.reason:[{required:false}]" >
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
  import { changePrice2money } from "@/utils/simple-util"
  import { deepClone } from "../../../../utils"
  import { getApplicationList, getServiceList, getQuotationExamine,getApplicationReview } from "@/api/organizations"

  export default {
    filters: {
      changePrice2money
    },
    data() {
      return {
        columnParam: {
          contractStatus: '-1'
        },
        dialogVisible_check: false,
        creditInfo: {
          reviewResult:'',
          applicationNum:'',
          reason:'',
          requestId: Math.random().toString(24),
        },
        auditRules: {
          reviewResult: [{ required: true, message: '请选择评审结果', trigger: 'change' }],
          reason: [{ required: true, message: '请输入评审不通过原因', trigger: 'blur' }],
        },
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
    this.getApplicationList()
  },
  methods: {
    handleClick(tab) {
      this.columnParam.contractStatus = tab.name
      this.pagination.currPage = 1
      this.getApplicationList()
    },
    getApplicationList() {
      this.tableLoading = true
      const queryParam = {
        requestId: Math.random().toString(24),
        page: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const colParam = deepClone(this.columnParam)
      if(this.columnParam.contractStatus=='-1'){
        colParam.contractStatus = ""
      }
      getApplicationList(Object.assign({}, queryParam, colParam))
        .then((res) => {
          console.log(res)
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

    handleCheck(row) {
      this.dialogVisible_check = true
      this.creditInfo.applicationNum = row.applicationNum
      console.log(this.creditInfo)
    },
    // 审核
    async handleCheckConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getApplicationReview(this.creditInfo)
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
          return false;
        }
      });

    },
    handleCreate() {
      this.$router.push({
        path: "/tm/detection/apply/create"
      })
    },
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/apply/show/" + data.applicationNum
      })
    },
    handleEdit(data) {
      this.$router.push({
        path: "/tm/detection/apply/edit/" + data.applicationNum
      })
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/apply/audit/" + data.applicationNum
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
    onSearch(){
      this.getApplicationList()
    },
  }
}
</script>
<style lang="scss" scoped>
  .el-dropdown {
    margin-left: 10px;
  }
</style>
