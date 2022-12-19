<template>
  <div class="app-container ohn transaction-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测报告单</div>
    <el-divider class="mt50" content-position="left">基本信息</el-divider>
    <el-form
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="150px"
    >
      <el-form-item :label="'报告编号\nReportNum'" prop="reportNum">
        <el-input
          v-model="postForm.reportNum"
          placeholder="请输入报告编号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'客户名称\nClient'" prop="client">
        <el-input
          v-model="postForm.client"
          placeholder="请输入客户名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'地    址\nAddress'" prop="address">
        <el-input
          v-model="postForm.address"
          placeholder="请输入地址"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'样品名称\nSample Name'" prop="sampleName">
        <el-input
          v-model="postForm.sampleName"
          placeholder="请输入样品名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'样品型号\nSample Model'" prop="sampleModel">
        <el-input
          v-model="postForm.sampleModel"
          placeholder="请输入样品型号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'商    标\nBrand'" prop="brand">
        <el-input
          v-model="postForm.brand"
          placeholder="请输入商    标"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'供 应 商\nSupplier'" prop="supplier">
        <el-input
          v-model="postForm.supplier"
          placeholder="请输入供 应 商"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'订 单 号\nOrder Num'" prop="orderNum">
        <el-input
          v-model="postForm.orderNum"
          placeholder="请输入订 单 号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'购 买 商\nBuyer'" prop="buyer">
        <el-input
          v-model="postForm.buyer"
          placeholder="请输入购 买 商"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'生 产 商\nProducers'" prop="producers">
        <el-input
          v-model="postForm.producers"
          placeholder="请输入生 产 商"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'出 口 地\nExport Place'" prop="exportPlace">
        <el-input
          v-model="postForm.exportPlace"
          placeholder="请输入出 口 地"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        :label="'生 产 国\nProducingCountry'"
        prop="producingCountry"
      >
        <el-input
          v-model="postForm.producingCountry"
          placeholder="请输入生 产 国"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <p class="remark-content">
        以上信息由申请者提供及确认，我司对其真实性不承担责任
      </p>
      <el-form-item :label="'接收日期\nReceiving Date'" prop="receivingDate">
        <el-date-picker
          v-model="postForm.receivingDate"
          type="date"
          placeholder="请选择接收日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'检测开始日期\nStart Date'" prop="testStartDate">
        <el-date-picker
          v-model="postForm.testStartDate"
          type="date"
          placeholder="请选择开始日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'检测结束日期\nEnd Date'" prop="testEndDate">
        <el-date-picker
          v-model="postForm.testEndDate"
          type="date"
          placeholder="请选择结束日期"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'检测周期\nTest Period'" prop="testPeriod">
        <el-input
          v-model="postForm.testPeriod"
          type="textarea"
          placeholder="请输入检测周期"
          :rows="6"
          maxlength="255"
          show-word-limit
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'增加检测周期\nAdd Date'">
        <el-date-picker
          v-model="tmpDateRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
          @input="handleChangeDateRange"
        />
      </el-form-item>
      <el-form-item :label="'检测结果备注\nTest Remark'" prop="gmtOutput">
        <el-input
          v-model="postForm.testRemark.test"
          type="textarea"
          placeholder="请输入检测结果备注"
          :rows="2"
          maxlength="100"
          show-word-limit
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-divider content-position="left">样品描述</el-divider>
      <vxe-toolbar ref="xToolbar">
        <template #tools>
          <el-button
            type="primary"
            size="small"
            plain
            @click="insertEvent"
          >新增
          </el-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        ref="xTable"
        border
        show-footer
        show-overflow
        class="editable-footer mb20"
        :merge-footer-items="mergeFooterItems"
        :row-config="{ isHover: true }"
        :export-config="{}"
        :footer-cell-class-name="footerCellClassName"
        :data="postForm.sampleDesc"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        @edit-closed="editClose"
      >
        <vxe-column type="seq" width="60" :title="'序号\nNum'" align="right" />
        <vxe-column
          field="sampleNum"
          :title="'样品编号\nStyle/Item No'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.sampleNum"
              type="text"
              @input="updateFooterEvent"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="sampleDes"
          :title="'样品描述\nReport No'"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.sampleDes" type="text" />
          </template>
        </vxe-column>
        <vxe-column
          field="sampleLocation"
          :title="'取样部位(位置)\nProduct Description'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.sampleLocation"
              type="text"
              :min="1"
              :max="120"
              @change="updateFooterEvent"
            />
          </template>
        </vxe-column>
        <vxe-column title="操作" width="80">
          <template #default="{ row }">
            <el-button
              type="text"
              status="primary"
              @click="deleteEvent(row)"
            >删除
            </el-button>
          </template>
        </vxe-column>
      </vxe-table>

      <el-divider content-position="left">检测结果</el-divider>
      <vxe-toolbar ref="xToolbarResult">
        <template #tools>
          <el-link
            @click="handleAddResult(postForm.testExperiment)"
          >新增实验结果
          </el-link>
        </template>
      </vxe-toolbar>
      <div v-for="(itemI, i) in postForm.testExperiment" :key="i">
        <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="itemI.title" type="text" placeholder="请输入标题" />
            <vxe-input v-model="itemI.method" type="text" placeholder="请输入方法" />
          </template>
          <template #tools>
            <el-link
              @click="handleAddTestItemDialog(itemI.result)"
            >新增测试项
            </el-link>
            <el-divider direction="vertical" />
            <el-link
              @click="handleDeleteTestItem(postForm.testExperiment, i)"
            >删除结果
            </el-link>
          </template>
        </vxe-toolbar>
        <div v-for="(itemJ, j) in itemI.result" :key="j">
          <vxe-toolbar>
            <template #buttons>
              <el-input
                v-model="itemJ.resultDetail"
                placeholder="请输入描述"
                clearable
                style="width: 480px"
              />
            </template>
            <template #tools>
              <el-link
                @click="handleAddRow(itemJ.attrs, getRef(i, j))"
              >新增数据
              </el-link>
              <el-divider direction="vertical" />
              <el-link
                @click="handleEditTestItemDialog(itemI.result, j)"
              >修改表格
              </el-link>
              <el-divider direction="vertical" />
              <el-link
                @click="handleDeleteTestItem(itemI.result, j)"
              >删除测试项
              </el-link>
            </template>
          </vxe-toolbar>
          <vxe-table
            :ref="getRef(i, j)"
            border
            show-footer
            show-overflow
            class="editable-footer mb10"
            :merge-footer-items="mergeFooterItems"
            :row-config="{ isHover: true }"
            :export-config="{}"
            :footer-cell-class-name="footerCellClassName"
            :data="itemJ.testItems"
            :edit-config="{ trigger: 'click', mode: 'row' }"
            @edit-closed="editClose"
          >
            <vxe-column
              type="seq"
              width="60"
              :title="'序号\nNum'"
              align="right"
            />
            <vxe-column
              v-for="(itemK, k) in itemJ.attrs"
              :key="i+'_'+j+'_'+k"
              :field="itemK.name"
              :title="itemK.desc"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input v-model="row[itemK.name]" type="text" />
              </template>
            </vxe-column>
            <vxe-column title="操作" width="80">
              <template #default="{ row }">
                <el-button
                  type="text"
                  status="primary"
                  @click="tableDeleteEvent(row, getRef(i, j))"
                >删除</el-button>
              </template>
            </vxe-column>
          </vxe-table>
          <el-input
            v-model="itemJ.conclusion"
            placeholder="请输入结论"
            type="textarea"
            class="mb20"
            clearable
            style="width: 100%"
          />
        </div>
      </div>

      <el-divider content-position="left">样品照片</el-divider>
      <p class="remark-content">
        可上传一张样品照片
      </p>
      <el-form-item label="" prop="imgList">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-change="handleChangeFile"
          :on-remove="handleChangeFile"
          :auto-upload="false"
          :file-list="imgList"
          :limit="1"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
              style="height: 400px"
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="imgDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-divider content-position="left">其他</el-divider>
      <my-flex-table ref="myFlexTable" :editable="true" :flex-obj="postForm.flexObj" />

      <el-divider content-position="left">备注</el-divider>
      <el-input
        v-model="postForm.remark"
        type="textarea"
        placeholder="请输入注意事项"
        clearable
        :rows="10"
        show-word-limit
      />
      <p />
      <el-form-item>
        <div class="tr">
          <el-button
            v-loading="formLoading"
            type="primary"
            @click="submitForm('postForm')"
          >保存
          </el-button>
          <el-button @click="resetForm('postForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>

    <!-- 编辑属性对话框 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑测试项':'新增测试项'">
      <vxe-toolbar>
        <template #tools>
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleAddAttr(-1)"
          >新增
          </el-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        ref="xTableDialog"
        border
        show-overflow
        :data="dialogData.attrs"
        :column-config="{resizable: true}"
        :row-config="{ isHover: true }"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        height="200"
        @edit-closed="editClose"
      >
        <vxe-column type="seq" width="60" :title="'序号'" align="right" />
        <vxe-column field="name" :title="'属性名'" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.name" type="text" disabled />
          </template>
        </vxe-column>
        <vxe-column field="desc" :title="'属性描述'" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.desc" type="text" />
          </template>
        </vxe-column>
        <!--        <vxe-column title="操作" width="80">-->
        <!--          <template #default="{ row }">-->
        <!--            <el-button-->
        <!--              type="text"-->
        <!--              status="primary"-->
        <!--              @click="dialogDeleteEvent(row)"-->
        <!--            >删除-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </vxe-column>-->
      </vxe-table>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" size="small" plain @click="confirmAddAttr">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getTestReportImages, queryTestTradeDetail } from "@/api/transaction"
import VXETable from "vxe-table"
import { deepClone } from "@/utils"
import config from "@/utils/config"
import MyFlexTable from "@/views/components/MyFlexTable"
const { prefix } = config[process.env.NODE_ENV]

export default {
  components: { MyFlexTable },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disabled: false,
      dialogImageUrl: '',
      imgDialogVisible: false,
      tmpDateRange: [],
      formLoading: false,
      rules: {
        // imgList: [
        //   { required: true, message: '样品照片不能为空', trigger: 'change' }
        // ]
      },
      dialogVisible: false,
      dialogType: 'new',
      dialogData: {
        attrs: []
      },
      tempTestItems: [],
      tempTestItem: {},
      postForm: {
        reportNum: "",
        client: "",
        sampleName: "",
        address: "",
        sampleModel: "",
        brand: "",
        supplier: "",
        orderNum: "",
        buyer: "",
        producers: "",
        exportPlace: "",
        producingCountry: "",
        testTradeId: "",
        receivingDate: "",
        testStartDate: "",
        testEndDate: "",
        approver: "",
        reviewer: "",
        editor: "",
        testPeriod: "",
        sampleDesc: [
          {
            sampleNum: "01",
            sampleDes: "样品描述xxx",
            sampleLocation: "恐龙玩具"
          }
        ],
        flexSampleDesc: {
          textList: [],
          tableList: [],
          children: [{
            textList: [],
            tableList: [{
              attrs: [
                { name: 'col_1', desc: '列1' },
                { name: 'col_2', desc: '列2' }
              ],
              items: [
                { 'col_1': '值1', 'col_2': '值2' }
              ]
            }],
            children: []
          }]
        },
        testExperiment: [ // 进入页面时vue的默认数据会首先缓存进xTable，若当前页面为编辑，更新vue的数据并不会清空xTable数据的缓存，因此会产生xTable列和数据对应不上的问题
          // {
          //   title: "1.邻苯二甲酸盐",
          //   method: "EN 14372: 2004",
          //   result: [
          //     {
          //       resultDetail:
          //         "以下3种邻苯二甲酸盐（或酯）针对所有产品材料包括可放入口中的儿童玩具或儿童护理产品（豁免产品材料除外）",
          //       attrs: [
          //         { name: "testItem", "desc": "检测项目\nReport No" },
          //         { name: "CAS_num", "desc": "CAS编号\nProduct Description" },
          //         { name: "unit", "desc": "单位\nStyle/Item No" },
          //         { name: "threshold", "desc": "方法检出限\nMaterial/Color" },
          //         { name: "limit", "desc": "限值\nMaterial/Color" },
          //         { name: "result", "desc": "01\nMaterial/Color" }
          //       ],
          //       testItems: [
          //         {
          //           testItem: "邻苯二甲酸二异丁酯(DIBP)",
          //           // eslint-disable-next-line camelcase
          //           CAS_num: "84-69-5",
          //           unit: "mg/kg",
          //           threshold: "30",
          //           limit: "1000",
          //           result: "未检出"
          //         },
          //         {
          //           testItem: "邻苯二甲酸二丁酯(DBP)",
          //           // eslint-disable-next-line camelcase
          //           CAS_num: "84-74-2",
          //           unit: "mg/kg",
          //           threshold: "30",
          //           limit: "1000",
          //           result: "未检出"
          //         },
          //         {
          //           testItem: "邻苯二甲酸丁基苄基酯(BBP)",
          //           // eslint-disable-next-line camelcase
          //           CAS_num: "85-68-7",
          //           unit: "mg/kg",
          //           threshold: "30",
          //           limit: "1000",
          //           result: "未检出"
          //         }
          //       ],
          //       conclusion: "合格"
          //     },
          //     {
          //       resultDetail:
          //         "以下2种邻苯二甲酸盐适用于可放入口中的儿童玩具和儿童护理产品。",
          //       attrs: [
          //         { name: "testItem", "desc": "检测项目\nReport No" },
          //         { name: "CAS_num", "desc": "CAS编号\nProduct Description" },
          //         { name: "unit", "desc": "单位\nStyle/Item No" },
          //         { name: "threshold", "desc": "方法检出限\nMaterial/Color" },
          //         { name: "limit", "desc": "限值\nMaterial/Color" },
          //         { name: "result", "desc": "01\nMaterial/Color" }
          //       ],
          //       testItems: [
          //         {
          //           testItem: "邻苯二甲酸二正辛酯(DNOP)",
          //           // eslint-disable-next-line camelcase
          //           CAS_num: "117-84-0",
          //           unit: "mg/kg",
          //           threshold: "30",
          //           limit: "-",
          //           result: "未检出"
          //         },
          //         {
          //           testItem: "",
          //           // eslint-disable-next-line camelcase
          //           CAS_num: "28553-12-0",
          //           unit: "mg/kg",
          //           threshold: "30",
          //           limit: "-",
          //           result: "未检出"
          //         }
          //       ],
          //       conclusion: "合格"
          //     }
          //   ]
          // }
        ],
        flexObj: [],
        testRemark: {
          test: "1.0.1% =1000mg/kg；未检出指结果小于方法检出限"
        },
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
      mergeFooterItems: [
        { row: 0, col: 0, rowspan: 0, colspan: 8 }
        // { row: 0, col: 1, rowspan: 9, colspan: 9 },
      ],
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
    if (this.isEdit) {
      // edit
      const id = this.$route.params && this.$route.params.id
      this.tmpTestTradeId = id
      this.fetchAttachments(this.tmpTestTradeId)
      this.fetchData(id)
    } else {
      // create
      this.tmpTestTradeId = this.$route.query.id
      this.setTagsViewTitle()
      this.setPageTitle()
      this.fetchDataAndFill(this.tmpTestTradeId)
    }
    this.postForm.testTradeId = this.tmpTestTradeId
  },
  methods: {
    getSonData() {
      const sonData = this.$refs.myFlexTable.getData()
      console.log('sonData ---')
      console.log(sonData)
      return sonData
    },
    fetchAttachments(tradeId) {
      getTestReportImages({ testTradeId: tradeId })
        .then(res => {
          console.log(res)
          this.imgList = res.data.data
          for (const img of this.imgList) {
            img.url = this.getFileBlobUrl(img)
          }
        })
        .catch(() => {})
        .finally(() => {})
    },
    downloadImage(url, name) {
      fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          // the filename you want
          a.download = name
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
        .catch(() => alert('An error sorry'))
    },
    getFileBlobUrl(file) {
      console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    handleRemove(file) {
      console.log(file)
      let _index = -1
      for (let i = 0; i < this.imgList.length; i++) {
        const img = this.imgList[i]
        console.log(img)
        if (img.uid === file.uid) {
          _index = i
          break
        }
      }
      if (_index !== -1) {
        console.log('slice -' + _index)
        this.imgList.splice(_index, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    handleDownload(file) {
      this.downloadImage(file.url, file.name)
    },
    handleChangeFile(file, fileList) {
      this.imgList = fileList
    },
    handleChangeDateRange: function() {
      let str = this.postForm.testPeriod == null ? "" : this.postForm.testPeriod
      str += this.tmpDateRange[0] + '~'
      str += this.tmpDateRange[1] + ','
      str += '\n'
      this.postForm.testPeriod = str
    },
    fetchDataAndFill: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        const testApplicationForm = response.data.testApplicationForm
        const testWorkOrder = response.data.testWorkOrder
        this.postForm.reportNum = testWorkOrder.workOrderNum
        this.postForm.client = testWorkOrder.customer
        this.postForm.testStartDate = testWorkOrder.gmtCreate
        this.postForm.testEndDate = testWorkOrder.gmtOutput

        this.postForm.receivingDate = testApplicationForm.recDate
        this.postForm.address = testApplicationForm.deliveredTo
        this.postForm.sampleName = testApplicationForm.sampleName
        this.postForm.sampleModel = testApplicationForm.sampleModel
        this.postForm.brand = testApplicationForm.brand
        this.postForm.orderNum = testApplicationForm.poNum
        this.postForm.supplier = testApplicationForm.supplier
        this.postForm.buyer = testApplicationForm.buyer
        this.postForm.producers = testApplicationForm.manufacturer
        this.postForm.exportPlace = testApplicationForm.exportedTo
        this.postForm.producingCountry = testApplicationForm.originCountry
      }).catch(err => {
        console.log(err)
      })
    },
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testReport
        if (this.postForm.flexObj == null) {
          this.postForm.flexObj = []
        }
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑检测报告单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tmpTestTradeId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑检测报告单'
      document.title = `${title} - ${this.tmpTestTradeId}`
    },
    removeUselessAttribute(ObjList, attr) {
      for (const obj of ObjList) {
        Reflect.deleteProperty(obj, attr)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // assemble data
          const tableData = this.$refs.xTable.getTableData()
          this.postForm.sampleDesc = tableData.tableData
          const tests = this.postForm.testExperiment
          for (let i = 0; i < tests.length; i++) {
            const results = tests[i].result
            for (let j = 0; j < results.length; j++) {
              const result = results[j]
              const ref = this.getRef(i, j)
              result.testItems = this.$refs[ref][0].getTableData().tableData
              // 剔除脏属性
              this.removeUselessAttribute(result.testItems, "_X_ROW_KEY")
              this.removeUselessAttribute(result.attrs, "_X_ROW_KEY")
            }
          }
          this.postForm.flexObj = this.getSonData()
          console.log('postForm')
          console.log(this.postForm)
          // fromData
          const formData = new FormData()
          formData.append("postForm", JSON.stringify(this.postForm))
          if (this.imgList != null) {
            for (let i = 0; i < this.imgList.length; i++) {
              formData.append("imgList", this.imgList[i].raw)
            }
          }
          // request backend
          this.formLoading = true
          this.$store
            .dispatch(
              this.isEdit ? "transaction/updateTestReport" : "transaction/saveTestReport",
              formData
            )
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.resetForm(formName)
                this.$message.success(data.msg)
                this.goBack()
              } else {
                this.$message.error(errorMessage)
              }
            })
            .catch(() => {
            })
            .finally(() => {
              this.formLoading = false
            })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.postForm.testQuotationItemList = []
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/report/list"
      })
    },
    footerCellClassName({ $rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if ($rowIndex === 0) {
          return "col-blue"
        }
      }
      if (columnIndex === 2) {
        if ($rowIndex === 1) {
          return "col-red"
        }
      }
    },
    // 在值发生改变时更新表尾合计
    updateFooterEvent() {
      const $table = this.$refs.xTable
      $table.updateFooter()
    },
    async insertEvent(row) {
      const record = {
        sampleDesc: "",
        sampleLocation: "",
        testItemsMethod: "",
        remark: ""
      }
      const { row: newRow } = await this.$refs.xTable.insert(record, row)
      await this.$refs.xTable.setActiveCell(newRow, "sampleDesc")
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
    getRef(i, j) {
      return 'xTable' + i + j
    },
    confirmAddAttr() {
      const isEdit = this.dialogType === 'edit'
      const tableData = this.$refs.xTableDialog.getTableData()
      const attrs = tableData.tableData

      if (isEdit) {
        console.log('edit')
        this.tempTestItem.attrs = attrs
        console.log(this.tempTestItem)
      } else {
        const record = {
          resultDetail: '',
          attrs: attrs,
          testItems: []
        }
        this.tempTestItems.push(record)
      }

      this.dialogVisible = false
      this.dialogData.attrs = []
    },
    handleAddAttr(row) {
      const tableData = this.$refs.xTableDialog.getTableData()
      const attrs = tableData.tableData
      const len = attrs.length
      console.log(len)
      const record = {
        name: 'col_' + (len + 1),
        desc: ''
      }
      this.$refs.xTableDialog.insertAt(record, row)
    },
    handleAddRow(attrs, ref) {
      console.log(attrs)
      const record = {}
      for (const attr of attrs) {
        record[attr.name] = ""
      }
      this.$refs[ref][0].insertAt(record, -1)
    },
    handleDeleteTestItem(testItems, $index) {
      this.$confirm("您确定要删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          testItems.splice($index, 1)
        })
        .catch((reason) => {
          console.log(reason)
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    handleAddResult(results) {
      const record = {
        title: "",
        method: "",
        result: []
      }
      results.push(record)
    },
    handleAddTestItemDialog(testItems) {
      this.tempTestItems = testItems
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEditTestItemDialog(testItems, $index) {
      this.tempTestItems = testItems
      this.tempTestItem = testItems[$index]
      const testItem = deepClone(this.tempTestItem) // 编辑时需要用deepClone
      this.dialogData.attrs = testItem.attrs
      this.dialogType = 'edit'
      this.dialogVisible = true
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
      const errMap = await this.$refs.xTable
        .validate(true)
        .catch((errMap) => errMap)
      if (errMap) {
        this.allowAdd = false
      } else {
        this.allowAdd = true
      }
    },
    saveEvent() {
      const $table = this.$refs.xTable
      const { insertRecords, removeRecords, updateRecords } =
        $table.getRecordset()
      VXETable.modal.alert(
        `insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`
      )
    },
    dialogDeleteEvent(row) {
      this.$confirm("您确定要删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.xTableDialog.remove(row)
        })
        .catch((reason) => {
          console.log(reason)
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    tableDeleteEvent(row, ref) {
      this.$confirm("您确定要删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[ref][0].remove(row)
        })
        .catch((reason) => {
          console.log(reason)
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.transaction-box {
  .el-form .el-form-item__label {
    background-color: red;
    line-height: 20px !important;
  }

  .el-form-item--medium .el-form-item__label {
    line-height: 20px !important;
  }

  .remark-content {
    font-size: 12px;
    color: #808080;
    line-height: 20px;
  }
}
</style>
