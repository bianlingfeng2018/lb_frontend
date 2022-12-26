/** When your routing table is too long, you can split it into small modules **/
import layout from "@/layout"

const clientRouter = {
  path: "/clm",
  component: layout,
  name: "client",
  redirect: "/clm/client",
  alwaysShow: true,
  meta: {
    title: "客户管理",
    icon: "el-icon-user-solid",
    role: ["/clm"]
  },
  children: [
    // {
    //   path: "client",
    //   component: () => import("@/views/authorizationManage/client/list"),
    //   name: "clientList",
    //   meta: { title: "联系人列表", role: ["/clm/client"] }
    // },
    {
      path: 'client-create',
      component: () => import('@/views/authorizationManage/client/create.vue'),
      name: 'ClientDetailCreate',
      meta: { title: '创建客户', noCache: false, role: ['/clm/client-create'] },
      hidden: true
    },
    {
      path: 'client-edit/:id',
      component: () => import('@/views/authorizationManage/client/edit.vue'),
      name: 'ClientDetailEdit',
      meta: { title: '编辑客户', noCache: false, role: ['/clm/client-edit/:id'] },
      hidden: true
    },
    {
      path: 'client-show/:id',
      component: () => import('@/views/authorizationManage/client/show.vue'),
      name: 'ClientShow',
      meta: { title: '查看客户', noCache: true, role: ['/clm/client-show/:id'] },
      hidden: true
    },
    {
      path: "a-cli-com",
      component: () => import("@/views/authorizationManage/client-com/list-all.vue"),
      name: "allClientComList",
      meta: { title: "所有客户", role: ["/clm/a-cli-com"] }
    },
    {
      path: "p-cli-com",
      component: () => import("@/views/authorizationManage/client-com/list-public.vue"),
      name: "publicClientComList",
      meta: { title: "公共客户", role: ["/clm/p-cli-com"] }
    },
    {
      path: "m-cli-com",
      component: () => import("@/views/authorizationManage/client-com/list-my.vue"),
      name: "myClientComList",
      meta: { title: "我的客户", role: ["/clm/m-cli-com"] }
    },
    {
      path: "m-cli-contract",
      component: () => import("@/views/authorizationManage/client-com/list-contract.vue"),
      name: "contract",
      meta: { title: "客户合同管理", role: ["/clm/m-cli-com"] }
    },
    {
      path: 'client-com-create',
      component: () => import('@/views/authorizationManage/client-com/create.vue'),
      name: 'ClientComDetailCreate',
      meta: { title: '创建客户公司', noCache: false, role: ['/clm/client-com-create'] },
      hidden: true
    },
    {
      path: 'client-com-edit/:id',
      component: () => import('@/views/authorizationManage/client-com/edit.vue'),
      name: 'ClientComDetailEdit',
      meta: { title: '编辑客户公司', noCache: true, role: ['/clm/client-com-edit/:id'] },
      hidden: true
    },
    {
      path: 'client-com-show/:id',
      component: () => import('@/views/authorizationManage/client-com/show.vue'),
      name: 'ClientComShow',
      meta: { title: '查看客户公司', noCache: true, role: ['/clm/client-com-show/:id'] },
      hidden: true
    },
    {
      path: 'cli-com-export',
      component: () => import('@/views/authorizationManage/client-com/export.vue'),
      name: 'ClientComExport',
      meta: { title: '导出Excel', noCache: true, role: ['/clm/cli-com-export'] },
      hidden: true
    }
  ]
}
export default clientRouter
