<template>
  <div>
    <div class="item-intro-show">
      <!--      <div class="item-intro-recommend">-->
      <!--        <div class="item-recommend-title">-->
      <!--          <p>店铺热销</p>-->
      <!--        </div>-->
      <!--        <div class="item-intro-recommend-column">-->
      <!--          <div v-for="(item, index) in goodsInfo.hot" :key="index" class="item-recommend-column">-->
      <!--            <div class="item-recommend-img">-->
      <!--              <img :src="item.img" alt="">-->
      <!--            </div>-->
      <!--            <div class="item-recommend-intro">-->
      <!--              <span>-->
      <!--                <span class="item-recommend-top-num">{{ index + 1 }}</span> 热销{{ item.sale }}件</span>-->
      <!--              <span class="item-recommend-price">￥{{ item.price.toFixed(2) }}</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div ref="itemIntroDetail" class="item-intro-detail">
        <div class="item-intro-nav item-tabs">
          <el-tabs>
            <el-tab-pane label="商品介绍">
              <div class="remarks-title">
                <span>商品介绍</span>
              </div>
              <p class="item-detail">{{ goodsInfo_.description }}</p>
              <div ref="itemIntroGoods" class="item-intro-img">
                <img v-for="(item,index) in goodsInfo_.imageList2" :key="index" :src="getUrl(item)" alt="">
              </div>
            </el-tab-pane>
            <el-tab-pane label="规格参数">
              <div class="remarks-title">
                <span>规格参数</span>
              </div>
              <div class="item-param-container">
                <!--                <span v-for="(item,index) in goodsInfo.param" :key="index" class="item-param-box">-->
                <!--                  <span class="item-param-title">{{ item.title }}: </span>-->
                <!--                  <span class="item-param-content">{{ item.content }}</span>-->
                <!--                </span>-->
                <span class="item-param-box">
                  <span class="item-param-title">产品编号: </span>
                  <span class="item-param-content">{{ goodsInfo_.goodsNum }}</span>
                </span>
                <span class="item-param-box">
                  <span class="item-param-title">产品名称: </span>
                  <span class="item-param-content">{{ goodsInfo_.goodsName }}</span>
                </span>

              </div>
            </el-tab-pane>
            <el-tab-pane label="售后保障">
              <ShowProductWarranty />
            </el-tab-pane>
            <!--            <el-tab-pane label="商品评价">-->
            <!--              <div class="remarks-container">-->
            <!--                <div class="remarks-title">-->
            <!--                  <span>商品评价</span>-->
            <!--                </div>-->
            <!--                <div class="remarks-analyse-box">-->
            <!--                  <div class="remarks-analyse-goods">-->
            <!--                    <i-circle :percent="goodsInfo.remarks.goodAnalyse" stroke-color="#e4393c">-->
            <!--                      <span class="remarks-analyse-num">{{ goodsInfo.remarks.goodAnalyse }}%</span>-->
            <!--                      <p class="remarks-analyse-title">好评率</p>-->
            <!--                    </i-circle>-->
            <!--                  </div>-->
            <!--                  <div class="remarks-analyse-tags">-->
            <!--                    <Tag v-for="(item,index) in goodsInfo.remarks.remarksTags" :key="index" checkable :color="tagsColor[index % 4]">{{ item }}</Tag>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="remarks-bar">-->
            <!--                  <span>追评({{ goodsInfo.remarks.remarksNumDetail[0] }})</span>-->
            <!--                  <span>好评({{ goodsInfo.remarks.remarksNumDetail[1] }})</span>-->
            <!--                  <span>中评({{ goodsInfo.remarks.remarksNumDetail[2] }})</span>-->
            <!--                  <span>差评({{ goodsInfo.remarks.remarksNumDetail[3] }})</span>-->
            <!--                </div>-->
            <!--                <div v-for="(item,index) in goodsInfo.remarks.detail" :key="index" class="remarks-box">-->
            <!--                  <div class="remarks-user">-->
            <!--                    <Avatar icon="person" />-->
            <!--                    <span class="remarks-user-name">{{ item.username }}</span>-->
            <!--                  </div>-->
            <!--                  <div class="remarks-content-box">-->
            <!--                    <p>-->
            <!--                      <Rate disabled :value="item.values" allow-half class="remarks-star" />-->
            <!--                    </p>-->
            <!--                    <p class="remarks-content">{{ item.content }}</p>-->
            <!--                    <p class="remarks-sub">-->
            <!--                      <span class="remarks-item">{{ item.goods }}</span>-->
            <!--                      <span class="remarks-time">{{ item.time }}</span>-->
            <!--                    </p>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="remarks-page">-->
            <!--                  <Page :total="40" size="small" show-elevator show-sizer />-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowProductWarranty from '@/layout-mall/components/goodsDetail/ShowProductWarranty'
import store from '@/layout-mall/vuex/store'
import { getFileBlobUrl } from "@/utils/simple-util"
// import { mapState } from 'vuex'
export default {
  name: 'ShowGoodsDetail',
  components: {
    ShowProductWarranty
  },
  props: {
    goodsInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tmpId: -1,
      goodsInfo_: {},
      tagsColor: ['blue', 'green', 'red', 'yellow']
    }
  },
  computed: {
    // ...mapState(['goodsInfo'])
  },
  watch: {
    goodsInfo: function(n) {
      this.goodsInfo_ = n
    }
  },
  // updated() {
  //   this.$nextTick(() => {
  //     setTimeout(this.changeHeight, 100)
  //     setTimeout(this.changeHeight, 1000)
  //     setTimeout(this.changeHeight, 3000)
  //     setTimeout(this.changeHeight, 5000)
  //     setTimeout(this.changeHeight, 10000)
  //     setTimeout(this.changeHeight, 15000)
  //     setTimeout(this.changeHeight, 20000)
  //     setTimeout(this.changeHeight, 25000)
  //     setTimeout(this.changeHeight, 30000)
  //     setTimeout(this.changeHeight, 50000)
  //   })
  // },
  methods: {
    getUrl(file) {
      return getFileBlobUrl(file)
    },
    changeHeight() {
      let heightCss = window.getComputedStyle(this.$refs.itemIntroGoods).height
      console.log(heightCss)
      heightCss = parseInt(heightCss.substr(0, heightCss.length - 2)) + 89
      this.$refs.itemIntroDetail.style.height = heightCss + 'px'
    }
  },
  store
}
</script>

<style scoped>
/***************商品详情介绍和推荐侧边栏开始***************/
.item-intro-show{
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-intro-recommend{
  width: 200px;
  display: flex;
  flex-direction: column;
}
.item-intro-recommend-column{
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #999;
}
.item-recommend-title{
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #fff;
  background-color: #E4393C;
  box-shadow: 0px 0px 5px #E4393C;
  text-align: center;
}
.item-recommend-column{
  margin-top: 15px;
}
.item-recommend-intro{
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.item-recommend-img{
  width: 80%;
  margin: 0px auto;
  cursor: pointer;
}
.item-recommend-img img{
  width: 100%;
}
.item-recommend-top-num{
  color: #fff;
  margin: 0px 2px;
  padding: 1px 5px;
  border-radius: 12px;
  background-color: #E4393C;
}
.item-recommend-price{
  color: #E4393C;
  font-weight: bolder;
}
.item-intro-detail{
  /*margin-left: 30px;*/
  /*width: calc(80vw - 300px);*/
  width: 80vw;
}
/*.item-intro-nav{*/
/*  width: 100%;*/
/*  height: 38px;*/
/*  background-color: #F7F7F7;*/
/*  border-bottom: 1px solid #E4393C;*/
/*}*/
/*.item-intro-nav ul{*/
/*  margin: 0px;*/
/*  padding: 0px;*/
/*  list-style: none;*/
/*}*/
/*.item-intro-nav li{*/
/*  float: left;*/
/*  height: 100%;*/
/*  width: 120px;*/
/*  line-height: 38px;*/
/*  text-align: center;*/
/*  color: #E4393C;*/
/*}*/
/*.item-intro-nav li:first-child{*/
/*  background-color: #E4393C;*/
/*  color: #fff;*/
/*}*/
.item-intro-img{
  width: 100%;
}
.item-intro-img img{
  width: 100%;
}
/************* 商品参数 *************/
.item-param-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}
.item-param-box {
  padding: 5px;
  padding-left: 30px;
  width: 240px;
  height: 36px;
  font-size: 14px;
  /* text-align: center; */
  /* background-color: #ccc; */
}
.item-param-title {
  color: #232323;
}
.item-param-content {
  color: #999;
}
.remarks-title {
  padding-left: 15px;
  height: 36px;
  font-size: 16px;
  font-weight: bolder;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-analyse-box {
  padding: 15px;
  display: flex;
  align-items: center;
}
.remarks-analyse-goods {
  margin-left: 15px;
  margin-right: 15px;
}
.remarks-analyse-num {
  font-size: 26px;
}
.remarks-analyse-title {
  font-size: 12px;
  line-height: 20px;
}
.remarks-bar {
  padding-left: 15px;
  height: 36px;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-bar span {
  margin-right: 15px;
}
.remarks-box {
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #ccc dotted;
}
.remarks-user {
  width: 180px;
}
.remarks-user-name {
  padding-left: 15px;
}
.remarks-content-box {
  width: calc(100% - 180px);
}
.remarks-star {
  background-color: #fff;
}
.remarks-content {
  font-size: 14px;
  color: #232323;
  line-height: 28px;
}
.remarks-sub {
  margin-top: 15px;
  color: #ccc;
}
.remarks-time {
  margin-left: 15px;
}
.remarks-page {
  margin: 15px;
  display: flex;
  justify-content:flex-end;
}
/***************商品详情介绍和推荐侧边栏结束***************/
</style>

<style>
/* 改变便签页样式 */
.ivu-tabs-ink-bar {
  background-color: #E4393C !important;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab{
  border-radius: 0px;
  color: #999;
  height: 38px;
  background: #F7F7F7;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active{
  color: #fff;
  background-color: #E4393C;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active:before{
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  color: #fff;
  background: #F7F7F7;
  position: absolute;
  top: 0;
  left: 0;
}
.ivu-rate-star-full:before, .ivu-rate-star-half .ivu-rate-star-content:before {
  color: #E4393C;
}
.item-detail {
  padding-top: 5px;
  padding-left: 46px;
  font-size: 14px;
  color: #999;
}
</style>
