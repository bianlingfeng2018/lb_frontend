<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <span class="lh32">
        <el-button
          type="primary"
          plain
          size="small"
          @click="handleAuditPass"
        >审核通过</el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="handleAuditNotPass"
        >审核不通过</el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="handlePutOn"
        >上架</el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="handlePutOff"
        >下架</el-button>
      </span>
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate"
      >添加商品+</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      class="mt8"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" min-width="50" />
      <!--      <el-table-column align="center" type="index" label="#" min-width="80" />-->
      <el-table-column align="center" prop="goodsNum" label="商品编号" min-width="120" />
      <el-table-column align="center" label="商品图片" min-width="120">
        <template slot-scope="scope">
          <div v-for="(img, index) in scope.row.imageList1" :key="img.path + index" class="block">
            <!--            <span class="demonstration">{{ img.name }}</span>-->
            <el-image
              style="width: 100px; height: 100px"
              :src="getFileBlobUrl(img)"
              :preview-src-list="[getFileBlobUrl(img)]"
              fit="cover"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goodsName" label="商品名称" min-width="120" />
      <el-table-column align="center" prop="hscode" label="HSCode" min-width="120" />
      <el-table-column align="center" prop="industClass" label="行业" min-width="120" />
      <el-table-column align="center" prop="export" label="出口国" min-width="120" />
      <el-table-column align="center" prop="standard" label="检测标准" min-width="120" />
      <!--      <el-table-column prop="description" label="商品描述" show-overflow-tooltip min-width="220" />-->
      <el-table-column align="center" prop="status" label="状态" min-width="120" />
      <el-table-column align="center" prop="shelfStatus" label="上下架状态" min-width="120" />
      <el-table-column align="center" prop="price" label="商品价格" min-width="120" />
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleEdit(scope)"
          >编辑
          </el-button>
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleDelete(scope)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr mt20"
      :current-page="pagination.currPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
import config from "@/utils/config"
import { timeFormatFilter } from "@/utils/simple-util"
import { getGoodsPage } from "@/api/mall"

const { prefix } = config[process.env.NODE_ENV]

export default {
  filters: {
    timeFormatFilter
  },
  data() {
    return {
      // 多选
      multipleSelection: undefined,
      testUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      imgUrlDict: {},
      tableData: [
        {
          "id": 32,
          "goodsNum": "LTIT22103055",
          "goodsName": "常见人体用一次性卫生用品检测",
          "description": "服务项目介绍：一次性卫生用品，纸尿裤，卫生巾，人体湿巾，纸巾纸国标检测，微生物、毒理、理化检测。CNAS/CMA报告，常规10~12个工作日。纸质报告及双语报告需额外收取费用。",
          "price": "1600.00~5200.00",
          "imageList": [
            {
              "path": "lb-file\\t\\55\\t_af\\2",
              "name": "电子签名1.png"
            }
          ]
        },
        {
          "id": 31,
          "goodsNum": "LTIT22103055",
          "goodsName": "常见人体用一次性卫生用品检测",
          "description": "服务项目介绍：一次性卫生用品，纸尿裤，卫生巾，人体湿巾，纸巾纸国标检测，微生物、毒理、理化检测。CNAS/CMA报告，常规10~12个工作日。纸质报告及双语报告需额外收取费用。",
          "price": "1600.00~5200.00",
          "imageList1": [
            {
              "path": "lb-file\\t\\54\\t_af\\2",
              "name": "付款单.jpeg"
            }
          ]
        },
        {
          "id": 30,
          "goodsNum": "LTIT22103055",
          "goodsName": "常见人体用一次性卫生用品检测",
          "description": "服务项目介绍：一次性卫生用品，纸尿裤，卫生巾，人体湿巾，纸巾纸国标检测，微生物、毒理、理化检测。CNAS/CMA报告，常规10~12个工作日。纸质报告及双语报告需额外收取费用。",
          "price": "1600.00~5200.00",
          "imageList2": []
        }
      ],
      postForm: {},
      downloadForm: {
        testTradeId: 12,
        part1: "1",
        part2: "2"
      },
      prefix: prefix,
      tableLoading: false,
      formInline: {
        name: "",
        encryptionKey: ""
      },
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getFileBlobUrl(file) {
      // console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    getData() {
      this.tableLoading = true
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      getGoodsPage(queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          console.log(data)
          if (success) {
            this.tableData = data.list
            this.pagination.currPage = data.pageNum
            this.pagination.pageTotal = data.pageSize
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getData()
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认删除记录吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // await deleteGoods(row.id)
          // await this.getData()
          this.tableData.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleCreate() {
      this.$router.push({
        path: "/mall-admin/goods/add"
      })
    },
    handleEdit({ $index, row }) {
      this.$router.push({
        path: "/mall-admin/goods/edit/" + row.id,
        query: {
          id: row.id
        }
      })
    },
    handleAuditPass() {
      this.$confirm('确认通过吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 批量通过
          this.$message({
            type: 'success',
            message: '审核通过操作成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleAuditNotPass() {
      this.$confirm('确认不通过吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 批量通过
          this.$message({
            type: 'success',
            message: '审核不通过操作成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handlePutOn() {
      this.$confirm('确认上架吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 批量通过
          this.$message({
            type: 'success',
            message: '上架操作成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handlePutOff() {
      this.$confirm('确认下架吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 批量通过
          this.$message({
            type: 'success',
            message: '下架操作成功！'
          })
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>
