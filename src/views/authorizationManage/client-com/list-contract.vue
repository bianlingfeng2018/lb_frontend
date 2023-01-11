<template>

  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
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
      <el-form-item label="合同结束日期">
        <el-date-picker
          v-model="operTime"
          type="daterange"
          clearable
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="columnParam.contractStatus" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="-1" />
        <el-tab-pane label="待审核" name="0" />
        <el-tab-pane label="生效中" name="1" />
        <el-tab-pane label="审核不通过" name="2" />
        <el-tab-pane label="已失效" name="3" />
      </el-tabs>
      <el-button
        type="primary"
        plain
        size="small"
        style="position: absolute;right:10px;top:5px;"
        @click="handleCreate"
      >添加合同
      </el-button>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column prop="clientNum" label="客户编号" min-width="120" />
      <el-table-column prop="clientName" label="客户中文名称" min-width="120" />
      <el-table-column prop="contractStartDate" label="合同开始日期" min-width="120" />
      <el-table-column prop="contractEndDate" label="合同结束日期" min-width="120" />
      <el-table-column prop="contractStatus" label="合同状态" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.contractStatus == 0">待审核</span>
          <span v-else-if="scope.row.contractStatus == 1">生效中</span>
          <span v-else-if="scope.row.contractStatus == 2">审核不通过</span>
          <span v-else-if="scope.row.contractStatus == 3">已失效</span>
        </template>
      </el-table-column>
      <el-table-column prop="balanceAmt" label="可用额度" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.balanceAmt | changePrice2money }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unsettledAmt" label="未核销金额" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.unsettledAmt | changePrice2money }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="settlePeriod" label="结算周期" min-width="120" />
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="scope.row.contractStatus == 0" type="primary" plain size="small" @click="handleCheck(scope.row)">审核
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

    <!--弹窗  添加//编辑客户合同-->
    <el-dialog :visible.sync="add_dialogVisible" :title="add_dialogType==='new'?'添加客户合同':'编辑客户合同'">
      <el-form
        ref="add_creditInfo"
        :model="add_creditInfo"
        status-icon
        :rules="auditRules"
        label-width="140px"
        label-position="left"
      >
        <el-form-item label="客户名称：" prop="clientName">
          <el-select
            clearable
            v-model="add_creditInfo.clientName"
            value-key="id"
            filterable
            placeholder="请输入后选择"
            style="width: 240px"
            @change="changeSelectName"
          >
            <el-option
              v-for="item in searchNamelist"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同有效期：" prop="contractTime">
          <el-date-picker
            clearable
            v-model="add_creditInfo.contractTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 240px"
            @change="changeTxnBtn"
          />
        </el-form-item>
        <el-form-item label="是否挂账：" prop="type">
          <el-radio-group v-model="add_creditInfo.type" style="width: 240px">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="结算周期(天)：" prop="settlePeriod">
          <el-input v-model="add_creditInfo.settlePeriod" placeholder="" type="number" style="width: 240px" />
        </el-form-item>
        <el-form-item label="合同附件：">
          <el-upload
            ref="upload1"
            accept=".pdf"
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
            {{ add_creditInfo.contractPath }}
            <div slot="tip" class="el-upload__tip">
              支持pdf格式，单个文件可超过50M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button size="small" plain @click="add_dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="onSubmit('add_creditInfo')">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  查看//审核客户合同-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='new'?'查看客户合同':'审核客户合同'">
      <el-form
        ref="creditInfo"
        :model="creditInfo"
        :rules="reviewReasonRules"
        label-width="140px"
        label-position="left"
      >
        <el-form-item label="客户名称：">{{ creditInfo.clientName }}</el-form-item>
        <el-form-item label="合同有效期：">{{ creditInfo.contractStartDate }} 至 {{ creditInfo.contractEndDate }}</el-form-item>
        <el-form-item label="是否挂账：">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">是</span>
            <span v-else-if="scope.row.type == 0">否</span>
          </template>
        </el-form-item>
        <el-form-item label="结算周期：">{{ creditInfo.settlePeriod }} 天</el-form-item>
        <el-form-item label="合同附件：">
          <el-button type="text" @click="handleTo(creditInfo.contractPath)">{{ creditInfo.contractPath }}</el-button>
        </el-form-item>
        <el-form-item v-if="dialogType==='edit'" label="审核结果：" prop="reviewStatus">
          <el-select v-model="creditInfo.reviewStatus" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="1" />
            <el-option key="1" label="审核不通过" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="dialogType==='edit'"
          label="原因："
          prop="reviewReason"
          :rules="creditInfo.reviewStatus == '2'?reviewReasonRules.reviewReason:[{required:false}]"
        >
          <el-input v-model="creditInfo.reviewReason" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo('creditInfo')">确认</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { changePrice2money } from "@/utils/simple-util"
import {
  getContractList,
  getContractAdd,
  getContractModify,
  getContractDetail,
  getContractReview,
  getContractUpload,
  getContractDownload
} from "@/api/contract"
import {
  getSearchName
} from "@/api/organizations"
import { getClientByName } from "@/api/clientCompany"
import { deepClone } from "@/utils"
import config from "@/utils/config"

const { prefix } = config[process.env.NODE_ENV]
export default {
  filters: {
    changePrice2money
  },
  data() {
    return {
      prefix: prefix,
      uploadForm: new FormData(),
      columnParam: {
        clientName: '',
        contractEndDate: '',
        contractStartDate: '',
        contractStatus: '-1'
      },
      add_dialogType: 'new',
      add_dialogVisible: false,
      add_creditInfo: {
        clientId: '',
        clientName: '',
        clientNum: '',
        contractStartDate: '',
        contractEndDate: '',
        settlePeriod: '',
        type: '',
        contractPath: '',
        contractTime: [],
      },
      auditRules: {
        clientName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        contractTime: [{ required: true, message: '请输入合同有效期', trigger: 'change' }],
        type: [{ required: true, message: '请选择是否入账', trigger: 'change' }],
        settlePeriod: [{ required: true, message: '请输入结算周期', trigger: 'blur' }]
      },
      reviewReasonRules: {
        reviewStatus: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
        reviewReason: [{ required: true, message: '请输入审核不通过原因', trigger: 'blur' }]
      },
      imageUrl: '',
      radio: '1',
      multpartfile: [],
      searchNamelist: [], // 客户公司列表
      clientList: [],
      goodsInfo: {
        requestId: Math.random().toString(24)
      },
      goodsloading: false,
      dialogType: 'new',
      dialogVisible: false,
      creditInfo: [],
      tableLoading: false,
      tableData: [],
      operTime: [],

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
    handleClick(tab) {
      this.columnParam.contractStatus = tab.name
      this.pagination.currPage = 1
      this.handleSearchTestTradeList()
    },
    handleSearchTestTradeList() {
      this.tableLoading = true
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const columnParam = deepClone(this.columnParam)
      if (this.columnParam.contractStatus == '-1') {
        columnParam.contractStatus = ""
      }
      if (this.operTime !== null) {
        columnParam.contractStartDate = this.operTime[0]
        columnParam.contractEndDate = this.operTime[1]
      }
      getContractList(Object.assign({}, queryParam, columnParam)).then(res => {
        const { data, status } = res
        if (status == 200) {
          this.tableData = data.dataList
          this.pagination.currPage = data.pageNum
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
    changeTxnBtn() {
      const that = this
      if (!that.add_creditInfo.contractTime) {
        that.add_creditInfo.contractTime = []
      }
      this.add_creditInfo.contractStartDate = this.add_creditInfo.contractTime[0] || ''
      this.add_creditInfo.contractEndDate = this.add_creditInfo.contractTime[1] || ''
    },
    // 获取info列表
    async getDataInfoList() {
      // 获取客户列表
      const res0 = await getSearchName({
        clientName: '',
        requestId: Math.random().toString(24)
      })
      this.searchNamelist = res0.data.dataList
    },
    // 选中客户
    changeSelectName(item) {
      console.log(item)
      this.add_creditInfo.clientName = item.name
      this.add_creditInfo.clientId = item.id
      this.add_creditInfo.clientNum = item.clientNum
    },
    // 查看下载PDF文件
    handleTo(fileName) {
      console.log(fileName)
      fetch(
        prefix.lb +
          "/contract/download?fileName=" + fileName,
        {
          method: "GET",
          responseType: "blob"
        }
      )
        .then((res) => res.blob())
        .then((data) => {
          const blobUrl = window.URL.createObjectURL(data)
          const a = document.createElement("a")
          a.download = fileName
          a.href = blobUrl
          a.click()
          this.$message({
            type: "success",
            message: "文件下载成功"
          })
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "文件下载失败，请稍后再试~"
          })
        })
        .finally(() => {
        })
    },
    // 添加合同
    // 提交
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 数据
          // this.uploadForm.append("form",JSON.stringify(this.add_creditInfo));
          if (this.multpartfile.length !== 0) {
            // 文件
            this.$refs.upload1.submit()
            getContractUpload(this.uploadForm).then((res) => {
              const { data, status } = res
              if (status == 200) {
                console.log("上传成功")
                this.add_creditInfo.contractPath = res.data
                const colParam = deepClone(this.add_creditInfo)
                if (this.add_dialogType == 'new') {
                  // 添加
                  getContractAdd(Object.assign({}, colParam)).then((res) => {
                    const { data, status } = res
                    if (status == 200) {
                      this.add_dialogVisible = false
                      this.$notify({
                        title: '成功',
                        dangerouslyUseHTMLString: true,
                        message: `操作成功`,
                        type: 'success'
                      })
                      this.handleSearchTestTradeList()
                    } else {
                      this.$message.error(res.errMsg)
                    }
                  })
                    .catch((e) => {
                      this.$message.error(e)
                    })
                    .finally(() => {
                      this.add_dialogVisible = false
                    })
                } else {
                  // 编辑
                  getContractModify(Object.assign({}, colParam)).then((res) => {
                    const { data, status } = res
                    if (status == 200) {
                      this.add_dialogVisible = false
                      this.$notify({
                        title: '成功',
                        dangerouslyUseHTMLString: true,
                        message: `操作成功`,
                        type: 'success'
                      })
                      this.handleSearchTestTradeList()
                    } else {
                      this.$message.error(res.errMsg)
                    }
                  })
                    .catch((e) => {
                      this.$message.error(e)
                    })
                    .finally(() => {
                      this.add_dialogVisible = false
                    })
                }
              } else {
                this.$message.error(res.errMsg)
              }
            })
              .catch((e) => {
                this.$message.error(e)
              })
              .finally(() => {
                this.dialogVisible = false
              })
          } else {
            const colParam = deepClone(this.add_creditInfo)
            if (this.add_dialogType == 'new') {
              // 添加
              getContractAdd(Object.assign({}, colParam)).then((res) => {
                const { data, status } = res
                if (status == 200) {
                  this.add_dialogVisible = false
                  this.$notify({
                    title: '成功',
                    dangerouslyUseHTMLString: true,
                    message: `操作成功`,
                    type: 'success'
                  })
                  this.handleSearchTestTradeList()
                } else {
                  this.$message.error(res.errMsg)
                }
              })
                .catch((e) => {
                  this.$message.error(e)
                })
                .finally(() => {
                  this.add_dialogVisible = false
                })
            } else {
              // 编辑
              getContractModify(Object.assign({}, colParam)).then((res) => {
                const { data, status } = res
                if (status == 200) {
                  this.add_dialogVisible = false
                  this.$notify({
                    title: '成功',
                    dangerouslyUseHTMLString: true,
                    message: `操作成功`,
                    type: 'success'
                  })
                  this.handleSearchTestTradeList()
                } else {
                  this.$message.error(res.errMsg)
                }
              })
                .catch((e) => {
                  this.$message.error(e)
                })
                .finally(() => {
                  this.add_dialogVisible = false
                })
            }
          }
        } else {
          return false
        }
      })
    },
    handleCreate() {
      this.add_dialogType = 'new'
      this.add_dialogVisible = true
      this.add_creditInfo = []
      this.getDataInfoList()
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
    // 获取合同详情
    async getContract(data) {
      const res0 = await getContractDetail({
        clientId: data.clientId,
        requestId: Math.random().toString(24)
      })
      this.creditInfo = res0.data
      console.log(this.creditInfo)
    },
    // 查看合同
    handleShow(data) {
      this.dialogType = 'new'
      this.getContract(data)
      this.dialogVisible = true
      this.multpartfile = []
    },
    // 编辑合同
    handleEdit(data) {
      this.add_dialogType = 'edit'
      // this.getContract(data)
      const queryParam = {
        clientId: data.clientId,
        requestId: Math.random().toString(24)
      }
      getContractDetail(Object.assign({}, queryParam))
        .then((res) => {
          const { data, status } = res
          if (status == 200) {
            this.creditInfo = res.data
            this.add_creditInfo = this.creditInfo
            this.contractTime = [this.creditInfo.contractStartDate, this.creditInfo.contractEndDate]
            console.log(this.add_creditInfo)
            this.multpartfile = []
            this.add_dialogVisible = true
          } else {
            this.$message.error(res.errMsg)
          }
        })
        .catch((e) => {
          this.$message.error(e)
        })
    },
    // 审核合同
    handleCheck(data) {
      this.dialogType = 'edit'
      this.getContract(data)
      this.dialogVisible = true
    },
    // 审核操作
    setCreditInfo(formName) {
      if (this.dialogType == 'edit') { // 审核
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const queryParam = {
              requestId: Math.random().toString(24),
              clientId: this.creditInfo.clientId,
              reviewReason: this.creditInfo.reviewReason,
              reviewStatus: this.creditInfo.reviewStatus
            }
            getContractReview(Object.assign({}, queryParam))
              .then((res) => {
                const { data, status } = res
                if (status == 200) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '成功',
                    dangerouslyUseHTMLString: true,
                    message: `操作成功`,
                    type: 'success'
                  })
                  this.handleSearchTestTradeList()
                } else {
                  this.$message.error(res.errMsg)
                }
              })
              .catch((e) => {
                this.$message.error(e)
              })
              .finally(() => {
                this.dialogVisible = false
              })
          } else {
            return false
          }
        })
      } else { // 查看
        this.dialogVisible = false
      }
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/apply/audit/" + data.testTradeId
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
    // 搜索
    onSearch() {
      this.handleSearchTestTradeList()
    }

  }
}
</script>
<style scoped>

</style>

