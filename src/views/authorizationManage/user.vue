<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleAdd"
      >新增员工</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="userList"
      stripe
      border
      style="width: 100%"
      class="mt8"
    >
      <el-table-column align="center" label="序号" width="120" type="index" />
      <el-table-column align="center" prop="username" label="登录名" width="120" />
      <el-table-column align="center" prop="nickname" label="姓名" />
      <el-table-column align="center" prop="phoneNum" label="手机号" />
      <el-table-column align="center" prop="email" label="邮箱" />
      <!--      <el-table-column align="center" prop="com" label="客户公司" />-->
      <el-table-column align="center" label="角色" width="120">
        <template slot-scope="scope">
          {{ scope.row.role.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="com" label="所属公司" />
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleEdit(scope)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            plain
            @click="handleDelete(scope)"
          >删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑员工':'新增员工'">
      <el-form
        ref="postForm"
        :inline="false"
        :model="user"
        :rules="rules"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="登录名" prop="username">
          <el-input
            v-model="user.username"
            placeholder=""
            width="120"
          />
        </el-form-item>
        <el-form-item v-if="dialogType==='new'" label="登录密码" prop="password">
          <el-input v-model="user.password" placeholder="" width="120" show-password />
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="user.nickname" placeholder="" width="120" />
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="user.phoneNum" placeholder="" width="120" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" placeholder="" width="120" />
        </el-form-item>
        <el-form-item label="角色" prop="role.id">
          <el-select v-model="user.role.id" placeholder="请选择" style="display: block">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属公司" prop="email">
          <el-select v-model="user.com" placeholder="请选择" style="display: block">
            <el-option
              v-for="item in comList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" size="small" plain @click="confirmUser('postForm')">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/utils/config"
import { deepClone } from "@/utils"
import { addUser, deleteUser, getEmployeeByPage, updateUser } from "@/api/user"
import { getRoles } from "@/api/role"
import methods from "@/views/transactionManagement/detection/pub_methods/validate"

const { prefix } = config[process.env.NODE_ENV]

const defaultUser = {
  username: null,
  nickname: null,
  phoneNum: null,
  email: null,
  role: {
    id: null,
    name: null
  }
}

export default {
  name: "UserList",
  data() {
    return {
      rules: methods.userValidate,
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      user: {
        username: '',
        password: '',
        nickname: '',
        phoneNum: '',
        email: '',
        com: '',
        role: {
          id: undefined,
          name: undefined
        }
      },
      prefix: prefix,
      tableLoading: false,
      formInline: {
        name: "",
        encryptionKey: ""
      },
      userList: [],
      rolesList: [],
      comList: ["立标广州", "立标宁波", "立标上海"],
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  created() {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getUsers()
    },
    async getUsers() {
      const res = await getEmployeeByPage({
        pageNo: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      })
      console.log(res)
      this.userList = res.data.data
      this.pagination.currPage = res.data.pageNo
      this.pagination.pageSize = res.data.pageSize
      this.pagination.pageTotal = res.data.totalCount
    },
    async getRoles() {
      // const res = await getRoles()
      // this.rolesList = res.data
      const res = await getRoles()
      this.rolesList = []
      for (const role of res.data) {
        if (role.name !== '客户') {
          this.rolesList.push(role)
        }
      }
    },
    confirmUser(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const isEdit = this.dialogType === 'edit'
          if (isEdit) {
            await updateUser(this.user.id, this.user)
          } else {
            await addUser(this.user)
          }
          await this.getUsers()

          const name = this.user.username
          this.dialogVisible = false
          this.$notify({
            title: '成功',
            dangerouslyUseHTMLString: true,
            message: `
                <div>登录名: ${name}</div>
              `,
            type: 'success'
          })
        } else { console.log('error') }
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认删除权限吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteUser(row.id)
          await this.getUsers()
          // this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleAdd() {
      this.user = Object.assign({}, defaultUser)
      this.user.role.id = null
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.user = deepClone(scope.row)
    }
  }
}
</script>
