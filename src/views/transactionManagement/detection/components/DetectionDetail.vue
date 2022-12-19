<template>
  <div class="app-container ohn transaction-box">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />检测交易单</div>
    <el-form
      ref="postForm"
      v-loading="formLoading"
      :inline="true"
      class="mt36"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="150px"
    >
      <el-form-item :label="'交易名称\nTest Name'" prop="testName">
        <el-input
          v-model="postForm.testName"
          placeholder="请输入交易名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        :label="'交易描述\nTest Desc'"
      >
        <el-input
          v-model="postForm.testDesc"
          type="textarea"
          placeholder="请输入交易描述"
          :max-rows="3"
          maxlength="100"
          show-word-limit
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-divider
        class="mb36"
        content-position="left"
      >客户</el-divider>
      <el-form-item :label="'选择客户\nChoose Client'">
        <el-select
          v-model="postForm.clientId"
          placeholder="请选择"
          style="width: 240px"
          @change="onClientChange"
        >
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'客户\nClient'" prop="client">
        <el-input
          v-model.number="postForm.client"
          placeholder="请输入客户名称"
          clearable
          style="width: 240px"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item :label="'联系方式\nTel'" prop="contact">
        <el-input
          v-model.number="postForm.contact"
          placeholder="请输入联系方式"
          clearable
          style="width: 240px"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item :label="'客户账户\nAccount'" prop="clientAccount">
        <el-input
          v-model.number="postForm.clientAccount"
          placeholder="请输入客户账户"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-divider
        class="mb36"
        content-position="left"
      >销售</el-divider>
      <el-form-item
        :label="'选择销售\nSalesman'"
      >
        <el-select
          v-model="postForm.ownerId"
          placeholder="请选择"
          style="width: 240px"
          @change="onOwnerChange"
        >
          <el-option
            v-for="item in ownerList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'销售\nSalesman'" prop="owner">
        <el-input
          v-model.number="postForm.owner"
          placeholder="请输入联系销售"
          clearable
          style="width: 240px"
          :disabled="true"
        />
      </el-form-item>
      <br>
      <el-form-item>
        <div class="">
          <el-button
            type="primary"
            @click="submitForm('postForm')"
          >保存</el-button>
          <el-button @click="resetForm('postForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import methods from '../pub_methods/validate'
import { queryTestTradeDetail } from "@/api/transaction"
import { getAllClientsByOwner, getAllUsersByRole } from "@/api/user"
import { mapGetters } from "vuex"

const defaultForm = {
  testName: "",
  testDesc: "",
  client: "",
  contact: "",
  clientAccount: "",
  owner: "",
  clientId: undefined,
  ownerId: undefined
}

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      clientList: [],
      ownerList: [],
      postForm: Object.assign({}, defaultForm),
      formLoading: false,
      submitLoading: false,
      loading: false,
      rules: methods.detectionCreateValidate
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getClients()
    this.getSalesmen()

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    onClientChange: function(val) {
      // 自动填写客户信息
      console.log(val)
      for (const u of this.clientList) {
        if (u.id === val) {
          this.postForm.contact = u.phoneNum
          this.postForm.client = u.nickname
          break
        }
      }
    },
    onOwnerChange: function(val) {
      // 自动填写销售信息
      console.log(val)
      for (const u of this.ownerList) {
        if (u.id === val) {
          this.postForm.owner = u.nickname
          break
        }
      }
    },
    async getClients() {
      const res = await getAllClientsByOwner({ role: '客户' })
      console.log(res)
      this.clientList = res.data
    },
    async getSalesmen() {
      const res = await getAllUsersByRole({ role: '销售' })
      console.log(res)
      this.ownerList = res.data
      if (!this.isEdit) {
        // 自动填写销售信息
        console.log(this.name)
        for (const u of this.ownerList) {
          if (u.username === this.name) {
            this.postForm.ownerId = u.id
            this.postForm.owner = u.nickname
            break
          }
        }
      }
    },
    fetchData: function(id) {
      queryTestTradeDetail(Object.assign({}, { testTradeId: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data.testTrade

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑检测交易'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑检测交易'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm(formName) {
      const _isEdit = this.isEdit
      console.log(_isEdit)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formLoading = true
          this.$store
            .dispatch(
              _isEdit
                ? 'transaction/updateTestTrade'
                : 'transaction/saveTestTrade',
              this.postForm)
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$refs[formName].resetFields()
                this.$message.success(data.msg)
                this.goBack()
              } else {
                this.$message.error(errorMessage)
              }
            })
            .catch(() => {})
            .finally(() => {
              this.formLoading = false
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: "/tm/detection/list"
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.transaction-box {
  .el-form .el-form-item__label {
    background-color: red;
    line-height: 20px !important;
  }
  .el-form-item--medium .el-form-item__label {
    line-height: 20px !important;
  }
  .remark-content {
    font-size: 12px;
    color: #808080;
    line-height: 20px;
  }
}
</style>
