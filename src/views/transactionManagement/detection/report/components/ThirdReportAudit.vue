<template>
  <div class="app-container ohn">
    <!--    <p>检测交易编号：{{ postForm.id }}</p>-->
    <div v-if="testTradeState==='testReportSecondConfirmed'">
      <p style="font-family: '仿宋',Arial,sans-serif;">
        批准人 <span style="font-weight: bold;">{{ audit3.nickname }}</span>
      </p>
      <el-button
        type="primary"
        size="small"
        plain
        @click="handleAudit"
      >确认批准
      </el-button>
    </div>
    <div v-else>
      <p>已批准</p>
    </div>
  </div>
</template>

<script>
import { getTestTradeStatus, queryTestTradeDetail } from "@/api/transaction"
import { getUserByRoleAndTradeId } from "@/api/user"

export default {
  data() {
    return {
      testTradeState: "",
      audit3: {},
      postForm: {
        id: -1
      },
      approverQueryParam: {
        role: '批准人',
        tradeId: -1
      },
      queryParam: {
        testTradeId: -1,
        status: 'testReportThirdConfirmed'
      }
    }
  },
  created() {
    this.postForm.id = Number(this.$route.params.id)
    this.queryParam.testTradeId = this.postForm.id
    this.approverQueryParam.tradeId = this.postForm.id

    this.tempRoute = Object.assign({}, this.$route)
    this.setTagsViewTitle()
    this.setPageTitle()

    this.getTestTradeState()
    this.fetchData(this.queryParam.testTradeId)
  },
  methods: {
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        const uid = response.data.testWorkOrder.reviewerId
        console.log(uid)
        getUserByRoleAndTradeId(this.approverQueryParam)
          .then((res) => {
            const { data, success, errorMessage } = res
            if (success) {
              console.log(data)
              this.audit3 = data
            } else {
              this.$message.error(errorMessage)
            }
          })

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
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
              path: "/tm/detection/report/result-third",
              query: {
                tradeId: this.queryParam.testTradeId
              }
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
      const title = '批准检测报告单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '批准检测报告单'
      document.title = `${title} - ${this.postForm.id}`
    }
  }
}
</script>
