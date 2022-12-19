<template>
  <div class="app-container ohn">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="证书名称">
        <el-input
          v-model="formInline.name"
          placeholder="请输入证书名称"
          clearable
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item label="序列号">
        <el-input
          v-model="formInline.encryptionKey"
          placeholder="请输入序列号"
          clearable
          @keydown.enter.native="onSearch"
        />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="tableLoading" type="primary" @click="onSearch"
          >查询</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column prop="name" label="证书名称" />
      <el-table-column prop="id" label="证书ID" width="70" />
      <el-table-column prop="username" label="用户" width="120" />
      <el-table-column prop="encryptionKey" label="序列号" />
      <el-table-column prop="desc" label="描述 " width="180" />
      <el-table-column prop="gmtCreate" label="创建时间" width="180" />
      <el-table-column prop="username" label="创建人" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <a @click="handleDownLoadCert(scope.row)">下载</a>
            <!-- <a
              :href="
                prefix.lb +
                '/api/cerfication/downloadByEncryptionKey?encryptionKey=' +
                scope.row.encryptionKey
              "
              >下载</a
            > -->
          </el-button>
          <el-button type="text" size="small" @click="handleDelCert(scope.row)"
            >删除</el-button
          >
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
import config from "@/utils/config";
const { prefix } = config[process.env.NODE_ENV];
import { getToken } from "@/utils/auth"; // get token from cookie
export default {
  data() {
    return {
      prefix: prefix,
      tableLoading: false,
      formInline: {
        name: "",
        encryptionKey: "",
      },
      tableData: [],
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
    };
  },
  created() {
    this.handleSearchCertList();
  },
  methods: {
    handleSearchCertList() {
      this.tableLoading = true;
      const fdata = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize,
        name: this.formInline.name,
        encryptionKey: this.formInline.encryptionKey,
      };
      this.$store
        .dispatch("cert/getCertList", fdata)
        .then((res) => {
          const { data, success, errorMessage } = res;
          if (success) {
            this.tableData = data.list;
            this.pagination.currPage = data.pageNum;
            this.pagination.pageTotal = data.total;
          } else {
            this.$message.error(errorMessage);
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleDelCert(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("cert/delCert", row.id)
            .then((res) => {
              const { data, success, errorMessage } = res;
              if (success) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.handleSearchCertList();
              } else {
                this.$message.error(errorMessage);
              }
            })
            .catch(() => {})
            .finally(() => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleDownLoadCert(row) {
      this.fileName = row.name;
      this.$message({
        type: "info",
        message: "文件正在下载中，请稍后~",
      });
      fetch(
        prefix.lb +
          "/api/certification/downloadByEncryptionKey?encryptionKey=" +
          row.encryptionKey,
        {
          method: "GET",
          responseType: "blob",
          headers: new Headers({
            // 自己加的头信息全都要转成string
            encryptionKey: row.encryptionKey.toString(),
            "ACCESS-TOKEN": getToken().toString(),
          }),
        }
      )
        .then((res) => res.blob())
        .then((data) => {
          const blobUrl = window.URL.createObjectURL(data);
          const a = document.createElement("a");
          a.download = this.fileName + ".pdf";
          a.href = blobUrl;
          a.click();
          this.$message({
            type: "success",
            message: "文件下载成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "文件下载失败，请稍后再试~",
          });
        })
        .finally(() => {});
    },
    onSearch() {
      this.handleSearchCertList();
    },
    resetForm() {
      this.formInline.name = "";
      this.formInline.encryptionKey = "";
      this.handleSearchCertList();
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.handleSearchCertList();
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val;
      this.handleSearchCertList();
    },
  },
};
</script>
