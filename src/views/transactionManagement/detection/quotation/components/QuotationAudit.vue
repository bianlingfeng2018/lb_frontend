<template>
  <div class="app-container ohn">
    <!--    <p>检测交易编号：{{ postForm.id }}</p>-->
    <div>
      <p style="font-family: '仿宋',Arial,sans-serif;">
        <!-- 确认测试报价单 -->
        发送报价单给<span style="font-weight: bold;">{{ client.nickname }}</span>，
        同步给<span style="font-weight: bold;">{{ service.nickname }}</span>
      </p>
      <el-button
        type="primary"
        size="small"
        plain
        @click="handleAudit"
      >确认发送报价单
      </el-button>
    </div>
    <!--    <div v-else>-->
    <!--      <p>已审核</p>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { getTestTradeStatus } from "@/api/transaction"
import { getUserByRoleAndTradeId } from "@/api/user"

export default {
  data() {
    return {
      testTradeState: "",
      service: {},
      client: {},
      postForm: {
        id: -1
      },
      clientQueryParam: {
        role: '客户',
        tradeId: -1
      },
      serviceQueryParam: {
        role: '客服',
        tradeId: -1
      },
      queryParam: {
        testTradeId: -1,
        status: 'testQuotationConfirmed'
      }
    }
  },
  created() {
    this.postForm.id = Number(this.$route.params.id)
    this.queryParam.testTradeId = this.postForm.id

    this.tempRoute = Object.assign({}, this.$route)
    this.setTagsViewTitle()
    this.setPageTitle()

    this.getTestTradeState()
    this.serviceQueryParam.tradeId = this.queryParam.testTradeId
    this.clientQueryParam.tradeId = this.queryParam.testTradeId
    this.getService()
    this.getClient()
  },
  methods: {
    getClient() {
      getUserByRoleAndTradeId(this.clientQueryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            console.log(data)
            this.client = data
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
        })
    },
    getService() {
      getUserByRoleAndTradeId(this.serviceQueryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            console.log(data)
            this.service = data
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
        })
    },
    getTestTradeState() {
      getTestTradeStatus(this.queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.testTradeState = data.status
            console.log(data)
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
        })
    },
    handleAudit() {
      this.$store
        .dispatch(
          "transaction/updateTestTradeStatus",
          this.queryParam
        )
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            this.$message.success(data.msg)
            this.$router.push({
              path: "/tm/detection/quotation/result"
            })
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
        })
    },
    setTagsViewTitle() {
      const title = '审核检测报价单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '审核检测报价单'
      document.title = `${title} - ${this.postForm.id}`
    }
  }
}
</script>
