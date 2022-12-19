<template>
  <div v-loading="isLoading">
    <Search />
    <!--    <ShopHeader />-->
    <!--    <GoodsDetailNav />-->
    <div class="shop-item-path">
      <div class="shop-nav-container">
        <el-breadcrumb>
          <el-breadcrumb-item to="/mall">首页</el-breadcrumb-item>
          <el-breadcrumb-item to="/mall/goodsList">手机壳</el-breadcrumb-item>
          <el-breadcrumb-item>手机保护套</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 商品信息展示 -->
    <ShowGoods :goods-info="goodsInfo" />
    <!-- 商品详细展示 -->
    <ShowGoodsDetail :goods-info="goodsInfo" />
    <!--    <Spin v-if="isLoading" size="large" fix />-->
  </div>
</template>

<script>
import Search from '@/layout-mall/components/Search'
// import GoodsDetailNav from '@/layout-mall/components/nav/GoodsDetailNav'
// import ShopHeader from '@/layout-mall/components/header/ShopHeader'
import ShowGoods from '@/layout-mall/components/goodsDetail/ShowGoods'
import ShowGoodsDetail from '@/layout-mall/components/goodsDetail/ShowGoodsDetail'
import store from '@/layout-mall/vuex/store'
// import { mapState, mapActions } from 'vuex'
import { getGoodsById } from "@/api/mall"
export default {
  name: 'GoodsDetail',
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0)
    next()
  },
  components: {
    Search,
    // ShopHeader,
    // GoodsDetailNav,
    ShowGoods,
    ShowGoodsDetail
  },
  data() {
    return {
      isLoading: false,
      tmpId: -1,
      goodsInfo: {},
      tagsColor: ['blue', 'green', 'red', 'yellow']
    }
  },
  computed: {
    // ...mapState(['goodsInfo', 'isLoading'])
  },
  created() {
    this.tmpId = this.$route.params.id
    this.loadGoodsDetail(this.tmpId)
  },
  methods: {
    loadGoodsDetail(id) {
      console.log(id)
      getGoodsById(id)
        .then(res => {
          console.log(res)
          this.goodsInfo = res.data
        })
        .catch(reason => {
          console.log(reason)
        })
        .finally(() => {})
    }
    // ...mapActions(['loadGoodsInfo'])
  },
  store
}
</script>

<style scoped>
.shop-item-path {
  height: 38px;
  background-color: rgb(236, 235, 235);
  line-height: 38px;
  color: #2c2c2c;
}
.shop-nav-container {
  margin: 0px auto;
  width: 80%;
}
.el-breadcrumb {
  line-height: 3;
}
</style>
