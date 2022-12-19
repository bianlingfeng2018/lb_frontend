import LayoutMall from "@/layout-mall"

/** When your routing table is too long, you can split it into small modules **/

const mallRouter = {
  path: "/mall",
  component: LayoutMall,
  name: "mall",
  redirect: '/mall/goodsList',
  meta: { title: '商城管理', noCache: true, icon: 'el-icon-s-shop' },
  children: [
    {
      path: 'goodsList',
      component: () => import('@/layout-mall/components/GoodsList'),
      name: 'goodsList',
      meta: { title: '商城首页' }
    },
    {
      path: 'goodsDetail/:id',
      component: () => import('@/layout-mall/components/GoodsDetail'),
      name: 'goodsDetail',
      meta: { title: '商品详情页' },
      hidden: true
    },
    {
      path: 'order',
      component: () => import('@/layout-mall/components/Order'),
      name: 'order',
      meta: { title: '下单页' },
      hidden: true
    },
    {
      path: 'order-done',
      component: () => import('@/layout-mall/components/PayDone'),
      name: 'order-done',
      meta: { title: '下单完成页' },
      hidden: true
    }
  ]
}
export default mallRouter
