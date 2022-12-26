<template>
  <div class="app-container">
    <el-button type="primary" size="small" plain @click="handleAddRole">新增角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="序号" width="100" type="index">
        <!--        <template slot-scope="scope">-->
        <!--          {{ scope.row.id }}-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain @click="handleEdit(scope)">编辑</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新增角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.name" placeholder="" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder=""
          />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
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
import path from 'path'
import { deepClone } from '@/utils'
import { addRole, deleteRole, getRolesByPage, updateRole } from '@/api/role'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
const routesArr = [
  {
    path: '/am',
    meta: {
      title: '授权中心'
    },
    children: [
      {
        meta: { title: '组织架构', role: ['/am/organization'] }
      },
      {
        meta: { title: '员工管理', role: ['/am/user'] }
      },
      {
        meta: { title: '角色管理', role: ['/am/role'] }
      },
      {
        meta: { title: '数据权限', role: ['/am/data'] }
      }
    ]
  },
  {
    meta: {
      title: '交易管理'
    },
    children: [
      {
        meta: {
          title: '检测交易'
        },
        children: [
          {
            meta: { title: '检测交易列表', role: ['/tm/detection/list'] }
          },
          {
            meta: { title: '创建检测交易', role: ['/tm/detection-create'] }
          },
          {
            meta: { title: '编辑检测交易', role: ['/tm/detection-edit/:id'] }
          },
          {
            meta: { title: '检测交易查看', role: ['/tm/detection/show/:id'] }
          },
          {
            meta: { title: '检测交易查看进度', role: ['/tm/detection/showall/:id'] }
          },
          {
            meta: { title: '检测交易分配客服', role: ['/tm/detection/as-cs'] }
          },
          {
            meta: { title: '报价单', role: ['/tm/detection/quotation'] },
            children: [
              {
                meta: { title: '报价单列表', role: ['/tm/detection/quotation/list'] }
              },
              {
                meta: { title: '新增报价', role: ['/tm/detection-quotation-create'] }
              },
              {
                meta: { title: '编辑报价单', role: ['/tm/detection-quotation-edit/:id'] }
              },
              {
                meta: { title: '查看报价单', role: ['/tm/detection/quotation/show/:id'] }
              },
              {
                meta: { title: '审核报价单', role: ['/tm/detection/quotation/audit/:id'] }
              }
            ]
          },
          {
            meta: { title: '申请单列表', role: ['/tm/detection/apply/list'] },
            children: [
              // {
              //   meta: { title: '申请单列表', role: ['/tm/detection/apply/list'] }
              // },
              {
                meta: { title: '创建申请单', role: ['/tm/detection-apply-create'] }
              },
              {
                meta: { title: '编辑申请单', role: ['/tm/detection-apply-edit/:id'] }
              },
              {
                meta: { title: '查看申请单', role: ['/tm/detection/apply/show/:id'] }
              },
              {
                meta: { title: '审核申请单', role: ['/tm/detection/apply/audit/:id'] }
              }
            ]
          },
          {
            meta: { title: '创建申请单', role: ['/tm/detection-apply-create'] }
          },
          {
            meta: { title: '编辑申请单', role: ['/tm/detection-apply-edit/:id'] }
          },
          {
            meta: { title: '查看申请单', role: ['/tm/detection/apply/show/:id'] }
          },
          {
            meta: { title: '审核申请单', role: ['/tm/detection/apply/audit/:id'] }
          },
          {
            meta: { title: '工作单', role: ['/tm/detection/worksheet'] },
            children: [
              {
                meta: { title: '工作单列表', role: ['/tm/detection/worksheet/list'] }
              },
              {
                meta: { title: '创建工作单', role: ['/tm/detection-worksheet-create'] }
              },
              {
                meta: { title: '编辑工作单', role: ['/tm/detection-worksheet-edit/:id'] }
              },
              {
                meta: { title: '查看工作单', role: ['/tm/detection/worksheet/show/:id'] }
              },
              {
                meta: { title: '审核工作单', role: ['/tm/detection/worksheet/audit/:id'] }
              }
            ]
          },
          {
            meta: { title: '原始记录单', role: ['/tm/detection/record'] },
            children: [
              {
                meta: { title: '原始记录单列表', role: ['/tm/detection/record/list'] }
              },
              {
                meta: { title: '查看原始记录单', role: ['/tm/detection/record/show/:id'] }
              }
            ]
          },
          {
            meta: { title: '检测报告单', role: ['/tm/detection/report'] },
            children: [
              {
                meta: { title: '报告单列表', role: ['/tm/detection/report/list'] }
              },
              {
                meta: { title: '创建报告单', role: ['/tm/detection-report-create'] }
              },
              {
                meta: { title: '编辑报告单', role: ['/tm/detection-report-edit/:id'] }
              },
              {
                meta: { title: '查看报告单', role: ['/tm/detection/report/show/:id'] }
              },
              {
                meta: { title: '编制报告单', role: ['/tm/detection/report/audit/:id'] }
              },
              {
                meta: { title: '审核报告单', role: ['/tm/detection/report/second-audit/:id'] }
              },
              {
                meta: { title: '批准报告单', role: ['/tm/detection/report/third-audit/:id'] }
              }
            ]
          }
        ]
      },
      // ************* 映射到二级菜单开始 *************

      // ************* 映射到二级菜单结束 *************
      {
        meta: { title: '检验交易', role: ['/tm/test'] }
      },
      {
        meta: { title: '认证交易', role: ['/tm/certification'] }
      }
    ]
  },
  {
    meta: {
      title: "客户管理"
    },
    children: [
      {
        meta: { title: "联系人列表", role: ["/clm/client"] }
      },
      {
        meta: { title: '创建客户', role: ['/clm/client-create'] }
      },
      {
        meta: { title: '编辑客户', role: ['/clm/client-edit/:id'] }
      },
      {
        meta: { title: '查看客户', role: ['/clm/client-show/:id'] }
      },
      {
        meta: { title: "所有客户", role: ["/clm/a-cli-com"] }
      },
      {
        meta: { title: "公共客户", role: ["/clm/p-cli-com"] }
      },
      {
        meta: { title: "我的客户", role: ["/clm/m-cli-com"] }
      },
      {
        meta: { title: '创建客户公司', role: ['/clm/client-com-create'] }
      },
      {
        meta: { title: '编辑客户公司', role: ['/clm/client-com-edit/:id'] }
      },
      {
        meta: { title: '查看客户公司', role: ['/clm/client-com-show/:id'] }
      },
      {
        meta: { title: '客户导出', role: ['/clm/cli-com-export'] }
      }
    ]
  },
  {
    meta: {
      title: "财务管理"
    },
    children: [
      {
        meta: { title: '记录查询', role: ['/fm/pay'] }
      },
      {
        meta: { title: '记录创建', role: ['/fm/pay-create'] }
      },
      {
        meta: { title: '记录编辑', role: ['/fm/pay-edit/:id'] }
      }
    ]
  }
]
export default {
  name: "RoleList",
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getRoles()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getRoles()
    },
    async getRoutes() {
      this.routes = this.generateRoutes(routesArr)
    },
    async getRoles() {
      const res = await getRolesByPage({
        pageNo: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      })
      console.log(res)
      this.rolesList = res.data.data
      this.pagination.currPage = res.data.pageNo
      this.pagination.pageSize = res.data.pageSize
      this.pagination.pageTotal = res.data.totalCount
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (const route of routes) {
        // skip some route
        // if (route.hidden) {
        //   continue
        // }
        const data = {
          path: route.meta && route.meta.role && route.meta.role[0],
          title: route.meta && route.meta.title
        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        if (!route.children) {
          data.push(route)
        }
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      // this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        // const routes = this.generateRoutes(this.role.routes)
        // this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        const routes = this.role.permission
          .map(per => {
            return {
              id: per.id,
              title: per.name,
              path: per.path
            }
          })
        this.$refs.tree.setCheckedNodes(routes)
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认删除角色吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          // this.rolesList.splice($index, 1)
          await this.getRoles()
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = route.path

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // this.role.routes = this.generateTree(deepClone(this.routes), '/', checkedKeys)

      console.log('checkedKeys')
      console.log(checkedKeys)
      const routes = this.generateTree(deepClone(this.routes), '/', checkedKeys)
      this.role.permission = this.generateArr(routes)
      console.log(this.role)
      if (isEdit) {
        await updateRole(this.role.id, this.role)
      } else {
        await addRole(this.role)
      }
      await this.getRoles()

      // const { desc, id, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: '成功',
        dangerouslyUseHTMLString: true,
        // message: `
        //     <div>Role Key: ${id}</div>
        //     <div>Role Name: ${name}</div>
        //     <div>Description: ${desc}</div>
        //   `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
