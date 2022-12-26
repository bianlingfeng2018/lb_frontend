<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack()">返回上一页</el-button>
    <div class="mt20" style="background-color: #F56C6C;padding:10px">
      <span class="mt20 mb20 ml16 ">申请单单被XX评审不通过，评审不通过原因：XXXXXXXXXXXXXXXXXXXXXXXXX(评审人：XXX 评审时间：2022-12-2 14:51)</span>
    </div>
    <el-divider content-position="left">申请信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="2" :content-style="{ 'width': '200px' }">
      <el-descriptions-item>
        <template slot="label">申请单编号</template>
        {{ postForm.reportNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">申请单位</template>
        {{ postForm.applicationName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">申请单位地址</template>
        {{ postForm.otherAddress }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">报告抬头</template>
        {{ postForm.reportTitle }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">报告抬头地址</template>
        {{ postForm.sameAsApplicant }}
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
        {{ postForm.payer }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider class="mb36" content-position="left">样品信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="2" :content-style="{ 'width': '200px' }">
      <el-descriptions-item>
        <template slot="label">样品名称</template>
        {{ postForm.sampleName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">样品数量</template>
        {{ postForm.sampleQuantity }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">样品型号</template>
        {{ postForm.sampleModel }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">样品状态</template>
        {{ postForm.brand }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">商标</template>
        {{ postForm.brand }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">批次</template>
        {{ postForm.lotNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">规格</template>
        {{ postForm.specification }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">供应商</template>
        {{ postForm.supplier }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">购买商</template>
        {{ postForm.buyer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">订单号</template>
        {{ postForm.poNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">生产商</template>
        {{ postForm.manufacturer }}
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
        {{ postForm.testRequirement }}
      </el-descriptions-item>

    </el-descriptions>
    <div>
      <spn>测试项目及要求:</spn>
      <vxe-table
        ref="xTable"
        border
        show-overflow
        class="editable-footer mb20 mt8"
        :row-config="{ isHover: true }"
        :export-config="{}"
        :data="postForm.testApplicationItemList"
      >
        <vxe-column type="seq" width="60" :title="'序号'" align="right" />
        <vxe-column field="testingItem" :title="'测试项目'" />
        <vxe-column field="sampleName" :title="'单价'" />
        <vxe-column field="sampleModel" :title="'测试点数'" />
        <vxe-column field="sampleMaterial" :title="'测试金额'" />
        <vxe-column field="sampleDescription" :title="'样品量'" />
      </vxe-table>
    </div>
    <el-divider content-position="left">多种材料清单样品信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" :content-style="{ 'width': '200px' }">
      <el-descriptions-item>
        <template slot="label">样品部位名称</template>
        {{ postForm.sampleName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">样品型号</template>
        {{ postForm.sampleQuantity }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">材质</template>
        {{ postForm.sampleModel }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">取样部位描述</template>
        {{ postForm.brand }}
      </el-descriptions-item>
    </el-descriptions>
    <spn>测试项目:</spn>
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
      <vxe-column type="seq" width="60" :title="'序号'" align="right" />
      <vxe-column field="testingItem" :title="'测试项目'" />
      <vxe-column field="sampleModel" :title="'测试方法'" />
      <vxe-column field="sampleMaterial" :title="'测试条件'" />
      <vxe-column field="remark" :title="'备注'" />
    </vxe-table>

    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="handleDownLoad()">下载</el-button>
    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>
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
        .finally(() => { })
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
