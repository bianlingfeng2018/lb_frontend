<template>
  <div>
    <div v-for="(obj, x) in flexObj" :key="'obj_'+x">
      <div v-if="editable" class="lb-flex lb-flex-bw">
        <el-button
          type="info"
          plain
          size="small"
          @click="addRowEvent(obj.table.attrs, 'tbl_'+x)"
        >添加+
        </el-button>
      </div>
      <vxe-table
        :ref="'tbl_'+x"
        border
        resizable
        :row-config="{ isHover: true }"
        :data="obj.table.items"
        :edit-config="editable ? { trigger: 'click', mode: 'row' } : undefined"
        class="mt8"
      >
        <vxe-column
          type="seq"
          :title="'序号'"
          width="60"
        />
        <vxe-column
          v-for="(attr, j) in obj.table.attrs"
          :key="'tbl_col_'+x+j"
          :field="attr.name"
          :title="attr.desc"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row[attr.name]" type="text" />
          </template>
        </vxe-column>
        <vxe-column v-if="editable" title="操作" width="80">
          <template #default="{ row }">
            <el-button
              type="text"
              status="primary"
              @click="deleteRowEvent(row, 'tbl_'+x)"
            >删除
            </el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { deepClone } from "@/utils"

export default {
  name: "MyFlexTableSimple",
  props: {
    flexObj: {
      type: Array,
      // default: () => {
      //   return []
      // }
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableTemp: {
        attrs: [
          { name: 'col_1', desc: '列1' }
        ],
        items: [
          { 'col_1': '值1' }
        ]
      },
      objTemp: {
        title: "标题1",
        table: {
          attrs: [
            { name: 'col_1', desc: '列1' }
          ],
          items: [
            { 'col_1': '值1' }
          ]
        }
      },
      dialogVisible: false,
      dialogType: 'new',
      dialogData: {
        attrs: []
      }
    }
  },
  created() {

  },
  methods: {
    // 获取数据
    getData() {
      for (let i = 0; i < this.flexObj.length; i++) {
        const table = this.flexObj[i].table
        const ref = 'tbl_' + i
        table.items = this.$refs[ref][0].getTableData().tableData
      }
      return this.flexObj
    },
    // 模板对像操作
    addChildEvent(obj) {
      obj.push(deepClone(this.objTemp))
    },
    deleteEvent(row, i) {
      this.$confirm("您确定要删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.splice(i, 1)
        })
        .catch((reason) => {
          console.log(reason)
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 动态表格操作
    editTableEvent(obj) {
      this.tmpTable = obj.table
      const table = deepClone(obj.table) // 编辑时需要用deepClone
      this.dialogData.attrs = table.attrs
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    confirmDialog() {
      const isEdit = this.dialogType === 'edit'
      const tableData = this.$refs.xTableDialog.getTableData()
      const attrs = tableData.tableData

      if (isEdit) {
        console.log('edit')
        this.tmpTable.attrs = attrs
      } else {
        console.log('new...')
      }

      this.dialogVisible = false
      this.dialogData.attrs = []
    },
    addAttributeEvent(row) {
      const tableData = this.$refs.xTableDialog.getTableData()
      const attrs = tableData.tableData
      const len = attrs.length
      console.log(len)
      const record = {
        name: 'col_' + (len + 1),
        desc: ''
      }
      this.$refs.xTableDialog.insertAt(record, row)
    },
    addRowEvent(attrs, ref) {
      console.log(attrs)
      const record = {}
      for (const attr of attrs) {
        record[attr.name] = ""
      }
      this.$refs[ref][0].insertAt(record, -1)
    },
    deleteRowEvent(row, ref) {
      this.$confirm("您确定要删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[ref][0].remove(row)
        })
        .catch((reason) => {
          console.log(reason)
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    removeUselessAttribute(ObjList, attr) {
      for (const obj of ObjList) {
        Reflect.deleteProperty(obj, attr)
        // delete obj._X_ROW_KEY
      }
    }
  }
}
</script>

<style scoped>

</style>
