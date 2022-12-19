<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <!--              <el-tab-pane label="Activity" name="activity">-->
              <!--                <activity />-->
              <!--              </el-tab-pane>-->
              <el-tab-pane label="重置密码" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="电子签名" name="signature">
                <signature :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from './components/Account'
import Signature from './components/Signature'
import UserCard from './components/UserCard'
import { getUserByUsername } from "@/api/user"

export default {
  name: 'Profile',
  components: { Account, Signature, UserCard },
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        role: "",
        avatar: ""
      },
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserByUsername({ username: this.name })
        .then((res) => {
          const tmpUser = res.data
          this.user.username = tmpUser.username
          this.user.nickname = tmpUser.nickname
          this.user.role = tmpUser.role.name
          this.user.avatar = this.avatar
        })
        .catch((reason) => {
          console.log(reason)
        })
        .finally(() => {})
    }
  }
}
</script>
