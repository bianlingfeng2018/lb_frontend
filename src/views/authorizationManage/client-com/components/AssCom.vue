<template>
  <div>
    <el-form
      v-if="assComList.length!==0"
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="120px"
    >
      <my-flex-table-simple ref="myFlexTable" :editable="!disabled" :flex-obj="assComList" />
    </el-form>
    <p v-else>暂未添加关联公司</p>
  </div>

</template>

<script>

import MyFlexTableSimple from "@/views/components/MyFlexTableSimple.vue"
// const assFlexObjTemp = {
//   title: "",
//   table: {
//     attrs: [
//       { name: "assComName", desc: "关联公司名称" },
//       { name: "contact", desc: "联系人" },
//       { name: "tel", desc: "联系电话" }
//     ],
//     items: [
//       {
//         "assComName": "开封乐禾供应链管理服务有限公司",
//         "contact": "王经理",
//         "tel": "0371-22321361"
//       }
//     ]
//   }
// }
export default {
  components: { MyFlexTableSimple },
  props: {
    assComList: {
      type: Array,
      // required: true
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      postForm: {
        flexObj: []
      },
      rules: undefined,
      formLoading: false
    }
  },
  created() {
  },
  methods: {
    getData() {
      return this.$refs.myFlexTable.getData()
    }
  }
}
</script>
