<template>
  <div class="app-container ohn ">
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack()">返回上一页</el-button>
    <el-divider class="mt50" content-position="left">申请信息</el-divider>
    <el-form
      ref="postForm"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="150px">
      <el-form-item v-if="this.isEdit" label="申请单编号" prop="quotationNum">{{postForm.quotationNum}}</el-form-item>
      <el-form-item :label="'申请单位'" prop="applicationDate">{{postForm.applicationName}}</el-form-item>
      <br>
      <el-form-item :label="'申请单位地址'" prop="comAddrCn">
        <el-input v-model="postForm.comAddrCn" placeholder="请输入申请单位地址 " clearable style="width: 240px"/>
        <el-input
          v-model="postForm.comAddrEn"
          placeholder="请输入英文地址 "
          clearable
          style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <br>
      <el-form-item :label="'报告抬头'" prop="reportAddressCn">
        <el-radio v-model="radioStandard" label="1" class="mt20">同申请方</el-radio>
        <el-radio v-model="radioStandard" label="2" class="mt20">自定义</el-radio>
        <el-input v-if="radioStandard == 2" v-model="postForm.reportTitleCn" placeholder="输入自定义报告抬头（中文）" clearable
                  style="width: 240px "/>
        <el-input v-if="radioStandard == 2" v-model="postForm.reportTitleEn" placeholder="输入自定义报告抬头（英文）" clearable
                  style="width: 240px;margin-left: 20px;"/>
        <el-input v-if="radioStandard == 2" v-model="postForm.reportAddressCn" placeholder="输入报告抬头方中文地址" clearable
                  style="width: 240px;margin-left: 20px;"/>
        <el-input v-if="radioStandard == 2" v-model="postForm.reportAddressEn" placeholder="输入报告抬头方英文地址" clearable
                  style="width: 240px;margin-left: 20px;"/>
      </el-form-item>
      <br>
      <el-form-item :label="'报告邮寄地址'" prop="deliveredTo">
        <el-input
          v-model="postForm.reportAddressCn"
          type="textarea"
          placeholder="请输入邮寄地址"
          :rows="2"
          maxlength="100"
          show-word-limit
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <br>
      <el-form-item :label="'发票抬头'" prop="invoiceTitle">
        <el-input v-model="postForm.invoiceTitle" placeholder="请输入发票抬头" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item :label="'需要资质'" prop="deliveredTo">
        <el-radio-group v-model="postForm.credentials" style="width: 240px">
          <el-radio label="CNAS"/>
          <el-radio label="CMA"/>
        </el-radio-group>
      </el-form-item>
      <el-divider class="mb36" content-position="left">样品信息</el-divider>
      <el-form-item :label="'样品名称'" prop="sampleName">
        <el-input v-model="postForm.sampleName" placeholder="请输入样品名称" clearable style="width: 240px" />
        <el-input
          v-model="postForm.sampleName"
          placeholder="英文"
          clearable
          style="width: 240px; margin-left: 20px;"
        />
      </el-form-item>
      <el-form-item :label="'样品数量'" prop="sampleQuantity">
        <el-input v-model="postForm.sampleQuantity" placeholder="请输入样品数量" clearable style="width: 240px" />
      </el-form-item>
      <br>
      <el-form-item :label="'样品型号'" prop="sampleModel">
        <el-input v-model="postForm.sampleModel" placeholder="请输入样品型号" clearable style="width: 240px"/>
        <el-input v-model="postForm.sampleName" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'样品状态'" prop="sampleModel">
        <el-input v-model="postForm.sampleModel" placeholder="请输入样品状态" clearable style="width: 240px"/>
        <el-input v-model="postForm.sampleName" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'商标'">
        <el-input v-model="postForm.brandCn" placeholder="请输入商标" clearable style="width: 240px"/>
        <el-input v-model="postForm.brandEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'批号'" prop="lotNoCn">
        <el-input v-model="postForm.lotNoCn" placeholder="请输入样品批号" clearable style="width: 240px"/>
        <el-input v-model="postForm.lotNoEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'规格'" prop="specification">
        <el-input v-model="postForm.specification" placeholder="请输入规格" clearable style="width: 240px"/>
        <el-input v-model="postForm.sampleName" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'供应商'" prop="supplier">
        <el-input v-model="postForm.supplier" placeholder="请输入供应商" clearable style="width: 240px"/>
        <el-input v-model="postForm.sampleName" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'购买商'" prop="buyer">
        <el-input v-model="postForm.buyerCn" placeholder="请输入购买商" clearable style="width: 240px"/>
        <el-input v-model="postForm.buyerEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'订单号'" prop="orderNo">
        <el-input v-model="postForm.orderNo" placeholder="请输入订单号" clearable style="width: 240px"/>
      </el-form-item>
      <br>
      <el-form-item :label="'生产商'" prop="manufacturerCn">
        <el-input v-model="postForm.manufacturerCn" placeholder="请输入生产商" clearable style="width: 240px"/>
        <el-input v-model="postForm.manufacturerEn" placeholder="英文" clearable
                  style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'出口地'" prop="exportedTo">
        <el-select v-model="postForm.exportedTo" style="width: 240px" placeholder="请选择出口地">
          <el-option
            v-for="item in exportList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="'生产国'" prop="originCountry">
        <el-radio-group v-model="postForm.originCountry" style="width: 240px">
          <el-radio label="中国" />
          <el-radio label="其它" />
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="'服务类型'" prop="serviceType">
        <el-select v-model="postForm.serviceType" placeholder="请选择" style="display: block; width: 200px">
          <el-option key="0" label="标准" value="0"/>
          <el-option key="1" label="加急" value="1"/>
          <el-option key="2" label="特急" value="2"/>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item :label="'样品处理方式'" prop="sampleDeal">
        <el-radio-group v-model="postForm.sampleDeal">
          <el-radio label="退还样品(邮费自付)"/>
          <el-radio label="留样（3 个月）"/>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item :label="'测试项目及要求'" prop="applicantSigCop">
        <el-table :data="applyForm.goods.items" stripe border class="mt8">
          <el-table-column align="center" label="序号" width="100" type="index"/>
          <el-table-column prop="client" label="测试项目" min-width="120"/>
          <el-table-column prop="reportType" label="单价" min-width="120"/>
          <el-table-column prop="reportFee" label="测试点数" min-width="100"/>
          <el-table-column prop="reportFee" label="测试金额" min-width="100"/>
          <el-table-column prop="reportFee" label="样品数量" min-width="100"/>
        </el-table>
      </el-form-item>

      <el-divider content-position="left">多种材料清单样品信息</el-divider>
      <el-form ref="creditInfo" :model="postForm.sampleList" label-width="100px" label-position="left"
               :inline="true" class="mt8">
          <el-form-item label="样品部位名称：">
            <el-input v-model="postForm.sampleList.sampleName" placeholder="请输入样品部位名称" clearable style="width: 240px"/>
          </el-form-item>
          <el-form-item label="样品型号：">
            <el-input v-model="postForm.sampleList.sampleModel" placeholder="请输入样品型号" clearable style="width: 240px"/>
          </el-form-item>
          <el-form-item label="材质：">
            <el-input v-model="postForm.sampleList.sampleMaterial" placeholder="请输入样品材质" clearable style="width: 240px"/>
          </el-form-item>
          <br>
          <el-form-item label="样品描述：">
            <el-input v-model="postForm.sampleList.sampleDescription" placeholder="请输入样品描述" clearable style="width: 480px"/>
          </el-form-item>

          <br>
          <el-form-item label="测试项目：" prop="telClient">
            <el-button type="text" @click="showDialog">选择测试项目</el-button>
          </el-form-item>
          <el-dialog
            width="50%"
            title="选择测试项目"
            :visible.sync="innerDialogVisible"
            append-to-body>
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="date in productItemlist" :label="date" :key="date.id">{{date.name}} {{date.price |
                changePrice2money}}
              </el-checkbox>
            </el-checkbox-group>
            <div style="text-align:center;" class="mt20">
              <el-button size="small" plain @click="innerDialogVisible = false">取消</el-button>
              <el-button type="primary" size="small" plain @click="checkedConfirm(1)">确认</el-button>
            </div>
          </el-dialog>
          <el-table :data="postForm.sampleList.items" stripe border>
            <el-table-column prop="testItemId" label="序号" width="80" type="index"/>
            <el-table-column prop="itemName" label="测试项目" min-width="120"/>
            <el-table-column prop="price" label="测试方法" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="测试条件" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注" width="150">
              <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
              </template>
            </el-table-column>
          </el-table>
      </el-form>
<!--      <el-divider content-position="left">其他</el-divider>-->
<!--      <my-flex-table ref="myFlexTable" :editable="true" :flex-obj="postForm.flexObj"/>-->
<!--      <p/>-->
      <el-form-item>
        <div class="tr">
          <el-button type="primary" @click="submitForm('postForm')">保存</el-button>
          <el-button @click="resetForm('postForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import methods from "../../pub_methods/validate"
  import { getApplicationDetail, getApplicationCreate, getApplicationModify } from "@/api/organizations"
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
      radioStandard: "1",
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
      applyForm: [],
      mergeFooterItems: [
        { row: 0, col: 0, rowspan: 0, colspan: 8 }
      ],
      exportList: [],//出口国

      allowAdd: true
    }
  },

  created() {
    this.tempRoute = Object.assign({}, this.$route)
    this.applyForm = this.$route.query.applyForm
    this.postForm.applicationName = this.applyForm.clientName
    this.postForm.comAddrCn = this.applyForm.deliveryAddress
    console.log(this.applyForm)
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
    this.getInfodata()
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
      const queryParam = {
        requestId: Math.random().toString(24),
        applicationNum: id
      }
      getApplicationDetail(Object.assign({}, queryParam)).then(response => {
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
          .finally(() => { })
      }).catch(err => {
        console.log(err)
      })
    },
    fetchData: function(id) {
      getApplicationDetail(Object.assign({}, { testTradeId: id })).then(response => {
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
    async getInfodata() {
      //获取出口国
      const res2 = await getCountryList({
        requestId: Math.random().toString(24),
        page: 1,
        pageSize: 100
      })
      this.exportList = res2.data.dataList
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

