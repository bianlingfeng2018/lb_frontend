<template>
  <div class="app-container ohn transaction-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测申请单</div>
    <el-divider class="mt50" content-position="left">申请信息 Applicant Information</el-divider>
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
      <el-form-item :label="'报告编号 \nReport No'" prop="applicationDate">
        <el-input
          v-model="postForm.reportNum"
          placeholder="请输入报告编号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'报告日期 \nReport Date'" prop="applicationDate">
        <el-date-picker
          v-model="postForm.reportDate"
          value-format="timestamp"
          type="date"
          placeholder="请选择报告日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'接收日期 \nRec Date'" prop="applicationDate">
        <el-date-picker
          v-model="postForm.recDate"
          value-format="timestamp"
          type="date"
          placeholder="请选择接收日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'客户服务 \nCS Name'" prop="applicationDate">
        <el-input
          v-model="postForm.csName"
          placeholder="请输入客服名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        :label="'申请单位名称\nApplication Name'"
        prop="applicationName"
      >
        <el-input
          v-model="postForm.applicationName"
          placeholder="请输入申请单位名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        :label="'申请单位地址\nApplicant Address'"
        prop="applicationAddress"
      >
        <el-input
          v-model="postForm.applicationAddress"
          placeholder="请输入申请单位地址 "
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'报告抬头\nReport Title'" prop="reportTitle">
        <el-input
          v-model="postForm.reportTitle"
          placeholder="请输入报告抬头"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        :label="'同申请方\nSame as applicant'"
        prop="sameAsApplicant"
      >
        <el-input
          v-model="postForm.sameAsApplicant"
          placeholder="请输入同申请方"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'其他名称\nOthers Name'" prop="otherName">
        <el-input
          v-model="postForm.otherName"
          placeholder="请输入其他名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'其他地址\nOthers Address'" prop="otherAddress">
        <el-input
          v-model="postForm.otherAddress"
          placeholder="请输入其他地址"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'联系人\nContact'" prop="contact">
        <el-input
          v-model="postForm.contact"
          placeholder="请输入联系人"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'电话\nTel'" prop="tel">
        <el-input
          v-model="postForm.tel"
          placeholder="请输入电话"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'传真\nFax'" prop="fax">
        <el-input
          v-model="postForm.fax"
          placeholder="请输入传真"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'电邮\nE-mail'" prop="email">
        <el-input
          v-model="postForm.email"
          placeholder="请输入电邮"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        :label="'报告邮寄地址\nReport Delivered To'"
        prop="deliveredTo"
      >
        <el-input
          v-model="postForm.deliveredTo"
          type="textarea"
          placeholder="请输入邮寄地址"
          :rows="2"
          maxlength="100"
          show-word-limit
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'付款方\nPayer'" prop="payer">
        <el-input
          v-model="postForm.payer"
          placeholder="请输入付款方"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'发票抬头\nInvoice Title'" prop="invoiceTitle">
        <el-input
          v-model="postForm.invoiceTitle"
          placeholder="请输入发票抬头"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-divider
        class="mb36"
        content-position="left"
      >样品信息Sample Information</el-divider>
      <el-form-item :label="'样品名称\nSample Name'" prop="sampleName">
        <el-input
          v-model="postForm.sampleName"
          placeholder="请输入样品名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'样品数量\nSample Quantity'" prop="sampleQuantity">
        <el-input
          v-model="postForm.sampleQuantity"
          placeholder="请输入样品数量"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'样品型号\nSample Model'" prop="sampleModel">
        <el-input
          v-model="postForm.sampleModel"
          placeholder="请输入样品型号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'商标\nBrand'" prop="brand">
        <el-input
          v-model="postForm.brand"
          placeholder="请输入商标"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'样品批号\nLot No'" prop="lotNo">
        <el-input
          v-model="postForm.lotNo"
          placeholder="请输入样品批号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'规格\nSpecification'" prop="specification">
        <el-input
          v-model="postForm.specification"
          placeholder="请输入规格"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'供应商\nSupplier'" prop="supplier">
        <el-input
          v-model="postForm.supplier"
          placeholder="请输入供应商"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'订单号\nP/O No'" prop="poNum">
        <el-input
          v-model="postForm.poNum"
          placeholder="请输入订单号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'购买商\nBuyer'" prop="buyer">
        <el-input
          v-model="postForm.buyer"
          placeholder="请输入购买商"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'生产商\nManufacturer'" prop="manufacturer">
        <el-input
          v-model="postForm.manufacturer"
          placeholder="请输入生产商"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'出口地\nCountry of Destination'" prop="exportedTo">
        <el-select
          v-model="postForm.exportedTo"
          style="width: 240px"
          placeholder="请选择出口地"
        >
          <el-option
            v-for="(item, index) in exportedOptions"
            :key="item.key + index"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'生产国\nCountry of Origin'" prop="originCountry">
        <el-radio-group
          v-model="postForm.originCountry"
          style="width: 240px"
        >
          <el-radio label="中国" />
          <el-radio label="其它" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报告语言" prop="language">
        <span slot="label">
          报告语言<br>
          Report Language<br>
          <el-tooltip class="item" effect="dark" content="同时申请，需加收100RMB Both English and Chinese, charged for ￥100" placement="right-end"><i class="el-icon-question" /></el-tooltip>
        </span>
        <!--        <el-radio-group v-model="postForm.language" style="width: 240px">-->
        <!--          <el-radio label="英文English" />-->
        <!--          <el-radio label="中文Chinese" />-->
        <!--        </el-radio-group>-->
        <el-checkbox-group v-model="tmpLanguages" @change="handleLanguageChange">
          <el-checkbox label="英文English" />
          <el-checkbox label="中文Chinese" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="'报告格式\nReport format'" prop="reportFormat">
        <el-select
          v-model="postForm.reportFormat"
          style="width: 240px"
          placeholder="请选择报告格式"
        >
          <el-option
            v-for="(item, index) in reportFormatOptions"
            :key="item.key + index"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'报告方式\nReport Type'" prop="reportType">
        <el-select
          v-model="postForm.reportType"
          style="width: 240px"
          placeholder="请选择报告方式"
          @input="handleReportTypeChange"
        >
          <el-option
            v-for="(item, index) in reportTypeOptions"
            :key="item.key + index"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'副本数量\nCopies Num'" prop="manufacturer">
        <el-input
          v-model="postForm.copyNum"
          :disabled="!copyNumVisible"
          placeholder="请输入副本数量"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'是否接受分包\nAgree to subcontract'" prop="">
        <el-radio-group
          v-model="postForm.agreeToSubcontract"
          style="width: 240px"
        >
          <el-radio label="是" />
          <el-radio label="否" />
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="'服务类型\nService Requested'" prop="serviceType">
        <el-select
          v-model="postForm.serviceType"
          style="width: 240px"
          placeholder="请选择务类型"
        >
          <el-option
            v-for="(item, index) in serviceTypeOptions"
            :key="item.key + index"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="'测试项目及（或）要求，请注明\nTest item and(or) requirement, Please specify as'"
        prop="testRequirement"
      >
        <el-input
          v-model="postForm.testRequirement"
          type="textarea"
          placeholder="请输入测试项目及（或）要求"
          :rows="2"
          maxlength="255"
          show-word-limit
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        :label="'样品处理方式\nSample Treatment'"
        prop="sampleTreatment"
      >
        <el-radio-group
          v-model="postForm.sampleTreatment"
          style="width: 240px"
        >
          <el-radio label="退还样品(邮费自付)" />
          <el-radio label="留样（3 个月）" />
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="'申请公司授权人签名\nSignature for and on behalf of the applicant and Company Chop'"
        prop="applicantSigCop"
      >
        <el-input
          v-model="postForm.applicantSigCop"
          type="textarea"
          placeholder="请输入申请公司授权人签名"
          :rows="2"
          maxlength="100"
          show-word-limit
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'申请日期 \nDate'" prop="applicationDate">
        <el-date-picker
          v-model="postForm.applicationDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择申请日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-divider content-position="left">多种材料清单样品填写表</el-divider>
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
        :data="postForm.testApplicationItemList"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        @edit-closed="editClose"
      >
        <vxe-column type="seq" width="60" :title="'序号\nNum'" align="right" />
        <vxe-column
          field="sampleName"
          :title="'样品（部位）名称\n(Part of)Sample Name'"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.sampleName" type="text" />
          </template>
        </vxe-column>
        <vxe-column
          field="sampleModel"
          :title="'样品型号\nSample Model'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.sampleModel"
              type="text"
              :min="1"
              :max="120"
              @change="updateFooterEvent"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="sampleMaterial"
          :title="'材质\nStyle/Sample Material'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.sampleMaterial"
              type="text"
              @input="updateFooterEvent"
            />
          </template>
        </vxe-column>

        <vxe-column
          field="sampleDescription"
          :title="'样品描述\nSample Description'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.sampleDescription"
              type="text"
              @input="updateFooterEvent"
            />
          </template>
        </vxe-column>

        <vxe-column
          field="testingItem"
          :title="'测试项目\nTesting Items'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.testingItem"
              type="text"
              @input="updateFooterEvent"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="accordingTo"
          :title="'判定依据\nAccording to'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.accordingTo"
              type="text"
              @input="updateFooterEvent"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="remark"
          :title="'备注\nRemark'"
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
import { getUserById } from "@/api/user"
import { timeFormatFilter } from "@/utils/simple-util"
import MyFlexTable from "@/views/components/MyFlexTable"

export default {
  components: {
    MyFlexTable
  },
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
      copyNumVisible: false,
      checkList: ['中文报告Chinese', '英文报告English'],
      userList: [],
      formLoading: false,
      rules: methods.applyCreateValidate,
      tmpLanguages: [],
      postForm: {
        testTradeId: "-1",
        reportDate: "",
        recDate: "",
        csName: "",
        reportNum: "",
        applicationName: "",
        applicationAddress: "",
        reportTitle: "",
        sameAsApplicant: "",
        otherName: "",
        otherAddress: "",
        contact: "",
        tel: "",
        fax: "",
        email: "",
        deliveredTo: "",
        payer: "",
        invoiceTitle: "",
        sampleName: "",
        sampleQuantity: "",
        sampleModel: "",
        brand: "",
        lotNo: "",
        specification: "",
        supplier: "",
        poNum: "",
        buyer: "",
        manufacturer: "",
        exportedTo: "",
        originCountry: "",
        language: "",
        reportFormat: "",
        reportType: "",
        agreeToSubcontract: "",
        serviceType: "",
        testRequirement: "",
        sampleTreatment: "",
        applicantSigCop: "",
        applicationDate: "",
        employee: "",
        customer: "",
        copyNum: 0,
        testApplicationItemList: [
          {
            sampleName: "贵州刺梨",
            sampleModel: "大果刺梨",
            sampleMaterial: "果蔬",
            sampleDescription: "加工后的刺梨3斤",
            testingItem: "同上",
            accordingTo: "维生素含量是否大于60%",
            remark: "有无其他有益成分"
          },
          {
            sampleName: "贵州腊肉",
            sampleModel: "黑毛猪肉",
            sampleMaterial: "肉类",
            sampleDescription: "烟熏腊肉",
            testingItem: "列明",
            accordingTo: "腊肉是否有致癌物质",
            remark: "里面的硝基化合物是否致癌"
          },
          {
            sampleName: "贵州苗族银饰品",
            sampleModel: "银手镯",
            sampleMaterial: "银",
            sampleDescription: "亮晶晶的白银",
            testingItem: "同上",
            accordingTo: "银子纯度",
            remark: "检测有没有卖假的银饰品"
          }
        ],
        flexObj: []
      },
      mergeFooterItems: [
        { row: 0, col: 0, rowspan: 0, colspan: 8 }
        // { row: 0, col: 1, rowspan: 9, colspan: 9 },
      ],
      exportedOptions: [
        { key: "Europe", value: "欧洲" },
        { key: "USA", value: "美国" },
        { key: "Others", value: "其他" }
      ],
      reportFormatOptions: [
        { key: "1", value: "一个样品一份报告" },
        { key: "2", value: "一份申请单一份报告" },
        { key: "3", value: "一个测试项目一份报告" },
        { key: "4", value: "其它" }
      ],
      reportTypeOptions: [
        { key: "1", value: "电子文档" },
        { key: "2", value: "纸质文档" },
        { key: "3", value: "副本" }
      ],
      serviceTypeOptions: [
        { key: "1", value: "标准服务 " },
        { key: "2", value: "加急服务" },
        { key: "3", value: "特急服务" }
      ],
      allowAdd: true
    }
  },
  created() {
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
    handleLanguageChange() {
      this.postForm.language = this.tmpLanguages.join(',')
    },
    handleReportTypeChange(item) {
      console.log(item)
      if (item === '副本') {
        this.copyNumVisible = true
      } else {
        this.copyNumVisible = false
        this.postForm.copyNum = 0
      }
    },
    fetchDataAndFill: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        const testQuotation = response.data.testQuotation
        const itemList = testQuotation.testQuotationItemList
        this.postForm.reportNum = itemList[0].reportNum
        this.postForm.csName = testQuotation.attn
        this.postForm.tel = testQuotation.telClient
        this.postForm.fax = testQuotation.faxClient
        this.postForm.email = testQuotation.email
        this.postForm.invoiceTitle = testQuotation.invoiceTitle
        this.postForm.deliveredTo = testQuotation.deliveryAddress
        this.postForm.sampleName = itemList[0].productDes
        this.postForm.sampleModel = itemList[0].style

        const testTrade = response.data.testTrade
        // 获取客户信息
        const cid = testTrade.clientId
        getUserById({ id: cid })
          .then((res) => {
            console.log(res)
            this.postForm.applicationName = res.data.com
            this.postForm.contact = res.data.nickname
            this.postForm.applicantSigCop = res.data.nickname
          })
          .catch(reason => {
            console.log(reason)
          })
          .finally(() => {})
      }).catch(err => {
        console.log(err)
      })
    },
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testApplicationForm
        this.tmpLanguages = this.postForm.language.split(',')
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
      const title = '编辑检测申请单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tmpTestTradeId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑检测申请单'
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
          this.postForm.testApplicationItemList = tableData.tableData
          console.log(this.postForm)
          if (this.postForm.testApplicationItemList.length === 0) {
            this.$message.warning("请填写申请单明细")
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
              this.isEdit ? "transaction/updateTestApply" : "transaction/saveTestApplicationForm",
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
      this.postForm.testApplicationItemList = []
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/apply/list"
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
          sampleName: "",
          sampleModel: "",
          sampleMaterial: "",
          sampleDescription: "",
          testingItem: "",
          accordingTo: "",
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
