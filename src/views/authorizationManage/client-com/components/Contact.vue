<template>
  <div>
    <div>
      <div
        v-if="contactList.length!==0"
      >
        <el-form
          v-for="(item, index) in contactList"
          :key="index"
          ref="postForm"
          v-loading="formLoading"
          class="mt36"
          :inline="true"
          status-icon
          :rules="rules"
          label-width="120px"
          :disabled="disabled"
          style="background: #FAFAFA; padding-top: 20px; margin-top: 10px"
          :model="item"
        >
          <p style="margin-top: 0; margin-right: 20px" align="right">
            <el-tag v-if="item.mainContact === '是'" type="danger" effect="dark">主联系人</el-tag>
          </p>
          <!--    <el-divider content-position="left">联系人信息</el-divider>-->
          <el-form-item :label="'登录名'" prop="username">
            <el-input
              v-model="item.username"
              placeholder="请输入登录名"
              clearable
              style="width: 240px"
              @input="handleNameInput(index)"
            />
          </el-form-item>
          <!--      <el-form-item v-if="!isEdit" :label="'密码'" prop="password">-->
          <!--        <el-input-->
          <!--          v-model="postForm.password"-->
          <!--          placeholder="请输入密码"-->
          <!--          style="width: 240px"-->
          <!--          show-password-->
          <!--        />-->
          <!--      </el-form-item>-->
          <el-form-item :label="'姓名'" prop="nickname">
            <el-input
              v-model="item.nickname"
              placeholder="请输入姓名"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item :label="'手机号'" prop="phoneNum">
            <el-input
              v-model.number="item.phoneNum"
              placeholder="请输入手机号"
              clearable
              style="width: 240px"
              @input="handlePoneNumInput(index)"
            />
          </el-form-item>
          <el-form-item :label="'邮箱'" prop="email">
            <el-input
              v-model="item.email"
              placeholder="请输入邮箱"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item :label="'电话'" prop="phone">
            <el-input
              v-model.number="item.phone"
              placeholder="请输入电话"
              clearable
              style="width: 240px"
              @input="handlePhoneNumInput(index)"
            />
          </el-form-item>
          <el-form-item label="决策角色" prop="decideRole">
            <el-select v-model="item.decideRole" placeholder="请选择" style="display: block; width: 240px">
              <el-option
                v-for="item in decideRoleList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="'部门'" prop="depart">
            <el-input
              v-model="item.depart"
              placeholder="请输入部门"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item :label="'职位'" prop="pos">
            <el-input
              v-model="item.pos"
              placeholder="请输入职位"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item :label="'工作状态'" prop="workState">
            <el-radio-group
              v-model="item.workState"
              style="width: 240px"
            >
              <el-radio label="在职" />
              <el-radio label="离职" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="'性别'" prop="sex">
            <el-radio-group
              v-model="item.sex"
              style="width: 240px"
            >
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="'生日'" prop="birthday">
            <el-input
              v-model="item.birthday"
              placeholder="请输入生日"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item :label="'主联系人'" prop="mainContact">
            <el-radio-group
              v-model="item.mainContact"
              style="width: 240px"
            >
              <el-radio label="是" />
              <el-radio label="否" />
            </el-radio-group>
          </el-form-item>
          <el-button
            v-if="!disabled"
            type="primary"
            @click="deleteContact(item, index)"
          >删除</el-button>
        </el-form>
        <p align="right">
          <el-button
            v-if="disabled"
            type="info"
            size="small"
            @click="handleEdit()"
          >编辑</el-button>
        </p>
      </div>
      <p v-else>暂未添加联系人</p>
    </div>
    <div v-if="!disabled" style="margin-top: 10px">
      <el-button
        type="primary"
        @click="addContact()"
      >新增联系人</el-button>
    </div>
  </div>

</template>

<script>

import { deleteUser } from "@/api/user"
import { checkContactNameExist, checkContactPhoneNumExist } from "@/api/clientCompany"

export default {
  props: {
    contactList: {
      type: Array,
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
    const checkPhoneNumIfExist = (rule, value, callback) => {
      if (value) {
        this.validatePhoneNumHas(value) // 验证方法
      }
      callback()
    }
    const checkNameIfExist = (rule, value, callback) => {
      if (value) {
        this.validateNameHas(value) // 验证方法
      }
      callback()
    }
    return {
      // 选中表单
      index: 0,
      postForm: {
      },
      decideRoleList: ["关键决策人", "辅助决策人", "普通角色"],
      rules: {
        username: [
          { required: true, message: '属性不能为空', trigger: 'blur', validator: checkNameIfExist }
        ],
        nickname: [
          { required: true, message: '属性不能为空', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '属性不能为空', trigger: 'blur', validator: checkPhoneNumIfExist }
        ],
        email: [
          { required: true, message: '属性不能为空', trigger: 'blur' }
        ],
        decideRole: [
          { required: true, message: '属性不能为空', trigger: 'blur' }
        ]
      },
      formLoading: false
    }
  },
  created() {
  },
  methods: {
    handleNameInput(index) {
      this.index = index
    },
    handlePoneNumInput(index) {
      this.index = index
    },
    validatePhoneNumHas() {
      const user = this.contactList[this.index]
      checkContactPhoneNumExist({ id: user.id, name: user.username, phoneNum: user.phoneNum })
        .then(res => {
          console.log(res.data)
          if (res.data === true) {
            this.$message.error('手机号已存在')
          }
        })
        .catch(reason => {
          console.log(reason)
        })
    },
    validateNameHas() {
      const user = this.contactList[this.index]
      checkContactNameExist({ id: user.id, username: user.username, phoneNum: user.phoneNum })
        .then(res => {
          console.log(res.data)
          if (res.data === true) {
            this.$message.error('登录名已存在')
          }
        })
        .catch(reason => {
          console.log(reason)
        })
    },
    validateForm() {
      let valid = false
      const refs = this.$refs['postForm']
      for (const ref of refs) {
        ref.validate((v) => {
          valid = v
        })
        if (!valid) {
          break
        }
      }
      return valid
    },
    addContact() {
      this.contactList.push({})
    },
    deleteContact(item, $index) {
      this.$confirm('确认删除联系人吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          if (item.id != null) {
            await deleteUser(item.id)
          }
          this.contactList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleEdit() {
      this.$emit('onEdit') // 发送事件
    },
    submit() {
      console.log('submit')
    }
  }
}
</script>
