<template>
  <div class="app-container ohn">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="columnParam"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="工作单编号">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入工作单编号"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="检测单位名称">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入检测单位名称"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>

      <el-form-item label="是否分包商" prop="email">
        <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="是" value="0" />
          <el-option key="1" label="否" value="1" />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="'要求日期'">
        <el-date-picker
          v-model="columnParam.lastTraceDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'出单日期'">
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

      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="待确认" name="1" />
        <el-tab-pane label="已确认" name="2" />
      </el-tabs>
      <el-button
        type="primary"
        plain
        size="small"
        style="position: absolute;right:10px;top:5px;"
        @click="handleEdit"
      >确认
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
      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="workOrderNum" label="工作单编号" min-width="120" />
      <el-table-column prop="gmtCreate" label="开单日期" min-width="120" />
      <el-table-column prop="busyStatus" label="是否加急" min-width="120" />
      <el-table-column prop="issuer" label="要求完成日期" min-width="120" />
      <el-table-column prop="gmtOutput" label="出单日期" min-width="120" />
      <el-table-column prop="withdraw" label="检测单位名称" min-width="120" />
      <el-table-column prop="withdraw" label="是否分包商" min-width="120" />
      <el-table-column fixed="right" label="状态" min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed">已确认</span>
          <span v-else>待确认</span>
        </template>
      </el-table-column>
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
            v-if="scope.row.confirmed == false"
            type="primary"
            plain
            size="small"
            @click="handleEdit(scope.row)"
          >确认
          </el-button>
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleDelete(scope.row)"
          >删除
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

    <!--弹窗  确认-->
    <el-dialog :visible.sync="dialogVisible_settlement" title="确认">
      <span>是否确认所选工作单无误？</span>
      <el-form :model="creditInfo" label-width="120px" label-position="left" class="mt8">
        <el-form-item label="上传样品照片：" prop="username">
          <el-upload
            class="avatar-uploader"
            :action="prefix.lb + '/api/certification/uploadFile'"
            :on-success="handleFileSuccess"
            :before-upload="beforeFlieUpload"
            :show-file-list="false"
            :multiple="false"
            :headers="headers"
            :limit="1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              比例16:9，支持jpg、jpeg、gif、png
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
    statusTextFilter(val) {
      if (val === "testTradeCreated") {
        // 检测交易创建完成  testTradeCreated
        return "检测交易创建完成"
      } else if (val === "testQuotationCreated") {
        // 报价单创建完成 testQuotationCreated
        return "报价单创建完成"
      } else if (val === "testQuotationConfirmed") {
        // 报价单确认完成 testQuotationConfirmed
        return "报价单确认完成"
      } else if (val === "testApplicationFormCreated") {
        // 申请单创建完成 testApplicationFormCreated
        return "申请单创建完成"
      } else if (val === "testApplicationFormConfirmed") {
        // 申请单确认完成 testApplicationFormConfirmed.
        return "申请单确认完成"
      } else if (val === "testWorkOrderCreated") {
        // 工作单创建完成 testWorkOrderCreated
        return "工作单创建完成"
      } else if (val === "testWorkOrderConfirmed") {
        // 工作单确认完成 testWorkOrderConfirmed
        return "工作单确认完成"
      } else if (val === "testReportCreated") {
        // 报告单创建完成
        return "报告单创建完成"
      } else if (val === "testReportConfirmed") {
        // 报告单确认完成
        return "报告单确认完成"
      }
    }
  },
  data() {
    return {
      prefix: prefix,
      tableLoading: false,
      tableData: [],

      activeIndex: '0', // 默认全部
      // 搜索条件
      columnParam: {
        cnameOrAbbr: "",
        startDate: "",
        endDate: ""
      },
      dialogVisible_settlement: false,
      creditInfo: [],
      imageUrl: '',
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
        .dispatch("transaction/queryTestWordOrderList", queryParam)
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
    handleDelete(row) {
      this.$confirm("是否确认删除工作单？系统会同时删除报价单下所有的工作单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("transaction/deleteTestWorkOrder", { testWorkOrderId: row.id })
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$message({
                  message: data.msg,
                  type: "success"
                })
                this.handleSearchTestTradeList()
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
    handleFileSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleClick(tab, event) {
      this.handleSearchTestTradeList()
    },

    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/worksheet/show/" + data.testTradeId
      })
    },
    // 确认
    handleEdit(data) {
      this.dialogVisible_settlement = true
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/worksheet/audit/" + data.testTradeId
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
