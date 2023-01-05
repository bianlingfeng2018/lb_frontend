<template>
  <div class="app-container ohn quotation-box">
    <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
      <el-descriptions-item>
        <template slot="label">{{ "报价编号" }}</template>
        {{ postForm.quotationNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "交易名称" }}</template>
        {{ postForm.tradeName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "交易描述" }}</template>
        {{ postForm.tradeDesc }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "支付方式" }}</template>
        <span v-if="postForm.payType==0">挂账</span>
        <span v-else-if="postForm.payType==100">先付后检</span>
        <span v-else>先付{{postForm.payType}}%后检</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户公司" }}</template>
        {{ postForm.clientName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联系人" }}</template>
        {{ postForm.attn }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联系电话" }}</template>
        {{ postForm.telClient }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户传真" }}</template>
        {{ postForm.faxClient }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户邮箱" }}</template>
        {{ postForm.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告邮寄地址" }}</template>
        {{ postForm.deliveryAddress }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">报价明细</el-divider>
    <div v-for="goodsItem in postForm.goods">
      <el-form class="left mt20" ref="postForm" :inline="true" :model="goodsItem" status-icon label-width="150px">
        <el-form-item label="产品名：" prop="telClient">{{ goodsItem.goodsName}}</el-form-item>
        <el-form-item label="HSCode：" prop="telClient">{{ goodsItem.hsCode}}</el-form-item>
        <el-form-item label="材质：" prop="telClient">{{ goodsItem.material}}</el-form-item>
        <el-form-item label="出口国：" prop="telClient">{{ goodsItem.exportCountry}}</el-form-item>
        <el-form-item label="检测标准：" prop="telClient">{{ goodsItem.standard}}</el-form-item>

        <el-table :data="goodsItem.items" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="itemId" label="序号" width="60"/>
          <el-table-column prop="testItem" label="测试项目" min-width="120"/>
          <el-table-column prop="unitPrice" label="单价" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.unitPrice | changePrice2money}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="测试点数" min-width="120"/>
          <el-table-column prop="amountRmb" label="测试金额" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.amountRmb | changePrice2money}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sampleQty" label="样品数量" min-width="120"/>
        </el-table>

        <el-form-item label="测试周期">{{goodsItem.testPeriod}}个工作日</el-form-item>
        <el-form-item label="总样品量">{{goodsItem.sampleNum}}</el-form-item>
        <el-form-item label="服务类型">
          <span v-if="goodsItem.service==0">标准</span>
          <span v-else-if="goodsItem.service==1">加急</span>
          <span v-else-if="goodsItem.service==2">特急</span>
        </el-form-item>
        <br>
        <el-form-item label="报告类型">{{goodsItem.reportTypes}}</el-form-item>
        <el-form-item label="报告费">{{goodsItem.reportAmt | changePrice2money}}</el-form-item>
        <el-form-item label="检测价格（不含税）">{{goodsItem.amount | changePrice2money}}</el-form-item>
        <br>
        <el-form-item :label="'检测费(含税)：'">
          <span class="text-danger">{{ total | changePrice2money }}</span>
        </el-form-item>
        <el-form-item :label="'报告费：'">
          <span class="text-danger">{{ postForm.reportFee | changePrice2money }}</span>
        </el-form-item>
        <el-form-item label="快递费：">
          <span class="text-danger">{{ postForm.postage | changePrice2money }}</span>
        </el-form-item>
        <br>
        <el-form-item :label="'总计（含税）：'">
          <span class="text-danger">{{ postForm.totalCost | changePrice2money }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { getQuotationDetail } from "@/api/organizations"
  import { changePrice2money } from "@/utils/simple-util"

  export default {
    name: 'QuotationResult',
    filters: {
      changePrice2money
    },
    data() {
      return {
        postForm: {},
        total:'',
      }
    },
    created() {
      const id =  this.$route.query.id
      console.log(this.$route.params)
      console.log(id)
      this.fetchData(id)
    },
    methods: {
      fetchData: function(id) {
        const queryParam = {
          requestId: Math.random().toString(24),
          quotationNum: id
        }
        getQuotationDetail(Object.assign({}, queryParam)).then(response => {
          console.log(response.data)
          this.postForm = response.data
          this.postForm.goods.forEach(good => {
            this.total += good.amount
          })
        }).catch(err => {
          console.log(err)
        })
      },
    }

  }
</script>

<style scoped>
  .text-danger {
    color: #a90c0a;
    font-weight: bold;
    font-size: large;
  }
</style>
