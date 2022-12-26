<template>
  <div class="app-container ohn">
    <!--    <p>检测交易编号：{{ postForm.id }}</p>-->
    <div v-if="testTradeState==='testWorkOrderCreated'">
      <p style="font-family: '仿宋',Arial,sans-serif;">
        客服将创建的工作单发送给检测人员 <span style="font-weight: bold;">{{ test.nickname }}</span>
      </p>
      <!--      <p>-->
      <!--        &lt;!&ndash; 确认工作单 &ndash;&gt;-->
      <!--        由客服将创建的工作单发送给检测人员-{{ test.nickname }}【系统、邮件发送】 指派人员的功能-->
      <!--      </p>-->
      <el-button
        type="primary"
        size="small"
        plain
        @click="handleAudit"
      >确认发送工作单
      </el-button>
    </div>
    <div v-else>
      <p>已审核</p>
    </div>
  </div>
</template>

<script>
import { getTestTradeStatus } from "@/api/transaction"
import { getUserByRoleAndTradeId } from "@/api/user"

export default {
  data() {
    return {
      testTradeState: "",
      test: {},
      postForm: {
        id: -1
      },
      testQueryParam: {
        role: '测试',
        tradeId: -1
      },
      queryParam: {
        testTradeId: -1,
        status: 'testWorkOrderConfirmed'
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
    this.testQueryParam.tradeId = this.queryParam.testTradeId
    this.getTest()
  },
  methods: {
    getTest() {
      getUserByRoleAndTradeId(this.testQueryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            console.log(data)
            this.test = data
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
              path: "/tm/detection/worksheet/result"
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
      const title = '审核检测工作单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '审核检测工作单'
      document.title = `${title} - ${this.postForm.id}`
    }
  }
}
</script>
