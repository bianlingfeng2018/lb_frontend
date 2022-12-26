<template>
  <div class="app-container ohn transaction-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />
      检测工作单
      <span v-if="agreeToSubcontract">（分包）</span>
    </div>
    <el-divider class="mt50" content-position="left">基本信息</el-divider>
    <el-form
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="150px"
    >
      <el-form-item :label="'报告编号\nWorkOrder No'" prop="workOrderNum">
        <el-input
          v-model="postForm.workOrderNum"
          placeholder="请输入报告编号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'开单人\nIssuer'" prop="issuer">
        <el-input
          v-model="postForm.issuer"
          placeholder="请输入开单人"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'测试人员\nTest'" prop="testId">
        <el-select
          v-model="postForm.testId"
          placeholder="请选择"
          style="width: 240px"
          @input="onChange"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'负责人\nEmployee'" prop="employee">
        <el-input
          v-model="postForm.employee"
          placeholder="请输入负责人"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'客户\nCustomer'" prop="customer">
        <el-input
          v-model="postForm.customer"
          placeholder="请输入客户"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'加急情况\nUrgent'" prop="busyStatus">
        <el-radio-group v-model="postForm.busyStatus" style="width: 240px">
          <el-radio label="50%加急" />
          <el-radio label="100%加急" />
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="'开单时间\nDate'" prop="gmtCreate">
        <el-date-picker
          v-model="postForm.gmtCreate"
          value-format="timestamp"
          type="date"
          placeholder="请选择开单时间"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'出单时间\nDate'" prop="gmtOutput">
        <el-date-picker
          v-model="postForm.gmtOutput"
          value-format="timestamp"
          type="date"
          placeholder="请选择出单时间"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'是否退样\nWithdraw'" prop="withdraw">
        <el-radio-group v-model="postForm.withdraw">
          <el-radio label="否" />
          <el-radio label="退样" />
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item :label="'编制人\nEditor'" prop="editorId">
        <el-select
          v-model="postForm.editorId"
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in userList3"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'审核人\nReviewer'" prop="reviewerId">
        <el-select
          v-model="postForm.reviewerId"
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in userList2"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'请选择批准人\nApprove'" prop="approverId">
        <el-select
          v-model="postForm.approverId"
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in userList1"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-divider content-position="left">样品单明细</el-divider>

      <vxe-toolbar ref="xToolbar">
        <template #tools>
          <el-button
            type="primary"
            size="small"
            plain
            @click="insertEvent"
          >新增</el-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        ref="xTable"
        border
        show-footer
        show-overflow
        class="editable-footer mb20"
        :merge-footer-items="mergeFooterItems"
        :row-config="{ isHover: true }"
        :export-config="{}"
        :footer-cell-class-name="footerCellClassName"
        :data="postForm.testWorkOrderItemList"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        @edit-closed="editClose"
      >
        <vxe-column type="seq" width="60" :title="'序号\nNum'" align="right" />
        <vxe-column
          field="sampleDesc"
          :title="'样品描述\nSampleDesc'"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.sampleDesc" type="text" />
          </template>
        </vxe-column>
        <vxe-column
          field="sampleLocation"
          :title="'取样部位(位置)\nSampleLocation'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.sampleLocation"
              type="text"
              :min="1"
              :max="120"
              @change="updateFooterEvent"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="testItemsMethod"
          :title="'测试项目及测试方法\nTestItemsMethod'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.testItemsMethod"
              type="text"
              @input="updateFooterEvent"
            />
          </template>
        </vxe-column>

        <vxe-column
          field="remark"
          :title="'备注\nremark'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.remark"
              type="text"
              @input="updateFooterEvent"
            />
          </template>
        </vxe-column>
        <vxe-column title="操作" width="80">
          <template #default="{ row }">
            <el-button
              type="text"
              status="primary"
              @click="deleteEvent(row)"
            >删除</el-button>
          </template>
        </vxe-column>
      </vxe-table>
      <el-divider content-position="left">其他</el-divider>
      <my-flex-table ref="myFlexTable" :editable="true" :flex-obj="postForm.flexObj" />
      <p />
      <el-form-item>
        <div class="tr">
          <el-button
            v-loading="formLoading"
            type="primary"
            @click="submitForm('postForm')"
          >保存</el-button>
          <el-button @click="resetForm('postForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import methods from "../../pub_methods/validate"
import { queryTestTradeDetail } from "@/api/transaction"
import VXETable from "vxe-table"
import { getAllUsersByRole } from "@/api/user"
import { timeFormatFilter } from "@/utils/simple-util"
import MyFlexTable from "@/views/components/MyFlexTable"

export default {
  components: { MyFlexTable },
  filters: {
    timeFormatFilter
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      agreeToSubcontract: false,
      userList1: [],
      userList2: [],
      userList3: [],
      userList: [],
      formLoading: false,
      rules: methods.worksheetCreateValidate,
      postForm: {
        testTradeId: "-1",
        workOrderNum: "",
        issuer: "",
        busyStatus: "",
        gmtCreate: "",
        gmtOutput: "",
        withdraw: "",
        employee: "",
        customer: "",
        testId: undefined,
        testWorkOrderItemList: [
          {
            sampleDesc: "金黄烤鸭",
            sampleLocation: "鸭子嘴",
            testItemsMethod: "用金刚石测试鸭子嘴硬度",
            remark: "分包"
          }
        ],
        flexObj: []
      },
      mergeFooterItems: [
        { row: 0, col: 0, rowspan: 0, colspan: 8 }
        // { row: 0, col: 1, rowspan: 9, colspan: 9 },
      ],
      customerOptions: [
        { key: 1, value: "中文纸质档" },
        { key: 2, value: "中文电子档" },
        { key: 3, value: "英文电子档" },
        { key: 4, value: "英文纸质档" }
      ],
      allowAdd: true
    }
  },
  created() {
    this.getUsers1()
    this.getUsers2()
    this.getUsers3()
    this.getUsers()

    this.tempRoute = Object.assign({}, this.$route)
    if (this.isEdit) {
      // edit
      const id = this.$route.params && this.$route.params.id
      this.tmpTestTradeId = id
      this.fetchData(id)
    } else {
      // create
      this.tmpTestTradeId = this.$route.query.id
      this.setTagsViewTitle()
      this.setPageTitle()
      this.fetchDataAndFill(this.tmpTestTradeId)
    }
    this.postForm.testTradeId = this.tmpTestTradeId
  },
  methods: {
    async getUsers1() {
      const res = await getAllUsersByRole({
        role: '批准人'
      })
      console.log(res)
      this.userList1 = res.data
    },
    async getUsers2() {
      const res = await getAllUsersByRole({
        role: '审核人'
      })
      console.log(res)
      this.userList2 = res.data
    },
    async getUsers3() {
      const res = await getAllUsersByRole({
        role: '编制人'
      })
      console.log(res)
      this.userList3 = res.data
    },
    onChange: function(val) {
      console.log(val)
      for (const u of this.userList) {
        if (u.id === val) {
          this.postForm.employee = u.nickname
          break
        }
      }
    },
    async getUsers() {
      const res = await getAllUsersByRole({
        role: '测试'
      })
      console.log(res)
      this.userList = res.data
    },
    fetchDataAndFill: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        const testApplicationForm = response.data.testApplicationForm
        this.postForm.workOrderNum = testApplicationForm.reportNum
        this.postForm.issuer = testApplicationForm.csName
        this.postForm.gmtCreate = testApplicationForm.recDate
        this.postForm.gmtOutput = testApplicationForm.reportDate
        this.postForm.customer = testApplicationForm.contact
        this.agreeToSubcontract = testApplicationForm.agreeToSubcontract === '是'
      }).catch(err => {
        console.log(err)
      })
    },
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testWorkOrder
        if (this.postForm.flexObj == null) {
          this.postForm.flexObj = []
        }

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑检测工作单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tmpTestTradeId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑检测工作单'
      document.title = `${title} - ${this.tmpTestTradeId}`
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // validate xTable
          const errMap = await this.$refs.xTable
            .validate(true)
            .catch((errMap) => errMap)
          if (errMap) {
            console.log('errMap')
            const msgList = []
            Object.values(errMap).forEach(errList => {
              errList.forEach(params => {
                const { rowIndex, column, rules } = params
                rules.forEach(rule => {
                  msgList.push(`第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message}`)
                })
              })
            })
            VXETable.modal.message({
              status: 'error',
              slots: {
                default() {
                  return [
                    // <div class='red' style='max-height: 400px;overflow: auto;'>
                    //   {
                    //     msgList.map(msg => <div>{msg}</div>)
                    //   }
                    // </div>
                  ]
                }
              }
            })
            return
          } else {
            // VXETable.modal.message({ status: 'success', content: '校验成功！' })
          }
          // assemble data
          const tableData = this.$refs.xTable.getTableData()
          this.postForm.testWorkOrderItemList = tableData.tableData
          console.log(this.postForm)
          if (this.postForm.testWorkOrderItemList.length === 0) {
            this.$message.warning("请填写工作单明细")
            return
          }
          const flexObj = this.postForm.flexObj
          if (flexObj != null) {
            this.postForm.flexObj = JSON.stringify(flexObj)
          }
          // request backend
          this.formLoading = true
          this.$store
            .dispatch(
              this.isEdit ? "transaction/updateTestWorkOrder" : "transaction/saveTestWorkOrder",
              this.postForm
            )
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.resetForm(formName)
                this.$message.success(data.msg)
                this.goBack()
              } else {
                this.$message.error(errorMessage)
              }
            })
            .catch(() => {
            })
            .finally(() => {
              this.formLoading = false
            })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.postForm.testWorkOrderItemList = []
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/worksheet/list"
      })
    },
    footerCellClassName({ $rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if ($rowIndex === 0) {
          return "col-blue"
        }
      }
      if (columnIndex === 2) {
        if ($rowIndex === 1) {
          return "col-red"
        }
      }
    },
    // 在值发生改变时更新表尾合计
    updateFooterEvent() {
      const $table = this.$refs.xTable
      $table.updateFooter()
    },
    async insertEvent(row) {
      if (this.allowAdd) {
        const record = {
          sampleDesc: "",
          sampleLocation: "",
          testItemsMethod: "",
          remark: ""
        }
        const { row: newRow } = await this.$refs.xTable.insert(record, row)
        await this.$refs.xTable.setActiveCell(newRow, "productDes")
      }
    },
    // 编辑单元格事件
    async editClose({
      row,
      rowIndex,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex
    }) {
      const errMap = await this.$refs.xTable
        .validate(true)
        .catch((errMap) => errMap)
      if (errMap) {
        this.allowAdd = false
      } else {
        this.allowAdd = true
      }
    },
    deleteEvent(row) {
      this.$confirm("您确定要删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.xTable.remove(row)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.transaction-box {
  .el-form .el-form-item__label {
    background-color: red;
    line-height: 20px !important;
  }

  .el-form-item--medium .el-form-item__label {
    line-height: 20px !important;
  }

  .remark-content {
    font-size: 12px;
    color: #808080;
    line-height: 20px;
  }
}
</style>
