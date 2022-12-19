<template>
  <div class="app-container ohn">
    <div class="f1 pointer" @click="goBack()"><i class="el-icon-arrow-left" />客户公司信息</div>
    <el-form
      ref="postForm"
      v-loading="formLoading"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="120px"
      :disabled="disabled"
    >
      <!--      <el-form-item :label="'客户编号'" prop="clientNum">-->
      <!--        <el-input-->
      <!--          v-model.number="postForm.clientNum"-->
      <!--          placeholder="请输入客户编号"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item :label="'客户中文名称'" prop="name">
        <el-input
          v-model.number="postForm.name"
          placeholder="请输入客户中文名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'客户英文名称'" prop="enName">
        <el-input
          v-model.number="postForm.enName"
          placeholder="请输入客户英文名称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'简称'" prop="abbr">
        <el-input
          v-model.number="postForm.abbr"
          placeholder="请输入简称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item :label="'昵称'" prop="nickname">
        <el-input
          v-model.number="postForm.nickname"
          placeholder="请输入昵称"
          clearable
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="行业分类" prop="email">
        <el-select v-model="postForm.industClass" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in industryList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户分类" prop="email">
        <el-select v-model="postForm.clientClass" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in typeList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="'客户地址'" prop="addr">
        <async-address ref="addr" :hide-area="false" :hide-city="false" :address-code="postForm.addr" />
      </el-form-item>
      <el-form-item :label="''" prop="invoiceAddr">
        <el-input
          v-model="postForm.invoiceAddr"
          placeholder="请输入中文地址"
          clearable
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item :label="''" prop="invoiceTaxNum">
        <el-input
          v-model="postForm.invoiceTaxNum"
          placeholder="请输入英文地址"
          clearable
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="客户来源" prop="email">
        <el-select v-model="postForm.source" placeholder="请选择" style="display: block; width: 240px">
          <el-option
            v-for="item in sourceList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="客户状态" prop="email">-->
      <!--        <el-select v-model="postForm.status" placeholder="请选择" style="display: block; width: 240px">-->
      <!--          <el-option-->
      <!--            v-for="item in statusList"-->
      <!--            :key="item"-->
      <!--            :label="item"-->
      <!--            :value="item"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'关联公司名称'" prop="assoCom">-->
      <!--        <el-input-->
      <!--          v-model.number="postForm.assoCom"-->
      <!--          placeholder="请输入关联公司名称"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'客户状态'" prop="clientLevel">-->
      <!--        <el-input-->
      <!--          v-model.number="postForm.clientLevel"-->
      <!--          placeholder="请输入客户等级"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'客户等级'" prop="clientLevel">-->
      <!--        <el-input-->
      <!--          v-model.number="postForm.clientLevel"-->
      <!--          placeholder="请输入客户等级"-->
      <!--          clearable-->
      <!--          style="width: 240px"-->
      <!--        />-->
      <!--      </el-form-item>-->

      <!--      <el-divider content-position="left">联系人</el-divider>-->
      <!--      <el-tag-->
      <!--        v-for="contact in contactList"-->
      <!--        :key="contact.id"-->
      <!--        :closable="false"-->
      <!--        @close="onTagClose"-->
      <!--        @click="onTagClick(contact)"-->
      <!--      >-->
      <!--        {{ contact.nickname }}-->
      <!--      </el-tag>-->
      <!--      <el-link style="margin-left: 10px" @click="onAddTag">+ 添加联系人</el-link>-->

      <p />
    </el-form>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="联系人" name="contactTab">
        <contact ref="contact" :contact-list="contactList" />
      </el-tab-pane>
      <el-tab-pane label="发票抬头" name="invoiceTab">
        <invoice ref="assInvoice" :invoice-list="postForm.assoInvoice" />
      </el-tab-pane>
      <el-tab-pane label="关联公司" name="assComTab">
        <ass-com ref="assCom" :ass-com-list="postForm.assoCom" />
      </el-tab-pane>
      <el-tab-pane label="商机" name="oppTab" />
      <el-tab-pane label="报价单" name="quotationTab" />
    </el-tabs>
    <div class="">
      <br>
      <el-button
        type="primary"
        @click="submitForm('postForm')"
      >保存</el-button>
      <el-button @click="resetForm('postForm')">重置</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { checkClientNameExist, getClientComById } from "@/api/clientCompany"
import Contact from "@/views/authorizationManage/client-com/components/Contact.vue"
import Invoice from "@/views/authorizationManage/client-com/components/Invoice.vue"
import AssCom from "@/views/authorizationManage/client-com/components/AssCom.vue"
import { deepClone } from "@/utils"
import AsyncAddress from "@/views/authorizationManage/client-com/components/AsyncAddress.vue"

const defaultAssComTable = {
  title: '',
  table: {
    attrs: [
      { name: "assComName", desc: "关联公司名称" },
      { name: "contact", desc: "联系人" },
      { name: "tel", desc: "联系电话" }
    ],
    items: [
    ]
  }
}

const defaultInvoiceTable = {
  title: '',
  table: {
    attrs: [
      { name: "invoiceName", desc: "单位名称" },
      { name: "invoiceTaxNum", desc: "纳税人识别号" },
      { name: "invoiceAddr", desc: "公司地址" },
      { name: "invoiceTel", desc: "公司电话" },
      { name: "invoiceBank", desc: "公司开户行" },
      { name: "invoiceAcc", desc: "开户行账号" }
    ],
    items: [
    ]
  }
}
const defaultForm = {
  clientNum: "",
  name: "",
  addr: "",
  abbr: "",
  nickname: "",
  source: "",
  invoiceName: "",
  invoiceTaxNum: "",
  invoiceAddr: "",
  invoiceTel: "",
  invoiceBank: "",
  invoiceAcc: "",
  invoiceIsSpec: "",
  clientClass: "",
  industClass: "",
  clientLevel: "",
  assoInvoice: [defaultInvoiceTable],
  assoCom: [defaultAssComTable]
}

export default {
  components: { AsyncAddress, AssCom, Invoice, Contact },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkValueNameIfExist = (rule, value, callback) => {
      if (value) {
        this.validateHas(value) // 验证方法
      }
      callback()
    }
    return {
      // 表单
      industryList: ["服装"],
      typeList: ["工厂", "贸易公司", "电商平台", "国外买家", "国内品牌商", "电商商家"],
      statusList: ["成交客户", "重要客户", "一般客户"],
      sourceList: ["客户介绍", "百度推广", "电话营销", "陌生拜访", "展会"],
      // disabled
      disabled: false,
      // tab
      activeTab: 'contactTab',
      contactList: [
        {}
      ],
      postForm: Object.assign({}, defaultForm),
      formLoading: false,
      submitLoading: false,
      loading: false,
      rules: {
        name: [
          { required: true, message: '属性不能为空', trigger: 'blur', validator: checkValueNameIfExist }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    validateHas() {
      checkClientNameExist({ id: this.postForm.id, name: this.postForm.name })
        .then(res => {
          console.log(res.data)
          if (res.data === true) {
            this.$message.error('客户名已存在')
          }
        })
        .catch(reason => {
          console.log(reason)
        })
    },
    onAddTag() {
      console.log("onAddTag")
    },
    onTagClose() {
      console.log("onTagClose")
    },
    fetchData: function(id) {
      getClientComById(Object.assign({}, { id: id }))
        .then(response => {
          console.log(response.data)
          this.postForm = response.data
          if (this.postForm.assoInvoice == null) {
            this.postForm.assoInvoice = [deepClone(defaultInvoiceTable)]
          }
          if (this.postForm.assoCom == null) {
            this.postForm.assoCom = [deepClone(defaultAssComTable)]
          }
          this.contactList = this.postForm.contactList
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
      const title = '编辑客户公司信息'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑客户公司信息'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm(formName) {
      const _isEdit = this.isEdit
      // console.log(_isEdit)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 子组件校验
          const validate = this.$refs.contact.validateForm()
          console.log(validate)
          if (!validate) {
            this.$message.warning('请补全信息')
            return false
          }
          // 组装数据
          const postForm = deepClone(this.postForm)
          if (!_isEdit) {
            // 客户编号：自动生成，规则：LTI + CU + 年 + 月 +日 + 4位数
            const d = new Date()
            const t = '' + d.getTime()
            postForm.clientNum = 'LTI' + 'CU' + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + t.substring(t.length - 4)
            console.log(postForm.clientNum)
          }
          postForm.assoCom = JSON.stringify(this.$refs.assCom.getData())
          postForm.assoInvoice = JSON.stringify(this.$refs.assInvoice.getData())
          console.log(this.contactList)
          for (const contact of this.contactList) {
            const name = contact.username
            if (name == null || name.trim().length === 0) {
              this.$message.warning('登陆名不能为空')
              return false
            }
          }
          postForm.contactList = this.contactList
          // postForm.status = '一般客户'
          postForm.addr = this.$refs.addr.getData()
          console.log(postForm)
          // 请求后端
          this.formLoading = true
          this.$store
            .dispatch(
              _isEdit
                ? 'clientCompany/updateClientCom'
                : 'clientCompany/saveClientCom',
              postForm)
            .then((res) => {
              const { data, success, errorMessage } = res
              if (success) {
                this.$refs[formName].resetFields()
                this.$message.success(data.msg)
                this.$router.push({
                  path: "/clm/m-cli-com"
                })
              } else {
                this.$message.error(errorMessage)
              }
            })
            .catch(() => {})
            .finally(() => {
              this.formLoading = false
            })
        } else {
          this.$message.warning('请补全信息')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goBack() {
      // this.$router.push({
      //   path: "/clm/m-cli-com"
      // })
      this.$router.go(-1)
    },
    onTagClick(data) {
      this.$router.push({
        path: "/clm/client-show/" + data.id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.transaction-box {
  .el-form .el-form-item__label {
    background-color: red;
    line-height: 20px !important;
  }
  .el-form-item--medium .el-form-item__label {
    line-height: 20px !important;
  }
  .remark-content {
    font-size: 12px;
    color: #808080;
    line-height: 20px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag {
  cursor: pointer;
}
</style>

