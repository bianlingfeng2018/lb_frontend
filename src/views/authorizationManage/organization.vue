<template>
  <div class="parent">
    <el-tree class="left" :data="treesDatas"
             node-key="orgNo"
             ref="treeRef"
             :props="treesProps"
             @node-click="handleNodeClick"
             default-expand-all
             highlight-current
             :current-node-key="currentKey"
             :expand-on-click-node="false"/>
    <div class="right app-container ohn">
      <div class="lb-flex lb-flex-bw">
        <el-button type="primary" plain size="small" @click="handleAdd">添加子部门
        </el-button>
      </div>
      <el-table v-loading="tableLoading" :data="routes" stripe border style="width: 100%" class="mt8">
        <el-table-column align="center" prop="orgName" label="下级部门"/>
        <el-table-column align="center" prop="username" label="负责人"/>
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
      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑部门':'添加部门'">
        <el-form :model="route" label-width="80px" label-position="left">
          <el-form-item label="所属部门" >
            <el-input v-model="parentorgName" placeholder="" disabled/>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="route.orgName" placeholder=""/>
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
          label-width="100px"
          label-position="left" >
          <el-form-item label="负责人">
            <el-select v-model="creditInfo.personInCharge" placeholder="请选择" style="display: block">
                 <el-option v-for="item in comList" :key="item.id" :label="item.nickname" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button size="small" plain @click="dialogVisible_check = false">取消</el-button>
          <el-button type="primary" size="small" plain @click="handleConfirm">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import config from "@/utils/config"
import { deepClone } from "@/utils"
import { addOrg, getTreeList, getTreesPage, updateOrg } from "@/api/organizations"
import {
  getCustomerListWithPages
} from '@/api/cert'
const { prefix } = config[process.env.NODE_ENV]

export default {
  name: "OrganizationList",
  data() {
    return {
      treesDatas: [],
      currentKey: "",
      treesProps: {
        children: 'subOrgList',
        label: 'orgName',
        orgNo: 'orgNo'
      },
      dialogVisible: false,
      dialogVisible_check: false,
      dialogType: 'new',
      checkStrictly: false,
      creditInfo: {
        orgName:'',
        orgNo:'',
        personInCharge:'',
        requestId: Math.random().toString(24),
      },
      route: {
        orgName:'',
        parentOrgNo:'',
        requestId: Math.random().toString(24),
      },
      comList:[],
      parentorgName:'',
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
    this.getTreeDate()
    this.getComListDate()
  },
  methods: {
    async getTreeDate() {
      const res = await getTreesPage({
        requestId: Math.random().toString(24)
      })
      console.log(res)
      this.treesDatas = [res.subOrgList[0]]
      console.log(this.treesDatas[0].orgNo)
      //把当前选择的key设置到el-tree中
      this.currentKey=this.treesDatas[0].orgNo
      this.$nextTick(function () {
        this.$refs['treeRef'].setCurrentKey(this.currentKey)
        this.getListDate()
        this.route.parentOrgNo = this.currentKey
        this.parentorgName = this.treesDatas[0].orgName
      })
    },
    //获取负责人列表
    async getComListDate() {
      const res = await getCustomerListWithPages({
        page: '1',
        pageSize: "50"
      })
      console.log(res)
      this.comList = res.data.list
      console.log(this.comList)
    },
    async getListDate() {
      const res = await getTreeList({
        requestId: Math.random().toString(24),
        parentOrgNo: this.currentKey,
        page: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      })
      console.log(res)
      this.routes = res.dataList
      this.pagination.pageTotal = res.total
    },
    //添加子部门
    async confirmRole() {
      console.log(this.route)
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await updateOrg(this.route)
      } else {
        await addOrg(this.route)
      }
      await this.getListDate()
      await this.getTreeDate()
      this.dialogVisible = false
      this.$notify({
        title: '成功',
        dangerouslyUseHTMLString: true,
        message: `操作成功`,
        type: 'success'
      })
    },
    // 设置负责人
    async handleConfirm() {
      console.log(this.creditInfo)
      await updateOrg(this.creditInfo)
      await this.getListDate()
      this.dialogVisible_check = false
    },
    handleDelete(scope) {
      this.dialogVisible_check = true
      this.creditInfo = deepClone(scope.row)
    },
    handleAdd() {
      this.route.orgName = ""
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.route.orgName = ""
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.route = deepClone(scope.row)
    },

    handleNodeClick(data) {
      console.log(data)
      this.currentKey = data.orgNo
      this.getListDate()
      this.route.parentOrgNo = this.currentKey
      this.parentorgName = data.orgName
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getListDate()
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      this.getListDate()
    },
  }
}
</script>
<style>
  .parent {
    width: 100%;
    display: flex;
  }

  .left {
    width: 28%;
    padding: 15px;
  }

  .right {
    width: 100%; /*右侧初始化宽度*/
  }
</style>
