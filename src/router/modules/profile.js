import layout from "@/layout"

/** When your routing table is too long, you can split it into small modules **/

const profileRouter = {
  path: "/profile",
  component: layout,
  name: "profile",
  redirect: '/profile/user-center',
  alwaysShow: false,
  hidden: true,
  meta: {
    title: "设置"
  },
  children: [
    {
      path: 'user-center',
      component: () => import('@/views/profile/index'),
      hidden: true,
      name: 'userCenter',
      meta: { title: '个人中心' }
    }
  ]
}
export default profileRouter
