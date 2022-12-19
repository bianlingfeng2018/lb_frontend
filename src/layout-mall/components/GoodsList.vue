<template>
  <div>
    <Search />
    <!--    <GoodsListNav />-->
    <div class="container">
      <div class="bread-crumb">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">
            <el-icon class="el-icon-s-home" /> 首页
          </el-breadcrumb-item>
          <el-breadcrumb-item to="/goodsList?sreachData=">
            <el-icon class="el-icon-shopping-bag-2" /> {{ searchItem }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品标签导航 -->
      <GoodsClassNav />
      <!-- 商品展示容器 -->
      <div v-loading="isLoading" class="goods-box">
        <!--        <div class="as-box">-->
        <!--          <div class="item-as-title">-->
        <!--            <span>商品精选</span>-->
        <!--            <span>广告</span>-->
        <!--          </div>-->
        <!--          <div v-for="(item,index) in asItems" :key="index" class="item-as">-->
        <!--            <div class="item-as-img">-->
        <!--              <img :src="item.img" alt="">-->
        <!--            </div>-->
        <!--            <div class="item-as-price">-->
        <!--              <span>-->
        <!--                <Icon type="social-yen text-danger" />-->
        <!--                <span class="seckill-price text-danger">{{ item.price }}</span>-->
        <!--              </span>-->
        <!--            </div>-->
        <!--            <div class="item-as-intro">-->
        <!--              <span>{{ item.intro }}</span>-->
        <!--            </div>-->
        <!--            <div class="item-as-selled">-->
        <!--              已有<span>{{ item.num }}</span>人评价-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="goods-list-box">
          <div class="goods-list-tool">
            <ul>
              <li v-for="(item,index) in goodsTool" :key="index" @click="orderBy(item.en, index)"><span :class="{ 'goods-list-tool-active': isAction[index]}">{{ item.title }} <el-icon :class="icon[index]" /></span></li>
            </ul>
          </div>
          <div class="goods-list">
            <div v-for="(item, index) in orderGoodsList" :key="index" class="goods-show-info">
              <div class="goods-show-img">
                <router-link :to="'/mall/goodsDetail/' + item.id"><img height="150vh" width="150vw" :src="getFileBlobUrl(item.imageList1[0])"></router-link>
              </div>
              <div class="goods-show-price">
                <span>
                  <span>￥</span>
                  <span class="seckill-price text-danger">{{ item.price }}</span>
                </span>
              </div>
              <div class="goods-show-detail">
                <span>{{ item.goodsName }}</span>
              </div>
              <div class="goods-show-num">
                已有<span>{{ item.remarks }}</span>人评价
              </div>
              <div class="goods-show-seller">
                <span>{{ item.shopName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-page">
        <!--        <Page :total="100" show-sizer />-->
        <el-pagination
          class="fr mt20"
          :current-page="pagination.currPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.pageTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!--    <Spin v-if="isLoading" size="large" fix />-->
  </div>
</template>

<script>
import Search from '@/layout-mall/components/Search'
// import GoodsListNav from '@/layout-mall/components/nav/GoodsListNav'
import GoodsClassNav from '@/layout-mall/components/nav/GoodsClassNav'
import config from "@/utils/config"
// import store from '@/layout-mall/vuex/store'
// import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
const { prefix } = config[process.env.NODE_ENV]

export default {
  name: 'GoodsList',
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0)
    next()
  },
  components: {
    Search,
    // GoodsListNav,
    GoodsClassNav
  },
  data() {
    return {
      isLoading: false,
      orderGoodsList: [],
      pagination: {
        currPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      searchItem: '',
      isAction: [true, false, false],
      icon: ['el-icon-arrow-up', 'el-icon-arrow-down', 'el-icon-arrow-down'],
      goodsTool: [
        { title: '综合', en: 'sale' },
        { title: '评论数', en: 'remarks' },
        { title: '价格', en: 'price' }
      ]
    }
  },
  computed: {
    // ...mapState(['asItems', 'isLoading'])
    // ...mapGetters(['orderGoodsList'])
  },
  created() {
    this.loadGoodsList()
  },
  mounted() {
    this.searchItem = this.$route.query.sreachData
  },
  methods: {
    getFileBlobUrl(file) {
      console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    loadGoodsList() {
      this.isLoading = true
      const queryParam = {
        pageNum: this.pagination.currPage,
        pageSize: this.pagination.pageSize
      }
      this.$store
        .dispatch("mall/getGoodsPage", queryParam)
        .then((res) => {
          const { data, success, errorMessage } = res
          if (success) {
            console.log(data)
            this.orderGoodsList = data.list
            this.pagination.currPage = data.pageNum
            this.pagination.pageTotal = data.total
          } else {
            this.$message.error(errorMessage)
          }
        })
        .catch(() => {
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // ...mapActions(['loadGoodsList']),
    // ...mapMutations(['SET_GOODS_ORDER_BY']),
    orderBy(data, index) {
      console.log(data)
      this.icon = ['el-icon-arrow-down', 'el-icon-arrow-down', 'el-icon-arrow-down']
      this.isAction = [false, false, false]
      this.isAction[index] = true
      this.icon[index] = 'el-icon-arrow-up'
      this.SET_GOODS_ORDER_BY(data)
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      // fetch data
    },
    handleCurrentChange(val) {
      this.pagination.currPage = val
      // fetch data
    }
  }
  // store
}
</script>

<style scoped>
ul {
  margin: 0;
}
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}
.text-danger {
  color: #A94442;
}
.seckill-price{
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
.goods-box {
  display: flex;
}
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}
.item-as-title{
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px;
}
.item-as-title span:first-child{
  margin-left: 20px;
}
.item-as-title span:last-child{
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}
.item-as{
  width: 160px;
  margin: 18px auto;
}
.item-as-img{
  width: 160px;
  height: 160px;
  margin: 0px auto;
}
.item-as-price span{
  font-size: 18px;
}
.item-as-intro{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled span{
  color: #005AA0;
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  /*margin-left: 15px;*/
  /*width: calc(100% - 215px);*/
  width: 100%;
}
.goods-list-tool{
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1;
}
.goods-list-tool ul{
  padding-left: 15px;
  list-style: none;
}
.goods-list-tool li{
  cursor: pointer;
  float: left;
}
.goods-list-tool span{
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}
.goods-list-tool span:hover{
  border: 1px solid #E4393C;
}
.goods-list-tool i:hover{
  color: #E4393C;
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.goods-show-info{
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}
.goods-show-info:hover{
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}
.goods-show-price{
  margin-top: 6px;
}
.goods-show-detail{
  font-size: 12px;
  margin: 6px 0px;
}
.goods-show-num{
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}
.goods-show-num span{
  color: #005AA0;
  font-weight: bold;
}
.goods-show-seller{
  font-size: 12px;
  color:#E4393C;
}
.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
/* ---------------商品栏结束------------------- */
</style>
