import layout from "@/layout"

/** When your routing table is too long, you can split it into small modules **/

const financeRouter = {
  path: "/fm",
  component: layout,
  name: "finance",
  redirect: '/fm/pay',
  alwaysShow: true,
  meta: {
    title: "财务管理",
    icon: "el-icon-s-finance",
    role: ["/fm"]
  },
  children: [
    {
      path: 'pay',
      component: () => import('@/views/financeManage/list'),
      name: 'payList',
      meta: { title: '记录查询', role: ['/fm/pay'] }
    },
    {
      path: 'pay-create',
      component: () => import('@/views/financeManage/create'),
      name: 'FinanceCreate',
      meta: { title: '记录创建', noCache: false, role: ['/fm/pay-create'] },
      hidden: true
    },
    {
      path: 'pay-edit/:id',
      component: () => import('@/views/financeManage/edit'),
      name: 'FinanceEdit',
      meta: { title: '记录编辑', noCache: false, role: ['/fm/pay-edit/:id'] },
      hidden: true
    },
    {
      path: 'pay_list1',
      component: () => import('@/views/financeManage/enterpriseList'),
      name: 'EnterpriseList',
      meta: { title: '企业应收账管理', role: ['/fm/pay'] }
    },
    {
      path: 'pay_list2',
      component: () => import('@/views/financeManage/individualList'),
      name: 'IndividualList',
      meta: { title: '个人账款核销', role: ['/fm/pay'] }
    },
    {
      path: 'pay_list3',
      component: () => import('@/views/financeManage/commissionSettings'),
      name: 'CommissionSettings',
      meta: { title: '客户佣金设置', role: ['/fm/pay'] }
    }
  ]
}
export default financeRouter
