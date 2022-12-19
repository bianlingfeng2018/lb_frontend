<template>
  <div>
    <el-form
      v-if="invoiceList.length!==0"
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="120px"
    >
      <my-flex-table-simple ref="myFlexTable" :editable="!disabled" :flex-obj="invoiceList" />
    </el-form>
    <p v-else>暂未添加发票抬头</p>
  </div>

</template>

<script>

import MyFlexTableSimple from "@/views/components/MyFlexTableSimple.vue"
// const invFlexObjTemp = {
//   title: "",
//   table: {
//     attrs: [
//       { name: "invoiceName", desc: "单位名称" },
//       { name: "invoiceTaxNum", desc: "纳税人识别号" },
//       { name: "invoiceAddr", desc: "公司地址" },
//       { name: "invoiceTel", desc: "公司电话" },
//       { name: "invoiceBank", desc: "公司开户行" },
//       { name: "invoiceAcc", desc: "开户行账号" }
//     ],
//     items: [
//       {
//         "invoiceName": "开封乐禾供应链管理服务有限公司",
//         "invoiceTaxNum": "91410205MA9FT1118Q",
//         "invoiceAddr": "河南省开封市禹王台区南郊乡品国际物流中心B区08栋034号",
//         "invoiceTel": "0371-22321361",
//         "invoiceBank": "中国银行开封西环路支行",
//         "invoiceAcc": "253372388430"
//       }
//     ]
//   }
// }
export default {
  components: { MyFlexTableSimple },
  props: {
    invoiceList: {
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
