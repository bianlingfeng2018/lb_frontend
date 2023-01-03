<template>
  <div class="app-container ohn">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="columnParam"
      class="demo-form-inline"
      label-width="150px">
      <el-form-item label="工作单编号">
        <el-input
          v-model="columnParam.workOrderNum"
          placeholder="请输入工作单编号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="检测单位名称">
        <el-input
          v-model="columnParam.comName"
          placeholder="请输入检测单位名称"
          style="width: 240px"
          clearable
        />
      </el-form-item>

      <el-form-item label="是否分包商">
        <el-select v-model="columnParam.subContract " placeholder="请选择" clearable style="display: block; width: 140px">
          <el-option key="0" label="是" value="1"/>
          <el-option key="1" label="否" value="0"/>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="'要求日期'">
        <el-date-picker
          clearable
          v-model="planDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"/>
      </el-form-item>
      <el-form-item :label="'出单日期'">
        <el-date-picker
          clearable
          v-model="orderDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="lb-flex" style="position: relative;">

      <el-tabs v-model="columnParam.status " style="width: 100%" @tab-click="handleClick">
        <el-tab-pane label="全部" name="-1"/>
        <el-tab-pane label="待确认" name="0"/>
        <el-tab-pane label="已确认" name="1"/>
      </el-tabs>
<!--      <el-button-->
<!--        type="primary"-->
<!--        plain-->
<!--        size="small"-->
<!--        style="position: absolute;right:10px;top:5px;"-->
<!--        @click="handleEdit"-->
<!--      >确认-->
<!--      </el-button>-->
    </div>

    <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column align="center" type="selection" min-width="80"/>
      <el-table-column prop="workOrderNum" label="工作单编号" min-width="120"/>
      <el-table-column prop="orderDate" label="开单日期" min-width="120"/>
      <el-table-column prop="service" label="是否加急" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.service  == 0">不加急</span>
          <span v-else-if="scope.row.service  == 1">加急</span>
          <span v-else-if="scope.row.service  ==2">特急</span>
        </template>
      </el-table-column>
      <el-table-column prop="planDate" label="要求完成日期" min-width="120"/>
      <el-table-column prop="outputDate" label="出单日期" min-width="120"/>
      <el-table-column prop="comName" label="检测单位名称" min-width="120"/>
      <el-table-column prop="subContract" label="是否分包商" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.subContract  == 1">是</span>
          <span v-else-if="scope.row.subContract  == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.status  == 0">待确认</span>
          <span v-else-if="scope.row.status  == 1">已确认</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button v-if="scope.row.status  == 0" type="primary" plain size="small" @click="handleEdit(scope.row)">确认
          </el-button>
          <el-button v-if="scope.row.status  == 0" type="primary" plain size="small" @click="handleDelete(scope.row)">删除
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

    <!--弹窗  确认-->
    <el-dialog :visible.sync="dialogVisible_settlement" title="确认">
      <span>是否确认所选工作单无误？</span>
      <el-form label-width="120px" label-position="left" class="mt8">
        <el-form-item label="上传样品照片：" prop="username">
          <el-upload
            ref="upload1"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.gif"
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
  import { changePrice2money } from "@/utils/simple-util"
  import { deepClone } from "../../../../utils"
  import { getworkOrderList, getworkConfirm, getworkDelete, getworkUpload } from "@/api/worksheet"

  export default {
    filters: {
      changePrice2money
    },
    data() {
      return {
        prefix: prefix,
        tableLoading: false,
        tableData: [],
        // 搜索条件
        columnParam: {
          status: '-1'// 默认全部
        },
        planDate: [],
        orderDate: [],
        dialogVisible_settlement: false,
        creditInfo: [],
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
      console.log(this.planDate)
      if (this.planDate !== null) {
        colParam.planDateStart = this.planDate[0]
        colParam.planDateEnd = this.planDate[1]
      }
      if (this.orderDate !== null) {
        colParam.orderDateStart = this.orderDate[0]
        colParam.orderDateEnd = this.orderDate[1]
      }
      getworkOrderList(Object.assign({}, queryParam, colParam))
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
    // 确认
    handleEdit(data) {
      this.dialogVisible_settlement = true
      this.creditInfo.id = data.id
    },
    //确认工作单
    setCreditInfo() {
      if (this.multpartfile.length !== 0) {
        //文件
        this.$refs.upload1.submit();
        getworkUpload(this.uploadForm).then((res) => {
          const { data, status } = res
          if (status == 200) {
            console.log("上传成功")
            this.creditInfo.fileName = res.data
            const colParam = deepClone(this.creditInfo)
            getworkConfirm(Object.assign({}, colParam)).then((res) => {
              const { data, status } = res
              if (status == 200) {
                this.dialogVisible_settlement = false
                this.$notify({
                  title: '成功',
                  dangerouslyUseHTMLString: true,
                  message: `操作成功`,
                  type: 'success'
                })
                this.handleSearchTestTradeList();
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
      }else{
        const colParam = deepClone(this.creditInfo)
        getworkConfirm(Object.assign({}, colParam)).then((res) => {
          const { data, status } = res
          if (status == 200) {
            this.dialogVisible_settlement = false
            this.$notify({
              title: '成功',
              dangerouslyUseHTMLString: true,
              message: `操作成功`,
              type: 'success'
            })
            this.handleSearchTestTradeList();
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
      }
    },
    handleDelete(row) {
      this.$confirm("是否确认删除工作单？系统会同时删除报价单下所有的工作单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const queryParam = {
            requestId: Math.random().toString(24),
            id: row.id,
          }
          getworkDelete(Object.assign({}, queryParam))
            .then((res) => {
              const { data, status } = res
              if (status == 200) {
                this.$notify({
                  title: '成功',
                  dangerouslyUseHTMLString: true,
                  message: `操作成功`,
                  type: 'success'
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
        path: "/tm/detection/worksheet/show/" + data.id
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

