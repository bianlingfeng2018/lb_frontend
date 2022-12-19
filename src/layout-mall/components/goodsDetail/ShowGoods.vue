<template>
  <div>
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div v-if="goodsInfo_.imageList1" class="item-detail-big-img">
          <img :src="getUrl(goodsInfo_.imageList1[imgIndex])" alt="">
        </div>
        <div class="item-detail-img-row">
          <div v-for="(item, index) in goodsInfo_.imageList1" :key="index" class="item-detail-img-small" @mouseover="showBigImg(index)">
            <img :src="getUrl(item)" alt="">
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            <!--            <span class="item-detail-express">校园配送</span>-->
            {{ goodsInfo_.goodsName }}
          </p>
        </div>
        <div class="item-detail-tag">
          <p>
            <span v-for="(item,index) in goodsInfo_.tags" :key="index">【{{ item }}】</span>
          </p>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">报告单价格</span>
                <span class="item-price">￥{{ goodsInfo_.price }}</span>
              </p>
            </div>
            <!--            <div class="item-price-row">-->
            <!--              <p>-->
            <!--                <span class="item-price-title">优 惠 价</span>-->
            <!--                <span v-for="(item,index) in goodsInfo.discount" :key="index" class="item-price-full-cut">{{ item }}</span>-->
            <!--              </p>-->
            <!--            </div>-->
            <div class="item-price-row">
              <p>
                <span class="item-price-title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <span v-for="(item,index) in goodsInfo.promotion" :key="index" class="item-price-full-cut">{{ item }}</span>
              </p>
            </div>
          </div>
          <div class="item-price-right">
            <div class="item-remarks-sum">
              <p>累计评价</p>
              <p>
                <span class="item-remarks-num">{{ goodsInfo_.remarksNum }} 条</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 选择报告类型 -->
        <div class="item-select">
          <div class="item-select-title">
            <p>报告类型</p>
          </div>
          <div class="item-select-column">
            <div class="item-select-row">
              <div v-for="(item, index) in reportType" :key="index" class="item-select-box">
                <div class="item-select-intro">
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 选择测试项目 -->
        <div class="item-select">
          <div class="item-select-title">
            <p>测试项目</p>
          </div>
          <div class="item-select-column">
            <!--            <div style="flex: auto">-->
            <el-checkbox-group v-model="tmpItems" @change="handleItemsChange">
              <el-checkbox v-for="(item, index) in goodsInfo_.testItemList" :key="index" :label="index">
                {{ item.testItem }}[{{ item.unitPrice }}×{{ item.qty }}]
                <span>￥{{ item.amountRmb }}</span>
              </el-checkbox>
            </el-checkbox-group>
            <!--            </div>-->
          </div>
        </div>
        <!--        &lt;!&ndash; 选择颜色 &ndash;&gt;-->
        <!--        <div class="item-select">-->
        <!--          <div class="item-select-title">-->
        <!--            <p>选择颜色</p>-->
        <!--          </div>-->
        <!--          <div class="item-select-column">-->
        <!--            <div v-for="(items, index) in goodsInfo.setMeal" :key="index" class="item-select-row">-->
        <!--              <div v-for="(item, index1) in items" :key="index1" class="item-select-box" :class="{'item-select-box-active': ((index * 3) + index1) === selectBoxIndex}" @click="select(index, index1)">-->
        <!--                <div class="item-select-img">-->
        <!--                  <img :src="'https://powerdos.github.io/Mall-Vue/' + item.img" alt="">-->
        <!--                </div>-->
        <!--                <div class="item-select-intro">-->
        <!--                  <p>{{ item.intro }}</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        &lt;!&ndash; 白条分期 &ndash;&gt;-->
        <!--        <div class="item-select">-->
        <!--          <div class="item-select-title">-->
        <!--            <p>白条分期</p>-->
        <!--          </div>-->
        <!--          <div class="item-select-row">-->
        <!--            <div v-for="(item,index) in hirePurchase" :key="index" class="item-select-class">-->
        <!--              &lt;!&ndash;              <Tooltip :content="item.tooltip" placement="top-start">&ndash;&gt;-->
        <!--              &lt;!&ndash;                <span>{{item.type}}</span>&ndash;&gt;-->
        <!--              &lt;!&ndash;              </Tooltip>&ndash;&gt;-->
        <!--              <el-tooltip class="item" effect="dark" :content="item.tooltip" placement="bottom-end">-->
        <!--                <span>{{ item.type }}</span>-->
        <!--              </el-tooltip>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <br>
        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <el-form inline>
              <el-form-item>
                <el-input-number v-model="count" :min="1" size="large" />
              </el-form-item>
              <el-button type="danger" size="large" @click="addShoppingCartBtn()">加入购物车</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/layout-mall/vuex/store'
import { getFileBlobUrl } from "@/utils/simple-util"
import { mapActions } from 'vuex'

const cityOptions = ['测试项1', '测试项2', '测试项3']
export default {
  name: 'ShowGoods',
  props: {
    goodsInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      price: 0,
      count: 1,
      selectBoxIndex: 0,
      imgIndex: 0,
      checkAll: false,
      checkedCities: ['测试项1', '测试项2'],
      cities: cityOptions,
      isIndeterminate: true,
      reportType: ['中文纸质', '中文电子', '英文纸质', '英文电子'],
      goodsInfo_: {},
      tmpItems: []
    }
  },
  computed: {
    // ...mapState(['goodsInfo']),
    hirePurchase() {
      const three = this.price * this.count / 3
      const sex = this.price * this.count / 6
      const twelve = this.price * this.count / 12 * 1.0025
      const twentyFour = this.price * this.count / 24 * 1.005
      return [
        {
          tooltip: '无手续费',
          type: '不分期'
        },
        {
          tooltip: '无手续费',
          type: `￥${three.toFixed(2)} x 3期`
        },
        {
          tooltip: '无手续费',
          type: `￥${sex.toFixed(2)} x 6期`
        },
        {
          tooltip: '含手续费：费率0.25%起，￥0.1起×12期',
          type: `￥${twelve.toFixed(2)} x 12期`
        },
        {
          tooltip: '含手续费：费率0.5%起，￥0.1起×12期',
          type: `￥${twentyFour.toFixed(2)} x 24期`
        }
      ]
    }
  },
  watch: {
    goodsInfo: function(n) {
      this.goodsInfo_ = n
    }
  },
  mounted() {
    // const father = this
    // setTimeout(() => {
    //   father.price = father.goodsInfo.setMeal[0][0].price || 0
    // }, 300)
  },
  methods: {
    ...mapActions(['addShoppingCart']),
    handleItemsChange() {
      console.log(this.tmpItems)
    },
    getUrl(file) {
      return getFileBlobUrl(file)
    },
    select(index1, index2) {
      this.selectBoxIndex = index1 * 3 + index2
      this.price = this.goodsInfo.setMeal[index1][index2].price
    },
    showBigImg(index) {
      this.imgIndex = index
    },
    addShoppingCartBtn() {
      let price = 0
      const items = []
      for (let i = 0; i < this.goodsInfo_.testItemList.length; i++) {
        const item = this.goodsInfo_.testItemList[i]
        if (this.tmpItems.indexOf(i) !== -1) {
          items.push(item)
          price += Number(item.amountRmb)
        }
      }
      price = price * this.count
      if (items.length === 0) {
        this.$message.warning('至少选择一个测试项目')
        return
      }
      // const index1 = parseInt(this.selectBoxIndex / 3)
      // const index2 = this.selectBoxIndex % 3
      const date = new Date()
      const goodsId = date.getTime()
      const data = {
        goodsId: goodsId,
        title: this.goodsInfo_.goodsName,
        count: this.count,
        // package: this.goodsInfo.setMeal[index1][index2]
        package: {
          price: price,
          img: this.goodsInfo_.imageList1[0],
          items: items
        }
      }
      // this.addShoppingCart(data)
      // this.$router.push('/shoppingCart')
      this.addShoppingCart(data)
      this.$router.push('/mall/order')
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  },
  store
}
</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 350px;
  margin-right: 30px;
}
.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-big-img img {
  width: 100%;
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-img-small img {
  width: 100%;
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}
.item-detail-title p {
  color: #666;
  font-size: 20px;
}
.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
}
/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
}
.item-price-left {
  display: flex;
  flex-direction: column;
}
.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-price-row {
  margin: 5px 0px;
}
.item-price-row p {
  margin: 2px;
}
.item-price {
  color: #e4393c;
  font-size: 23px;
  cursor: pointer;
}
.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}
.item-remarks-sum {
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}
.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}
.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-select-column {
  display: flex;
  flex-direction: column;
}
.item-select-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}
.item-select-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-select-img {
  width: 36px;
}
.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-box:hover {
  border: 0.5px solid #e3393c;
}
.item-select-box-active {
  border: 0.5px solid #e3393c;
}
.item-select-img img {
  width: 100%;
}
p {
  margin: 0px;
  padding: 5px;
}
.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-class:hover {
  border: 0.5px solid #e3393c;
}
.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}
.add-buy-car {
  margin-top: 15px;
}
/******************商品图片及购买详情结束******************/
</style>
