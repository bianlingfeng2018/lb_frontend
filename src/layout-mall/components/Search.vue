<template>
  <div>
    <div class="container">
      <el-input v-model="sreachData" size="large" class="sreach" placeholder="输入你想查找的商品">
        <el-button slot="append" icon="el-icon-search" @click="sreach">搜索</el-button>
      </el-input>
      <el-tag v-for="(item, index) in promotionTags" :key="index" closable type="info" @close="closeTags(index)">
        <span @click="selectTags(index)">{{ item }}</span>
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      sreachData: '',
      promotionTags: ['买2免1', '领200神券', '199减100', '充100送20']
    }
  },
  methods: {
    closeTags(index) {
      this.promotionTags.splice(index, 1)
    },
    selectTags(index) {
      this.sreachData = this.promotionTags[index]
    },
    sreach() {
      this.$router.push({ path: '/mall/goodsList', query: { sreachData: this.sreachData }})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 460px;
}
.sreach {
  margin: 5px 0px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
