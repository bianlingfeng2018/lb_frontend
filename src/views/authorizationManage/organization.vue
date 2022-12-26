<template>
  <div class="app-container ohn">
    <div class="lb-flex lb-flex-bw">
      <el-button type="primary" plain size="small" @click="handleAdd">添加子部门
      </el-button>
    </div>
    <el-table v-loading="tableLoading" :data="routes" stripe border style="width: 100%" class="mt8">
      <el-table-column align="center" prop="name" label="下级部门" />
      <el-table-column align="center" prop="path" label="负责人" />
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain @click="handleEdit(scope)">编辑
          </el-button>
          <el-button size="small" plain @click="handleDelete(scope)">设置负责人</el-button>
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

    <!--弹窗  添加部门-->
    <el-dialog :visible.sync="dialogVisible" title="添加部门">
      <el-form :model="creditInfo" label-width="80px" label-position="left">
        <el-form-item label="所属部门">
          <el-select v-model="creditInfo.list" placeholder="请选择" style="display: block">
            <el-option v-for="item in comList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="route.name" placeholder="" />
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>

    <!--弹窗  设置负责人-->
    <el-dialog :visible.sync="dialogVisible_check" title="设置负责人">
      <el-form
        ref="auditRulesForm"
        :model="creditInfo"
        :rules="auditRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="负责人">
          <el-select v-model="creditInfo" placeholder="请选择" style="display: block">
            <el-option v-for="item in comList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
        <el-button type="primary" size="small" plain @click="setCreditInfo">确认</el-button>
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
  name: "OrganizationList",
  data() {
    return {
      dialogVisible: false,
      dialogVisible_check: false,
      dialogType: 'new',
      checkStrictly: false,
      creditInfo: [],
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
    // 设置负责人
    handleDelete({ $index, row }) {
      this.dialogVisible_check = true
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
