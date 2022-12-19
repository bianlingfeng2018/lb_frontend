<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <span class="lh32">记录列表</span>
      <!--      <el-button-->
      <!--        type="primary"-->
      <!--        plain-->
      <!--        size="small"-->
      <!--        @click="handleCreate"-->
      <!--      >新增记录</el-button>-->
    </div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      class="mt8"
    >
      <el-table-column align="center" type="index" label="#" min-width="80" />
      <el-table-column align="center" prop="proNum" label="订单编号" min-width="120" />
      <el-table-column align="center" prop="agreeToSubcontract" label="是否分包" />
      <el-table-column align="center" prop="proDate" label="日期" min-width="120" />
      <el-table-column align="center" prop="price" label="面价" min-width="120" />
      <el-table-column align="center" prop="deal" label="成交金额" min-width="120" />
      <el-table-column align="center" prop="pay" label="付款方式" min-width="120" />
      <el-table-column align="center" prop="income" label="到账金额" min-width="120" />
      <!--      <el-table-column align="center" prop="serviceConfirm" label="客服确认" min-width="120" />-->
      <!--      <el-table-column align="center" prop="financeConfirm" label="财务确认" min-width="120" />-->
      <el-table-column align="center" prop="type" label="订单类型" min-width="120" />
      <el-table-column align="center" prop="client" label="客户名称" min-width="120" />
      <el-table-column align="center" prop="applyDate" label="成交日期" min-width="120" />
      <el-table-column align="center" prop="reportDate" label="出单日期" min-width="120" />
      <el-table-column align="center" prop="verifyDate" label="付款日期" min-width="120" />
      <el-table-column align="center" prop="discount" label="折扣系数" />
      <el-table-column align="center" prop="coefficient" label="回款系数" />
      <el-table-column align="center" prop="reportNum" label="报告编号" />
      <el-table-column align="center" prop="subcontractPrice" label="分包价格" />
      <el-table-column align="center" label="申请单" width="120">
        <template slot-scope="scope">
          <div v-for="(file, i) in scope.row.pdfList" :key="file.path" class="block">
            <el-link :href="getFileBlobUrl(file)" target="_blank">{{ '['+(i+1)+'] ' + file.name }};</el-link>
            <br>
          </div>
          <!--          <el-button type="text" size="small">-->
          <!--            <a @click="handleDownLoad1(scope.row)">下载</a>-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="水单" width="120">
        <template slot-scope="scope">
          <div v-for="(img, index) in scope.row.imageList" :key="img.path+index" class="block">
            <!--            <span class="demonstration">{{ img.name }}</span>-->
            <el-image
              style="width: 100px; height: 100px"
              :src="getFileBlobUrl(img)"
              :preview-src-list="[getFileBlobUrl(img)]"
              fit="cover"
            />
          </div>
        </template>
        <!--        <template slot-scope="scope">-->
        <!--          <el-button type="text" size="small">-->
        <!--            <a @click="handleDownLoad2(scope.row)">下载</a>-->
        <!--          </el-button>-->
        <!--        </template>-->
      </el-table-column>
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
import { deleteFinance, getFinancesPage } from "@/api/finance"
import { timeFormatFilter } from "@/utils/simple-util"

const { prefix } = config[process.env.NODE_ENV]

export default {
  filters: {
    timeFormatFilter
  },
  data() {
    return {
      testUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      imgUrlDict: {},
      tableData: [],
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
      getFinancesPage(queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            console.log(data)
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
    // 下载zip
    // handleDownLoad1(row) {
    //   fetch(
    //     prefix.lb +
    //     "/api/test/downloadAuditPart?testTradeId=" +
    //     row.tradeId + "&part=1",
    //     {
    //       method: "GET",
    //       responseType: "blob",
    //       headers: new Headers({
    //         "token": getToken().toString()
    //       })
    //     })
    //     .then((res) => res.blob())
    //     .then((data) => {
    //       const blobUrl = window.URL.createObjectURL(data)
    //       console.log(blobUrl)
    //       this.imgSrc = blobUrl
    //       this.dialogVisible = true
    //       const a = document.createElement("a")
    //       a.download = "download.zip"
    //       a.href = blobUrl
    //       a.click()
    //       this.$message({
    //         type: "success",
    //         message: "文件下载成功"
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "error",
    //         message: "文件下载失败，请稍后再试~"
    //       })
    //     })
    //     .finally(() => {
    //     })
    // },
    // handleDownLoad2(row) {
    //   fetch(
    //     prefix.lb +
    //     "/api/test/downloadAuditPart?testTradeId=" +
    //     row.tradeId + "&part=2",
    //     {
    //       method: "GET",
    //       responseType: "blob",
    //       headers: new Headers({
    //         "token": getToken().toString()
    //       })
    //     })
    //     .then((res) => res.blob())
    //     .then((data) => {
    //       const blobUrl = window.URL.createObjectURL(data)
    //       const a = document.createElement("a")
    //       a.download = "download.zip"
    //       a.href = blobUrl
    //       a.click()
    //       this.$message({
    //         type: "success",
    //         message: "文件下载成功"
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "error",
    //         message: "文件下载失败，请稍后再试~"
    //       })
    //     })
    //     .finally(() => {
    //     })
    // },
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
          await deleteFinance(row.id)
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
        path: "/fm/pay-create"
      })
    },
    handleEdit({ $index, row }) {
      this.$router.push({
        path: "/fm/pay-edit/" + row.tradeId,
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>
