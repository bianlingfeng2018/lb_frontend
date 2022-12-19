<template>
  <div>
    <el-row>
      <el-col :sm="12" :lg="6">
        <el-result icon="success" title="已确认付款，发送申请单成功" sub-title="请根据提示进行操作">
          <template slot="extra">
            <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
            <el-button type="primary" size="medium" @click="goBackToTradeList()">返回交易列表</el-button>
          </template>
        </el-result>
      </el-col>
      <!--      <el-col :sm="12" :lg="6">-->
      <!--        <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">-->
      <!--          <template slot="extra">-->
      <!--            <el-button type="primary" size="medium">返回</el-button>-->
      <!--          </template>-->
      <!--        </el-result>-->
      <!--      </el-col>-->
      <!--      <el-col :sm="12" :lg="6">-->
      <!--        <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">-->
      <!--          <template slot="extra">-->
      <!--            <el-button type="primary" size="medium">返回</el-button>-->
      <!--          </template>-->
      <!--        </el-result>-->
      <!--      </el-col>-->
      <!--      <el-col :sm="12" :lg="6">-->
      <!--        <el-result icon="info" title="信息提示" subTitle="请根据提示进行操作">-->
      <!--          <template slot="extra">-->
      <!--            <el-button type="primary" size="medium">返回</el-button>-->
      <!--          </template>-->
      <!--        </el-result>-->
      <!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/tm/detection/apply/list"
      })
    },
    goBackToTradeList() {
      this.$router.push({
        path: "/tm/detection/list"
      })
    }
  }

}
</script>

<style scoped>

</style>
