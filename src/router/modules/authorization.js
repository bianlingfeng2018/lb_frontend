/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const authRouter = {
  path: '/am',
  component: Layout,
  redirect: '/am/user',
  name: 'auth',
  alwaysShow: true,
  meta: {
    title: '授权中心',
    icon: 'el-icon-s-tools',
    role: ['/am'],
    noCache: false
  },
  children: [
    {
      path: 'organization',
      component: () => import('@/views/authorizationManage/organization'),
      name: 'OrganizationList',
      meta: { title: '组织架构', icon: 'el-icon-files', role: ['/am/user'], noCache: true }
    },
    {
      path: 'user',
      component: () => import('@/views/authorizationManage/user'),
      name: 'UserList',
      meta: { title: '员工管理', icon: 'el-icon-user', role: ['/am/user'], noCache: true }
    },

    {
      path: 'role',
      component: () => import('@/views/authorizationManage/role'),
      name: 'RoleList',
      meta: { title: '角色管理', icon: 'el-icon-s-shop', role: ['/am/role'], noCache: true }
    },
    {
      path: 'data',
      component: () => import('@/views/authorizationManage/permission'),
      name: 'PermissionList',
      meta: { title: '数据权限', icon: 'el-icon-s-data', role: ['/am/data'], noCache: true }
    }
  ]
}
export default authRouter
