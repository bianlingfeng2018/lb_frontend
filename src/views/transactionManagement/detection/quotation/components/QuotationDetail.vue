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
      label-width="140px"
      class="mt20">
      <el-form-item label="交易名称" prop="tradeName">
        <el-input v-model="postForm.tradeName" placeholder="请输入交易名称" clearable style="width: 400px"/>
      </el-form-item>
      <br>
      <el-form-item label="交易描述">
        <el-input v-model="postForm.tradeDesc" placeholder="请输入交易描述" clearable style="width: 400px"/>
      </el-form-item>
      <br>
      <el-form-item label="支付方式" prop="payType">
        <el-radio-group v-model="payType" style="width: 540px">
          <el-radio :label="1">挂账</el-radio>
          <el-radio :label="2">先付后检</el-radio>
          <el-radio :label="3">先付</el-radio>
          <el-input
            v-model="postForm.quotationNum"
            class="short"
            style="width: 100px"/>
          <el-button type="text" style="color:black">%后检</el-button>
        </el-radio-group>
      </el-form-item>
      <el-divider class="mt20" content-position="left">客户公司</el-divider>
      <el-form-item label="客户公司" prop="clientName">
        <el-input v-model="postForm.clientName" placeholder="请输入客户公司" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item label="客户联系人" prop="attn">
        <el-select v-model="postForm.attn" placeholder="请选择" style="width: 240px" @change="onChange">
          <el-option v-for="item in userList" :key="item.id" :label="item.nickname" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="postForm.telClient" placeholder="请输入联系电话" clearable style="width: 240px"/>
      </el-form-item>
      <br>
      <el-form-item label="邮箱">
        <el-input v-model="postForm.email" placeholder="请输入邮箱" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item label="传真">
        <el-input v-model="postForm.faxClient" placeholder="请输入传真" clearable style="width: 240px"/>
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
          style="width: 500px"/>
      </el-form-item>

      <el-divider content-position="left">报价明细</el-divider>
      <vxe-toolbar ref="xToolbar">
        <template #tools>
          <el-button type="primary" size="small" plain @click="insertEvent">选择报价商品
          </el-button>
        </template>
      </vxe-toolbar>
      <div v-if="checkproductlist.goodsName">
        <el-form-item label="产品名：" prop="telClient">{{checkproductlist.goodsName}}</el-form-item>
        <el-form-item label="HSCode：" prop="telClient">{{checkproductlist.hsCode}}</el-form-item>
        <el-form-item label="材质：" prop="telClient">{{checkproductlist.material}}</el-form-item>
        <el-form-item label="出口国：" prop="telClient">{{checkproductlist.export}}</el-form-item>
        <el-form-item label="检测标准：" prop="telClient">{{checkproductlist.standard}}</el-form-item>
        <vxe-table
          ref="xTable"
          border
          show-footer
          show-overflow
          class="editable-footer mb20"
          :row-config="{ isHover: true }"
          :export-config="{}"
          :data="checkproductlist.items"
          :edit-config="{ trigger: 'click', mode: 'row' }"
          :edit-rules="tableRules"
          @edit-closed="editClose">
          <vxe-column field="id" width="60" :title="'序号'" align="right"/>
          <vxe-column field="name" :title="'测试项目'" />
          <vxe-column field="price" :title="'单价'" />
          <vxe-column field="quantity" :title="'测试点数'" :edit-render="{ autofocus: '.vxe-input--inner' }">
            <template #edit="{ row }">
              <vxe-input v-model="row.quantity" type="text" @input="updateFooterEvent"/>
            </template>
          </vxe-column>
          <vxe-column field="price" :title="'测试金额'" />
          <vxe-column field="quantity" :title="'样品量'" />
          <vxe-column title="操作" width="80">
            <template #default="{ row }">
              <el-button type="text" status="primary" @click="deleteEvent(row)">删除
              </el-button>
            </template>
          </vxe-column>
        </vxe-table>

        <el-form-item label="测试周期" prop="testPeriod">
          <el-input v-model="postForm.testPeriod" placeholder="请输入测试周期" clearable style="width: 240px"/>
        </el-form-item>
        <el-form-item label="总样品量" prop="sampleNum">
          <el-input v-model="postForm.sampleNum" placeholder="请输入总样品量" clearable style="width: 240px"/>
        </el-form-item>
        <br>
        <el-form-item label="服务类型">
          <el-select v-model="postForm.service" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="标准" value="0" />
            <el-option key="1" label="加急" value="1" />
            <el-option key="2" label="特急" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="报告类型" prop="reportTypes">
          <el-checkbox-group v-model="postForm.reportTypes">
            <el-checkbox label="中文纸质档"/>
            <el-checkbox label="中文电子档"/>
            <el-checkbox label="英文纸质档"/>
            <el-checkbox label="英文电子档"/>
          </el-checkbox-group>
        </el-form-item>
        <br>
        <el-form-item :label="'检测价格（不含税）'" prop="testPrice">
          <el-input v-model="postForm.testPrice" placeholder="请输入传真" clearable style="width: 240px"/>
        </el-form-item>
        <el-form-item :label="'报告费'">100.00</el-form-item>
        <br>
        <el-form-item :label="'检测费(含税)：'">
          <span class="text-danger">100.00</span>
        </el-form-item>
        <el-form-item :label="'报告费：'"><span class="text-danger">100.00</span></el-form-item>
        <el-form-item :label="'快递费：'"><span class="text-danger">100.00</span></el-form-item>
        <el-form-item :label="'总计（含税）：'"><span class="text-danger">100.00</span></el-form-item>
        <br>
        <el-form-item>
          <div class="tr">
            <el-button v-loading="formLoading" type="primary" @click="submitForm('postForm')">保存
            </el-button>
            <el-button @click="resetForm('postForm')">重置</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>

    <!--弹窗  选择报价商品 -->
    <el-dialog :visible.sync="dialogVisible" title="选择报价商品">
      <el-radio v-model="radio" label="1">从已有商品中选择</el-radio>
      <el-form v-if="radio == 1" ref="creditInfo" :model="goodsInfo" label-width="100px" label-position="left"
               :inline="true" class="mt8">
        <el-form-item label="商品名称：">
          <el-input v-model="goodsInfo.goodsName" placeholder="请输入商品名称" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="HSCode：">
          <el-input v-model="goodsInfo.hsCode" placeholder="请输入HSCode" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="出口国：">
          <el-select v-model="goodsInfo.export" filterable placeholder="请选择" style="display: block; width: 200px">
            <el-option
              v-for="item in exportList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测标准：">
          <el-input v-model="goodsInfo.standard" placeholder="请输入检测标准" style="width: 200px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGoodSearch">查询
          </el-button>
        </el-form-item>
        <br>
        <div v-if="productlist.goodsName">
          <el-form-item label="产品名：" prop="telClient">{{productlist.goodsName}}</el-form-item>
          <br>
          <el-form-item label="HSCode：" prop="telClient">{{productlist.hsCode}}</el-form-item>
          <el-form-item label="材质：" prop="telClient">{{productlist.material}}</el-form-item>
          <el-form-item label="出口国：" prop="telClient">{{productlist.export}}</el-form-item>
          <el-form-item label="检测标准：" prop="telClient">{{productlist.standard}}</el-form-item>
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
          <el-table :data="productlist.items" stripe border>
            <el-table-column prop="id" label="序号" width="80" type="index"/>
            <el-table-column prop="name" label="测试项目" min-width="120"/>
            <el-table-column prop="price" label="单价" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.price | changePrice2money}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="测试金额" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.price | changePrice2money}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="small" plain @click.native.prevent="deleteRow(scope.$index, productlist.items)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <br>
      <el-radio v-model="radio" label="2" class="mt20">无商品，添加报价产品</el-radio>
      <el-form v-if="radio == 2" ref="creditInfo" :model="creditInfo" :rules="auditRules" label-width="100px"
               label-position="left"
               class="mt8">
        <el-form-item label="类型：" prop="busType">
          <el-radio-group v-model="creditInfo.busType">
            <el-radio :label="1">检测</el-radio>
            <el-radio :label="2">检验</el-radio>
            <el-radio :label="3">认证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品名：" prop="goodsName">
          <el-input v-model="creditInfo.goodsName" placeholder="请输入商品名称" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="HSCode：">
          <el-input v-model="creditInfo.hsCode" placeholder="请输入HSCode" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="材质：">
          <el-input v-model="creditInfo.material" placeholder="请输入材质" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="出口国：" prop="export">
          <el-select v-model="creditInfo.export" filterable placeholder="请选择" style="display: block; width: 200px">
            <el-option
              v-for="item in exportList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测标准：" prop="standard">
          <el-radio v-model="radioStandard" label="1" class="mt20">无标准</el-radio>
          <el-input v-model="creditInfo.standard" placeholder="输入客户要求" style="width: 240px"/>
          <br>
          <el-radio v-model="radioStandard" label="2" class="mt20">有标准</el-radio>
          <el-select v-model="creditInfo.standard" filterable placeholder="请选择" style="width: 240px">
            <el-option
              v-for="item in restaurants"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
            <el-button type="primary" size="small" plain @click="checkedConfirm(2)">确认</el-button>
          </div>
        </el-dialog>
        <el-table :data="creditInfo.items" stripe border>
          <el-table-column prop="id" label="序号" width="80" type="index"/>
          <el-table-column prop="name" label="测试项目" min-width="120"/>
          <el-table-column prop="price" label="单价" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.price | changePrice2money}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="测试金额" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.price | changePrice2money}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small" plain @click.native.prevent="deleteRow(scope.$index, productlist.items)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:center;" class="mt20">
          <el-button size="small" plain @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" size="small" plain @click="handleCheckConfirm2('creditInfo')">确认</el-button>
        </div>
      </el-form>

      <div v-if="radio == 1" style="text-align:center;" class="mt20">
        <el-button size="small" plain @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="handleCheckConfirm()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { changePrice2money } from "@/utils/simple-util"
  import methods from "../../pub_methods/validate"
  import { queryTestTradeDetail } from "@/api/transaction"
  import { getQuotationCreate, getCountryList, getItemList, getStandardList, getProductList } from "@/api/organizations"
  import VXETable from "vxe-table"
  import { getAllUsersByRole, getUserById } from "@/api/user"
  import { deepClone } from "../../../../../utils"

  export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    filters: {
      changePrice2money
    },
    data() {
      return {
        userList: [],
        formLoading: false,

        rules: methods.quotationCreateValidate,
        // rules: {},
        tableRules: methods.quotationTableValidate,
        payType: '1',
        checkList: [],//报告类型
        radio: "1",
        radioStandard: "1",
        dialogVisible: false,
        innerDialogVisible: false,
        creditInfo: {
          busType: 1,
          items: [],
          export: '',
          goodsName: '',
          hsCode: ''
        },
        auditRules: {
          export: [{ required: true, message: '请选择国家', trigger: 'change' }],
          busType: [{ required: true,  trigger: 'change' }],
          goodsName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }]
        },
        exportList: [],//出口国
        restaurants: [],//标准类型列表
        productlist: [],//商品列表
        productItemlist: [],//测试项目列表
        checkproductlist: [],//选中商品
        goodsInfo: {
          requestId: Math.random().toString(24)
        },
        timeout: null,
        state: '',
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
      this.getDataInfoList()
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
        // this.fetchDataAndFill(this.tmpTestTradeId)
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
      //弹出测试项目弹框
      showDialog() {
        this.innerDialogVisible = true
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

      //获取info列表
      async getDataInfoList() {
        //获取标准列表
        const res = await getStandardList({
          name: '',
          requestId: Math.random().toString(24),
          page: 1,
          pageSize: 100
        })
        this.restaurants = res.data.dataList

        //获取基本检测项列表
        const res1 = await getItemList({
          requestId: Math.random().toString(24)
        })
        this.productItemlist = res1.data.dataList

        //获取出口国
        const res2 = await getCountryList({
          requestId: Math.random().toString(24),
          page: 1,
          pageSize: 100
        })
        this.exportList = res2.data.dataList
      },

      async onGoodSearch() {
        const colParam = deepClone(this.goodsInfo)
        //获取商品列表
        const res = await getProductList(Object.assign({}, colParam))
        this.productlist = res.data.dataList[0]
        console.log(this.productlist)
      },
      //选择测试项目
      checkedConfirm(type) {
        this.innerDialogVisible = false
        if (type == 1) {
          if (this.checkList.length != 0) {
            this.checkList.forEach((item) => {
              this.productlist.items.push(item)
            })
          }
        } else if (type == 2) {
          if (this.checkList.length != 0) {
            this.checkList.forEach((item) => {
              this.creditInfo.items.push(item)
            })
          }
        }

      },
      //删除本地测试项目
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      //确认选择商品
      handleCheckConfirm() {
        this.checkproductlist = this.productlist
        this.dialogVisible = false
      },
      handleCheckConfirm2(formName) {
        console.log(this.creditInfo.goodsName)
        console.log(this.creditInfo.export)
        if (this.creditInfo.goodsName == "") {
          this.$message.error('请输入产品名称')
          return
        }
        if (this.creditInfo.export == "") {
          this.$message.error('请选择出口国')
          return
        }
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.checkproductlist = this.creditInfo
            this.dialogVisible = false
          } else {
            return false
          }
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
            .finally(() => {
            })
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

      async insertEvent() {
        this.dialogVisible = true
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
<style>
  .text-danger {
    color: #a90c0a;
    font-weight: bold;
    font-size: large;
  }
</style>
