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

    <el-tabs style="width: 100%">
      <el-tab-pane label="报价明细" name="0">
        <div v-for="goodsItem in postForm.goods">
          <div class="parent">
            <el-form class="left mt20" ref="postForm" :inline="true" :model="goodsItem" status-icon label-width="150px">
              <el-form-item label="产品名：" prop="telClient">{{ goodsItem.goodsName}}</el-form-item>
              <el-form-item label="HSCode：" prop="telClient">{{ goodsItem.hsCode}}</el-form-item>
              <el-form-item label="材质：" prop="telClient">{{ goodsItem.material}}</el-form-item>
              <el-form-item label="出口国：" prop="telClient">{{ goodsItem.exportCountry}}</el-form-item>
              <el-form-item label="检测标准：" prop="telClient">{{ goodsItem.standard}}</el-form-item>

              <el-table :data="goodsItem.goods" stripe border style="width: 100%" class="mt8">
                <el-table-column type="seq" label="序号" width="60"/>
                <el-table-column prop="testItem" label="测试项目" min-width="120"/>
                <el-table-column prop="unitPrice" label="单价" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.unitPrice | changePrice2money}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="applicationDate" label="测试点数" min-width="120"/>
                <el-table-column prop="quantity" label="测试金额" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.unitPrice | changePrice2money}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sampleStatus" label="样品数量" min-width="120"/>
              </el-table>

              <el-form-item label="测试周期">{{postForm.testPeriod}}</el-form-item>
              <el-form-item label="总样品量">{{postForm.sampleNum}}</el-form-item>
              <el-form-item label="服务类型">{{postForm.service}}</el-form-item>
              <br>
              <el-form-item label="报告类型">{{postForm.reportTypes}}</el-form-item>
              <el-form-item label="报告费">{{postForm.reportAmt}}</el-form-item>
              <el-form-item label="检测价格（不含税）">{{postForm.amount}}</el-form-item>
              <br>
              <!--加测项-->
              <!--            v-if="postForm.alist"-->
              <el-divider content-position="left">加测项 报价单编号：</el-divider>
              <el-table :data="tableData" stripe border style="width: 100%" class="mt8">
                <el-table-column type="seq" label="序号" width="60"/>
                <el-table-column prop="testItem" label="测试项目" min-width="120"/>
                <el-table-column prop="unitPrice" label="单价" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.unitPrice | changePrice2money}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="applicationDate" label="测试点数" min-width="120"/>
                <el-table-column prop="quantity" label="测试金额" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.unitPrice | changePrice2money}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sampleStatus" label="样品数量" min-width="120"/>
              </el-table>
              <el-form-item label="测试周期">{{postForm.alist.goods.testPeriod}}</el-form-item>
              <el-form-item label="总样品量">{{postForm.alist.goods.sampleNum}}</el-form-item>
              <el-form-item label="服务类型">{{postForm.alist.goods.service}}</el-form-item>
              <br>
            </el-form>
            <div class="right">
              <el-button type="primary" size="small" plain @click="insertEvent">加测
              </el-button>
              <el-button type="primary" size="small" plain @click="insertEvent">复测
              </el-button>
              <el-button type="primary" size="small" plain @click="handleCreate">创建申请单
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="申请单" name="1">
        <el-table :data="tableData1" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="applicationNum" label="申请单编号" min-width="120"/>
          <el-table-column prop="applicationDate" label="申请日期" min-width="120"/>
          <el-table-column prop="sampleStatus" label="收样状态" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.sampleStatus  == 1">已收样</span>
              <span v-else-if="scope.row.sampleStatus  == 0">未收样</span>
            </template>
          </el-table-column>
          <el-table-column prop="sampleDate" label="样品接收日期" min-width="120"/>
          <el-table-column prop="planDate" label="要求完成日期" min-width="120"/>
          <el-table-column prop="contractStatus" label="合同评审状态" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.contractStatus == 0">待评审</span>
              <span v-else-if="scope.row.contractStatus == 1">评审通过</span>
              <span v-else-if="scope.row.contractStatus == 2">评审不通过</span>
              <span v-else-if="scope.row.contractStatus == 3">已下单</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceName" label="跟进人" min-width="120"/>
          <el-table-column prop="reviewName" label="评审人" min-width="120"/>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="工作单" name="2">
        <el-table :data="tableData2" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="workOrderNum" label="工作单编号" min-width="120"/>
          <el-table-column prop="orderDate" label="开单日期" min-width="120"/>
          <el-table-column prop="service" label="是否加急" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.service  == 0">不加急</span>
              <span v-else-if="scope.row.service  == 1">加急</span>
              <span v-else-if="scope.row.service  ==2">特急</span>
            </template>
          </el-table-column>
          <el-table-column prop="planDate" label="要求完成日期" min-width="120"/>
          <el-table-column prop="outputDate" label="出单日期" min-width="120"/>
          <el-table-column prop="comName" label="检测单位名称" min-width="120"/>
          <el-table-column prop="subContract" label="是否分包商" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.subContract  == 1">是</span>
              <span v-else-if="scope.row.subContract  == 0">否</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.status  == 0">待确认</span>
              <span v-else-if="scope.row.status  == 1">已确认</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="原始记录单" name="3">
        <el-table :data="tableData3" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="recordNum" label="原始记录单编号" min-width="120"/>
          <el-table-column prop="testItem" label="检测项目" min-width="120"/>
          <el-table-column prop="testLab" label="检测实验室" min-width="120"/>
          <el-table-column prop="testDeviceNo" label="检测设备号" min-width="120"/>
          <el-table-column prop="testPerson" label="测试人员" min-width="120"/>
          <el-table-column prop="createTime" label="创建日期" min-width="120"/>
          <el-table-column prop="planDate" label="要求日期" min-width="120"/>
          <el-table-column prop="reportDate" label="报告日期" min-width="120"/>
          <el-table-column prop="status" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">待审核</span>
              <span v-else-if="scope.row.status == 2">审核通过</span>
              <span v-else-if="scope.row.status == 3">审核不通过</span>
              <span v-else-if="scope.row.status == 0">未完成</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="检测报告单" name="4">
        <el-table :data="tableData4" stripe border style="width: 100%" class="mt8">
          <el-table-column prop="workOrderNum" label="报告编号" min-width="120"/>
          <el-table-column prop="gmtCreate" label="客户名称" min-width="120"/>
          <el-table-column prop="gmtOutput" label="测试人员" min-width="120"/>
          <el-table-column prop="withdraw" label="要求日期" min-width="120"/>
          <el-table-column prop="withdraw" label="报告日期" min-width="120"/>
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
    <el-button type="primary" size="small" plain @click="insertEvent()">加测</el-button>
    <!--弹窗  加测、复测-->
    <el-dialog :visible.sync="dialogVisible" title="加/复测">
      <el-form ref="creditInfo" :model="creditInfo" :rules="auditRules" label-width="110px"
               label-position="left" inline
               class="mt8">
        <el-form-item label="测试项目：" prop="telClient">
          <el-button type="text" @click="showDialog">选择测试项目</el-button>
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
            <el-button type="primary" size="small" plain @click="checkedConfirm()">确认</el-button>
          </div>
        </el-dialog>
        <vxe-table
          ref="xTable"
          border
          show-footer
          show-overflow
          class="editable-footer mb20"
          :row-config="{ isHover: true }"
          :export-config="{}"
          :data="creditInfo.items"
          :edit-config="{ trigger: 'click', mode: 'row' }"
          @edit-closed="editClose">
          <vxe-column field="id" width="60" :title="'序号'" align="right"/>
          <vxe-column field="name" :title="'测试项目'"/>
          <vxe-column field="price" :title="'单价'"/>
          <vxe-column field="quantity" title="测试点数" :edit-render="{ autofocus: '.vxe-input--inner' }">
            <template #edit="{ row }">
              <vxe-input v-model="row.quantity" type="number"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="price2" :title="'测试金额'">
            <template #default="{ row }">
              <span>{{ row.price*row.quantity }} 元</span>
            </template>
          </vxe-column>
          <vxe-column :title="'样品量'">1</vxe-column>
          <vxe-column title="操作" width="80">
            <template #default="{ row }">
              <el-button type="text" status="primary" @click="deleteEvent(row)">删除
              </el-button>
            </template>
          </vxe-column>
        </vxe-table>
        <el-form-item label="测试周期" prop="testPeriod">
          <el-input v-model="creditInfo.testPeriod" placeholder="请输入测试周期" clearable style="width: 240px"/>
        </el-form-item>
        <el-form-item label="总样品量" prop="sampleNum">
          <el-input v-model="creditInfo.sampleNum" placeholder="请输入总样品量" clearable style="width: 240px"/>
        </el-form-item>
        <br>
        <el-form-item label="是否单独出报告" prop="singleReport">
          <el-radio-group v-model="creditInfo.singleReport" style="width: 200px">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报告类型" prop="reportTypes">
          <el-checkbox-group v-model="creditInfo.reportTypes">
            <el-checkbox :label="item.key" v-for="item of customerOptions" :key="item.key">{{ item.value }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="支付方式" prop="payType">
          <el-radio-group v-model="creditInfo.payType" style="width: 540px">
            <el-radio :label="1">挂账</el-radio>
            <el-radio :label="2">先付后检</el-radio>
            <el-radio :label="3">先付</el-radio>
            <el-input
              class="short"
              style="width: 100px"/>
            <el-button type="text" style="color:black">%后检</el-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="检测价格（不含税）" prop="testPrice">
          <el-input v-model="creditInfo.testPrice" placeholder="请输入检测价格" clearable style="width: 240px"/>
        </el-form-item>
        <el-form-item :label="'报告费'" style="color:red">100.00</el-form-item>
        <br>
        <el-form-item :label="'总计（含税）：'">
          <span class="text-danger" style="color:red">{{creditInfo.totalCost | changePrice2money}}</span>
        </el-form-item>
        <div style="text-align:center;" class="mt20">
          <el-button size="small" plain @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" size="small" plain @click="handleCheckConfirm2('creditInfo')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getQuotationDetail, getApplicationList, getItemList } from "@/api/organizations"
  import { getworkOrderList, getoriList,getReportList } from "@/api/worksheet"
  import { getToken } from "@/utils/auth"
  import config from "@/utils/config"
  import methods from "../../pub_methods/validate"
  import { changePrice2money } from "@/utils/simple-util"

  const { prefix } = config[process.env.NODE_ENV]

  export default {
    filters: {
      changePrice2money
    },
    data() {
      return {
        encryptionKey: "",
        fileName: "",
        submitLoading: false,
        downloadParam: {
          testTradeId: -1
        },
        postForm: {
          reportTypes: [],//选择的报告类型
        },
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],

        checkList: [],//报告类型
        productItemlist: [],//测试项目列表
        creditInfo: {
          orgQuotationNum:'',//原始报价单号
          reportTypes: [],//选择的报告类型
          items: [],
        },
        auditRules:methods.quotationCreateValidate,
        dialogVisible: false,
        innerDialogVisible: false,
        customerOptions: [
          { key: 1, value: "中文纸质档" },
          { key: 2, value: "中文电子档" },
          { key: 3, value: "英文电子档" },
          { key: 4, value: "英文纸质档" }
        ]
      }
    },
    created() {
      this.tempRoute = Object.assign({}, this.$route)
      const id = this.$route.params && this.$route.params.id
      console.log(id)
      this.fetchData(id)
      this.getTableData(id)
      this.downloadParam.testTradeId = this.tempRoute.params.id
    },
    methods: {
      //获取4个表格数据
      async getTableData(id) {
        const queryParam = {
          quotationNum: id,
          requestId: Math.random().toString(24),
          page: 1,
          pageSize: 100
        }
        const res1 = await getApplicationList(Object.assign({}, queryParam))
        this.tableData1 = res1.data.dataList
        const res2 = await getworkOrderList(Object.assign({}, queryParam))
        this.tableData2 = res2.data.dataList
        const res3 = await getoriList(Object.assign({}, queryParam))
        this.tableData3 = res3.data.dataList
        const res4 = await getReportList(Object.assign({}, queryParam))
        this.tableData4 = res4.data.dataList

        //获取基本检测项列表
        const res = await getItemList({
          requestId: Math.random().toString(24)
        })
        this.productItemlist = res.data.dataList
      },
      //选择测试项目弹框
      showDialog() {
        this.innerDialogVisible = true
        this.checkList = []
      },
      //选择测试项目
      checkedConfirm() {
        this.innerDialogVisible = false
        if (this.checkList) {
          this.checkList.forEach((item) => {
            this.creditInfo.items.push(item)
          })
        }
        console.log(this.creditInfo.items)
      },
      //加测/复测
      insertEvent() {
        this.dialogVisible = true
      },
      //加测，复测接口
      handleCheckConfirm2(formName) {
        if (this.creditInfo.goodsName == "") {
          this.$message.error('请输入产品名称')
          return
        }
        if (this.creditInfo.export == "") {
          this.$message.error('请选择出口国')
          return
        }
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
      //创建申请单
      handleCreate() {
        this.$router.push({ path: '/tm/detection/apply/create', query: { applyForm: this.postForm } })
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
      },
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
