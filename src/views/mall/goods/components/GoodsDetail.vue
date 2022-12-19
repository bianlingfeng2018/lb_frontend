<template>
  <div class="app-container ohn">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />商品信息</div>
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
      <!--      <el-form-item :label="'商品编号'" prop="goodsNum">-->
      <!--        <el-input-->
      <!--          v-model="postForm.goodsNum"-->
      <!--          placeholder="请输入商品编号"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item :label="'商品名称'" prop="goodsName">
        <el-input
          v-model="postForm.goodsName"
          placeholder="请输入商品名称"
          clearable
          style="width: 639px"
        />
      </el-form-item>
      <el-form-item :label="'HSCode'" prop="hscode">
        <el-input
          v-model="postForm.hscode"
          placeholder="请输入HSCode"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'材质'" prop="material">
        <el-input
          v-model="postForm.material"
          placeholder="请输入材质"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="出口" prop="export">
        <el-select v-model="postForm.export" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in exportList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="平台" prop="platform">
        <el-select v-model="postForm.platform" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in platformList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'检测标准'" prop="ext1">
        <!--        <el-input-->
        <!--          v-model="postForm.ext1"-->
        <!--          placeholder="请输入检测标准"-->
        <!--          clearable-->
        <!--          style="width: 240px"-->
        <!--        />-->
        <el-autocomplete
          v-model="postForm.standard"
          class="inline-input"
          :fetch-suggestions="querySearch"
          placeholder="请输入检测标准"
          clearable
          style="width: 240px"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item label="行业分类" prop="platform">
        <el-select v-model="postForm.industClass" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in industryList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'商品类型'" prop="busType">
        <el-radio-group
          v-model="postForm.busType"
          style="width: 240px"
        >
          <el-radio label="检测" />
          <el-radio label="鉴定" />
        </el-radio-group>
      </el-form-item>
      <!--      <el-form-item :label="'商品价格'" prop="price">-->
      <!--        <el-input-->
      <!--          v-model="postForm.price"-->
      <!--          placeholder="请输入商品价格"-->
      <!--          clearable-->
      <!--          disabled-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item :label="'商品子标题'" prop="subtitle">
        <el-input
          v-model="postForm.subtitle"
          placeholder="请输入商品子标题"
          clearable
          style="width: 68vw"
        />
      </el-form-item>
      <el-form-item :label="'商品图片'" prop="subtitle">
        <image-upload
          ref="myImageList1"
          :image-list="imageList1"
          :limit="limit1"
          style="width: 68vw"
        />
      </el-form-item>
      <el-form-item :label="'商品描述'" prop="description">
        <el-input
          v-model="postForm.description"
          type="textarea"
          placeholder="请输入商品描述"
          clearable
          style="width: 68vw"
          :autosize="{minRows: 15,maxRows: 20}"
        />
      </el-form-item>
      <!--      <el-divider class="mb36" content-position="left">费用信息</el-divider>-->
      <!--      <el-form-item :label="'报告费'" prop="reportFee">-->
      <!--        <el-input-->
      <!--          v-model="postForm.reportFee"-->
      <!--          placeholder="请填写报告费"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'快递费'" prop="courierFee">-->
      <!--        <el-input-->
      <!--          v-model="postForm.courierFee"-->
      <!--          placeholder="请填写快递费"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'税率'" prop="taxFee">-->
      <!--        <el-input-->
      <!--          v-model="postForm.taxFee"-->
      <!--          placeholder="请填写税率(%)"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'折扣'" prop="discount">-->
      <!--        <el-input-->
      <!--          v-model="postForm.discount"-->
      <!--          placeholder="请填写折扣(%)"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'总费用'" prop="totalCost">-->
      <!--        <el-input-->
      <!--          v-model="postForm.totalCost"-->
      <!--          placeholder="请填写总费用"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-divider content-position="left">检测项</el-divider>
      <vxe-toolbar ref="xToolbar">
        <template #tools>
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleOpenDlg"
          >选择测试项目
          </el-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        ref="xTable"
        border
        show-footer
        show-overflow
        class="editable-footer mb20"
        :row-config="{ isHover: true }"
        :export-config="{}"
        :footer-method="footerMethod"
        :data="testItemsList"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        :edit-rules="tableRules"
        @edit-closed="editClose"
      >
        <vxe-column type="seq" width="60" :title="'序号'" align="right" />
        <vxe-column
          field="name"
          :title="'测试项目'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.name"
              type="text"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="price"
          :title="'单价'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.price"
              type="text"
            />
          </template>
        </vxe-column>
        <!--        <vxe-column-->
        <!--          field="qty"-->
        <!--          :title="'测试点数'"-->
        <!--          :edit-render="{ autofocus: '.vxe-input&#45;&#45;inner' }"-->
        <!--        >-->
        <!--          <template #edit="{ row }">-->
        <!--            <vxe-input-->
        <!--              v-model="row.qty"-->
        <!--              type="text"-->
        <!--            />-->
        <!--          </template>-->
        <!--        </vxe-column>-->
        <vxe-column
          field="amountRmb"
          :title="'测试金额'"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input
              v-model="row.amountRmb"
              type="text"
              @input="updateFooterEvent"
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
      <el-divider content-position="left">设置套餐</el-divider>
      <div>
        <div v-if="mealList != null && mealList.length !== 0">
          <div
            v-for="(meal, index) in mealList"
            :key="index"
            style="background: #FAFAFA; padding-top: 20px; margin-top: 10px"
          >
            <el-form-item :label="'套餐名称'" prop="username">
              <el-input
                v-model="meal.name"
                placeholder="请输入套餐名称"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item :label="'测试项目'" prop="nickname">
              <div
                v-for="(group, groupIndex) in meal.testItemGroups"
                :key="groupIndex"
              >
                <my-checkbox-group
                  v-model="group.ids"
                  :label="group.name"
                  :items="group.items"
                />
              </div>
            </el-form-item>
            <el-form-item :label="'套餐价格'" prop="mealPrice">
              <el-input
                v-model.number="meal.mealPrice"
                placeholder="请输入套餐价格"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <div style="text-align: right">
              <el-button
                type="primary"
                @click="handleDeleteMeal(meal, index)"
              >删除</el-button>
            </div>
          </div>
        </div>
        <div v-else>暂无套餐</div>
      </div>
      <br>
      <el-button type="info" size="small" @click="handleAddMeal">新增套餐</el-button>
    <!--    <el-divider class="mb36" content-position="left">商品介绍长图</el-divider>-->
    <!--    <image-upload ref="myImageList2" :image-list="imageList2" :limit="limit2" />-->
    </el-form>

    <div class="tc">
      <el-button
        v-loading="formLoading"
        type="primary"
        @click="submitForm('postForm')"
      >保存
      </el-button>
      <el-button @click="resetForm('postForm')">重置</el-button>
    </div>

    <el-dialog
      :visible.sync="dlgVisible"
      :title="'选择测试项'"
    >
      <div
        style="height: 50vh; overflow-y: scroll"
      >
        <div
          v-for="(group, groupIndex) in basic.testItemGroups"
          :key="groupIndex"
        >
          <my-checkbox-group
            v-model="group.ids"
            :label="group.name"
            :items="group.items"
          />
          <br>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" plain @click="dlgVisible=false">取消</el-button>
        <el-button type="primary" size="small" plain @click="dlgConfirm()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/utils/config"
import ImageUpload from "@/views/components/ImageUpload"
import { getGoodsById } from "@/api/mall"
import { getAllStandards, getAllTestItemInMap } from "@/api/basic"
import MyCheckboxGroup from "@/views/mall/goods/components/MyCheckboxGroup.vue"

const { prefix } = config[process.env.NODE_ENV]

export default {
  components: { MyCheckboxGroup, ImageUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // basic
      basic: {
        testItemGroups: {},
        standardList: []
      },
      // dlg
      dlgVisible: false,
      // 表单
      platformList: ["亚马逊", "天猫", "淘宝", "抖音", "其他"],
      exportList: ["中国", "欧盟"],
      industryList: ["服装", "食品接触材料", "纺织品", "玩具", "口罩"],
      // 测试项目列表
      testItemsList: [
        {
          id: 0,
          ext1: "标准1",
          name: "测试项目1",
          price: "100",
          qty: "10",
          amountRmb: "100"
        }
      ],
      mealList: [
        {
          // name: '套餐一',
          // mealPrice: '2000',
          // testItemGroups: [
          //   {
          //     items: [
          //       {
          //         id: 1,
          //         ext1: "GB31701",
          //         name: "耐水色牢",
          //         price: "95",
          //         qty: "10",
          //         amountRmb: "95"
          //       },
          //       {
          //         id: 2,
          //         ext1: "GB31701",
          //         name: "耐汗渍色牢度",
          //         price: "95",
          //         qty: "10",
          //         amountRmb: "95"
          //       }
          //     ],
          //     name: 'GB31701',
          //     ids: [1]
          //   },
          //   {
          //     items: [
          //       {
          //         id: 3,
          //         ext1: "GB 31604.8-2016",
          //         name: "总迁移量-蒸馏水",
          //         price: "108",
          //         qty: "10",
          //         amountRmb: "108"
          //       },
          //       {
          //         id: 4,
          //         ext1: "GB 31604.8-2016",
          //         name: "总迁移量-4%醋酸",
          //         price: "108",
          //         qty: "10",
          //         amountRmb: "108"
          //       }
          //     ],
          //     name: 'GB 31604.8-2016',
          //     ids: [3, 4]
          //   }
          // ]
        }
      ],
      checkList: [],
      testUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      tableRules: {},
      imgSrc: "",
      formLoading: false,
      // rules: methods.quotationCreateValidate,
      rules: {},
      postForm: {
        "id": undefined,
        "goodsNum": "LTIT22103055",
        "goodsName": "常见人体用一次性卫生用品检测",
        "description": "服务项目介绍：一次性卫生用品，纸尿裤，卫生巾，人体湿巾，纸巾纸国标检测，微生物、毒理、理化检测。CNAS/CMA报告，常规10~12个工作日。纸质报告及双语报告需额外收取费用。",
        "price": "1600.00~5200.00",
        reportFee: 0,
        courierFee: 0,
        taxFee: 0,
        discount: 0,
        totalCost: 0,
        imageList1: [],
        imageList2: [],
        testItemList: [],
        mealList: []
      },
      imageList1: [],
      imageList2: [],
      tmpTotalTestCost: 0,
      limit1: 4,
      limit2: 1
    }
  },
  watch: {
    tmpTotalTestCost(val) {
      this.postForm.price = '0 ~ ' + val
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    this.getBasicTable()
    if (this.isEdit) {
      // edit
      const id = this.$route.query.id
      this.tmpId = this.$route.params.id

      this.setTagsViewTitle()
      this.setPageTitle()

      this.fetchData(id)
    } else {
      // create
      this.tmpId = this.$route.params.id
    }
    this.postForm.testTradeId = this.tmpId
  },
  methods: {
    // 建议列表
    querySearch(queryString, cb) {
      const standards = this.basic.standardList
      const results = queryString
        ? standards.filter(this.createFilter(queryString))
        : standards
      // 调用 callback 返回建议列表的数据
      console.log(results)
      cb(results.map(a => {
        a.value = a.name
        return a
      }))
    },
    createFilter(queryString) {
      return (obj) => {
        const n = obj.name.toLowerCase()
        const q = queryString.toLowerCase()
        return (n.indexOf(q) !== -1)
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    // 套餐
    handleDeleteMeal(item, $index) {
      this.$confirm('确认删除套餐吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          this.mealList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleAddMeal() {
      // 组装表格数据
      const data = this.$refs.xTable.getTableData().tableData
      console.log(data)
      const groups = this.getAllTestItemGroups(data)
      console.log(groups)
      const meal = {
        name: '',
        mealPrice: '0',
        testItemGroups: groups
      }
      this.mealList.push(meal)
    },
    getAllTestItemGroups(testItems) {
      const map = {}
      for (const item of testItems) {
        const standard = item['ext1'] == null ? '未分组' : item['ext1']
        if (map[standard] == null) {
          map[standard] = [item]
        } else {
          map[standard].push(item)
        }
      }
      return Object.keys(map).map(key => {
        return { items: map[key], name: key, ids: [] }
      })
    },
    // basic
    getBasicTable() {
      getAllTestItemInMap()
        .then(res => {
          const data = res.data
          // console.log(data)
          this.basic.testItemGroups = data
        })
        .finally(() => {})
      getAllStandards()
        .then(res => {
          const data = res.data
          // console.log(data)
          this.basic.standardList = data
        })
        .finally(() => {})
    },
    // dlg
    handleOpenDlg() {
      this.dlgVisible = true
    },
    dlgConfirm() {
      console.log('dlg confirm')
      this.testItemsList = []
      const groups = this.basic.testItemGroups
      console.log(groups)
      groups.forEach((group) => {
        const items = group.items
        const ids = group.ids
        // console.log(ids)
        // console.log(items)
        for (const id of ids) {
          for (const item of items) {
            if (item.id === id) {
              // this.insertEvent(item) // 操作表格，没有双向绑定
              this.testItemsList.push(item) // 直接操作源数据
            }
          }
        }
        group.ids.splice(0, group.ids.length)
      })
      this.dlgVisible = false
    },
    sumNum(list, field) {
      let count = 0
      list.forEach((item) => {
        count += Number(item[field])
      })
      this.tmpTotalTestCost = count
      // this.calTotalCost()
      return count
    },
    // 在值发生改变时更新表尾合计
    updateFooterEvent() {
      const $table = this.$refs.xTable
      $table.updateFooter()
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
    getFileBlobUrl(file) {
      // console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    fetchData: function(id) {
      getGoodsById(id).then(response => {
        console.log(response.data)
        this.postForm = response.data
        this.testItemsList = this.postForm.testItemList
        this.mealList = this.postForm.mealList == null ? [] : this.postForm.mealList
        this.imageList1.length = 0
        this.imageList2.length = 0
        for (const img of this.postForm.imageList1) {
          img.url = this.getFileBlobUrl(img)
          this.imageList1.push(img)
        }
        for (const img of this.postForm.imageList2) {
          img.url = this.getFileBlobUrl(img)
          this.imageList2.push(img)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑商品'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tmpId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑商品'
      document.title = `${title} - ${this.tmpId}`
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // assemble data
          const imgList1 = this.$refs.myImageList1.getData()
          // const imgList2 = this.$refs.myImageList2.getData()
          this.postForm.imageList1 = imgList1
          console.log(imgList1)
          // console.log(imgList2)
          const tableData = this.$refs.xTable.getTableData()
          this.postForm.testItemList = tableData.tableData
          if (this.postForm.testItemList.length === 0) {
            this.$message.warning("请填写测试项")
            return
          }
          this.postForm.mealList = this.mealList
          console.log(this.postForm)
          // fromData
          const formData = new FormData()
          formData.append("postForm", JSON.stringify(this.postForm))
          if (imgList1 != null) {
            for (let i = 0; i < imgList1.length; i++) {
              formData.append("imageList1", imgList1[i].raw)
            }
          }
          // if (imgList2 != null) {
          //   for (let i = 0; i < imgList2.length; i++) {
          //     formData.append("imageList2", imgList2[i].raw)
          //   }
          // }
          // request backend
          this.formLoading = true
          this.$store
            .dispatch(
              this.isEdit ? "mall/updateGoods" : "mall/saveGoods",
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
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: "/mall-admin/goods/list"
      })
    },
    async insertEvent(row) {
      // const record = {
      //   testQuotationId: undefined,
      //   reportNum: "",
      //   productDes: "",
      //   style: "",
      //   materialColor: "",
      //   testItem: "",
      //   price: "",
      //   qty: "",
      //   amountRmb: "0"
      // }
      await this.$refs.xTable.insertAt(row, -1)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.h8 {
  min-width: 20vw;
  height: 30px;
}
</style>
