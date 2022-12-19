<template>
  <div class="app-container ohn">
    订单列表
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
      console.log(file)
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
