<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="报价单编号" >
        <el-input
          v-model="columnParam.quotationNum"
          placeholder="请输入报价单编号" clearable
          style="width: 240px" />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-input
          v-model="columnParam.clientName"
          placeholder="请输入客户中文名称" clearable
          style="width: 240px" />
      </el-form-item>
      <el-form-item label="检测交易名称">
        <el-input
          v-model="columnParam.tradeName"
          placeholder="请输入检测交易名称" clearable
          style="width: 240px" />
      </el-form-item>
      <el-form-item label="跟进人">
        <el-select v-model="columnParam.serviceId" placeholder="请选择" style="display: block; width: 140px">
          <el-option v-for="item in comList" :key="item.id" :label="item.nickname" :value="item.id" />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="支付状态" prop="payStatus">
        <el-select v-model="columnParam.payStatus" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="未支付" value="3" />
          <el-option key="1" label="已挂账" value="4" />
          <el-option key="2" label="已付部分" value="5" />
          <el-option key="3" label="已全付" value="6" />
        </el-select>
      </el-form-item>
      <el-form-item label="进度" prop="step">
        <el-select v-model="columnParam.step" placeholder="请选择" style="display: block; width: 140px">
          <el-option key="0" label="报价单审核中" value="1" />
          <el-option key="1" label="报价单已通过" value="2" />
          <el-option key="2" label="申请单待评审" value="3" />
          <el-option key="3" label="申请单已通过" value="4" />
          <el-option key="3" label="工作单待确认" value="5" />
          <el-option key="3" label="原始记录单已生成" value="6" />
          <el-option key="3" label="检测报告单审核中" value="7" />
          <el-option key="3" label="检测报告单审核通过" value="8" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="待审核价格" name="1" />
        <el-tab-pane label="审核不通过" name="2" />
        <el-tab-pane label="已失效" name="7" />
      </el-tabs>

      <el-button
        type="primary"
        plain
        size="small"
        style="position: absolute;right:10px;top:5px;"
        @click="handleCreate" >新增报价 </el-button>
    </div>

    <el-table :v-loading="tableLoading" :data="tableData" stripe border class="mt8">
      <el-table-column prop="quotationNum" label="报价单编号" min-width="120" />
      <el-table-column prop="clientName" label="客户中文名称" min-width="120" />
      <el-table-column prop="tradeName" label="检测交易名称" min-width="120" />
      <el-table-column prop="totalCost" label="总金额" min-width="100" >
        <template slot-scope="scope">
        <span >{{scope.row.totalCost | changePrice2money}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paidAmt" label="已付金额" min-width="100" >
        <template slot-scope="scope">
        <span >{{scope.row.paidAmt | changePrice2money}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 1">价格待审核</span>
          <span v-else-if="scope.row.state == 2">价格审核不通过</span>
          <span v-else-if="scope.row.state == 3">未支付</span>
          <span v-else-if="scope.row.state == 4">已挂账</span>
          <span v-else-if="scope.row.state == 5">已付部分</span>
          <span v-else-if="scope.row.state == 6">已全付</span>
        </template>
      </el-table-column>
      <el-table-column prop="step" label="进度" min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.step == 1">报价单审核中</span>
          <span v-else-if="scope.row.step == 2">报价单已通过</span>
          <span v-else-if="scope.row.step == 3">申请单待评审</span>
          <span v-else-if="scope.row.step == 4">申请单已通过</span>
          <span v-else-if="scope.row.step == 5">工作单待确认</span>
          <span v-else-if="scope.row.step == 6">原始记录单已生成</span>
          <span v-else-if="scope.row.step == 7">检测报告单审核中</span>
          <span v-else-if="scope.row.step == 8">检测报告单审核通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="报价时间" min-width="120" />
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="scope.row.state == 1" type="primary" plain size="small" @click="handleCheck(scope.row)">审核
          </el-button>
          <el-button v-if="scope.row.state == 3 || scope.row.state == 5 || scope.row.step > 1" type="primary" plain size="small" @click="handleDelete(scope.row)">上传水单
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
      @current-change="handleCurrentChange" />

    <!--弹窗  审核 -->
    <el-dialog :visible.sync="dialogVisible_check" title="审核">
      <el-form ref="creditInfo" :model="creditInfo"  status-icon :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="审核结果：" prop="checkResult">
          <el-select v-model="creditInfo.checkResult" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="1" />
            <el-option key="1" label="审核不通过" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因：" prop="reason" :rules="creditInfo.checkResult == '0'?auditRules.reason:[{required:false}]" >
          <el-input v-model="creditInfo.reason" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="handleCheckConfirm('creditInfo')">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  上传水单-->
    <el-dialog :visible.sync="dialogVisible_settlement" title="上传水单">
      <el-form :model="uoploadInfo" label-width="120px" label-position="left" class="mt8">
        <el-form-item label="支付金额" prop="username">
          <el-input v-model="uoploadInfo.username" width="120" />
        </el-form-item>
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
  import { changePrice2money } from "@/utils/simple-util"
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]
import { deepClone } from "../../../../utils"
import { getQuotationList,getServiceList,getQuotationExamine } from "@/api/organizations"
export default {
  filters: {
    changePrice2money
  },
  data() {
    return {
      prefix: prefix,
      dialogVisible_check: false,
      dialogVisible_settlement: false,
      tableLoading: false,
      tableData: [],
      comList:[],
      // 搜索条件
      columnParam: {},
      uoploadInfo:{},
      creditInfo: {
        checkResult:'',
        quotationNum:'',
        reason:'',
        requestId: Math.random().toString(24),
      },
      auditRules: {
        checkResult: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
        reason: [{ required: true, message: '请输入审核不通过原因', trigger: 'blur' }],
      },
      activeIndex:'',
      imageUrl:'',
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  created() {
    this.getListDate()
    this.getComListDate()
  },
  methods: {
    getListDate() {
      this.tableLoading = true
      const queryParam = {
        requestId: Math.random().toString(24),
        page: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const colParam = deepClone(this.columnParam)
      getQuotationList(Object.assign({}, queryParam, colParam))
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
    //获取跟进人列表
    async getComListDate() {
      const res = await getServiceList({
      })
      console.log(res)
      this.comList = res.data.dataList
      console.log(this.comList)
    },
    //点击切换type
    handleClick(tab, event) {
      console.log(tab, event);
    },
    setCreditInfo(){

    },
    // 上传水单
    handleDelete(row) {
      this.dialogVisible_settlement = true
    },
    handleCreate() {
      this.$router.push({
        path: "/tm/detection/quotation/create"
      })
    },
    // 查看
    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/quotation/show/" + data.quotationNum
      })
    },
    // 编辑
    handleEdit(data) {
      this.$router.push({
        path: "/tm/detection/quotation/edit/" + data.quotationNum
      })
    },

    // 审核
    async handleCheckConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getQuotationExamine(this.creditInfo)
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
    handleCheck(row) {
      this.dialogVisible_check = true
      this.creditInfo = deepClone(row)
      console.log(this.creditInfo)
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/quotation/audit/" + data.testTradeId
      })
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
      this.getListDate()
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
