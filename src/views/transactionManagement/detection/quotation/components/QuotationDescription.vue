<template>
  <div class="app-container ohn quotation-box">

    <!--    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="$router.go(-1)">返回上一页</el-button>-->
<!--    <el-divider content-position="left">基本信息</el-divider>-->
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
        {{ postForm.payType }}
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

    <el-tabs v-model="activeIndex" style="width: 100%" @tab-click="handleClick">
      <el-tab-pane label="报价明细" name="0">
        <div  v-for="postForm in postForm.goods">
          <div class="parent">
            <el-form
                    class="left mt20"
                    ref="postForm"
                    :inline="true"
                    :model="postForm.goods"
                    status-icon
                    label-width="150px"
                   >
              <el-form-item label="产品名：" prop="telClient">{{ postForm.goods.goodsName}}</el-form-item>
              <el-form-item label="HSCode：" prop="telClient">{{ postForm.goods.hsCode}}</el-form-item>
              <el-form-item label="材质：" prop="telClient">{{ postForm.goods.material}}</el-form-item>
              <el-form-item label="出口国：" prop="telClient">{{ postForm.goods.exportCountry}}</el-form-item>
              <el-form-item label="检测标准：" prop="telClient">{{ postForm.goods.standard}}</el-form-item>
              <vxe-table
                      ref="xTable"
                      border
                      show-overflow
                      class="editable-footer mb20"
                      :merge-footer-items="mergeFooterItems"
                      :row-config="{ isHover: true }"
                      :export-config="{}"
                      :footer-method="footerMethod"
                      :data="postForm.goods.items"
                      resizable>
                <vxe-column type="seq" width="60" :title="'序号'" align="right"/>
                <vxe-column field="testItem" :title="'测试项目'" :edit-render="{ autofocus: '.vxe-input--inner' }">
                  <template #edit="{ row }">
                    <vxe-input v-model="row.testItem" type="text" @input="updateFooterEvent"/>
                  </template>
                </vxe-column>
                <vxe-column field="unitPrice" :title="'单价'" :edit-render="{ autofocus: '.vxe-input--inner' }">
                  <template #edit="{ row }">
                    <vxe-input v-model="row.unitPrice" type="text" @input="updateFooterEvent"/>
                  </template>
                </vxe-column>
                <vxe-column field="qty" :title="'测试点数'" :edit-render="{ autofocus: '.vxe-input--inner' }">
                  <template #edit="{ row }">
                    <vxe-input v-model="row.quantity" type="text" @input="updateFooterEvent"/>
                  </template>
                </vxe-column>
                <vxe-column field="amountRmb" :title="'测试金额'" :edit-render="{ autofocus: '.vxe-input--inner' }">
                  <template #edit="{ row }">
                    <vxe-input v-model="row.amountRmb" type="text" @input="updateFooterEvent"/>
                  </template>
                </vxe-column>
                <vxe-column field="amountRmb" :title="'样品量'" :edit-render="{ autofocus: '.vxe-input--inner' }">
                  <template #edit="{ row }">
                    <vxe-input v-model="row.sampleQty" type="text" @input="updateFooterEvent"/>
                  </template>
                </vxe-column>
                <vxe-column title="操作" width="80">
                  <template #default="{ row }">
                    <el-button type="text" status="primary" @click="deleteEvent(row)">删除
                    </el-button>
                  </template>
                </vxe-column>
              </vxe-table>

              <el-form-item label="测试周期" >{{postForm.goods.testPeriod}}</el-form-item>
              <el-form-item label="总样品量" >{{postForm.goods.sampleNum}}</el-form-item>
              <el-form-item label="服务类型">{{postForm.goods.service}}</el-form-item>
              <br>
              <el-form-item label="报告类型">{{postForm.goods.reportTypes}}</el-form-item>
              <el-form-item label="报告费">{{postForm.goods.reportAmt}}</el-form-item>
              <el-form-item label="检测价格（不含税）" >{{postForm.goods.amount}}</el-form-item>
              <br>
              <!--加测项-->
              <!--            v-if="postForm.alist"-->
              <el-divider content-position="left">加测项 报价单编号：</el-divider>
              <vxe-table
                      ref="xTable"
                      border
                      show-overflow
                      class="editable-footer mb20"
                      :merge-footer-items="mergeFooterItems"
                      :row-config="{ isHover: true }"
                      :export-config="{}"
                      :footer-method="footerMethod"
                      :data="postForm.alist.goods"
                      resizable>
                <vxe-column type="seq" width="60" :title="'序号'" align="right"/>
                <vxe-column field="testItem" :title="'测试项目'" align="right"/>
                <vxe-column field="unitPrice" :title="'单价'" align="right"/>
                <vxe-column field="quantity" :title="'测试点数'" align="right"/>
                <vxe-column field="name" :title="'测试金额'" align="right"/>
                <vxe-column field="amountRmb" :title="'样品量'" align="right"/>
              </vxe-table>
              <el-form-item label="测试周期">{{postForm.alist.goods.testPeriod}}</el-form-item>
              <el-form-item label="总样品量">{{postForm.alist.goods.sampleNum}}</el-form-item>
              <el-form-item label="服务类型">{{postForm.alist.goods.service}}</el-form-item>
              <br>
            </el-form>
            <div class="right">
              <el-button type="primary" size="small" plain @click="insertEvent">加测
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="申请单" name="1">
        <el-table :data="tableData" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="applicationName" label="申请单编号" min-width="120"/>
          <el-table-column prop="reportTitle" label="申请日期" min-width="120"/>
          <el-table-column prop="sameAsApplicant" label="收样状态" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmed == 1">已收样</span>
              <span v-else-if="scope.row.confirmed == 2">未收样</span>
            </template>
          </el-table-column>
          <el-table-column prop="otherName" label="样品接收日期" min-width="120"/>
          <el-table-column prop="otherAddress" label="要求完成日期" min-width="120"/>
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
        <el-table :data="tableData" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="workOrderNum" label="工作单编号" min-width="120"/>
          <el-table-column prop="gmtCreate" label="开单日期" min-width="120"/>
          <el-table-column prop="busyStatus" label="是否加急" min-width="120"/>
          <el-table-column prop="issuer" label="要求完成日期" min-width="120"/>
          <el-table-column prop="gmtOutput" label="出单日期" min-width="120"/>
          <el-table-column prop="withdraw" label="检测单位名称" min-width="120"/>
          <el-table-column prop="withdraw" label="是否分包商" min-width="120"/>
          <el-table-column fixed="right" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmed">已确认</span>
              <span v-else>待确认</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="原始记录单" name="3">
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

      <el-tab-pane label="检测报告单" name="4">
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

    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="handleDownLoad()">下载</el-button>
    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>
    <el-button type="primary" size="small" plain @click="handleCreate()">创建申请单</el-button>
  </div>
</template>

<script>
  import { getQuotationDetail } from "@/api/organizations"
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
        postForm: [],
        mergeFooterItems: [{ row: 0, col: 0, rowspan: 0, colspan: 8 }]
      }
    },
    created() {
      this.tempRoute = Object.assign({}, this.$route)
      const id = this.$route.params && this.$route.params.id
      console.log(id)
      this.fetchData(id)
      this.downloadParam.testTradeId = this.tempRoute.params.id
    },
    methods: {
      //创建申请单
      handleCreate() {
        this.$router.push({path: '/tm/detection/apply/create', query: { applyForm: this.postForm }})
      },
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
    fetchData: function(id) {
      const queryParam = {
        requestId: Math.random().toString(24),
        quotationNum: id
      }
      getQuotationDetail(Object.assign({}, queryParam)).then(response => {
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

.parent {
  width: 100%;
  display: flex;
}

.left {
  width: 28%;
  padding: 15px;
}

.right {
  width: 100%; /*右侧初始化宽度*/
}
</style>
