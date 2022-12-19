<template>
  <div class="app-container ohn">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />查看联系人信息</div>
    <el-divider content-position="left">基本信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border>
      <el-descriptions-item>
        <template slot="label">{{ "登录名" }}</template>
        {{ postForm.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "姓名" }}</template>
        {{ postForm.nickname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "手机号" }}</template>
        {{ postForm.phoneNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "邮箱" }}</template>
        {{ postForm.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "角色" }}</template>
        {{ roleName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户公司" }}</template>
        {{ postForm.com }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">其他信息</el-divider>
    <my-flex-table ref="myFlexTable" :editable="false" :flex-obj="postForm.flexObj" />
    <br>
  </div>
</template>

<script>
import { getUserById } from "@/api/user"
import MyFlexTable from "@/views/components/MyFlexTable"
import methods from "@/views/transactionManagement/detection/pub_methods/validate"
import { getRoles } from "@/api/role"
import { queryClientComList } from "@/api/clientCompany"

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
  data() {
    return {
      tmpUserId: -1,
      postForm: Object.assign({}, defaultForm),
      rolesList: [],
      clientComList: Object.assign({}, defaultClientComList),
      formLoading: false,
      submitLoading: false,
      loading: false,
      rules: methods.userValidate,
      roleName: ""
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.tmpUserId = id
    this.fetchData(id)

    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData: async function(id) {
      try {
        // 获取所有客户（公司）
        const res1 = await queryClientComList()
        this.clientComList = res1.data

        // 获取所有角色
        const res2 = await getRoles()
        this.rolesList = []
        for (const role of res2.data) {
          if (role.name === '客户') {
            this.rolesList.push(role)
          }
        }

        // 根据客户（公司）id获取信息
        const res3 = await getUserById({ id: id })
        console.log(res3.data)
        this.postForm = res3.data
        if (this.postForm.flexObj == null || this.postForm.flexObj.length === 0) {
          this.postForm.flexObj = flexObjTmp
        }
        if (this.postForm.role && this.postForm.role.id) {
          const id = this.postForm.role.id
          for (const role of this.rolesList) {
            if (role.id === id) {
              this.roleName = role.name
              break
            }
          }
        }

        // 设置Title
        this.setTagsViewTitle()
        this.setPageTitle()
      } catch (reason) {
        console.log(reason)
      } finally {
        console.log()
      }
    },
    setTagsViewTitle() {
      const title = '查看联系人信息'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看联系人信息'
      document.title = `${title} - ${this.postForm.id}`
    },
    goBack() {
      this.$router.push({
        path: "/clm/client"
      })
    }
  }
}
</script>
<style scoped>
/deep/ .el-descriptions-item__label {
  white-space: pre-line;
}
</style>
