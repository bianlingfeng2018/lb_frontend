<template>
  <div class="app-container ohn">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />客户公司信息</div>
    <el-divider content-position="left">基本信息</el-divider>
    <el-descriptions class="margin-top" title="" :column="3" size="small" border :label-style="labelStyle" :content-style="contentStyle">
      <el-descriptions-item>
        <template slot="label">{{ "客户编号" }}</template>
        {{ postForm.clientNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户中文名称" }}</template>
        {{ postForm.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户英文名称" }}</template>
        {{ postForm.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "简称" }}</template>
        {{ postForm.abbr }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "昵称" }}</template>
        {{ postForm.nickname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "行业分类" }}</template>
        {{ postForm.industClass }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户分类" }}</template>
        {{ postForm.clientClass }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户地址" }}</template>
        {{ postForm.addrDesc + postForm.invoiceAddr }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "英文地址" }}</template>
        {{ postForm.invoiceTaxNum }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户来源" }}</template>
        {{ postForm.source }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">{{ "客户状态" }}</template>
        <el-tag :type="getStatusType(postForm.status)">{{ postForm.status }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="联系人" name="contactTab">
        <contact :contact-list="contactList" :disabled="disabled" @onEdit="onEdit" />
      </el-tab-pane>
      <el-tab-pane label="发票抬头" name="invoiceTab">
        <invoice :invoice-list="postForm.assoInvoice" :disabled="disabled" />
      </el-tab-pane>
      <el-tab-pane label="关联公司" name="assComTab">
        <ass-com :ass-com-list="postForm.assoCom" :disabled="disabled" />
      </el-tab-pane>
      <el-tab-pane label="商机" name="oppTab" />
      <el-tab-pane label="报价单" name="quotationTab" />
    </el-tabs>
  </div>
</template>

<script>
import { getClientComById } from "@/api/clientCompany"
import Contact from "@/views/authorizationManage/client-com/components/Contact.vue"
import Invoice from "@/views/authorizationManage/client-com/components/Invoice.vue"
import AssCom from "@/views/authorizationManage/client-com/components/AssCom.vue"

const defaultForm = {
  clientNum: "",
  name: "",
  addr: "",
  abbr: "",
  nickname: "",
  source: "",
  assoCom: "",
  invoiceName: "",
  invoiceTaxNum: "",
  invoiceAddr: "",
  invoiceTel: "",
  invoiceBank: "",
  invoiceAcc: "",
  invoiceIsSpec: "",
  clientClass: "",
  industClass: "",
  clientLevel: ""
}

export default {
  components: { AssCom, Invoice, Contact },
  data() {
    return {
      // disabled
      disabled: true,
      // tab
      activeTab: 'contactTab',
      assoInvoice: undefined,
      assoCom: undefined,
      contactList: undefined,
      postForm: Object.assign({}, defaultForm),
      formLoading: false,
      submitLoading: false,
      loading: false,
      rules: {},
      labelStyle: { 'width': '150px' },
      contentStyle: { 'width': '150px' },
      // tmpId
      tmpId: undefined
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.tmpId = id
    this.fetchData(id)

    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getStatusType(status) {
      if (status === '一般客户') {
        return 'info'
      } else if (status === '重要客户') {
        return 'danger'
      } else if (status === '成交客户') {
        return 'success'
      } else {
        console.log('Unknown status.')
      }
    },
    fetchData: function(id) {
      getClientComById(Object.assign({}, { id: id }))
        .then(response => {
          console.log(response.data)
          this.postForm = response.data
          if (this.postForm.assoInvoice == null) {
            this.postForm.assoInvoice = []
          }
          if (this.postForm.assoCom == null) {
            this.postForm.assoCom = []
          }
          this.contactList = this.postForm.contactList
          console.log(this.postForm)
          // getContactsByComId({ id: id })
          //   .then(res => {
          //     console.log(res)
          //     this.contactList = res.data
          //   })
          //   .catch(reason => {
          //     console.log(reason)
          //   })
          //   .finally(() => {})

          // set tagsview title
          this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        }).catch(err => {
          console.log(err)
        })
    },
    setTagsViewTitle() {
      const title = '查看客户公司信息'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '查看客户公司信息'
      document.title = `${title} - ${this.postForm.id}`
    },
    goBack() {
      // this.$router.push({
      //   path: "/clm/p-cli-com"
      // })
      this.$router.go(-1)
    },
    onEdit() {
      this.$router.push({
        path: "/clm/client-com-edit/" + this.tmpId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-descriptions-item__label {
  white-space: pre-line;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
