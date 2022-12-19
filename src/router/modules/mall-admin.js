import Layout from "@/layout"

/** When your routing table is too long, you can split it into small modules **/

const mallAdminRouter = {
  path: "/mall-admin",
  component: Layout,
  name: "mall-admin",
  redirect: '/mall/goodsList',
  meta: { title: '商城管理', noCache: true, icon: 'el-icon-s-shop' },
  children: [
    {
      path: 'goods',
      component: () => import('@/views/mall/goods'),
      name: 'goods',
      meta: { title: '商品管理' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/mall/goods/list'),
          name: 'list',
          meta: { title: '商品列表' }
        },
        {
          path: 'add',
          component: () => import('@/views/mall/goods/create'),
          name: 'add',
          meta: { title: '添加商品' }
        },
        {
          path: 'edit/:id',
          component: () => import('@/views/mall/goods/edit'),
          name: 'edit',
          meta: { title: '编辑商品' },
          hidden: true
        }
      ]
    },
    {
      path: 'order',
      component: () => import('@/views/mall/order'),
      name: 'order',
      meta: { title: '订单管理' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/mall/order/list'),
          name: 'list',
          meta: { title: '订单列表' }
        },
        {
          path: 'add',
          component: () => import('@/views/mall/order/create'),
          name: 'add',
          meta: { title: '订单创建' }
        },
        {
          path: 'edit/:id',
          component: () => import('@/views/mall/order/edit'),
          name: 'edit',
          meta: { title: '编辑订单' },
          hidden: true
        }
      ]
    }
  ]
}
export default mallAdminRouter
