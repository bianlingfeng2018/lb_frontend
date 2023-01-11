<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="报价单编号">
        <el-input
          v-model="columnParam.quotationNum"
          placeholder="请输入报价单编号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="客户中文名称">
        <el-autocomplete
          v-model="columnParam.clientName"
          :fetch-suggestions="queryClientCom"
          placeholder="请输入客户中文名称"
          style="width: 240px"
          clearable
          @select="onSelect"
        />
      </el-form-item>
      <el-form-item label="检测交易名称">
        <el-input
          v-model="columnParam.tradeName"
          placeholder="请输入检测交易名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="跟进人">
        <el-select v-model="columnParam.serviceId" placeholder="请选择" clearable style="display: block; width: 140px">
          <el-option v-for="item in comList" :key="item.id" :label="item.nickname" :value="item.id" />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="支付状态" prop="payStatus">
        <el-select v-model="columnParam.payStatus" placeholder="请选择" clearable style="display: block; width: 140px">
          <el-option key="-1" label="全部" value="-1" />
          <el-option key="4" label="待审核价格" value="1" />
          <el-option key="5" label="审核不通过" value="2" />
          <el-option key="0" label="未支付" value="3" />
          <el-option key="1" label="已挂账" value="4" />
          <el-option key="2" label="已付部分" value="5" />
          <el-option key="3" label="已全付" value="6" />
          <el-option key="6" label="已失效" value="7" />
        </el-select>
      </el-form-item>
      <el-form-item label="进度" prop="step">
        <el-select v-model="columnParam.step" placeholder="请选择" clearable style="display: block; width: 140px">
          <el-option key="0" label="报价单审核中" value="1" />
          <el-option key="1" label="报价单已通过" value="2" />
          <el-option key="2" label="申请单待评审" value="3" />
          <el-option key="3" label="申请单已通过" value="4" />
          <el-option key="4" label="工作单待确认" value="5" />
          <el-option key="5" label="原始记录单已生成" value="6" />
          <el-option key="6" label="检测报告单审核中" value="7" />
          <el-option key="7" label="检测报告单审核通过" value="8" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="columnParam.payStatus" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="-1" />
        <el-tab-pane label="待审核价格" name="1" />
        <el-tab-pane label="审核不通过" name="2" />
        <el-tab-pane label="已失效" name="7" />
      </el-tabs>

      <el-button
        type="primary"
        plain
        size="small"
        style="position: absolute;right:10px;top:5px;"
        @click="handleCreate"
      >新增报价 </el-button>
    </div>

    <el-table :v-loading="tableLoading" :data="tableData" stripe border class="mt8">
      <el-table-column prop="quotationNum" label="报价单编号" min-width="120" />
      <el-table-column prop="clientName" label="客户中文名称" min-width="120" />
      <el-table-column prop="tradeName" label="检测交易名称" min-width="120" />
      <el-table-column prop="totalCost" label="总金额" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.totalCost | changePrice2money }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paidAmt" label="已付金额" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.paidAmt | changePrice2money }}</span>
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
          <el-button v-if="scope.row.state == 1" type="primary" plain size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="scope.row.state == 1" type="primary" plain size="small" @click="handleCheck(scope.row)">审核
          </el-button>
          <el-button v-if="scope.row.state == 3 || scope.row.state == 5 && scope.row.step > 1" type="primary" plain size="small" @click="handleDelete(scope.row)">上传水单
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

    <!--弹窗  审核 -->
    <el-dialog :visible.sync="dialogVisible_check" title="审核">
      <el-form ref="creditInfo" :model="creditInfo" status-icon :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="审核结果：" prop="checkResult">
          <el-select v-model="creditInfo.checkResult" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="1" />
            <el-option key="1" label="审核不通过" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因：" prop="reason" :rules="creditInfo.checkResult == '0'?auditRules.reason:[{required:false}]">
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
      <el-form :model="uploadInfo" label-width="120px" status-icon label-position="left" class="mt8">
        <el-form-item label="支付金额" prop="incomeAmt">
          <el-input v-model="uploadInfo.incomeAmt" width="120" />
        </el-form-item>
        <el-form-item label="支付凭证：" prop="username">
          <el-upload
            ref="upload1"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.gif,.pdf"
            action=""
            :on-change="uploadChange"
            :on-success="onSuccess"
            :on-error="onError"
            :limit="1"
            :http-request="submitFile"
            :on-exceed="exceed"
            :file-list="multpartfile"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small">选取文件</el-button>
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
import { getClientByName } from "@/api/clientCompany"
const { prefix } = config[process.env.NODE_ENV]
import { deepClone } from "../../../../utils"
import {
  getQuotationList,
  getServiceList,
  getQuotationExamine,
  getQuotationUpload,
  getQuotationConfirm
} from "@/api/organizations"

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
      comList: [],
      // 搜索条件
      columnParam: {
        payStatus: '-1'
      },
      uploadInfo: {
        incomeAmt: '',
        quotationNum: '',
        requestId: Math.random().toString(24)
      },
      creditInfo: {
        checkResult: '',
        quotationNum: '',
        reason: '',
        requestId: Math.random().toString(24)
      },
      auditRules: {
        checkResult: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
        reason: [{ required: true, message: '请输入审核不通过原因', trigger: 'blur' }]
      },
      activeIndex: '',
      imageUrl: '',
      uploadForm: new FormData(),
      multpartfile: [],
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
    // 点击切换type
    handleClick(tab) {
      this.columnParam.payStatus = tab.name
      this.pagination.currPage = 1
      this.getListDate()
    },
    getListDate() {
      this.tableLoading = true
      const queryParam = {
        requestId: Math.random().toString(24),
        page: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const colParam = deepClone(this.columnParam)
      if (this.columnParam.payStatus == '-1') {
        colParam.payStatus = ""
      }
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
    // 获取跟进人列表
    async getComListDate() {
      const res = await getServiceList({})
      console.log(res)
      this.comList = res.data.dataList
      console.log(this.comList)
    },

    // 上传水单
    handleDelete(data) {
      this.dialogVisible_settlement = true
      this.uploadInfo.quotationNum = data.quotationNum
    },
    setCreditInfo() {
      console.log(this.uploadInfo.incomeAmt)
      if (this.uploadInfo.incomeAmt == "") {
        this.$message.error('请输入支付金额')
        return
      }
      if (this.multpartfile.length !== 0) {
        // 文件
        this.$refs.upload1.submit()
        getQuotationUpload(this.uploadForm).then((res) => {
          const { data, status } = res
          if (status == 200) {
            console.log("上传成功")
            this.uploadInfo.billPath = res.data
            const colParam = deepClone(this.uploadInfo)
            getQuotationConfirm(Object.assign({}, colParam)).then((res) => {
              const { data, status } = res
              if (status == 200) {
                this.dialogVisible_settlement = false
                this.$notify({
                  title: '成功',
                  dangerouslyUseHTMLString: true,
                  message: `操作成功`,
                  type: 'success'
                })
                this.getListDate()
              } else {
                this.$message.error(res.errMsg)
              }
            })
              .catch((e) => {
                this.$message.error(e)
              })
              .finally(() => {
                this.dialogVisible_settlement = false
              })
          } else {
            this.$message.error(res.errMsg)
          }
        })
      } else {
        this.$message.error('请上传支付凭证')
      }
    },

    uploadChange(file, fileList) {
      this.multpartfile = fileList
    },
    onSuccess(response, file) {
      this.$message({
        showClose: true,
        message: '提交成功',
        type: 'success'
      })
      this.multpartfile = []
    },
    onError(err, file, multpartfile) {
      this.$message({ showClose: true, message: err, type: 'error' })
    },
    exceed() {
      this.$message({ showClose: true, message: '请先删除已选中文件', type: 'error' })
    },
    submitFile(file) {
      this.uploadForm.append("file", file.file)
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
                this.getListDate()
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
          return false
        }
      })
    },
    queryClientCom(s, cb) {
      this.columnParam.client = ''
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
      this.columnParam.client = item.clientId
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
