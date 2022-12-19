<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleAdd"
      >新增权限
      </el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="routes"
      stripe
      border
      style="width: 100%"
      class="mt8"
    >
      <!--      <el-table-column align="center" prop="id" label="编号" width="100" />-->
      <el-table-column align="center" label="序号" width="100" type="index" />
      <el-table-column align="center" prop="name" label="权限名称" width="150" />
      <el-table-column align="center" prop="path" label="权限路径" />
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleEdit(scope)"
          >编辑
          </el-button>
          <el-button type="danger" size="small" plain @click="handleDelete(scope)">删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑权限':'新增权限'">
      <el-form :model="route" label-width="80px" label-position="left">
        <el-form-item label="权限名称">
          <el-input v-model="route.name" placeholder="" />
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input
            v-model="route.path"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder=""
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="small" plain @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" size="small" plain @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/utils/config"
import { deepClone } from "@/utils"
import { addPermission, deletePermission, getRoutesByPage, updatePermission } from "@/api/permission"

const { prefix } = config[process.env.NODE_ENV]

const defaultRole = {
  key: 0,
  path: '/',
  title: ''
}

export default {
  name: "PermissionList",
  data() {
    return {
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      route: {},
      prefix: prefix,
      tableLoading: false,
      formInline: {
        name: "",
        encryptionKey: ""
      },
      routes: [],
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  created() {
    this.getRoutes()
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getRoutes()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getRoutes()
    },
    async getRoutes() {
      const res = await getRoutesByPage({
        pageNo: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      })
      console.log(res)
      this.routes = res.data.data
      this.pagination.currPage = res.data.pageNo
      this.pagination.pageSize = res.data.pageSize
      this.pagination.pageTotal = res.data.totalCount
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await updatePermission(this.route.id, this.route)
      } else {
        await addPermission(this.route)
      }
      await this.getRoutes()

      // const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: '成功',
        dangerouslyUseHTMLString: true,
        // message: `
        //     <div>Role Key: ${key}</div>
        //     <div>Role Name: ${name}</div>
        //     <div>Description: ${description}</div>
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
          await deletePermission(row.id)
          // this.rolesList.splice($index, 1)
          await this.getRoutes()
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleAdd() {
      this.route = Object.assign({}, defaultRole)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.route = deepClone(scope.row)
    }
  }
}
</script>
