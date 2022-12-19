<template>
  <div class="app-container ohn">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="检验名称">
        <el-input
          v-model="formInline.user"
          placeholder="证书名称"
          @keydown.enter.native="onSubmit"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="lb-flex lb-flex-bw">
      <span class="lh32">检验列表</span>
      <el-button type="primary" plain size="small" @click="createdDetection"
        >新建交易</el-button
      >
    </div>
    <el-table :data="tableData" stripe border style="width: 100%" class="mt8">
      <el-table-column prop="testName" label="检测名称" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleDetail(scope.row)"
            >{{ scope.row.testName }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="testDesc" label="检测描述" />
      <el-table-column prop="status" label="交易状态" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusTextFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="client" label="客户名称" width="180" />
      <el-table-column prop="clientAccount" label="客户账号" />
      <el-table-column prop="contact" label="联系方式" />
      <el-table-column prop="owner" label="交易负责人" />
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleToSteps(scope.row)"
            >{{ scope.row.status | statusHandleTextFilter }}</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleDelTestTrade(scope.row)"
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
export default {
  filters: {
    statusHandleTextFilter(val) {
      if (val === "testTradeCreated") {
        // 检测交易创建完成  testTradeCreated
        return "创建报价单";
      } else if (val === "testQuotationCreated") {
        // 报价单创建完成 testQuotationCreated
        return "确认报价单";
      } else if (val === "testQuotationConfirmed") {
        // 报价单确认完成 testQuotationConfirmed
        return "创建申请单";
      } else if (val === "testApplicationFormCreated") {
        // 申请单创建完成 testApplicationFormCreated
        return "确认申请单";
      } else if (val === "testApplicationFormConfirmed") {
        // 申请单确认完成 testApplicationFormConfirmed.
        return "创建工作单";
      } else if (val === "testWorkOrderCreated") {
        // 工作单创建完成 testWorkOrderCreated
        return "确认工作单";
      } else if (val === "testWorkOrderConfirmed") {
        // 工作单确认完成 testWorkOrderConfirmed
        return "创建报告单";
      } else if (val === "Created") {
        // 工作单创建完成
        return "确认报告单";
      } else if (val === "Confirmed") {
        // 工作单确认完成
        return "生成报告单";
      }
    },
    statusTextFilter(val) {
      if (val === "testTradeCreated") {
        // 检测交易创建完成  testTradeCreated
        return "检测交易创建完成";
      } else if (val === "testQuotationCreated") {
        // 报价单创建完成 testQuotationCreated
        return "报价单创建完成";
      } else if (val === "testQuotationConfirmed") {
        // 报价单确认完成 testQuotationConfirmed
        return "报价单确认完成";
      } else if (val === "testApplicationFormCreated") {
        // 申请单创建完成 testApplicationFormCreated
        return "申请单创建完成";
      } else if (val === "testApplicationFormConfirmed") {
        // 申请单确认完成 testApplicationFormConfirmed.
        return "申请单确认完成";
      } else if (val === "testWorkOrderCreated") {
        // 工作单创建完成 testWorkOrderCreated
        return "工作单创建完成";
      } else if (val === "testWorkOrderConfirmed") {
        // 工作单确认完成 testWorkOrderConfirmed
        return "工作单确认完成";
      }
    },
  },
  data() {
    return {
      formInline: {
        testName: "",
        client: "",
        status: "",
      },
      tableData: [],
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
    };
  },
  mounted() {
    // this.handleSearchTestTradeList();
  },
  methods: {
    handleSearchTestTradeList() {
      this.tableLoading = true;
      const fdata = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize,
        testName: this.formInline.testName,
        client: this.formInline.client,
        status: this.formInline.status,
      };
      this.$store
        .dispatch("transaction/queryTestTradeList", fdata)
        .then((res) => {
          const { data, success, errorMessage } = res;
          if (success) {
            this.tableData = data.list;
            this.pagination.currPage = data.pageNum;
            // this.pagination.pageSize = data.pageSize;
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
    handleDelTestTrade(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("transaction/deleteTestTrade", { testTradeId: row.id })
            .then((res) => {
              const { data, success, errorMessage } = res;
              if (success) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.handleSearchTestTradeList();
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
    createdDetection() {
      this.$router.push({
        path: "/detection/create",
        query: { status: "createdDetection" },
      });
    },
    handleDetail(data) {
      this.$router.push({
        path: "/detection/detail",
        query: { id: data.id, name: data.testName, status: data.status },
      });
    },
    handleToSteps(data) {
      if (
        data.status === "testTradeCreated" ||
        data.status === "testQuotationConfirmed" ||
        data.status === "testApplicationFormConfirmed"
      ) {
        this.$router.push({
          path: "/detection/create",
          query: { id: data.id, name: data.testName, status: data.status },
        });
      } else if (
        data.status === "testQuotationCreated" ||
        data.status === "testApplicationFormCreated" ||
        data.status === "testWorkOrderCreated" ||
        data.status === "testWorkOrderConfirmed"
      ) {
        this.$router.push({
          path: "/detection/steps",
          query: { id: data.id, name: data.testName, status: data.status },
        });
      }
    },
    onSubmit() {
      console.log("submit!");
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
