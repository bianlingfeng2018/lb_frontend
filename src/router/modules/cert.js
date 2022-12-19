/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const certRouter = {
  path: '/ctm',
  component: Layout,
  redirect: '/ctm/list',
  name: 'cert',
  meta: {
    title: '证书管理',
    icon: 'el-icon-tickets',
    role: ['/ctm']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/certManage/certList'),
      name: 'certList',
      meta: { title: '证书列表', icon: 'el-icon-document', role: ['/ctm/list'] }
    },
    {
      path: 'upload',
      component: () => import('@/views/certManage/certUpload'),
      name: 'certUpload',
      meta: { title: '证书上传', icon: 'el-icon-upload2', role: ['/ctm/upload'] }
    },
    {
      path: 'download',
      component: () => import('@/views/certManage/certDownload'),
      name: 'certDownload',
      meta: { title: '证书下载', icon: 'el-icon-download', role: ['/ctm/download'] }
    }
  ]
}
export default certRouter
