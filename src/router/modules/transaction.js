/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const transactionRouter = {
  path: '/tm',
  component: Layout,
  redirect: '/tm/detection',
  name: 'TransactionManagement',
  meta: {
    title: '交易管理',
    icon: 'el-icon-s-grid',
    role: ['/tm']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/transactionManagement/detection/list.vue'),
      name: 'List',
      meta: { title: '商机列表', role: ['/tm/detection/list'] }
    },
    {
      path: 'detection',
      component: () => import('@/views/transactionManagement/detection'),
      name: 'Detection',
      meta: {
        title: '检测交易',
        icon: 'el-icon-document-copy',
        role: ['/tm/detection'],
        noCache: false
      },
      children: [

        // {
        //   path: 'create',
        //   // component: () => import('@/views/transactionManagement/detection/create.vue'),
        //   redirect: '/tm/detection-create',
        //   name: 'Create',
        //   meta: { title: '创建检测交易', role: ['/tm/detection-create'] }
        // },
        // {
        //   path: 'edit/:id',
        //   // component: () => import('@/views/transactionManagement/detection/edit.vue'),
        //   redirect: '/tm/detection-edit/:id',
        //   name: 'Edit',
        //   meta: { title: '编辑检测交易', role: ['/tm/detection-edit/:id'] },
        //   hidden: true
        // },
        // {
        //   path: 'show/:id',
        //   component: () => import('@/views/transactionManagement/detection/show.vue'),
        //   name: 'Show',
        //   meta: { title: '检测交易查看', noCache: true, role: ['/tm/detection/show/:id'] },
        //   hidden: true
        // },
        // {
        //   path: 'showall/:id',
        //   component: () => import('@/views/transactionManagement/detection/showall.vue'),
        //   name: 'ShowAll',
        //   meta: { title: '检测交易查看进度', noCache: true, role: ['/tm/detection/showall/:id'] },
        //   hidden: true
        // },
        // {
        //   path: 'as-cs',
        //   component: () => import('@/views/transactionManagement/detection/as-cs.vue'),
        //   name: 'AssignCS',
        //   meta: { title: '检测交易分配客服', noCache: true, role: ['/tm/detection/as-cs'] },
        //   hidden: true
        // },
        {
          path: 'quotation',
          component: () => import('@/views/transactionManagement/detection/quotation/list'),
          name: 'Quotation',
          // alwaysShow: true,
          meta: { title: '报价单', role: ['/tm/detection/quotation'] },
          children: [
            // {
            //   path: 'list',
            //   component: () => import('@/views/transactionManagement/detection/quotation/list'),
            //   name: 'List',
            //   meta: { title: '报价单列表', role: ['/tm/detection/quotation/list'] }
            // },
            {
              path: 'create',
              // component: () => import('@/views/transactionManagement/detection/quotation/create.vue'),
              redirect: '/tm/detection-quotation-create',
              name: 'Create',
              meta: { title: '创建报价单', role: ['/tm/detection-quotation-create'] },
              hidden: true
            },
            {
              path: 'edit/:id',
              // component: () => import('@/views/transactionManagement/detection/quotation/edit.vue'),
              redirect: '/tm/detection-quotation-edit/:id',
              name: 'Edit',
              meta: { title: '编辑报价单', role: ['/tm/detection-quotation-edit/:id'] },
              hidden: true
            },
            {
              path: 'show/:id',
              // component: () => import('@/views/transactionManagement/detection/quotation/show.vue'),
              redirect: '/tm/detection-quotation-show/:id',
              name: 'Show',
              meta: { title: '查看报价单', noCache: true, role: ['/tm/detection-quotation-edit/:id'] },
              hidden: true
            },
            {
              path: 'audit/:id',
              component: () => import('@/views/transactionManagement/detection/quotation/components/QuotationAudit.vue'),
              name: 'Audit',
              meta: { title: '审核报价单', noCache: true, role: ['/tm/detection/quotation/audit/:id'] },
              hidden: true
            },
            {
              path: 'result',
              // component: () => import('@/views/transactionManagement/detection/quotation/result'),
              redirect: '/tm/detection-quotation-result',
              name: 'Result',
              meta: { title: '报价单详情', noCache: true },
              hidden: true
            }
          ]
        },
        {
          path: 'apply',
          component: () => import('@/views/transactionManagement/detection/apply/list'),
          name: 'Apply',
          // alwaysShow: true,
          meta: { title: '申请单', role: ['/tm/detection/apply'] },
          children: [
            // {
            //   path: 'list',
            //   component: () => import('@/views/transactionManagement/detection/apply/list'),
            //   name: 'List',
            //   meta: { title: '申请单列表', role: ['/tm/detection/apply/list'] }
            // },
            {
              path: 'create',
              // component: () => import('@/views/transactionManagement/detection/apply/create'),
              redirect: '/tm/detection-apply-create',
              name: 'Create',
              meta: { title: '创建申请单', role: ['/tm/detection-apply-create'] },
              hidden: true
            },
            {
              path: 'edit/:id',
              // component: () => import('@/views/transactionManagement/detection/apply/edit.vue'),
              redirect: '/tm/detection-apply-edit/:id',
              name: 'Edit',
              meta: { title: '编辑申请单', role: ['/tm/detection-apply-edit/:id'] },
              hidden: true
            },
            {
              path: 'show/:id',
              // component: () => import('@/views/transactionManagement/detection/apply/show.vue'),
              redirect: '/tm/detection-apply-show/:id',
              name: 'Show',
              meta: { title: '查看申请单', noCache: true, role: ['/tm/detection/apply/show/:id'] },
              hidden: true
            },
            {
              path: 'audit/:id',
              component: () => import('@/views/transactionManagement/detection/apply/components/ApplyAudit.vue'),
              name: 'Audit',
              meta: { title: '审核申请单', noCache: true, role: ['/tm/detection/apply/audit/:id'] },
              hidden: true
            },
            {
              path: 'result',
              component: () => import('@/views/transactionManagement/detection/apply/result'),
              name: 'Result',
              meta: { title: '审核申请单', noCache: true },
              hidden: true
            }
          ]
        },
        {
          path: 'worksheet',
          component: () => import('@/views/transactionManagement/detection/worksheet/list'),
          name: 'Worksheet',
          // alwaysShow: true,
          meta: { title: '工作单', role: ['/tm/detection/worksheet'] },
          children: [
            // {
            //   path: 'list',
            //   component: () => import('@/views/transactionManagement/detection/worksheet/list'),
            //   name: 'List',
            //   meta: { title: '工作单列表', role: ['/tm/detection/worksheet/list'] }
            // },
            {
              path: 'create',
              // component: () => import('@/views/transactionManagement/detection/worksheet/create'),
              redirect: '/tm/detection-worksheet-create',
              name: 'Create',
              meta: { title: '创建工作单', role: ['/tm/detection-worksheet-create'] },
              hidden: true
            },
            {
              path: 'edit/:id',
              // component: () => import('@/views/transactionManagement/detection/worksheet/edit.vue'),
              redirect: '/tm/detection-worksheet-edit/:id',
              name: 'Edit',
              meta: { title: '编辑工作单', role: ['/tm/detection-worksheet-edit/:id'] },
              hidden: true
            },
            {
              path: 'show/:id',
              // component: () => import('@/views/transactionManagement/detection/worksheet/show.vue'),
              redirect: '/tm/detection-worksheet-show/:id',
              name: 'Show',
              meta: { title: '查看工作单', noCache: true, role: ['/tm/detection/worksheet/show/:id'] },
              hidden: true
            },
            {
              path: 'audit/:id',
              component: () => import('@/views/transactionManagement/detection/worksheet/components/WorksheetAudit.vue'),
              name: 'Audit',
              meta: { title: '审核工作单', noCache: true, role: ['/tm/detection/worksheet/audit/:id'] },
              hidden: true
            },
            {
              path: 'result',
              component: () => import('@/views/transactionManagement/detection/worksheet/result'),
              name: 'Result',
              meta: { title: '审核工作单', noCache: true },
              hidden: true
            }
          ]
        },
        {
          path: 'record',
          component: () => import('@/views/transactionManagement/detection/record/list'),
          name: 'Record',
          meta: { title: '原始记录单', role: ['/tm/detection/report/list'] },
          children: [
            {
              path: 'show/:id',
              component: () => import('@/views/transactionManagement/detection/record/show.vue'),
              name: 'Show',
              meta: { title: '查看原始记录单', noCache: true, role: ['/tm/detection/record/show/:id'] },
              hidden: true
            }
          ]
        },
        {
          path: 'report',
          component: () => import('@/views/transactionManagement/detection/report/list'),
          name: 'Report',
          // alwaysShow: true,
          meta: { title: '检测报告单', role: ['/tm/detection/report'] },
          children: [
            // {
            //   path: 'list',
            //   component: () => import('@/views/transactionManagement/detection/report/list'),
            //   name: 'List',
            //   meta: { title: '报告单列表', role: ['/tm/detection/report/list'] }
            // },
            {
              path: 'create',
              // component: () => import('@/views/transactionManagement/detection/report/create'),
              redirect: '/tm/detection-report-create',
              name: 'Create',
              meta: { title: '创建报告单', role: ['/tm/detection-report-create'] },
              hidden: true
            },
            {
              path: 'edit/:id',
              // component: () => import('@/views/transactionManagement/detection/report/edit.vue'),
              redirect: '/tm/detection-report-edit/:id',
              name: 'Edit',
              meta: { title: '编辑报告单', role: ['/tm/detection-report-edit/:id'] },
              hidden: true
            },
            {
              path: 'show/:id',
              component: () => import('@/views/transactionManagement/detection/report/show.vue'),
              name: 'Show',
              meta: { title: '查看报告单', noCache: true, role: ['/tm/detection/report/show/:id'] },
              hidden: true
            },
            {
              path: 'audit/:id',
              component: () => import('@/views/transactionManagement/detection/report/components/ReportAudit.vue'),
              name: 'Audit',
              meta: { title: '编制报告单', noCache: true, role: ['/tm/detection/report/audit/:id'] },
              hidden: true
            },
            {
              path: 'second-audit/:id',
              component: () => import('@/views/transactionManagement/detection/report/components/SecondReportAudit.vue'),
              name: 'SecondAudit',
              meta: { title: '审核报告单', noCache: true, role: ['/tm/detection/report/second-audit/:id'] },
              hidden: true
            },
            {
              path: 'third-audit/:id',
              component: () => import('@/views/transactionManagement/detection/report/components/ThirdReportAudit.vue'),
              name: 'ThirdAudit',
              meta: { title: '批准报告单', noCache: true, role: ['/tm/detection/report/third-audit/:id'] },
              hidden: true
            },
            {
              path: 'result',
              component: () => import('@/views/transactionManagement/detection/report/result'),
              name: 'Result1',
              meta: { title: '编制报告单', noCache: true },
              hidden: true
            },
            {
              path: 'result-second',
              component: () => import('@/views/transactionManagement/detection/report/result-second'),
              name: 'Result2',
              meta: { title: '审核报告单', noCache: true },
              hidden: true
            },
            {
              path: 'result-third',
              component: () => import('@/views/transactionManagement/detection/report/result-third'),
              name: 'Result3',
              meta: { title: '批准报告单', noCache: true },
              hidden: true
            }
          ]
        }
      ]
    },
    // 为了解决三级路由不缓存的问题，将三级路由重定向到二级路由，菜单显示和权限不受影响
    // ************* 映射到二级菜单开始 *************
    {
      path: 'detection-create',
      component: () => import('@/views/transactionManagement/detection/create.vue'),
      name: 'DetectionCreate',
      meta: { title: '创建检测交易', role: ['/tm/detection-create'] },
      hidden: true
    },
    {
      path: 'detection-edit/:id',
      component: () => import('@/views/transactionManagement/detection/edit.vue'),
      name: 'DetectionEdit',
      meta: { title: '编辑检测交易', noCache: false, role: ['/tm/detection-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-quotation-create',
      component: () => import('@/views/transactionManagement/detection/quotation/create.vue'),
      name: 'QuotationCreate',
      meta: { title: '创建报价单', role: ['/tm/detection-quotation-create'] },
      hidden: true
    },
    {
      path: 'detection-quotation-show/:id',
      component: () => import('@/views/transactionManagement/detection/quotation/show.vue'),
      name: 'QuotationShow',
      meta: { title: '查看报价单', noCache: false, role: ['/tm/detection-quotation-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-quotation-result',
      component: () => import('@/views/transactionManagement/detection/quotation/result.vue'),
      name: 'QuotationResult',
      meta: { title: '报价单详情', noCache: false, role: ['/tm/detection-quotation-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-quotation-edit/:id',
      component: () => import('@/views/transactionManagement/detection/quotation/edit.vue'),
      name: 'QuotationEdit',
      meta: { title: '编辑报价单', noCache: false, role: ['/tm/detection-quotation-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-apply-create',
      component: () => import('@/views/transactionManagement/detection/apply/create'),
      name: 'ApplyCreate',
      meta: { title: '创建申请单', noCache: false, role: ['/tm/detection-apply-create'] },
      hidden: true
    },
    {
      path: 'detection-apply-show/:id',
      component: () => import('@/views/transactionManagement/detection/apply/show.vue'),
      name: 'ApplyShow',
      meta: { title: '查看申请单', noCache: false, role: ['/tm/detection-quotation-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-apply-edit/:id',
      component: () => import('@/views/transactionManagement/detection/apply/edit.vue'),
      name: 'ApplyEdit',
      meta: { title: '编辑申请单', noCache: false, role: ['/tm/detection-apply-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-worksheet-create',
      component: () => import('@/views/transactionManagement/detection/worksheet/create'),
      name: 'WorksheetCreate',
      meta: { title: '创建工作单', noCache: false, role: ['/tm/detection-worksheet-create'] },
      hidden: true
    },
    {
      path: 'detection-worksheet-edit/:id',
      component: () => import('@/views/transactionManagement/detection/worksheet/edit.vue'),
      name: 'WorksheetEdit',
      meta: { title: '编辑工作单', noCache: false, role: ['/tm/detection-worksheet-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-worksheet-show/:id',
      component: () => import('@/views/transactionManagement/detection/worksheet/show.vue'),
      name: 'WorksheetShow',
      meta: { title: '查看工作单', noCache: false, role: ['/tm/detection-worksheet-edit/:id'] },
      hidden: true
    },
    {
      path: 'detection-report-create',
      component: () => import('@/views/transactionManagement/detection/report/create'),
      name: 'ReportCreate',
      meta: { title: '创建报告单', noCache: false, role: ['/tm/detection-report-create'] },
      hidden: true
    },
    {
      path: 'detection-report-edit/:id',
      component: () => import('@/views/transactionManagement/detection/report/edit.vue'),
      name: 'ReportEdit',
      meta: { title: '编辑报告单', noCache: false, role: ['/tm/detection-report-edit/:id'] },
      hidden: true
    },
    // ************* 映射到二级菜单结束 *************
    // {
    //   path: 'test',
    //   component: () => import('@/views/transactionManagement/inspection/index.vue'),
    //   name: 'Test',
    //   meta: { title: '检验交易', icon: 'el-icon-takeaway-box', role: ['/tm/test'] }
    // },
    // {
    //   path: 'certification',
    //   component: () => import('@/views/transactionManagement/authentication/index.vue'),
    //   name: 'Certification',
    //   meta: { title: '认证交易', icon: 'el-icon-document-checked', role: ['/tm/certification'] }
    // }
  ]
}
export default transactionRouter
