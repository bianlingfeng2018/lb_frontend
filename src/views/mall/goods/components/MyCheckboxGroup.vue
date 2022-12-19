<template>
  <div>
    <el-checkbox
      v-model="checkAll"
      :label="label"
      class="h8"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      <!--      <div style="margin: 15px 0;" />-->
      <span style="font-weight: bold;">{{ label }}</span>
    </el-checkbox>
    <el-checkbox-group
      v-model="checked"
      style="width: 68vw"
      @change="handleCheckChange"
    >
      <el-checkbox
        v-for="(ti, i) in items"
        :key="i"
        :label="getLabel(ti)"
        class="h8"
      >{{ ti.name }} ￥{{ ti.price }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>

export default {
  name: "MyCheckboxGroup",
  model: {
    // 需要双向绑定的 props 变量名称，也就是父组件通过 v-model 与子组件双向绑定的变量
    prop: 'checkedList',
    // 定义由 $emit 传递变量的名称
    event: 'newCheckedList'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: function _default() {
        return []
      }
    },
    checkedList: {
      type: Array,
      default: function _default() {
        return []
      }
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      checked: this.checkedList
    }
  },
  watch: {
    // 监听 checked 临时变量，如果临时变量发生变化，那么通过 $emit 将新的值传递给父组件
    checked(value) {
      console.log('子组件值发生改变：', this.checked)
      this.updateCheckboxStatus()
      // newCheckedList x需要和 model.event 定义的值一致
      this.$emit('newCheckedList', this.checked)
    }
  },
  created() {
    this.updateCheckboxStatus()
  },
  methods: {
    updateCheckboxStatus() {
      const checkedCount = this.checked.length
      this.checkAll = (checkedCount === this.items.length)
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length
    },
    handleCheckAllChange(val) {
      this.checked = (val ? this.items.map(item => this.getLabel(item)) : [])
      // this.isIndeterminate = false // 放在watch中监听
    },
    handleCheckChange(value) {
      // const checkedCount = value.length // 放在watch中监听
      // this.checkAll = (checkedCount === this.items.length)
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length
    },
    getLabel(item) {
      return item.id
    }
  }
}
</script>

<style scoped>
.h8 {
  min-width: 20vw;
  height: 30px;
}
</style>
