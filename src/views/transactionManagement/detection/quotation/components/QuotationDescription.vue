<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
<<<<<<< HEAD
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack()">返回上一页</el-button>
=======
    <el-button class="f1 pointer" @click="goBack()" icon="el-icon-arrow-left">返回上一页</el-button>
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
    <el-divider content-position="left">基本信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
      <el-descriptions-item>
        <template slot="label">{{ "报价编号" }}</template>
        {{ postForm.quotationNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "交易名称" }}</template>
        {{ postForm.attn }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "交易描述" }}</template>
        {{ postForm.attn }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "支付方式" }}</template>
        {{ postForm.attn }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户公司" }}</template>
        {{ postForm.fromCom }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联系人" }}</template>
        {{ postForm.client }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "联系电话" }}</template>
        {{ postForm.telCom }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户传真" }}</template>
        {{ postForm.faxCom }}
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

<<<<<<< HEAD
    <el-tabs v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
      <el-tab-pane label="报价明细" name="0">
        <vxe-table
          ref="xTable"
          border
          show-overflow
          class="editable-footer mb20"
          :merge-footer-items="mergeFooterItems"
          :row-config="{ isHover: true }"
          :export-config="{}"
          :footer-method="footerMethod"
          :data="postForm.testQuotationItemList"
          resizable
        >
=======
    <el-tabs v-model="activeIndex" @tab-click="handleClick" style="width: 100%">
      <el-tab-pane label="报价明细" name="0">
        <vxe-table ref="xTable" border show-overflow class="editable-footer mb20" :merge-footer-items="mergeFooterItems"
          :row-config="{ isHover: true }" :export-config="{}" :footer-method="footerMethod"
          :data="postForm.testQuotationItemList" resizable>
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
          <vxe-column type="seq" width="60" :title="'序号\nNum'" align="right" />
          <vxe-column field="reportNum" :title="'报告编号\nReport No'" />
          <vxe-column field="productDes" :title="'产品名称\nProduct Description'" />
          <vxe-column field="style" :title="'型号\nStyle/Item No'" />
          <vxe-column field="materialColor" :title="'材质/颜色\nMaterial/Color'" />
          <vxe-column field="testItem" :title="'测试项目\nTest Item'" />
          <vxe-column field="unitPrice" :title="'单价\nUnit Price'" />
          <vxe-column field="qty" :title="'测试点数\nQty'" />
          <vxe-column field="amountRmb" :title="'测试金额\nAmount/RMB'" />
        </vxe-table></el-tab-pane>
      <el-tab-pane label="申请单" name="1">
        <el-table v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="applicationName" label="申请单编号" min-width="120" />
          <el-table-column prop="reportTitle" label="申请日期" min-width="120" />
          <el-table-column prop="sameAsApplicant" label="收样状态" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmed == 1">已收样</span>
              <span v-else-if="scope.row.confirmed == 2">未收样</span>
            </template>
          </el-table-column>
          <el-table-column prop="otherName" label="样品接收日期" min-width="120" />
          <el-table-column prop="otherAddress" label="要求完成日期" min-width="120" />
          <el-table-column prop="contact" label="合同评审状态" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmed == 1">待评审</span>
              <span v-else-if="scope.row.confirmed == 2">评审通过</span>
              <span v-else-if="scope.row.confirmed == 3">评审不通过</span>
              <span v-else-if="scope.row.confirmed == 4">已下单</span>
            </template>
          </el-table-column>
          <el-table-column prop="tel" label="跟进人" min-width="120" />
          <el-table-column prop="fax" label="评审人" min-width="120" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="工作单" name="2">
        <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="workOrderNum" label="工作单编号" min-width="120" />
          <el-table-column prop="gmtCreate" label="开单日期" min-width="120" />
          <el-table-column prop="busyStatus" label="是否加急" min-width="120" />
          <el-table-column prop="issuer" label="要求完成日期" min-width="120" />
          <el-table-column prop="gmtOutput" label="出单日期" min-width="120" />
          <el-table-column prop="withdraw" label="检测单位名称" min-width="120" />
          <el-table-column prop="withdraw" label="是否分包商" min-width="120" />
          <el-table-column fixed="right" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmed">已确认</span>
              <span v-else>待确认</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
<<<<<<< HEAD
      <el-tab-pane label="原始记录单" name="3">
=======
      <el-tab-pane label="原始记录单" name="3" >
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
        <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="workOrderNum" label="原始记录单编号" min-width="120" />
          <el-table-column prop="gmtCreate" label="检测项目" min-width="120" />
          <el-table-column prop="busyStatus" label="检测实验室" min-width="120" />
          <el-table-column prop="issuer" label="检测设备号" min-width="120" />
          <el-table-column prop="gmtOutput" label="测试人员" min-width="120" />
          <el-table-column prop="withdraw" label="创建日期" min-width="120" />
          <el-table-column prop="withdraw" label="要求日期" min-width="120" />
          <el-table-column prop="withdraw" label="报告日期" min-width="120" />
          <el-table-column fixed="right" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmed">已确认</span>
              <span v-else>待确认</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
<<<<<<< HEAD
      <el-tab-pane label="检测报告单" name="4">
=======
      <el-tab-pane label="检测报告单" name="4" >
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
        <el-table :v-loading="tableLoading" :data="tableData" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="workOrderNum" label="报告编号" min-width="120" />
          <el-table-column prop="gmtCreate" label="客户名称" min-width="120" />
          <el-table-column prop="gmtOutput" label="测试人员" min-width="120" />
          <el-table-column prop="withdraw" label="要求日期" min-width="120" />
          <el-table-column prop="withdraw" label="报告日期" min-width="120" />
          <el-table-column fixed="right" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmed">已确认</span>
              <span v-else>待确认</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

<<<<<<< HEAD
=======

   
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="handleDownLoad()">下载</el-button>
    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>
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
        .finally(() => { })
    },
    fetchData: function (id) {
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
      const title = '查看报价单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tempRoute.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看报价单'
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
