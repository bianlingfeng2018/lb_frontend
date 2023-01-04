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
      class="mt20"
    >
      <el-form-item label="交易名称" prop="tradeName">
        <el-input v-model="postForm.tradeName" placeholder="请输入交易名称" clearable style="width: 400px" />
      </el-form-item>
      <br>
      <el-form-item label="交易描述">
        <el-input v-model="postForm.tradeDesc" placeholder="请输入交易描述" clearable style="width: 400px" />
      </el-form-item>
      <br>
      <el-form-item label="支付方式" prop="payType">
        <el-radio-group v-model="postForm.payType" style="width: 540px">
          <el-radio :label="1">挂账</el-radio>
          <el-radio :label="2">先付后检</el-radio>
          <el-radio :label="3">先付</el-radio>
          <el-input
            class="short"
            style="width: 100px"
          />
          <el-button type="text" style="color:black">%后检</el-button>
        </el-radio-group>
      </el-form-item>
      <el-divider class="mt20" content-position="left">客户公司</el-divider>
      <el-form-item label="客户公司" prop="clientName">
        <el-select v-model="postForm.clientName" value-key="id" filterable placeholder="请输入后选择" style="width: 240px" @change="changeSelectName">
          <el-option
            v-for="item in searchNamelist"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户联系人" prop="attn">
        <el-input v-model="postForm.attn" placeholder="请输入客户联系人" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="postForm.telClient" placeholder="请输入联系电话" clearable style="width: 240px" />
      </el-form-item>
      <br>
      <el-form-item label="邮箱">
        <el-input v-model="postForm.email" placeholder="请输入邮箱" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="传真">
        <el-input v-model="postForm.faxClient" placeholder="请输入传真" clearable style="width: 240px" />
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
          <el-button type="primary" size="small" plain @click="insertEvent">选择报价商品
          </el-button>
        </template>
      </vxe-toolbar>
      <div v-for="(gooditem,index) in postForm.goods" v-if="gooditem.goodsId" :key="index" :model="gooditem">
        <el-form-item label="产品名：" prop="telClient">{{ gooditem.goodsName }}</el-form-item>
        <el-form-item label="HSCode：" prop="telClient">{{ gooditem.hsCode }}</el-form-item>
        <el-form-item label="材质：" prop="telClient">{{ gooditem.material }}</el-form-item>
        <el-form-item label="出口国：" prop="telClient">{{ gooditem.export }}</el-form-item>
        <el-form-item label="检测标准：" prop="telClient">{{ gooditem.standard }}</el-form-item>
        <vxe-table
          ref="xTable"
          border
          show-footer
          show-overflow
          class="editable-footer mb20"
          :row-config="{ isHover: true }"
          :export-config="{}"
          :data="gooditem.items"
          :edit-config="{ trigger: 'click', mode: 'row' }"
          @edit-closed="editClose"
        >
          <vxe-column field="id" width="60" :title="'序号'" align="right" />
          <vxe-column field="name" :title="'测试项目'" />
          <vxe-column field="price" :title="'单价'">
            <template #default="{ row }">
              <span>{{ row.price | changePrice2money }} 元</span>
            </template>
          </vxe-column>
          <vxe-column field="quantity" title="测试点数" :edit-render="{ autofocus: '.vxe-input--inner' }">
            <template #edit="{ row }">
              <vxe-input v-model="row.quantity" type="number" @change="testInputChange(gooditem,index)" />
            </template>
          </vxe-column>

          <vxe-column field="price2" :title="'测试金额'">
            <template #default="{ row }">
              <span>{{ (row.price*row.quantity) | changePrice2money }} 元</span>
            </template>
          </vxe-column>
          <vxe-column :title="'样品量'">1</vxe-column>
          <vxe-column title="操作" width="80">
            <template slot-scope="scope">
              <el-button size="small" plain @click.native.prevent="deleteRow(scope.$index, gooditem.items)">删除
              </el-button>
            </template>
          </vxe-column>
        </vxe-table>

        <el-form-item label="测试周期" prop="testPeriod">
          <el-input v-model="gooditem.testPeriod" placeholder="请输入测试周期" clearable style="width: 240px" />
        </el-form-item>
        <el-form-item label="总样品量" prop="sampleNum">
          <el-input v-model="gooditem.sampleNum" placeholder="请输入总样品量" clearable style="width: 240px" />
        </el-form-item>
        <br>
        <el-form-item label="服务类型">
          <el-select v-model="gooditem.service" placeholder="请选择" style="display: block; width: 200px">
            <el-option key="0" label="标准" value="0" />
            <el-option key="1" label="加急" value="1" />
            <el-option key="2" label="特急" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="报告类型" prop="reportTypes">
          <el-checkbox-group v-model="checkedGoodsReportTypes[index]" @change="testInputChange(gooditem,index)">
            <el-checkbox v-for="item of customerOptions" :key="item.key" :label="item.key">{{ item.value }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <br>
        <el-form-item label="检测价格（不含税）" prop="testPrice">
          <label slot="label"><span style="color:red">*</span>&nbsp;&nbsp;检测价格（不含税）：</label>
          <el-input v-model="gooditem.testPriceShow" :placeholder="gooditem.testPrice /100" clearable style="width: 240px" @change="testInputChange(gooditem,index)" />
          <span v-if="gooditem.testPriceShow && ((gooditem.testPriceShow *100)<gooditem.testPrice)" class="lb-error">{{ (((gooditem.testPriceShow *100)/gooditem.testPrice) *10).toFixed(2) }} 折</span>
        </el-form-item>
        <el-form-item :label="'报告费'">{{ gooditem.reportFee | changePrice2money }} 元</el-form-item>
        <br>
        <el-divider content-position="left" />
      </div>
      <div v-if="postForm.goods.length">
        <el-form-item :label="'检测费(含税)：'">
          <span class="text-danger">{{ postForm.testFee | changePrice2money }}</span>
        </el-form-item>
        <el-form-item :label="'报告费：'">
          <span class="text-danger">{{ postForm.reportFee | changePrice2money }}</span>
        </el-form-item>
        <el-form-item label="快递费：">
          <el-input v-model="postForm.postage" placeholder="请输入快递费" clearable style="width: 200px" @change="postageChange" />
        </el-form-item>
        <br>
        <el-form-item :label="'总计（含税）：'">
          <span class="text-danger">{{ postForm.totalCost | changePrice2money }}</span>
        </el-form-item>
        <br>
        <el-button v-loading="formLoading" type="primary" @click="submitForm('postForm')">保存
        </el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </div>
    </el-form>

    <!--弹窗  选择报价商品 -->
    <el-dialog :visible.sync="dialogVisible" title="选择报价商品">
      <el-radio v-model="radio" label="1">从已有商品中选择</el-radio>
      <el-form
        v-if="radio == 1"
        ref="creditInfo"
        :model="goodsInfo"
        label-width="100px"
        label-position="left"
        :inline="true"
        class="mt8"
      >
        <el-form-item label="商品名称：">
          <el-select
            v-model="goodsInfo.goodsName"
            placeholder="请选择"
            style="display: block; width: 200px"
            filterable
            remote
            clearable
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="goodsloading"
            @change="changeSelect"
          >
            <el-option
              v-for="item in goodsList"
              :key="item.goodsId"
              :label="item.goodsName"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="HSCode：">-->
        <!--          <el-select v-model="goodsInfo.hsCode" placeholder="请选择" style="display: block; width: 200px"-->
        <!--                     multiple-->
        <!--                     filterable-->
        <!--                     remote-->
        <!--                     reserve-keyword-->
        <!--                     :loading="loading">-->
        <!--            <el-option-->
        <!--              v-for="item in goodsList"-->
        <!--              :key="item.goodsId"-->
        <!--              :label="item.hsCode"-->
        <!--              :value="item.hsCode">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="出口国：">-->
        <!--          <el-select v-model="goodsInfo.export" filterable placeholder="请选择" clearable-->
        <!--                     style="display: block; width: 200px">-->
        <!--            <el-option-->
        <!--              v-for="item in exportList"-->
        <!--              :key="item.id"-->
        <!--              :label="item.name"-->
        <!--              :value="item.name">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="检测标准：">-->
        <!--          <el-input v-model="goodsInfo.standard" placeholder="请输入检测标准" clearable style="width: 200px"/>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item>-->
        <!--          <el-button type="primary" @click="onGoodSearch">查询-->
        <!--          </el-button>-->
        <!--        </el-form-item>-->
        <br>
        <div v-if="productlist.goodsName">
          <el-form-item label="产品名：" prop="telClient">{{ productlist.goodsName }}</el-form-item>
          <br>
          <el-form-item label="HSCode：" prop="telClient">{{ productlist.hsCode }}</el-form-item>
          <el-form-item label="材质：" prop="telClient">{{ productlist.material }}</el-form-item>
          <el-form-item label="出口国：" prop="telClient">{{ productlist.export }}</el-form-item>
          <el-form-item label="检测标准：" prop="telClient">{{ productlist.standard }}</el-form-item>
          <br>
          <el-form-item label="测试项目：" prop="telClient">
            <el-button type="text" @click="showDialog">选择测试项目</el-button>
          </el-form-item>
          <el-dialog
            width="50%"
            title="选择测试项目"
            :visible.sync="innerDialogVisible"
            append-to-body
          >
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="date in productItemlist" :key="date.id" :label="date" style="margin: 5px">{{ date.name }} {{ date.price |
                changePrice2money }}
              </el-checkbox>
            </el-checkbox-group>
            <div style="text-align:center;" class="mt20">
              <el-button size="small" plain @click="innerDialogVisible = false">取消</el-button>
              <el-button type="primary" size="small" plain @click="checkedConfirm(1)">确认</el-button>
            </div>
          </el-dialog>
          <el-table :data="productlist.items" stripe border>
            <el-table-column prop="id" label="序号" width="80" type="index" />
            <el-table-column prop="name" label="测试项目" min-width="120" />
            <el-table-column prop="price" label="单价" min-width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.price | changePrice2money }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="测试金额" min-width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.price | changePrice2money }}</span>
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
      <el-form
        v-if="radio == 2"
        ref="creditInfo"
        :model="creditInfo"
        :rules="auditRules"
        label-width="100px"
        label-position="left"
        class="mt8"
      >
        <el-form-item label="类型：" prop="busType">
          <el-radio-group v-model="creditInfo.busType">
            <el-radio :label="1">检测</el-radio>
            <el-radio :label="2">检验</el-radio>
            <el-radio :label="3">认证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品名：" prop="goodsName">
          <el-input v-model="creditInfo.goodsName" placeholder="请输入商品名称" style="width: 200px" />
        </el-form-item>
        <el-form-item label="HSCode：">
          <el-input v-model="creditInfo.hsCode" placeholder="请输入HSCode" style="width: 200px" />
        </el-form-item>
        <el-form-item label="材质：">
          <el-input v-model="creditInfo.material" placeholder="请输入材质" style="width: 200px" />
        </el-form-item>
        <el-form-item label="出口国：" prop="export">
          <el-select v-model="creditInfo.export" filterable placeholder="请选择" style="display: block; width: 200px">
            <el-option
              v-for="item in exportList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="检测标准：" prop="standard">
          <el-radio v-model="radioStandard" label="1" class="mt20">无标准</el-radio>
          <el-input v-if="radioStandard == 1" v-model="creditInfo.standard" placeholder="输入客户要求" style="width: 240px" />
          <br>
          <el-radio v-model="radioStandard" label="2" class="mt20">有标准</el-radio>
          <el-select v-if="radioStandard == 2" v-model="creditInfo.standard" filterable placeholder="请选择" style="width: 240px">
            <el-option
              v-for="item in restaurants"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
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
          append-to-body
        >
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="date in productItemlist" :key="date.id" :label="date">{{ date.name }} {{ date.price |
              changePrice2money }}
            </el-checkbox>
          </el-checkbox-group>
          <div style="text-align:center;" class="mt20">
            <el-button size="small" plain @click="innerDialogVisible = false">取消</el-button>
            <el-button type="primary" size="small" plain @click="checkedConfirm(2)">确认</el-button>
          </div>
        </el-dialog>
        <el-table :data="creditInfo.items" stripe border>
          <el-table-column prop="id" label="序号" width="80" type="index" />
          <el-table-column prop="name" label="测试项目" min-width="120" />
          <el-table-column prop="price" label="单价" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.price | changePrice2money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="测试金额" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.price | changePrice2money }}</span>
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
import {
  getQuotationDetail,
  getQuotationCreate,
  getCountryList,
  getItemList,
  getStandardList,
  getProductList,
  getProductCreate,
  getRate,
  getSearchName
} from "@/api/organizations"
import VXETable from "vxe-table"
import { getAllUsersByRole, getUserById } from "@/api/user"
import { deepClone } from "../../../../../utils"

export default {
  filters: {
    changePrice2money
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  // setup () {
  //   const countAmount = (row: any) => {
  //       return row.price * row.quantity
  //     }
  //     return {
  //       countAmount
  //   }
  // },
  data() {
    return {
      userList: [],
      formLoading: false,
      goodsList: [],
      goodsloading: false,
      rules: methods.quotationCreateValidate,
      // rules: {},
      tableRules: methods.quotationTableValidate,
      payType: '1',
      checkList: [], // 报告类型
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
        busType: [{ required: true, trigger: 'change' }],
        goodsName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }]
      },
      exportList: [], // 出口国
      restaurants: [], // 标准类型列表
      productlist: {
        goodsId: null,
        items: [
          {
            itemId: '',
            quantity: ''
          }
        ],
        reportTypes: [], // 选择的报告类型
        sampleNum: "",
        service: '',
        testPeriod: '',
        testPrice: '',
        totalPrice: 0
      }, // 商品列表
      productItemlist: [], // 测试项目列表
      searchNamelist: [], // 客户公司列表
      checkedGoodsReportTypes: [], // 选中的商品报告
      goodsInfo: {
        requestId: Math.random().toString(24)
      },
      timeout: null,
      state: '',
      postForm: {
        reportTypes: {}, // 选择的报告类型
        attn: "", // 客户联系人
        clientId: 0,
        clientName: "",
        deliveryAddress: "",
        email: "",
        faxClient: "",
        goods: [],
        oriId: 0,
        payType: 1,
        postage: 0,
        reportFee: 0,
        requestId: "",
        telClient: "",
        totalCost: 0,
        tradeDesc: "",
        tradeName: "",
        testFee: 0,
        type: 0
      },
      customerOptions: [
        { key: 1, value: "中文纸质档", price: 10000 },
        { key: 2, value: "中文电子档", price: 0 },
        { key: 3, value: "英文电子档", price: 0 },
        { key: 4, value: "英文纸质档", price: 10000 }
      ],
      feeRate: 0
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
    // 选择测试项目弹框
    showDialog() {
      this.innerDialogVisible = true
      this.checkList = []
    },
    async getUsers() {
      const res = await getAllUsersByRole({
        role: '客服'
      })
      console.log(res)
      this.userList = res.data
      const rateResp = await getRate()
      console.log(rateResp, "getRate")
      this.feeRate = 10 / 100
    },
    fetchData: function(id) {
      getQuotationDetail(Object.assign({}, { quotationNum: id })).then(response => {
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

    // 获取info列表
    async getDataInfoList() {
      // 获取客户列表
      const res0 = await getSearchName({
        clientName: '',
        requestId: Math.random().toString(24)
      })
      this.searchNamelist = res0.data.dataList

      // 获取标准列表
      const res = await getStandardList({
        name: '',
        requestId: Math.random().toString(24),
        page: 1,
        pageSize: 100
      })
      this.restaurants = res.data.dataList

      // 获取基本检测项列表
      const res1 = await getItemList({
        requestId: Math.random().toString(24)
      })
      this.productItemlist = res1.data.dataList

      // 获取出口国
      const res2 = await getCountryList({
        requestId: Math.random().toString(24),
        page: 1,
        pageSize: 100
      })
      this.exportList = res2.data.dataList
    },

    async onGoodSearch() {
      // const colParam = deepClone(this.goodsInfo)
      // //获取商品列表
      // const res = await getProductList(Object.assign({}, colParam))
      // this.productlist = res.data.dataList[0]
      // console.log(this.productlist)
    },
    // 选择测试项目
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
    remoteMethod(query) {
      console.log(query)
      if (query !== '') {
        this.goodsInfo.name = query
        this.goodsloading = true
        console.log(this.goodsInfo)
        const colParam = deepClone(this.goodsInfo)
        // 获取商品列表
        getProductList(Object.assign({}, colParam))
          .then((res) => {
            const { data, status } = res
            if (status == 200) {
              this.goodsloading = false
              // this.productlist = res.data.dataList
              this.goodsList = res.data.dataList.filter((item) => {
                return item.goodsName.toLowerCase().indexOf(query.toLowerCase()) > -1
              })
            } else {
              this.goodsList = []
              // this.$message.error(res.errMsg)
            }
          })
          .catch((e) => {
            this.$message.error(e)
          })
          .finally(() => {
            this.goodsloading = false
          })
      } else {
        this.goodsList = []
      }
    },
    // 选中商品
    changeSelect(item) {
      console.log(item)
      this.productlist = item
    },
    // 选中客户
    changeSelectName(item) {
      console.log(item)
      this.postForm.clientName = item.name
      this.postForm.clientId = item.id
      this.postForm.attn = item.contactName
      this.postForm.telClient = item.contactMobile
      this.postForm.email = item.contactEmail
      this.postForm.deliveryAddress = item.addr
    },

    // 删除本地测试项目
    deleteRow(index, rows) {
      rows.splice(index, 1)
      this.calTotalCost()
    },
    // 确认选择商品
    handleCheckConfirm() {
      console.log(this.productlist)
      if (this.productlist) {
        this.postForm.goods.push(this.productlist)
      }
      console.log(this.postForm.goods)
      this.postForm.goods.forEach((good, idx) => {
        this.checkedGoodsReportTypes[idx] = []
      })
      this.dialogVisible = false
      this.calTotalCost()
    },
    // 确认新增商品
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

      if (this.creditInfo.length !== 0) {
        this.postForm.goods.push(this.creditInfo)
      }

      console.log(this.creditInfo)
      getProductCreate(this.creditInfo)
        .then((res) => {
          const { data, status } = res
          if (status == 200) {
            this.dialogVisible = false
          } else {
            this.$message.error(res.errMsg)
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
      const title = '新建报价单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '新建报价单'
      document.title = `${title} `
    },
    submitForm(formName) {
      console.log(this.postForm)
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let isPass = true
          let massage = ""
          const form = deepClone(this.postForm)
          console.log(form, "deepClone===============")
          form.testPrice = form.testPriceShow
          form.goods.forEach(goodsItem => {
            if (!goodsItem.testPeriod) {
              isPass = false
              massage = "请输入商品检测周期"
            } else if (!goodsItem.testPrice) {
              isPass = false
              massage = "请输入商品检测费用"
            } else if (!goodsItem.sampleNum) {
              isPass = false
              massage = "请输入检测样品数量"
            } else if (!goodsItem.reportTypes || !goodsItem.reportTypes.length) {
              isPass = false
              massage = "请勾选报告类型"
            }
          })
          if (!isPass) {
            this.$message.error(massage)
            return false
          }
          getQuotationCreate(form).then(res => {
            const { data, status } = res
            if (status == 200) {

            } else {
              this.$message.error(res.errMsg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })

      // if (this.isEdit) {
      //
      // } else {
      //   getQuotationCreate(this.postForm)
      //     .then((res) => {
      //       const { data, status } = res
      //       if (status == 200) {
      //         this.postForm = []
      //         // this.$message.success(data.msg)
      //         this.goBack()
      //       } else {
      //         this.$message.error(res.errMsg)
      //       }
      //     })
      //     .catch((e) => {
      //       this.$message.error(e)
      //     })
      //     .finally(() => {
      //       this.dialogVisible_check = false
      //     })
      // }
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
      let total = 0
      this.postForm.reportFee = 0
      this.postForm.totalCost = 0
      this.postForm.testFee = 0
      this.postForm.goods.forEach(good => {
        let testFee = 0
            good.items?.forEach(item => {
              item.itemId = item.id
              console.log(item)
              const price = Number(item.price)
              console.log((isNaN(price) ? 0 : price))
              const quantity = Number(item.quantity)
              testFee += (isNaN(price) ? 0 : price) * (isNaN(quantity) ? 0 : quantity)
            })
            good.testPrice = testFee
            if (good.testPriceShow) {
              testFee = good.testPriceShow * 100
            }
            this.postForm.testFee += testFee
            total += testFee
            if (this.feeRate) {
              total = total * (1 + this.feeRate)
            }
            let postage = 0
            if (good.reportTypes?.length >= 2) {
              postage = 10000
              good.reportTypes.forEach(type => {
                postage += this.customerOptions[type - 1].price
              })
            }
            good.reportFee = postage

            total += postage
            this.postForm.reportFee += good.reportFee
      })
      this.postForm.totalCost = total
      if (this.postForm.postage) {
        this.postForm.totalCost += (this.postForm.postage * 100)
      }

      // this.postForm.totalCost = ((Number(this.tmpTotalTestCost) + Number(this.postForm.reportFee) + Number(this.postForm.courierFee)) *
      //   (1 + this.postForm.taxFee / 100.0) *
      //   (1 - this.postForm.discount / 100.0)).toFixed(2)
    },
    testInputChange(e, index) {
      e.reportTypes = this.checkedGoodsReportTypes[index]
      this.calTotalCost()
    },

    postageChange() {
      this.calTotalCost()
    },
    insertEvent() {
      this.dialogVisible = true
      this.productlist = []
      this.goodsInfo = {}
      this.creditInfo = []
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
