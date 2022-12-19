<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleCreate"
      >新增联系人</el-button>
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
      <el-table-column align="center" prop="com" label="客户公司" />
      <el-table-column align="center" label="角色" width="120">
        <template slot-scope="scope">
          {{ scope.row.role.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleShow(scope)"
          >查看</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'新增用户'">
      <el-form :model="user" label-width="80px" label-position="left" :rules="rules">
        <el-form-item label="登录名" prop="username">
          <el-input v-model="user.username" placeholder="" width="120" />
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
        <el-form-item label="客户公司" prop="email">
          <el-input v-model="user.com" placeholder="" width="120" />
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
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" size="small" plain @click="confirmUser">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]
import { addUser, deleteUser, getClientsByPageAndOwner, updateUser } from "@/api/user"
import { getRoles } from "@/api/role"
import methods from "@/views/transactionManagement/detection/pub_methods/validate"

export default {
  data() {
    return {
      rules: methods.userValidate,
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      user: {
        role: {
          id: -1,
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
      const res = await getClientsByPageAndOwner({
        pageNo: this.pagination.currPage,
        pageSize: this.pagination.pageSize,
        role: '客户'
      })
      console.log(res)
      this.userList = res.data.data
      this.pagination.currPage = res.data.pageNo
      this.pagination.pageSize = res.data.pageSize
      this.pagination.pageTotal = res.data.totalCount
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = []
      for (const role of res.data) {
        if (role.name === '客户') {
          this.rolesList.push(role)
        }
      }
    },
    async confirmUser() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await updateUser(this.user.id, this.user)
      } else {
        if (this.user.role == null || this.user.role.id == null) {
          this.$message({
            type: 'warning',
            message: '属性不能为空！'
          })
          return
        }
        await addUser(this.user)
      }
      await this.getUsers()

      // const { name } = this.user.username
      this.dialogVisible = false
      this.$notify({
        title: '成功',
        dangerouslyUseHTMLString: true,
        // message: `
        //     <div>登录名: ${name}</div>
        //   `,
        type: 'success'
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
    handleCreate() {
      this.$router.push({
        path: "/clm/client-create"
      })
    },
    handleShow(scope) {
      this.$router.push({
        path: "/clm/client-show/" + scope.row.id
      })
    },
    handleEdit(scope) {
      this.$router.push({
        path: "/clm/client-edit/" + scope.row.id
      })
    }
  }
}
</script>
