<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack">返回上一页</el-button>
    <div v-if="postForm.status == 3" class="mt20" style="background-color: #F56C6C;padding:10px">
      <span class="mt20 mb20 ml16 ">申请单被{{ postForm.reviewName }}评审不通过，不通过原因：{{ postForm.reviewReason }}(评审人：{{ postForm.reviewName
      }} 评审时间：{{ postForm.reviewTime }})</span>
    </div>
    <div id="pdfCentent">
      <el-divider content-position="left">申请信息</el-divider>
      <el-descriptions class="margin-top" title="" :column="2" :content-style="{ 'width': '200px' }">
        <el-descriptions-item>
          <template slot="label">申请单编号</template>
          {{ postForm.applicationNum }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">申请单位</template>
          {{ postForm.applicationName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">申请单位地址</template>
          {{ postForm.comAddrCn }}({{ postForm.comAddrEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">报告抬头</template>
          {{ postForm.reportTitleCn }}({{ postForm.reportTitleEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">报告抬头地址</template>
          {{ postForm.reportAddressCn }}({{ postForm.reportAddressEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">报告邮寄地址</template>
          {{ postForm.deliveredTo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">发票抬头</template>
          {{ postForm.invoiceTitle }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">需要资质</template>
          {{ postForm.credentials }}
        </el-descriptions-item>
      </el-descriptions>
      <el-divider class="mb36" content-position="left">样品信息</el-divider>
      <el-descriptions class="margin-top" title="" :column="2" :content-style="{ 'width': '200px' }">
        <el-descriptions-item>
          <template slot="label">样品名称</template>
          {{ postForm.sampleNameCn }}({{ postForm.sampleNameEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品数量</template>
          {{ postForm.sampleQuantity }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品型号</template>
          {{ postForm.sampleModelCn }}({{ postForm.sampleModelEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品状态</template>
          {{ postForm.sampleStatusCn }}({{ postForm.sampleStatusEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">商标</template>
          {{ postForm.brandCn }}({{ postForm.brandEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">批次</template>
          {{ postForm.lotNoCn }}({{ postForm.lotNoEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">规格</template>
          {{ postForm.specificationCn }}({{ postForm.specificationEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">供应商</template>
          {{ postForm.supplierCn }}({{ postForm.supplierEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">购买商</template>
          {{ postForm.buyerCn }}({{ postForm.buyerEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">订单号</template>
          {{ postForm.orderNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">生产商</template>
          {{ postForm.manufacturerCn }}({{ postForm.manufacturerEn }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">出口地</template>
          {{ postForm.exportedTo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">生产国</template>
          {{ postForm.originCountry }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">样品处理方式</template>
          {{ postForm.sampleDeal }}
        </el-descriptions-item>

      </el-descriptions>
      <div>测试项目及要求:
        <el-table :data="tableData" stripe border style="width: 100%" class="mt8">
          <el-table-column type="seq" label="序号" width="60" />
          <el-table-column prop="testItem" label="测试项目" min-width="120" />
          <el-table-column prop="unitPrice" label="单价" min-width="120" />
          <el-table-column prop="applicationDate" label="测试点数" min-width="120" />
          <el-table-column prop="quantity" label="测试金额" min-width="120" />
          <el-table-column prop="sampleStatus" label="样品量" min-width="120" />
        </el-table>
      </div>
      <el-divider content-position="left">多种材料清单样品信息</el-divider>
      <div v-for="(sampleitem,index) in postForm.sampleList" :key="index" :model="sampleitem">
        <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
          <el-descriptions-item>
            <template slot="label">样品部位名称</template>
            {{ sampleitem.sampleName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">样品型号</template>
            {{ sampleitem.sampleModel }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">材质</template>
            {{ sampleitem.sampleMaterial }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">取样部位描述</template>
            {{ sampleitem.sampleDescription }}
          </el-descriptions-item>
        </el-descriptions>

        <div>测试项目:</div>

        <vxe-table
          ref="xTable"
          border
          show-footer
          show-overflow
          class="editable-footer mb20 mt8"
          :row-config="{ isHover: true }"
          :export-config="{}"
          :data="sampleitem.itemList"
        >
          <vxe-column type="seq" width="60" :title="'序号'" align="right" />
          <vxe-column field="itemName" :title="'测试项目'" />
          <vxe-column field="testMethod" :title="'测试方法'" />
          <vxe-column field="testCase" :title="'测试条件'" />
          <vxe-column field="remark" :title="'备注'" />
        </vxe-table>
      </div>
    </div>
    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="ExportSavePdf(htmlTitle,Date.now())">下载</el-button>
    <!--    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>-->
  </div>
</template>

<script>
import { getApplicationDetail } from "@/api/organizations"
import { getToken } from "@/utils/auth"
import config from "@/utils/config"
import { timeFormatFilter } from "@/utils/simple-util"
import MyFlexTable from "@/views/components/MyFlexTable"

const { prefix } = config[process.env.NODE_ENV]

export default {
  components: {
    MyFlexTable
  },
  filters: {
    timeFormatFilter
  },
  data() {
    return {
      submitLoading: false,
      downloadParam: {
        testTradeId: -1
      },
      postForm: {},
      htmlTitle: 0,
      mergeFooterItems: [{ row: 0, col: 0, rowspan: 0, colspan: 8 }]
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.htmlTitle = `申请单-${id}-`
    this.downloadParam.testTradeId = this.tempRoute.params.id
  },
  methods: {
    handlePreview() {
      window.open(
        "/api/certification/previewByEncryptionKey?encryptionKey=" +
          "0fdb7ea8-7598-417d-82d4-6085002e5c11",
        "_blank"
      )
    },
    handleDownLoad() {
      console.log(prefix.lb +
          "/api/test/downloadTestReport?testTradeId=" +
          this.downloadParam.testTradeId)
      console.log('handleDownLoad')
      const fileName = '申请单-' + this.downloadParam.testTradeId
      fetch(
        prefix.lb +
          "/api/test/downloadTestApplicationForm?testTradeId=" +
          this.downloadParam.testTradeId,
        {
          method: "GET",
          responseType: "blob",
          headers: new Headers({
            "token": getToken().toString()
          })
        }
      )
        .then((res) => res.blob())
        .then((data) => {
          const blobUrl = window.URL.createObjectURL(data)
          const a = document.createElement("a")
          a.download = fileName + ".pdf"
          a.href = blobUrl
          a.click()
          this.$message({
            type: "success",
            message: "文件下载成功"
          })
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "文件下载失败，请稍后再试~"
          })
        })
        .finally(() => {
        })
    },
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
    setTagsViewTitle() {
      const title = '查看检测申请单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tempRoute.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看检测申请单'
      document.title = `${title} - ${this.tempRoute.params.id}`
    },
    goBack() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
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
    sumNum(list, field) {
      let count = 0
      list.forEach((item) => {
        count += Number(item[field])
      })
      return count
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

    ::v-deep .el-descriptions-item__label {
      white-space: pre-line;
    }
  }
</style>
