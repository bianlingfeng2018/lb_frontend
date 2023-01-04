<template>
    <div class="app-container ohn">
      <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
        <el-form-item label="原始记录单编号">
          <el-input v-model="columnParam.recordNum" placeholder="请输入原始记录单编号" style="width: 240px"
                    @keydown.enter.native="onSearch" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询
          </el-button>

        </el-form-item>
      </el-form>

      <div class="lb-flex" style="position: relative;">
        <el-tabs v-model="columnParam.status" @tab-click="handleClick" style="width: 100%">
          <el-tab-pane label="全部" name="-1"/>
          <el-tab-pane label="未完成" name="0" />
          <el-tab-pane label="待审核" name="1" />
          <el-tab-pane label="审核通过" name="2" />
          <el-tab-pane label="审核不通过" name="3" />
        </el-tabs>
<!--        <el-button type="primary" plain size="small" style="position: absolute;right:10px;top:5px;" @click="handleUpload">分配-->
<!--        </el-button>-->
      </div>

      <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
        <el-table-column align="center" type="selection" min-width="80" />
        <el-table-column prop="recordNum" label="原始记录单编号" min-width="120" />
        <el-table-column prop="workOrderNum" label="工作单编号" min-width="120" />
        <el-table-column prop="reportNum" label="报告单编号" min-width="120" />
        <el-table-column prop="testItem" label="检测项目" min-width="120" />
        <el-table-column prop="testLab" label="检测实验室" min-width="120" />
        <el-table-column prop="testDeviceNo" label="检测设备号" min-width="120" />
        <el-table-column prop="testPerson" label="测试人员" min-width="120" />
        <el-table-column prop="createTime" label="创建日期" min-width="120" />
        <el-table-column prop="planDate" label="要求日期" min-width="120" />
        <el-table-column prop="reportDate" label="报告日期" min-width="120" />
        <el-table-column prop="status" label="状态" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-else-if="scope.row.status == 2">审核通过</span>
            <span v-else-if="scope.row.status == 3">审核不通过</span>
            <span v-else-if="scope.row.status == 0">未完成</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
            </el-button>
            <el-button type="primary" size="small" plain @click="handleDelete(scope.row)">编辑结果
            </el-button>
            <el-button v-if="scope.row.status == 1" type="primary" plain size="small" @click="handleEdit(scope.row)">审核
            </el-button>
            <el-button type="primary" size="small" plain @click="handleDelete(scope.row)">上传结果
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="fr mt20" :current-page="pagination.currPage" :page-sizes="[10, 20, 30, 50]"
                     :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.pageTotal"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!--弹窗  分配-->
    <el-dialog :visible.sync="dialogVisible_check" title="分配">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="测试人员" prop="email">
          <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  审核-->
    <el-dialog :visible.sync="dialogVisible_check" title="审核">
      <el-form ref="creditInfo" :model="creditInfo"  status-icon :rules="auditRules" label-width="100px" label-position="left">
        <el-form-item label="审核结果：" prop="status">
          <el-select v-model="creditInfo.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="2" />
            <el-option key="1" label="审核不通过" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="原因：" prop="reviewReason" :rules="creditInfo.checkResult == '3'?auditRules.reviewReason:[{required:false}]" >
          <el-input v-model="creditInfo.reviewReason" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="handleCheckConfirm('creditInfo')">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  上传结果1和2-->
    <el-dialog :visible.sync="dialogVisible_result" title="上传结果">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="150px" label-position="left">
        <el-form-item label="测试数值" prop="username">
          <el-input v-model="creditInfo.username" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="选择分类" prop="email">
          <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="A类" value="0" />
            <el-option key="1" label="B类" value="1" />
            <el-option key="2" label="C类" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="测试结果" prop="username">
          <span style="color: #67C23A">符合标准</span>
          <span> （限值≤20mg/kg）</span>
        </el-form-item>
        <el-form-item label="上传纸质原始记录表" prop="username">
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
            :auto-upload="false">
            <el-button slot="trigger" size="small">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">
              支持jpg、jpeg、gif、png、pdf
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_result = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  上传结果3-->
    <el-dialog :visible.sync="dialogVisible_result3" title="上传结果">
      <div>该测试项目系统无法自动得出结果。限值：</div>
      <div class="mt8" style="fontSize:16px; font-weight: bold;"> 不应出现滑脱、断裂和变形</div>
      <div class="mt20 mb10">请手动输入测试结果：</div>
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="150px" label-position="right">
        <el-form-item label="测试结果" prop="email">
          <el-radio-group v-model="creditInfo.mainContact" style="width: 240px">
            <el-radio label="通过" />
            <el-radio label="不通过" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="username">
          <el-input v-model="creditInfo.username" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="上传纸质原始记录表" prop="username">
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
            :auto-upload="false">
            <el-button slot="trigger" size="small">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">
              支持jpg、jpeg、gif、png、pdf
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_result3 = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  上传结果4-->
    <el-dialog :visible.sync="dialogVisible_result4" title="上传结果">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="150px" label-position="right">
        <el-form-item label="总数值" prop="username">
          <el-input v-model="creditInfo.username" placeholder="请输入测试总数值" style="width: 300px">
            <template slot="append">mg/kg</template>
          </el-input>
        </el-form-item>
        <el-table v-loading="tableLoading" :data="routes" stripe border style="width: 100%" class="mt8 mb10">
          <el-table-column align="center" label="序号" width="80" type="index" />
          <el-table-column align="center" prop="name" label="测试子项目" width="150" />
          <el-table-column align="center" prop="path" label="CAS号" />
          <el-table-column align="center" prop="path" label="限值" />
          <el-table-column align="center" prop="path" label="平均值" />
          <el-table-column align="center" prop="path" label="测试结果" />
        </el-table>
        <el-form-item label="测试结果" prop="username">
          <span style="color: #67C23A">符合标准</span>
          <span> （限值≤20mg/kg）</span>
        </el-form-item>
        <el-form-item label="上传纸质原始记录表" prop="username">
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
            :auto-upload="false">
            <el-button slot="trigger" size="small">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">
              支持jpg、jpeg、gif、png、pdf
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_result4 = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]
import { deepClone } from "../../../../utils"
import { getoriList, getoriDetail, getoriReview, getoriUpload } from "@/api/worksheet"
export default {
  data() {
    return {
      prefix: prefix,
      tableLoading: false,
      dialogVisible_check: false,
      dialogVisible_result: false,
      dialogVisible_result3: false,
      dialogVisible_result4: false,
      uploadForm: new FormData(),
      multpartfile: [],
      columnParam: [],
      tableData: [],
      // 搜索条件
      columnParam: {
        status: '-1'// 默认全部
      },
      dialogVisible_settlement: false,
      imageUrl: '',
      creditInfo: {
        status: '',
        id: '',
        reviewReason: '',
        requestId: Math.random().toString(24),
      },
      auditRules: {
        status: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
        reviewReason: [{ required: true, message: '请输入审核不通过原因', trigger: 'blur' }],
      },
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
        requestId: Math.random().toString(24),
        page: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      const colParam = deepClone(this.columnParam)
      if (this.columnParam.status == '-1') {
        colParam.status = ""
      }
      getoriList(Object.assign({}, queryParam,colParam))
        .then((res) => {
          const { data, status } = res
          if (status == 200) {
            console.log(data)
            this.tableData = data.dataList
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
    // 上传结果
    handleUpload(row) {
      // this.dialogVisible_result = true
      // this.dialogVisible_result3 = true
      this.dialogVisible_result4 = true
    },
    setCreditInfo() {
      console.log(this.uploadInfo.incomeAmt)
      if (this.uploadInfo.incomeAmt == "") {
        this.$message.error('请输入支付金额');
        return
      }
      if (this.multpartfile.length !== 0) {
        //文件
        this.$refs.upload1.submit();
        getoriUpload(this.uploadForm).then((res) => {
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
                this.getListDate();
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
        this.$message.error('请上传纸质原始记录表');
      }
    },
    uploadChange(file, fileList) {
      this.multpartfile = fileList;
    },
    onSuccess(response, file) {
      this.$message({
        showClose: true,
        message: '提交成功',
        type: 'success'
      });
      this.multpartfile = [];
    },
    onError(err, file, multpartfile) {
      this.$message({ showClose: true, message: err, type: 'error' });
    },
    exceed() {
      this.$message({ showClose: true, message: '请先删除已选中文件', type: 'error' });
    },
    submitFile(file) {
      this.uploadForm.append("file", file.file);
    },
    handleFileSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleClick(tab) {
      this.columnParam.contractStatus = tab.name
      this.pagination.currPage = 1
      this.handleSearchTestTradeList()
    },

    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/record/show/" + data.id
      })
    },
    // 审核
    handleEdit(row) {
      this.dialogVisible_check = true
      this.creditInfo = deepClone(row)
    },
    async handleCheckConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getoriReview(this.creditInfo)
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
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/record/audit/" + data.id
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
    onSearch() {
      this.handleSearchTestTradeList()
    },
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
