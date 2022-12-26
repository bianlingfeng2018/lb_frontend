<template>
  <div class="app-container ohn ">
    <!-- <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测报价单</div> -->
    <el-form
      ref="postForm"
      v-loading="formLoading"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="110px"
      class="mt20"
    >
      <el-form-item label="交易名称" prop="quotationNum">
        <el-input v-model="postForm.quotationNum" placeholder="请输入交易名称" clearable style="width: 400px" />
      </el-form-item>
      <br>
      <el-form-item label="交易描述" prop="quotationNum">
        <el-input v-model="postForm.quotationNum" placeholder="请输入交易描述" clearable style="width: 400px" />
      </el-form-item>
      <br>
      <el-form-item label="支付方式" prop="quotationNum">
        <el-radio-group v-model="radio" style="width: 540px">
          <el-radio :label="1">挂账</el-radio>
          <el-radio :label="2">先付后检</el-radio>
          <el-radio :label="3">先付</el-radio>
          <el-input
            v-model="postForm.quotationNum"
            class="short"
            style="width: 100px"
          />
          <el-button type="text" style="color:black">%后检</el-button>
        </el-radio-group>
      </el-form-item>
      <el-divider class="mt20" content-position="left">客户公司</el-divider>
      <el-form-item label="客户公司" prop="quotationNum">
        <el-input v-model="postForm.quotationNum" placeholder="请输入客户公司" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="客户联系人">
        <el-select v-model="postForm.serviceId" placeholder="请选择" style="width: 240px" @change="onChange">
          <el-option v-for="item in userList" :key="item.id" :label="item.nickname" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="attn">
        <el-input v-model="postForm.attn" placeholder="请输入联系电话" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="邮箱" prop="client">
        <el-input v-model="postForm.client" placeholder="请输入邮箱" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="传真" prop="telClient">
        <el-input v-model="postForm.telClient" placeholder="请输入传真" clearable style="width: 240px" />
      </el-form-item>
      <br>
      <el-form-item label="报告邮寄地址" prop="deliveryAddress">
        <el-input
          v-model="postForm.deliveryAddress"
          type="textarea"
          placeholder="请输入邮寄地址"
          :max-rows="3"
          maxlength="100"
          show-word-limit
          clearable
          style="width: 500px"
        />
      </el-form-item>

      <el-divider content-position="left">报价明细</el-divider>
      <vxe-toolbar ref="xToolbar">
        <template #tools>
          <el-button type="primary" size="small" plain @click="insertEvent">新增
          </el-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        ref="xTable"
        border
        show-footer
        show-overflow
        class="editable-footer mb20"
        :row-config="{ isHover: true }"
        :export-config="{}"
        :footer-method="footerMethod"
        :data="postForm.testQuotationItemList"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        :edit-rules="tableRules"
        @edit-closed="editClose"
      >
        <vxe-column type="seq" width="60" :title="'序号\nNum'" align="right" />
        <vxe-column field="reportNum" :title="'报告编号\nReport No'" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.reportNum" type="text" />
          </template>
        </vxe-column>
        <vxe-column
          field="productDes"
          :title="'产品名称\nProduct Description'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
          width="160"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.productDes" type="text" :min="1" :max="120" @change="updateFooterEvent" />
          </template>
        </vxe-column>
        <vxe-column field="style" :title="'型号\nStyle/Item No'" :edit-render="{ autofocus: '.vxe-input--inner' }">
          <template #edit="{ row }">
            <vxe-input v-model="row.style" type="text" @input="updateFooterEvent" />
          </template>
        </vxe-column>

        <vxe-column
          field="materialColor"
          :title="'材质/颜色\nMaterial/Color'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.materialColor" type="text" @input="updateFooterEvent" />
          </template>
        </vxe-column>

        <vxe-column field="testItem" :title="'测试项目\nTest Item'" :edit-render="{ autofocus: '.vxe-input--inner' }">
          <template #edit="{ row }">
            <vxe-input v-model="row.testItem" type="text" @input="updateFooterEvent" />
          </template>
        </vxe-column>
        <vxe-column field="unitPrice" :title="'单价\nUnit Price'" :edit-render="{ autofocus: '.vxe-input--inner' }">
          <template #edit="{ row }">
            <vxe-input v-model="row.unitPrice" type="text" @input="updateFooterEvent" />
          </template>
        </vxe-column>
        <vxe-column field="qty" :title="'测试点数\nQty'" :edit-render="{ autofocus: '.vxe-input--inner' }">
          <template #edit="{ row }">
            <vxe-input v-model="row.qty" type="text" @input="updateFooterEvent" />
          </template>
        </vxe-column>
        <vxe-column field="amountRmb" :title="'测试金额\nAmount/RMB'" :edit-render="{ autofocus: '.vxe-input--inner' }">
          <template #edit="{ row }">
            <vxe-input v-model="row.amountRmb" type="text" @input="updateFooterEvent" />
          </template>
        </vxe-column>
        <vxe-column title="操作" width="80">
          <template #default="{ row }">
            <el-button type="text" status="primary" @click="deleteEvent(row)">删除
            </el-button>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- <el-divider content-position="left">备注</el-divider>

      <el-input v-model="postForm.remark" type="textarea" placeholder="请输入注意事项" clearable :rows="20" show-word-limit />
      <p /> -->
      <el-form-item>
        <div class="tr">
          <el-button v-loading="formLoading" type="primary" @click="submitForm('postForm')">保存
          </el-button>
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
import { getAllUsersByRole, getUserById } from "@/api/user"

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userList: [],
      formLoading: false,
      rules: methods.quotationCreateValidate,
      // rules: {},
      tableRules: methods.quotationTableValidate,
      radio: '1',
      postForm: {
        testTradeId: "",
        client: "",
        quotationNum: "",
        attn: "",
        fromCom: "",
        telClient: "",
        telCom: "",
        faxClient: "",
        faxCom: "",
        email: "",
        // gmtCreate: "2022-01-31 23:10:12",
        // gmtCreate: "1664773982333",
        gmtCreate: "",
        invoiceTitle: "",
        reportType: "",
        deliveryAddress: "",
        // testPeroid: ["2022-01-31 23:10:12", "2022-06-31 23:10:12"],
        testPeroid: "",
        bankAccountName: "",
        bankAccount: "",
        bankName: "",
        clientComSignature: "",
        libiaoRepresentativeSignature: "",
        clientComChop: "",
        audit: "",
        clientSignatureDate: "",
        libiaoSignatureDate: "",
        customer: "",
        remark: "注意 Remark：\n" +
          "1. 在我方按照经客户确认过的信息颁发报告后。如客户有修改要求，我方将按照RMB 100 元/次的标准收取报告修改费。\n" +
          "\n" +
          "2. 样品开案之前需 100% 全款到帐，以收到付款凭证为准。如有延迟，我方将顺期延迟发送检测报告！\n" +
          "\n" +
          "3. 开案必备条件（特别提醒：因提交以下资料滞后而影响测试周期的，责任由客户自己承担）。\n" +
          "a. 送样要求：样品量应满足测试所需。\n" +
          "b. 回签确认该报价单。\n" +
          "c. 提交确认、签字了的测试申请单。\n" +
          "\n" +
          "4. 该报价自生效之日起一个月内有效，一个月后未开始测试的或未被申请退回的样品会被自动处理掉。\n" +
          "\n" +
          "5. 当仅依据产品图片或测试相关资料进行报价的，报价和测试周期仅供参考，最终需以实际收到样品后确定的报价及测试周期为准。\n" +
          "\n" +
          "6. 上述部分项目可能会分包至我们的分包实验室进行测试。\n" +
          "\n" +
          "7. 本公司对测试报告只承担被证实的过失责任，并且赔偿金额不超过测试费用的 5 倍。\n" +
          "\n" +
          "8. 报告语言：如需出具英文报告，请提供相关的英文信息（如公司抬头，地址，样品及其零部件的名称），若在确认报价单前未能提供，我司将默认为自行翻译。届时若因翻译问题而需修改报告，我司将须收取报告修改费用。\n" +
          "\n" +
          "9. 报告方式：如需提供纸质报告，我方将收取RMB 100元/份的纸质报告",
        reportFee: 0,
        courierFee: 0,
        taxFee: 0,
        discount: 0,
        totalCost: 0,
        serviceId: undefined,
        testQuotationItemList: [
          {
            reportNum: "01",
            productDes: "烤鸭皮",
            style: "肉类",
            materialColor: "金黄",
            testItem: "烤鸭皮脆不脆",
            unitPrice: "100",
            qty: "10",
            amountRmb: "1000"
          },
          {
            reportNum: "02",
            productDes: "烤鸭肉",
            style: "肉类",
            materialColor: "金黄",
            testItem: "烤鸭肉香不香",
            unitPrice: "200",
            qty: "3",
            amountRmb: "600"
          }
        ]
      },
      customerOptions: [
        { key: 1, value: "中文纸质档" },
        { key: 2, value: "中文电子档" },
        { key: 3, value: "英文电子档" },
        { key: 4, value: "英文纸质档" }
      ]
    }
  },
  created() {
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
      // 映射已知字段
      this.fetchDataAndFill(this.tmpTestTradeId)
    }
    this.postForm.testTradeId = this.tmpTestTradeId
  },
  methods: {
    onChange: function(val) {
      console.log(val)
      for (const u of this.userList) {
        if (u.id === val) {
          this.postForm.attn = u.nickname
          break
        }
      }
    },
    async getUsers() {
      const res = await getAllUsersByRole({
        role: '客服'
      })
      console.log(res)
      this.userList = res.data
    },
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testQuotation

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    fetchDataAndFill: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        const testTrade = response.data.testTrade
        this.postForm.telClient = testTrade.contact
        this.postForm.client = testTrade.client
        this.postForm.bankAccount = testTrade.clientAccount
        // 自动生成报价单编号
        const d = new Date()
        this.postForm.quotationNum = 'LTIT' + (d.getFullYear().toString().substring(2)) + (d.getMonth() + 1) + d.getDate() + testTrade.id
        // 获取客户信息
        const cid = testTrade.clientId
        getUserById({ id: cid })
          .then((res) => {
            console.log(res)
            this.postForm.client = res.data.com
            this.postForm.email = res.data.email
          })
          .catch(reason => {
            console.log(reason)
          })
          .finally(() => { })
        console.log(testTrade)
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑检测报价单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tmpTestTradeId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑检测报价单'
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
                    <div class='red' style='max-height: 400px;overflow: auto;'>
                      {
                        msgList.map(msg => <div>{msg}</div>)
                      }
                    </div>
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
          this.postForm.testQuotationItemList = tableData.tableData
          console.log(this.postForm)
          if (this.postForm.testQuotationItemList.length === 0) {
            this.$message.warning("请填写报价单明细")
            return
          }
          // request backend
          this.formLoading = true
          this.$store
            .dispatch(
              this.isEdit ? "transaction/updateTestQuotation" : "transaction/saveTestQuotation",
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
      this.postForm.testQuotationItemList = []
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/quotation/list"
      })
    },
    // 在值发生改变时更新表尾合计
    updateFooterEvent() {
      const $table = this.$refs.xTable
      $table.updateFooter()
    },
    meanNum(list, field) {
      let count = 0
      list.forEach((item) => {
        count += Number(item[field])
      })
      return count / list.length
    },
    sumNum(list, field) {
      let count = 0
      list.forEach((item) => {
        count += Number(item[field])
      })
      this.tmpTotalTestCost = count
      this.calTotalCost()
      return count
    },
    calTotalCost() {
      this.postForm.totalCost = ((Number(this.tmpTotalTestCost) + Number(this.postForm.reportFee) + Number(this.postForm.courierFee)) *
        (1 + this.postForm.taxFee / 100.0) *
        (1 - this.postForm.discount / 100.0)).toFixed(2)
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "总金额："
          }
          if (["amountRmb"].includes(column.property)) {
            return this.sumNum(data, column.property) + "元"
          }
          return null
        })
      ]
    },
    async insertEvent(row) {
      const record = {
        testQuotationId: undefined,
        reportNum: "",
        productDes: "",
        style: "",
        materialColor: "",
        testItem: "",
        unitPrice: "",
        qty: "",
        amountRmb: "0"
      }
      await this.$refs.xTable.insert(record, row)
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
      await this.$refs.xTable
        .validate(true)
        .catch((errMap) => errMap)
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
