<template>
  <div class="app-container ohn">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />联系人信息</div>
    <el-form
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="120px"
    >
      <el-form-item :label="'登录名'" prop="username">
        <el-input
          v-model="postForm.username"
          placeholder="请输入登录名"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item v-if="!isEdit" :label="'密码'" prop="password">
        <el-input
          v-model="postForm.password"
          placeholder="请输入密码"
          style="width: 240px"
          show-password
        />
      </el-form-item>
      <el-form-item :label="'姓名'" prop="nickname">
        <el-input
          v-model="postForm.nickname"
          placeholder="请输入姓名"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'手机号'" prop="phoneNum">
        <el-input
          v-model.number="postForm.phoneNum"
          placeholder="请输入手机号"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'邮箱'" prop="email">
        <el-input
          v-model="postForm.email"
          placeholder="请输入邮箱"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="角色" prop="role.id">
        <el-select v-model="postForm.role.id" placeholder="请选择" style="width: 240px">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-divider content-position="left">客户公司</el-divider>
      <el-form-item :label="'客户公司'" prop="com">
        <el-input
          v-model="postForm.com"
          placeholder="请输入客户公司"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'选择公司'">
        <el-select
          v-model="postForm.comId"
          placeholder="请选择"
          style="width: 240px"
          @input="onClientComChange"
        >
          <el-option
            v-for="item in clientComList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-link @click="handleShowClientCom(postForm)">查看</el-link>
      <el-divider direction="vertical" />
      <el-link @click="handleEditClientCom(postForm)">编辑</el-link>
      <el-divider direction="vertical" />
      <el-link @click="handleCreateClientCom(postForm)">创建</el-link>
      <el-divider content-position="left">商机</el-divider>
      <my-flex-table ref="myFlexTable" :editable="true" :flex-obj="postForm.flexObj" />
      <!--      <div v-for="(cliBusOpp, i) in postForm.clientBusOppList" :key="cliBusOpp.id">-->
      <!--        <p>({{ (i+1) }})</p>-->
      <!--        <el-form-item :label="'主题'" prop="theme">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.theme"-->
      <!--            placeholder="请输入主题"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'创建日期'" prop="crtDate">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.crtDate"-->
      <!--            placeholder="请输入创建日期"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'对方联系人'" prop="oppositeContact">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.oppositeContact"-->
      <!--            placeholder="请输入对方联系人"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'商机描述'" prop="description">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.description"-->
      <!--            placeholder="请输入商机描述"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'解决方案'" prop="solution">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.solution"-->
      <!--            placeholder="请输入解决方案"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'方案日期'" prop="solutionDate">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.solutionDate"-->
      <!--            placeholder="请输入方案日期"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'阶段'" prop="stage">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.stage"-->
      <!--            placeholder="请输入阶段"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'是否成交'" prop="isFinish">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.isFinish"-->
      <!--            placeholder="请输入是否成交"-->
      <!--            clearable-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--        <el-form-item :label="'否成交原因'" prop="unfinishReason">-->
      <!--          <el-input-->
      <!--            v-model.number="cliBusOpp.unfinishReason"-->
      <!--            placeholder="请输入否成交原因"-->
      <!--            clearable-->
      <!--            type="textarea"-->
      <!--            style="width: 240px"-->
      <!--          />-->
      <!--        </el-form-item>-->
      <!--      </div>-->
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
import { mapGetters } from "vuex"
import MyFlexTable from "@/views/components/MyFlexTable"
import { getRoles } from "@/api/role"
import { addUser, getUserById, updateUser } from "@/api/user"
import methods from "@/views/transactionManagement/detection/pub_methods/validate"
import { queryClientComList } from "@/api/clientCompany"
import { deepClone } from "@/utils"

const flexObjTmp = [
  {
    title: "商机",
    table: {
      attrs: [
        { name: "theme", desc: "主题" },
        { name: "crtDate", desc: "创建日期" },
        { name: "oppositeContact", desc: "对方联系人" },
        { name: "description", desc: "商机描述" },
        { name: "solution", desc: "解决方案" },
        { name: "solutionDate", desc: "方案日期" },
        { name: "stage", desc: "阶段" },
        { name: "isFinish", desc: "是否成交" },
        { name: "unfinishReason", desc: "否成交原因" }
      ],
      items: [
      ]
    }
  }
]

const defaultForm = {
  id: undefined,
  username: "",
  nickname: "",
  phoneNum: "",
  email: "",
  com: "",
  comId: undefined,
  role: {
    id: undefined,
    name: ""
  },
  flexObj: flexObjTmp
}

const defaultClientComList = [
  // {
  //   id: 1,
  //   name: "A公司"
  // },
  // {
  //   id: 2,
  //   name: "B公司"
  // }
]

export default {
  components: {
    MyFlexTable
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tmpUserId: -1,
      postForm: Object.assign({}, defaultForm),
      rolesList: [],
      clientComList: Object.assign({}, defaultClientComList),
      formLoading: false,
      submitLoading: false,
      loading: false,
      rules: methods.userValidate
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getClientComList()
    this.getRoles()

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.tmpUserId = id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    async getRoles() {
      const res = await getRoles()
      this.rolesList = []
      for (const role of res.data) {
        if (role.name === '客户') {
          this.rolesList.push(role)
        }
      }
    },
    onClientComChange: function(val) {
      console.log(val)
      for (const com of this.clientComList) {
        if (com.id === val) {
          this.postForm.com = com.name
          break
        }
      }
    },
    getClientComList() {
      queryClientComList()
        .then(res => {
          console.log(res)
          this.clientComList = res.data
        })
        .catch(reason => {
          console.log(reason)
        })
        .finally(() => {})
    },
    fetchData: function(id) {
      getUserById(Object.assign({}, { id: id })).then(response => {
        console.log(response.data)
        this.postForm = response.data
        if (this.postForm.flexObj == null || this.postForm.flexObj.length === 0) {
          this.postForm.flexObj = flexObjTmp
        }

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑联系人信息'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.tmpUserId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑联系人信息'
      document.title = `${title} - ${this.tmpUserId}`
    },
    getSonData() {
      const sonData = this.$refs.myFlexTable.getData()
      console.log('sonData ---')
      console.log(sonData)
      return sonData
    },
    submitForm(formName) {
      const _isEdit = this.isEdit
      console.log(_isEdit)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formLoading = true
          // 组装数据
          const postForm = deepClone(this.postForm)
          postForm.flexObj = this.getSonData()
          console.log(postForm.flexObj)
          if (postForm.flexObj == null) {
            postForm.flexObj = flexObjTmp
          }
          postForm.flexObj = JSON.stringify(postForm.flexObj)
          if (_isEdit) {
            updateUser(postForm.id, postForm)
              .then((res) => {
                console.log(res)
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
            console.log('create user.')
            addUser(postForm)
              .then((res) => {
                console.log(res)
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
          }
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
        path: "/clm/client"
      })
    },
    handleShowClientCom(data) {
      this.$router.push({
        path: "/clm/client-com-show/" + data.comId
      })
    },
    handleEditClientCom(data) {
      this.$router.push({
        path: "/clm/client-com-edit/" + data.comId
      })
    },
    handleCreateClientCom(data) {
      this.$router.push({
        path: "/clm/client-com-create"
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
