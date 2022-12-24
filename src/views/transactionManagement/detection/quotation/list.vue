<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="报价单编号">
        <el-input v-model="columnParam.cnameOrAbbr" placeholder="请输入报价单编号" style="width: 240px"
          @keydown.enter.native="onSearch" />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-input v-model="columnParam.cnameOrAbbr" placeholder="请输入客户中文名称" style="width: 240px"
          @keydown.enter.native="onSearch" />
      </el-form-item>
      <el-form-item label="检测交易名称">
        <el-input v-model="columnParam.cnameOrAbbr" placeholder="请输入检测交易名称" style="width: 240px"
          @keydown.enter.native="onSearch" />
      </el-form-item>

      <el-form-item label="跟进人" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="是" value="0" />
          <el-option key="1" label="否" value="1" />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="支付状态" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="未支付" value="0" />
          <el-option key="1" label="已挂账" value="1" />
          <el-option key="2" label="已付部分" value="2" />
          <el-option key="3" label="已全付" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="进度" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="待审核价格" value="0" />
          <el-option key="1" label="审核不通过" value="1" />
          <el-option key="2" label="待填写申请单" value="2" />
          <el-option key="3" label="申请单待评审" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="tableLoading" type="primary" @click="onSearch">查询
        </el-button>

      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="activeIndex" @tab-click="handleClick" style="width: 100%">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="待审核价格" name="1" />
        <el-tab-pane label="审核不通过" name="2" />
        <el-tab-pane label="已失效" name="3" />
      </el-tabs>
      <el-button type="primary" plain size="small" style="position: absolute;right:10px;top:5px;"
        @click="handleCreate">新增报价
      </el-button>
    </div>

    <el-table :v-loading="tableLoading" :data="tableData" stripe border class="mt8">
      <el-table-column prop="quotationNum" label="报价单编号" min-width="120" />
      <el-table-column prop="client" label="客户中文名称" min-width="120" />
      <el-table-column prop="reportType" label="检测交易名称" min-width="120" />
      <el-table-column prop="reportFee" label="总金额" min-width="100" />
      <el-table-column prop="courierFee" label="已付金额" min-width="100" />
      <el-table-column fixed="right" label="状态" min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed">已确认</span>
          <span v-else>待确认</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="进度" min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed">已确认</span>
          <span v-else>待确认</span>
        </template>
      </el-table-column>
      <el-table-column prop="clientSignatureDate" label="报价时间" min-width="120" />
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button type="primary" plain size="small" @click="handleCheck(scope.row)">审核
          </el-button>
          <el-button type="primary" plain size="small" @click="handleDelete(scope.row)">上传水单
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr mt20" :current-page="pagination.currPage" :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.pageTotal"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!--弹窗  审核-->
    <el-dialog :visible.sync="dialogVisible_check" title="审核">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="审核结果：" prop="email">
          <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="0" />
            <el-option key="1" label="审核不通过" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因：" prop="username">
          <el-input v-model="creditInfo.username" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  上传水单-->
    <el-dialog :visible.sync="dialogVisible_settlement" title="上传水单">
      <el-form :model="creditInfo" label-width="120px" label-position="left" class="mt8">
        <el-form-item label="支付金额" prop="username">
          <el-input v-model="creditInfo.username" width="120" />
        </el-form-item>
        <el-form-item label="上传样品照片：" prop="username">
          <el-upload class="avatar-uploader" :action="prefix.lb + '/api/certification/uploadFile'"
            :on-success="handleFileSuccess" :before-upload="beforeFlieUpload" :show-file-list="false" :multiple="false"
            :headers="headers" :limit="1">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              支持jpg、jpeg、gif、png、pdf
            </div>
          </el-upload>
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
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]
export default {
  filters: {

  },
  data() {
    return {
      prefix: prefix,
      dialogVisible_check: false,
      dialogVisible_settlement: false,
      tableLoading: false,
      tableData: [],
      // 搜索条件
      columnParam: {
        cnameOrAbbr: "",
        startDate: "",
        endDate: ""
      },
      creditInfo: [

      ],
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
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      this.$store
        .dispatch("transaction/queryTestQuotationList", queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            console.log(data)
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
    //上传水单
    handleDelete(row) {
      this.dialogVisible_settlement = true
      // this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$store
      //       .dispatch("transaction/deleteTestQuotation", { testQuotationId: row.id })
      //       .then((res) => {
      //         const { data, success, errorMessage } = res
      //         if (success) {
      //           this.$message({
      //             message: data.msg,
      //             type: "success"
      //           })
      //           this.handleSearchTestTradeList()
      //         } else {
      //           this.$message.error(errorMessage)
      //         }
      //       })
      //       .catch(() => {
      //       })
      //       .finally(() => {
      //       })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     })
      //   })
    },
    handleCreate() {
      this.$router.push({
        path: "/tm/detection/quotation/create"
      })
    },
    //查看
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/quotation/show/" + data.testTradeId
      })
    },
    //编辑
    handleEdit(data) {
      this.$router.push({
        path: "/tm/detection/quotation/edit/" + data.testTradeId
      })
    },
    //审核
    handleCheck(data) {
      this.dialogVisible_check = true
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/quotation/audit/" + data.testTradeId
      })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.handleSearchTestTradeList()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.handleSearchTestTradeList()
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  margin-top: 10px;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 120px;
  display: block;
}
</style>