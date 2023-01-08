<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack">返回上一页</el-button>
    <div id="pdfCentent">
      <el-divider content-position="left">检测报告单</el-divider>
      <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
        <el-descriptions-item>
          <template slot="label">报告编号</template>
          {{ postForm.reportNum }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">客户名称</template>
          {{ postForm.client }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">编制人</template>
          {{ postForm.editor }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">报告日期</template>
          {{ postForm.reportDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">线路负责人</template>
          {{ postForm.charger }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">审核人</template>
          {{ postForm.reviewer }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">审批人</template>
          {{ postForm.approver }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">样品信息</el-divider>
      <el-descriptions class="margin-top" title="" :column="2" :content-style="{ 'width': '200px' }">
        <el-descriptions-item>
          <template slot="label">样品名称</template>
          {{ postForm.sample.sampleNameCn }}({{postForm.sample.sampleNameEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品数量</template>
          {{ postForm.sample.sampleQuantity }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品型号</template>
          {{ postForm.sample.sampleModelCn }}({{postForm.sample.sampleModelEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品状态</template>
          {{ postForm.sample.sampleStatusCn }}({{postForm.sample.sampleStatusEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">商标</template>
          {{ postForm.sample.brandCn }}({{postForm.sample.brandEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">批次</template>
          {{ postForm.sample.lotNoCn }}({{postForm.sample.lotNoEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">规格</template>
          {{ postForm.sample.specificationCn }}({{postForm.sample.specificationEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">供应商</template>
          {{ postForm.sample.supplierCn }}({{postForm.sample.supplierEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">购买商</template>
          {{ postForm.sample.buyerCn }}({{postForm.sample.buyerEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">订单号</template>
          {{ postForm.sample.orderNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">生产商</template>
          {{ postForm.sample.manufacturerCn }}({{postForm.sample.manufacturerEn}})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">出口地</template>
          {{ postForm.sample.exportedTo }}
        </el-descriptions-item>
      </el-descriptions>
      <p class="remark-content">
        以上信息由申请者提供及确认，我司对其真实性不承担责任
      </p>
      <el-divider content-position="left">样品描述</el-divider>

      <el-table :data="postForm.descList" stripe border style="width: 100%" class="mt8">
        <el-table-column type="seq" label="序号" width="60"/>
        <el-table-column prop="id" label="样品编号" min-width="120"/>
        <el-table-column prop="sampleDescription" label="取样部位描述" min-width="120"/>
        <el-table-column prop="sampleName" label="取样部位（位置）" min-width="120"/>
      </el-table>

      <el-divider content-position="left">测试结果</el-divider>

      <el-table
        :data="postForm.testResult"
        stripe
        border
        style="width: 100%"
        class="mt8"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="seq" label="序号" width="60"/>
        <el-table-column prop="testItem" label="测试项目" min-width="120"/>
        <el-table-column prop="testValue" label="测试数值" min-width="120"/>
        <el-table-column prop="limitValue" label="限值" min-width="120"/>
        <el-table-column prop="testResult" label="测试结果" min-width="120">
          <!--          <template slot-scope="scope">-->
          <!--            <span v-if="scope.row.state == 1">合格</span>-->
          <!--            <span v-else-if="scope.row.state == 2" style="color:red">不合格</span>-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column prop="testPerson" label="测试人员" min-width="120"/>
        <el-table-column prop="reportDate" label="报告时间" min-width="120"/>
      </el-table>
    </div>
    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="ExportSavePdf(htmlTitle,Date.now())">下载</el-button>
    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>
  </div>
</template>

<script>
  import { changePrice2money } from "@/utils/simple-util"
  import { getTestReportImages, approveReportDetail } from "@/api/worksheet"

export default {

  filters: {
    changePrice2money
  },
  data() {
    return {
      submitLoading: false,
      downloadParam: {
        testTradeId: -1
      },
      postForm: {
      },
      imgList: [],
      htmlTitle: 0
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.downloadParam.testTradeId = this.tempRoute.params.id
    // this.htmlTitle = `测试报告单-${id}-`
    //this.fetchAttachments(id)
  },
  methods: {
    fetchData: function(id) {
      approveReportDetail(Object.assign({}, {
        testReportId: id,
        requestId: Math.random().toString(24),
      })).then(response => {
        console.log(response.data)
        this.postForm = response.data
        this.postForm.testResult.forEach(good => {
          good.children = good.subList
        })


      }).catch(err => {
        console.log(err)
      })
    },

    goBack()
  {
    this.$store.dispatch('tagsView/delView', this.$route)
    this.$router.go(-1)
  }
  }
}
</script>
<style lang="scss" scoped>
.quotation-box {
  .remark-content {
    font-size: 12px;
    color: #808080;
    line-height: 20px;
  }

  .title-content {
    font-size: 14px;
  }

  ::v-deep .el-descriptions-item__label {
    white-space: pre-line;
  }
}
</style>
