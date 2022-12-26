<template>
  <div class="app-container ohn">
    <el-form ref="searchForm" :inline="true" :model="columnParam" class="demo-form-inline" label-width="150px">
      <el-form-item label="原始记录单编号">
        <el-input
          v-model="columnParam.cnameOrAbbr"
          placeholder="请输入原始记录单编号"
          style="width: 240px"
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="tableLoading" type="primary" @click="onSearch">查询
        </el-button>

      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">
      <el-tabs v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="未完成" name="1" />
        <el-tab-pane label="待审核" name="2" />
        <el-tab-pane label="审核通过" name="2" />
        <el-tab-pane label="审核不通过" name="2" />
      </el-tabs>
      <el-button type="primary" plain size="small" style="position: absolute;right:10px;top:5px;" @click="handleEdit">分配
      </el-button>
    </div>

    <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column align="center" type="selection" min-width="80" />
      <el-table-column prop="workOrderNum" label="原始记录单编号" min-width="120" />
      <el-table-column prop="workOrderNum" label="工作单编号" min-width="120" />
      <el-table-column prop="workOrderNum" label="报告单编号" min-width="120" />
      <el-table-column prop="gmtCreate" label="检测项目" min-width="120" />
      <el-table-column prop="busyStatus" label="检测实验室" min-width="120" />
      <el-table-column prop="issuer" label="检测设备号" min-width="120" />
      <el-table-column prop="gmtOutput" label="测试人员" min-width="120" />
      <el-table-column prop="gmtOutput" label="创建日期" min-width="120" />
      <el-table-column prop="gmtOutput" label="要求日期" min-width="120" />
      <el-table-column prop="gmtOutput" label="报告日期" min-width="120" />
      <el-table-column fixed="right" label="状态" min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.confirmed == 1">待审核</span>
          <span v-else-if="scope.row.confirmed == 2">审核通过</span>
          <span v-else-if="scope.row.confirmed == 3">审核不通过</span>
          <span v-else-if="scope.row.confirmed == 4">未完成</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button type="primary" size="small" plain @click="handleDelete(scope.row)">编辑结果
          </el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">审核
          </el-button>
          <el-button type="primary" size="small" plain @click="handleUpload(scope.row)">上传结果
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

    <!--弹窗  上传结果1和2-->
    <el-dialog :visible.sync="dialogVisible_result" title="上传结果">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="150px" label-position="left">
        <el-form-item label="测试数值" prop="username">
          <el-input v-model="creditInfo.username" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="选择分类" prop="email">
          <el-select v-model="columnParam.status" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="审核通过" value="0" />
            <el-option key="1" label="审核不通过" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="测试结果" prop="username">
          <span style="color: #67C23A">符合标准</span>
          <span> （限值≤20mg/kg）</span>
        </el-form-item>
        <el-form-item label="上传纸质原始记录表" prop="username">
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
        <el-button size="small" plain @click="dialogVisible_result3 = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  上传结果4-->
    <el-dialog :visible.sync="dialogVisible_result4" title="上传结果">
      <el-form ref="auditRulesForm" :model="creditInfo" :rules="auditRules" label-width="150px" label-position="right">
        <el-form-item label="总数值" prop="username">
          <el-input v-model="creditInfo.username" placeholder="请输入测试总数值" style="width: 30wenz0px">
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
        <el-button size="small" plain @click="dialogVisible_result4 = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]
export default {

  data() {
    return {
      prefix: prefix,
      tableLoading: false,
      dialogVisible_check: false,
      dialogVisible_result: false,
      dialogVisible_result3: false,
      dialogVisible_result4: false,
      columnParam: [],
      creditInfo: [],
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
    // 上传结果
    handleUpload(row) {
      // this.dialogVisible_result = true
      // this.dialogVisible_result3 = true
      this.dialogVisible_result4 = true
    },
    handleFileSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleClick(tab, event) {
      this.handleSearchTestTradeList()
    },

    handleShow(data) {
      this.$router.push({
        path: "/tm/detection/record/show/" + data.testTradeId
      })
    },
    // 确认
    handleEdit(data) {
      this.dialogVisible_check = true
    },
    handleAudit(data) {
      this.$router.push({
        path: "/tm/detection/record/audit/" + data.testTradeId
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
