<template>
  <div v-if="postForm !== undefined" class="app-container ohn quotation-box">
<<<<<<< HEAD
    <el-button class="f1 pointer" icon="el-icon-arrow-left" @click="goBack()">返回上一页</el-button>
=======
    <el-button class="f1 pointer" @click="goBack()" icon="el-icon-arrow-left">返回上一页</el-button>
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
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
        {{ postForm.client }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">报告日期</template>
        {{ postForm.receivingDate | timeFormatFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">线路负责人</template>
        {{ postForm.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">审核人</template>
        {{ postForm.sampleName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">审批人</template>
        {{ postForm.sampleModel }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="left">样品信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="2" :content-style="{ 'width': '200px' }">
      <el-descriptions-item>
        <template slot="label">样品名称</template>
        {{ postForm.receivingDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">样品数量</template>
        {{ postForm.testStartDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">样品型号</template>
        {{ postForm.testEndDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">样品状态</template>
        {{ postForm.testPeriod }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">商标</template>
        {{ postForm.testRemark.test }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">批次</template>
        {{ postForm.receivingDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">规格</template>
        {{ postForm.testStartDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">供应商</template>
        {{ postForm.testEndDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">购买商</template>
        {{ postForm.testPeriod }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">订单号</template>
        {{ postForm.testRemark.test }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">生产商</template>
        {{ postForm.testPeriod }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">出口地</template>
        {{ postForm.testRemark.test }}
      </el-descriptions-item>
    </el-descriptions>
    <p class="remark-content">
      以上信息由申请者提供及确认，我司对其真实性不承担责任
    </p>
    <el-divider content-position="left">样品描述</el-divider>
<<<<<<< HEAD
    <vxe-table
      ref="xTable"
      border
      show-overflow
      class="editable-footer mb20"
      :merge-footer-items="mergeFooterItems"
      :row-config="{ isHover: true }"
      :export-config="{}"
      :data="postForm.sampleDesc"
    >
=======
    <vxe-table ref="xTable" border show-overflow class="editable-footer mb20"
      :merge-footer-items="mergeFooterItems" :row-config="{ isHover: true }" :export-config="{}"
      :data="postForm.sampleDesc">
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
      <vxe-column type="seq" width="60" :title="'序号'" align="right" />
      <vxe-column field="sampleNum" :title="'样品编号'" :edit-render="{ autofocus: '.vxe-input--inner' }">
        <template #edit="{ row }">
          <vxe-input v-model="row.sampleNum" type="text" @input="updateFooterEvent" />
        </template>
      </vxe-column>
      <vxe-column field="sampleDes" :title="'样品部位描述'" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.sampleDes" type="text" />
        </template>
      </vxe-column>
<<<<<<< HEAD
      <vxe-column
        field="sampleLocation"
        :title="'取样部位(位置)'"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
=======
      <vxe-column field="sampleLocation" :title="'取样部位(位置)'"
        :edit-render="{ autofocus: '.vxe-input--inner' }">
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
        <template #edit="{ row }">
          <vxe-input v-model="row.sampleLocation" type="text" :min="1" :max="120" />
        </template>
      </vxe-column>
    </vxe-table>
    <el-divider content-position="left">测试结果</el-divider>
    <div v-for="(itemI, i) in postForm.testExperiment" :key="i">
      <p>{{ itemI.title }}</p>
      <p>{{ itemI.method }}</p>
      <div v-for="(itemJ, j) in itemI.result" :key="j">
        <p>{{ itemJ.resultDetail }}</p>
<<<<<<< HEAD
        <vxe-table
          :ref="getRef(i, j)"
          border
          show-footer
          show-overflow
          class="editable-footer mb10"
          :data="itemJ.testItems"
        >
          <vxe-column type="seq" width="60" :title="'序号'" align="right" />
          <vxe-column
            v-for="(itemK, k) in itemJ.attrs"
            :key="k"
            :field="itemK.name"
            :title="itemK.desc"
            :edit-render="{}"
          >
=======
        <vxe-table :ref="getRef(i, j)" border show-footer show-overflow class="editable-footer mb10"
          :data="itemJ.testItems">
          <vxe-column type="seq" width="60" :title="'序号'" align="right" />
          <vxe-column v-for="(itemK, k) in itemJ.attrs" :key="k" :field="itemK.name" :title="itemK.desc"
            :edit-render="{}">
>>>>>>> c30a03b9dc0df8344e685dbdc6d99422ee9cd560
            <template #edit="{ row }">
              <vxe-input v-model="row[itemK.name]" type="text" />
            </template>
          </vxe-column>
        </vxe-table>
        <p>{{ itemJ.conclusion }}</p>
      </div>
    </div>
    <!-- <el-divider content-position="left">样品照片</el-divider>
    <div v-for="img in imgList" :key="img.path" class="block">
      <el-image style="width: 40%; height: auto" :src="getFileBlobUrl(img)" :preview-src-list="[getFileBlobUrl(img)]"
        fit="cover" />
    </div>
    <el-divider content-position="left">其他</el-divider>
    <my-flex-table ref="myFlexTable" :flex-obj="postForm.flexObj" />

    <el-divider content-position="left">备注</el-divider>
    <div class="remark-content">
      <P style="white-space: pre-wrap">
        {{ postForm.remark }}
      </P>
    </div> -->
    <el-button v-loading="submitLoading" type="primary" size="small" plain @click="handleDownLoad()">下载</el-button>
    <el-button type="primary" size="small" plain @click="handlePreview()">预览</el-button>
  </div>
</template>

<script>
import { getTestReportImages, queryTestTradeDetail } from "@/api/transaction"
import { getToken } from "@/utils/auth"
import config from "@/utils/config"
import { timeFormatFilter } from "@/utils/simple-util"
const { prefix } = config[process.env.NODE_ENV]
import MyFlexTable from "@/views/components/MyFlexTable"

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
        reportNum: "XJ1234",
        client: "新疆乐远儿童玩具",
        sampleName: "儿童玩具",
        address: "新疆乌鲁木齐人民路298号",
        sampleModel: "3-5岁",
        brand: "乐远",
        supplier: "新疆欢乐世界儿童玩具制造有限公司",
        orderNum: "123",
        buyer: "新疆乐远",
        producers: "新疆欢乐世界",
        exportPlace: "美国",
        producingCountry: "中国",
        testTradeId: "5",
        receivingDate: "2022-01-01 12:00:00",
        testStartDate: "2022-03-01 12:00:00",
        testEndDate: "2022-04-01 12:00:00",
        testPeriod: "",
        sampleDesc: [
          {
            sampleNum: "01",
            sampleDes: "样品描述xxx",
            sampleLocation: "恐龙玩具"
          }
        ],
        testExperiment: [
          {
            title: "1.邻苯二甲酸盐",
            method: "EN 14372: 2004",
            result: [
              {
                resultDetail:
                  "以下3种邻苯二甲酸盐（或酯）针对所有产品材料包括可放入口中的儿童玩具或儿童护理产品（豁免产品材料除外）",
                attrs: [
                  { name: "testItem", "desc": "检测项目\nReport No" },
                  { name: "CAS_num", "desc": "CAS编号\nProduct Description" },
                  { name: "unit", "desc": "单位\nStyle/Item No" },
                  { name: "threshold", "desc": "方法检出限\nMaterial/Color" },
                  { name: "limit", "desc": "限值\nMaterial/Color" },
                  { name: "result", "desc": "01\nMaterial/Color" }
                ],
                testItems: [
                  {
                    testItem: "邻苯二甲酸二异丁酯(DIBP)",
                    // eslint-disable-next-line camelcase
                    CAS_num: "84-69-5",
                    unit: "mg/kg",
                    threshold: "30",
                    limit: "1000",
                    result: "未检出"
                  },
                  {
                    testItem: "邻苯二甲酸二丁酯(DBP)",
                    // eslint-disable-next-line camelcase
                    CAS_num: "84-74-2",
                    unit: "mg/kg",
                    threshold: "30",
                    limit: "1000",
                    result: "未检出"
                  },
                  {
                    testItem: "邻苯二甲酸丁基苄基酯(BBP)",
                    // eslint-disable-next-line camelcase
                    CAS_num: "85-68-7",
                    unit: "mg/kg",
                    threshold: "30",
                    limit: "1000",
                    result: "未检出"
                  }
                ],
                conclusion: "合格"
              },
              {
                resultDetail:
                  "以下2种邻苯二甲酸盐适用于可放入口中的儿童玩具和儿童护理产品。",
                attrs: [
                  { name: "testItem", "desc": "检测项目\nReport No" },
                  { name: "CAS_num", "desc": "CAS编号\nProduct Description" },
                  { name: "unit", "desc": "单位\nStyle/Item No" },
                  { name: "threshold", "desc": "方法检出限\nMaterial/Color" },
                  { name: "limit", "desc": "限值\nMaterial/Color" },
                  { name: "result", "desc": "01\nMaterial/Color" }
                ],
                testItems: [
                  {
                    testItem: "邻苯二甲酸二正辛酯(DNOP)",
                    // eslint-disable-next-line camelcase
                    CAS_num: "117-84-0",
                    unit: "mg/kg",
                    threshold: "30",
                    limit: "-",
                    result: "未检出"
                  },
                  {
                    testItem: "",
                    // eslint-disable-next-line camelcase
                    CAS_num: "28553-12-0",
                    unit: "mg/kg",
                    threshold: "30",
                    limit: "-",
                    result: "未检出"
                  }
                ],
                conclusion: "合格"
              }
            ]
          }
        ],
        testRemark: {
          test: "1.0.1% =1000mg/kg；未检出指结果小于方法检出限"
        },
        flexObj: [],
        remark: "本报告仅对收到的样品负责。\n" +
          "\n" +
          "本报告所包含的测试结果仅供客户参考。（盖章删）\n" +
          "\n" +
          "本报告无检测报告专用章、审核人、批准人签名无效。\n" +
          "\n" +
          "本报告不得作为商业广告使用。\n" +
          "\n" +
          "未经本公司书面统一，不得部分复制报告（全部复制除外）。任何未经授权的修改、伪造本文件的内容或外观都是非法的，违法者将被依法诉讼"
      },
      imgList: [],
      mergeFooterItems: [{ row: 0, col: 0, rowspan: 0, colspan: 8 }]
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.downloadParam.testTradeId = this.tempRoute.params.id
    this.fetchAttachments(id)
  },
  methods: {
    fetchAttachments(tradeId) {
      getTestReportImages({ testTradeId: tradeId })
        .then(res => {
          console.log(res)
          this.imgList = res.data.data
          for (const img of this.imgList) {
            img.url = this.getFileBlobUrl(img)
          }
        })
        .catch(() => { })
        .finally(() => { })
    },
    getFileBlobUrl(file) {
      console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    getRef(i, j) {
      return 'xTable' + i + j
    },
    handlePreview() {
      fetch(prefix.lb +
        "/api/test/previewTestReport?testTradeId=" +
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
      const fileName = '报告单-' + this.downloadParam.testTradeId
      fetch(
        prefix.lb +
        "/api/test/downloadTestReport?testTradeId=" +
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
        this.postForm = response.data.testReport

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '查看检测报告单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tempRoute.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看检测报告单'
      document.title = `${title} - ${this.tempRoute.params.id}`
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/report/list"
      })
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
