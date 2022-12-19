<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测报价单信息</div>
    <el-divider content-position="left">基本信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border :label-style="{'width': '150px'}" :content-style="{'width': '200px'}">
      <el-descriptions-item>
        <template slot="label">{{ "报价单编号\nQuotation No" }}</template>
        {{ postForm.quotationNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联络人\nAttn" }}</template>
        {{ postForm.attn }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户\nClient" }}</template>
        {{ postForm.client }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户电话\nTel" }}</template>
        {{ postForm.telClient }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户传真\nFax" }}</template>
        {{ postForm.faxClient }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户邮箱\nE-mail" }}</template>
        {{ postForm.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "发票抬头\nInvoice Title" }}</template>
        {{ postForm.invoiceTitle }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "公司\nFrom" }}</template>
        {{ postForm.fromCom }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "公司电话\nFrom Tel" }}</template>
        {{ postForm.telCom }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "公司传真\nFrom Fax" }}</template>
        {{ postForm.faxCom }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报价日期\nDate" }}</template>
        {{ postForm.gmtCreate | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告类型\nReport Type" }}</template>
        {{ postForm.reportType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "报告邮寄地址\nRe.delivery to" }}</template>
        {{ postForm.deliveryAddress }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "测试周期\nTest period" }}</template>
        {{ postForm.testPeroid }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider class="mb36" content-position="left">费用信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border :label-style="{'width': '150px'}" :content-style="{'width': '200px'}">
      <el-descriptions-item>
        <template slot="label">{{ "报告费\nReport Fee" }} </template>
        {{ postForm.reportFee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "快递费\nExpress Fee" }} </template>
        {{ postForm.courierFee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "税率\nTax Fee" }}</template>
        {{ postForm.taxFee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "折扣\nDiscount" }}</template>
        {{ postForm.discount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "总费用\nTotal Cost" }}</template>
        {{ postForm.totalCost }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider class="mb36" content-position="left">账户信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border :label-style="{'width': '150px'}" :content-style="{'width': '200px'}">
      <el-descriptions-item>
        <template slot="label">{{ "户名\nAccount Name" }}</template>
        {{ postForm.bankAccountName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "账号\nBank Account" }}</template>
        {{ postForm.bankAccount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "银行名称\nBank Name" }}</template>
        {{ postForm.bankName }}
      </el-descriptions-item>
      <!--      <el-descriptions-item>-->
      <!--        <template slot="label">{{ "申请公司签名\nClient.Sign" }}</template>-->
      <!--        {{ postForm.clientComSignature }}-->
      <!--      </el-descriptions-item>-->
      <!--      <el-descriptions-item>-->
      <!--        <template slot="label">{{ "立标代表签名\nlibiaoRe.Sign" }}</template>-->
      <!--        {{ postForm.libiaoRepresentativeSignature }}-->
      <!--      </el-descriptions-item>-->
      <!--      <el-descriptions-item>-->
      <!--        <template slot="label">{{ "盖章\nClient.Chop" }}</template>-->
      <!--        {{ postForm.clientComChop }}-->
      <!--      </el-descriptions-item>-->
      <!--      <el-descriptions-item>-->
      <!--        <template slot="label">{{ "审核人员签名\nAudit" }}</template>-->
      <!--        {{ postForm.audit }}-->
      <!--      </el-descriptions-item>-->
      <el-descriptions-item>
        <template slot="label">{{ "客户签名日期\nClient Date" }}</template>
        {{ postForm.clientSignatureDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "立标签名日期\nLibiao Date" }} </template>
        {{ postForm.libiaoSignatureDate }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">报价单明细</el-divider>
    <vxe-table
      ref="xTable"
      border
      show-footer
      show-overflow
      class="editable-footer mb20"
      :merge-footer-items="mergeFooterItems"
      :row-config="{ isHover: true }"
      :export-config="{}"
      :footer-method="footerMethod"
      :data="postForm.testQuotationItemList"
      resizable
    >
      <vxe-column type="seq" width="60" :title="'序号\nNum'" align="right" />
      <vxe-column field="reportNum" :title="'报告编号\nReport No'" />
      <vxe-column field="productDes" :title="'产品名称\nProduct Description'" />
      <vxe-column field="style" :title="'型号\nStyle/Item No'" />
      <vxe-column field="materialColor" :title="'材质/颜色\nMaterial/Color'" />
      <vxe-column field="testItem" :title="'测试项目\nTest Item'" />
      <vxe-column field="unitPrice" :title="'单价\nUnit Price'" />
      <vxe-column field="qty" :title="'测试点数\nQty'" />
      <vxe-column field="amountRmb" :title="'测试金额\nAmount/RMB'" />
    </vxe-table>
    <el-divider content-position="left">备注</el-divider>
    <div class="remark-content">
      <P style="white-space: pre-wrap">
        {{ postForm.remark }}
      </P>
    </div>
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
const { prefix } = config[process.env.NODE_ENV]

export default {
  filters: {
    timeFormatFilter
  },
  data() {
    return {
      encryptionKey: "",
      fileName: "",
      submitLoading: false,
      downloadParam: {
        testTradeId: -1
      },
      postForm: undefined,
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
      fetch(prefix.lb +
        "/api/test/previewTestQuotation?testTradeId=" +
        this.downloadParam.testTradeId,
      {
        method: "GET",
        responseType: "application/pdf",
        headers: new Headers({
          "token": getToken().toString()
        })
      }) // FETCH BLOB FROM IT
        .then((response) => response.blob())
        .then((blob) => { // RETRIEVE THE BLOB AND CREATE LOCAL URL
          var _url = window.URL.createObjectURL(blob)
          window.open(_url, "_blank").focus() // window.open + focus
        }).catch((err) => {
          console.log(err)
        })
    },
    handleDownLoad() {
      console.log('handleDownLoad')
      const fileName = '报价单-' + this.downloadParam.testTradeId
      fetch(
        prefix.lb +
        "/api/test/downloadTestQuotation?testTradeId=" +
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
        this.postForm = response.data.testQuotation

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '查看检测报价单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tempRoute.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看检测报价单'
      document.title = `${title} - ${this.tempRoute.params.id}`
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/quotation/list"
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
