<template>
  <div class="app-container ohn ">
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="$router.go(-1)">返回上一页</el-button>
    <el-divider class="mt50" content-position="left">申请信息</el-divider>
    <el-form
      ref="postForm"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="150px">
      <el-form-item v-if="isEdit" label="申请单编号" >{{postForm.quotationNum}}</el-form-item>
      <el-form-item label="申请单位">{{postForm.applicationName}}</el-form-item>
      <br>
      <el-form-item :label="'申请单位地址'" prop="comAddrCn">
        <el-input v-model="postForm.comAddrCn" placeholder="请输入申请单位地址 " clearable style="width: 240px"/>
        <el-input v-model="postForm.comAddrEn" placeholder="请输入英文地址 " clearable style="width: 240px;margin-left: 20px;"/>
      </el-form-item>
      <br>
      <el-form-item :label="'报告抬头'" prop="radioStandard">
        <el-radio-group v-model="postForm.radioStandard" style="width: 240px">
          <el-radio :label="1" class="mt20">同申请方</el-radio>
          <el-radio :label="2" class="mt20">自定义</el-radio>
        </el-radio-group>
        <el-input v-if="postForm.radioStandard == 2" v-model="postForm.reportTitleCn" placeholder="输入自定义报告抬头（中文）"
                  clearable
                  style="width: 200px "/>
        <el-input v-if="postForm.radioStandard == 2" v-model="postForm.reportTitleEn" placeholder="输入自定义报告抬头（英文）"
                  clearable
                  style="width: 200px;margin-left: 20px;"/>
        <el-input v-if="postForm.radioStandard == 2" v-model="postForm.reportAddressCn" placeholder="输入报告抬头方中文地址"
                  clearable
                  style="width: 200px;margin-left: 20px;"/>
        <el-input v-if="postForm.radioStandard == 2" v-model="postForm.reportAddressEn" placeholder="输入报告抬头方英文地址"
                  clearable
                  style="width: 200px;margin-left: 20px;"/>
      </el-form-item>
      <br>
      <el-form-item :label="'报告邮寄地址'" >
        <el-input
          v-model="postForm.reportAddressCn"
          type="textarea"
          placeholder="请输入邮寄地址"
          :rows="2"
          maxlength="100"
          show-word-limit
          clearable
          style="width: 240px"/>
      </el-form-item>
      <br>
      <el-form-item :label="'发票抬头'" prop="invoiceTitle">
        <el-input v-model="postForm.invoiceTitle" placeholder="请输入发票抬头" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item :label="'需要资质'">
        <el-radio-group v-model="postForm.credentials" style="width: 240px">
          <el-radio label="CNAS"/>
          <el-radio label="CMA"/>
        </el-radio-group>
      </el-form-item>
      <el-divider class="mb36" content-position="left">样品信息</el-divider>
      <el-form-item :label="'样品名称'" prop="sampleNameCn">
        <el-input v-model="postForm.sampleNameCn" placeholder="请输入样品名称" clearable style="width: 240px"/>
        <el-input v-model="postForm.sampleNameEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'样品数量'"  prop="sampleQuantity">
        <el-input v-model="postForm.sampleQuantity" placeholder="请输入样品数量" clearable style="width: 240px"/>
      </el-form-item>
      <br>
      <el-form-item :label="'样品型号'"  prop="sampleModelCn">
        <el-input v-model="postForm.sampleModelCn" placeholder="请输入样品型号" clearable style="width: 240px"/>
        <el-input v-model="postForm.sampleModelEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'样品状态'"  prop="sampleStatusCn">
        <el-input v-model="postForm.sampleStatusCn" placeholder="请输入样品状态" clearable style="width: 240px"/>
        <el-input v-model="postForm.sampleStatusEn" placeholder="英文" clearable
                  style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'商标'">
        <el-input v-model="postForm.brandCn" placeholder="请输入商标" clearable style="width: 240px"/>
        <el-input v-model="postForm.brandEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'批号'">
        <el-input v-model="postForm.lotNoCn" placeholder="请输入样品批号" clearable style="width: 240px"/>
        <el-input v-model="postForm.lotNoEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'规格'">
        <el-input v-model="postForm.specificationCn" placeholder="请输入规格" clearable style="width: 240px"/>
        <el-input v-model="postForm.specificationEn" placeholder="英文" clearable
                  style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'供应商'">
        <el-input v-model="postForm.supplierCn" placeholder="请输入供应商" clearable style="width: 240px"/>
        <el-input v-model="postForm.supplierEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'购买商'" prop="buyer">
        <el-input v-model="postForm.buyerCn" placeholder="请输入购买商" clearable style="width: 240px"/>
        <el-input v-model="postForm.buyerEn" placeholder="英文" clearable style="width: 240px; margin-left: 20px;"/>
      </el-form-item>
      <el-form-item :label="'订单号'" prop="quotationNum">
        <el-input v-model="postForm.quotationNum" placeholder="请输入订单号" clearable style="width: 240px"/>
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
        <el-table :data="applyForm.goods" stripe border class="mt8">
          <el-table-column align="center" label="序号" width="100" type="index"/>
          <el-table-column prop="client" label="测试项目" min-width="120"/>
          <el-table-column prop="reportType" label="单价" min-width="120"/>
          <el-table-column prop="reportFee" label="测试点数" min-width="100"/>
          <el-table-column prop="reportFee" label="测试金额" min-width="100"/>
          <el-table-column prop="reportFee" label="样品数量" min-width="100"/>
        </el-table>
      </el-form-item>

      <el-divider content-position="left">多种材料清单样品信息</el-divider>

      <div :model="gooditem" v-for="(gooditem,index) in postForm.sampleList" :key="index">
        <el-form-item label="样品部位名称：" prop="sampleName">
          <el-input v-model="gooditem.sampleName" placeholder="请输入样品部位名称" clearable style="width: 240px"/>
        </el-form-item>
        <el-form-item label="样品型号：" >
          <el-input v-model="gooditem.sampleModel" placeholder="请输入样品型号" clearable style="width: 240px"/>
        </el-form-item>
        <el-form-item label="材质：">
          <el-input v-model="gooditem.sampleMaterial" placeholder="请输入样品材质" clearable
                    style="width: 240px"/>
        </el-form-item>
        <br>
        <el-form-item label="样品描述：" prop="sampleDescription">
          <el-input v-model="gooditem.sampleDescription" placeholder="请输入样品描述" clearable style="width: 480px"/>
        </el-form-item>
        <br>
        <el-form-item label="测试项目：">
          <el-button type="text" @click="showDialog(gooditem)">选择测试项目</el-button>
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
        <el-table :data="gooditem.itemList" stripe border>
          <el-table-column prop="testItemId" label="序号" width="80"/>
          <el-table-column prop="itemName" label="测试项目" min-width="120"/>
          <el-table-column prop="testMethod" label="测试方法" min-width="120">
            <template slot-scope="scope">
              <el-select value-key="testMethod" v-model="scope.row.testMethod" placeholder="请选择"
                         @focus="getTestOptions(scope.row)" v-on:change="getTestCase(scope.row)">
                <el-option
                  v-for="item in testOptions"
                  :key="item.testMethod"
                  :label="item.testMethod"
                  :value="item.testMethod">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="testCase" label="测试条件" min-width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.testCase" placeholder="请选择">
                <el-option
                  v-for="item in testCases"
                  :key="item.testCase"
                  :label="item.testCase"
                  :value="item.testCase">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" type="text"/>
            </template>
          </el-table-column>
        </el-table>
        <el-divider content-position="left"></el-divider>
      </div>
      <el-button type="text" size="small" plain @click="insertEvent" class="tr mb10">新增样品部位</el-button>
      <div class="tc">
        <el-button type="primary" @click="submitForm('postForm')">保存</el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { changePrice2money } from "@/utils/simple-util"
  import methods from "../../pub_methods/validate"
  import {
    getApplicationDetail,
    getApplicationCreate,
    getApplicationModify,
    getItemList,
    getCountryList,
    getItemById
  } from "@/api/organizations"

  export default {
    filters: {
      changePrice2money
    },
    data() {
      return {
        rules: methods.applyCreateValidate,
        isEdit: false,
        radioStandard: "1",
        postForm: {
          sampleList: [],
        },
        applyForm: [],
        exportList: [],//出口国
        innerDialogVisible: false,
        checkList: [],
        checkGoodItem: {},
        productItemlist: [],//测试项目列表
        testOptions: [],
        testCases: [],
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
        this.setTagsViewTitle()
        this.setPageTitle()
      }
      this.getInfodata()
    },
  methods: {
    fetchData: function(id) {
      const queryParam = {
        requestId: Math.random().toString(24),
        applicationNum: id
      }
      getApplicationDetail(Object.assign({}, queryParam)).then(response => {
        console.log(response.data)
        this.postForm = response.data

        // set tagsview title
        this.setTagsViewTitle()
        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    async getInfodata() {
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
    //获取测试方法
    async getTestOptions(dataItem) {
      const res = await getItemById({
        itemId: dataItem.id,
        requestId: Math.random().toString(24)
      })
      this.testOptions = res.data.dataList
    },
    //获取测试条件
    getTestCase(data) {
      this.testCases = []
      console.log(data.testMethod)
      for (let i = 0; i < this.testOptions.length; i++) {
        let item = this.testOptions[i]
        if (item.testMethod == data.testMethod) {
          this.testCases = item.caseList
          console.log(this.testCases)
          return
        }
      }
    },
    //选择测试项目弹框
    showDialog(gooditem) {
      this.innerDialogVisible = true
      this.checkList = []
      this.checkGoodItem = gooditem
    },
    //选择测试项目
    checkedConfirm() {
      if (this.checkList.length) {
        let that = this
        this.checkList.forEach((item) => {
          item.testItemId = item.id
          item.itemName = item.name
          that.checkGoodItem.itemList.push(item)
        })
      }
      this.innerDialogVisible = false
    },
    //新增样品部位
    insertEvent() {
      let item = {
        itemList: [],
        sampleDescription: "",
        sampleMaterial: "",
        sampleModel: "",
        sampleName: ""
      } // 数据
      this.postForm.sampleList.push(item)
    },
    setTagsViewTitle() {
      const title = '创建申请单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '创建申请单'
      document.title = `${title}`
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
            console.log(this.postForm)
        } else {

        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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

