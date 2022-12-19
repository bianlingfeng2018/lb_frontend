<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测申请单信息</div>
    <el-divider
      content-position="left"
    >申请信息 Applicant Information</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border :label-style="{'width': '150px'}" :content-style="{'width': '200px'}">
      <el-descriptions-item>
        <template slot="label">{{ "报告编号 \nReport No" }}</template>
        {{ postForm.reportNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告日期 \nReport Date" }}</template>
        {{ postForm.reportDate | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "接收日期 \nRec Date" }}</template>
        {{ postForm.recDate | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户名称 \nCS Name" }}</template>
        {{ postForm.csName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "申请单位名称\nApplication Name" }}</template>
        {{ postForm.applicationName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "申请单位地址\nApplicant Address" }}</template>
        {{ postForm.applicationAddress }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告抬头\nReport Title" }}</template>
        {{ postForm.reportTitle }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "同申请方\nSame as applicant" }}</template>
        {{ postForm.sameAsApplicant }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "其他名称\nOthers Name" }}</template>
        {{ postForm.otherName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "其他地址\nOthers Address" }}</template>
        {{ postForm.otherAddress }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联系人\nContact" }}</template>
        {{ postForm.contact }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "电话\nTel" }}</template>
        {{ postForm.tel }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "传真\nFax" }}</template>
        {{ postForm.fax }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "电邮\nE-mail" }}</template>
        {{ postForm.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告邮寄地址\nReport Delivered To" }}</template>
        {{ postForm.deliveredTo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "付款方\nPayer" }}</template>
        {{ postForm.payer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "发票抬头\nInvoice Title" }}</template>
        {{ postForm.invoiceTitle }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider
      class="mb36"
      content-position="left"
    >样品信息Sample Information</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border :label-style="{'width': '150px'}" :content-style="{'width': '200px'}">
      <el-descriptions-item>
        <template slot="label">{{ "样品名称\nSample Name" }}</template>
        {{ postForm.sampleName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "样品数量\nSample Quantity" }}</template>
        {{ postForm.sampleQuantity }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "样品型号\nSample Model" }}</template>
        {{ postForm.sampleModel }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "商标\nBrand" }}</template>
        {{ postForm.brand }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "样品批号\nLot No" }}</template>
        {{ postForm.lotNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "规格\nSpecification" }}</template>
        {{ postForm.specification }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "供应商\nSupplier" }}</template>
        {{ postForm.supplier }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "订单号\nP/O No" }}</template>
        {{ postForm.poNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "购买商\nBuyer" }}</template>
        {{ postForm.buyer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "生产商\nManufacturer" }}</template>
        {{ postForm.manufacturer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "出口地\nReport Type" }}</template>
        {{ postForm.exportedTo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "生产国\nCountry of Origin" }}</template>
        {{ postForm.originCountry }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告格式\nReport format" }}</template>
        {{ postForm.reportFormat }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告方式\nReport Type" }}</template>
        {{ postForm.reportType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "是否接受分包\nAgree to subcontract" }}</template>
        {{ postForm.agreeToSubcontract }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "服务类型\nService Requested" }}</template>
        {{ postForm.serviceType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "测试项目及（或）要求\nTest item and(or) requirement" }}</template>
        {{ postForm.serviceType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "样品处理方式\nSample Treatment" }}</template>
        {{ postForm.testRequirement }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "申请公司授权人签名\nSignature and Company Chop" }}</template>
        {{ postForm.applicantSigCop }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "申请日期\nDate" }}</template>
        {{ postForm.applicationDate }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="left">多种材料清单样品明细</el-divider>
    <vxe-table
      ref="xTable"
      border
      show-footer
      show-overflow
      class="editable-footer mb20"
      :row-config="{ isHover: true }"
      :export-config="{}"
      :data="postForm.testApplicationItemList"
    >
      <vxe-column type="seq" width="60" :title="'序号 Num'" align="right" />
      <vxe-column
        field="sampleName"
        :title="'样品（部位）名称 (Part of)Sample Name'"
      />
      <vxe-column field="sampleModel" :title="'样品型号 Sample Model'" />
      <vxe-column
        field="sampleMaterial"
        :title="'材质 Style/Sample Material'"
      />
      <vxe-column
        field="sampleDescription"
        :title="'样品描述 Sample Description'"
      />
      <vxe-column field="testingItem" :title="'测试项目 Test Item'" />
      <vxe-column field="accordingTo" :title="'判定依据 According to'" />
      <vxe-column field="remark" :title="'备注 Remark'" />
    </vxe-table>
    <el-divider content-position="left">其他</el-divider>
    <my-flex-table ref="myFlexTable" :flex-obj="postForm.flexObj" />
    <p />
    <el-button
      v-loading="submitLoading"
      type="primary"
      size="small"
      plain
      @click="handleDownLoad()"
    >下载</el-button>
    <el-button
      type="primary"
      size="small"
      plain
      @click="handlePreview()"
    >预览</el-button>
  </div>
</template>

<script>
import { queryTestTradeDetail } from "@/api/transaction"
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
      postForm: {
        flexObj: []
      },
      mergeFooterItems: [{ row: 0, col: 0, rowspan: 0, colspan: 8 }]
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
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
        .finally(() => {})
    },
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testApplicationForm

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
      this.$router.push({
        path: "/tm/detection/apply/list"
      })
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
