import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'example' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/user_management',
    component: Layout,
    redirect: '/user_management/user_list',
    name: 'user_management',
    meta: {
      title: '用户管理',
      icon: 'peoples',
      roles: ['admin']
    },
    children: [{
      path: 'user_list',
      name: 'user_list',
      component: () => import('@/views/user_management/user_list'),
      meta: {
        title: '用户列表',
        roles: ['admin']
      }
    }, {
      path: 'add_user',
      name: 'add_user',
      component: () => import('@/views/user_management/add_user'),
      meta: {
        title: '新增用户',
        roles: ['admin']
      }
    }
    ]
  },
  {
    path: '/system_management',
    component: Layout,
    redirect: '/system_management',
    children: [{
      path: '/system_management',
      name: 'system_management',
      component: () => import('@/views/system_management/index'),
      meta: {
        title: '系统管理',
        icon: 'dashboard',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/data_management',
    component: Layout,
    redirect: '/data_management/file_upload',
    name: 'data_management',
    meta: {
      title: '数据管理',
      icon: 'excel',
      roles: ['admin', 'user']
    },
    children: [{
      path: 'file_upload',
      name: 'file_upload',
      component: () => import('@/views/data_management/file_upload'),
      meta: {
        title: '数据导入',
        roles: ['admin', 'user']
      }
    }, {
      path: 'file_download',
      name: 'file_download',
      component: () => import('@/views/data_management/file_download'),
      meta: {
        title: '数据导出',
        roles: ['admin', 'user']
      }
    }
    ]
  },
  {
    path: '/query_process',
    component: Layout,
    redirect: '/query_process/sector_config',
    name: 'query_process',
    meta: {
      title: '业务查询',
      icon: 'search',
      roles: ['admin', 'user']
    },
    children: [{
      path: 'sector_config',
      name: 'sector_config',
      component: () => import('@/views/query_process/sector_config'),
      meta: {
        title: '小区配置信息',
        roles: ['admin', 'user']
      }
    }, {
      path: 'enodeb_info',
      name: 'enodeb_info',
      component: () => import('@/views/query_process/enodeb_info'),
      meta: {
        title: '基站eNodeB信息',
        roles: ['admin', 'user']
      }
    },
    {
      path: 'kpi_info',
      name: 'kpi_info',
      component: () => import('@/views/query_process/kpi_info'),
      meta: {
        title: '小区KPI指标信息',
        roles: ['admin', 'user']
      }
    },
    {
      path: 'prb_info',
      name: 'prb_info',
      component: () => import('@/views/query_process/prb_info'),
      meta: {
        title: '网元PRB指标信息',
        roles: ['admin', 'user']
      }
    }]
  },
  {
    path: '/analysis',
    component: Layout,
    redirect: '/analysis/network_structure',
    name: 'analysis',
    meta: {
      title: '业务分析',
      icon: 'chart',
      roles: ['admin', 'user']
    },
    children: [{
      path: 'c2i',
      name: 'c2i',
      component: () => import('@/views/analysis/C2I'),
      meta: {
        title: '主邻小区C2I干扰分析',
        roles: ['admin', 'user']
      }
    }, {
      path: 'c2i3',
      name: 'c2i3',
      component: () => import('@/views/analysis/C2I3'),
      meta: {
        title: '干扰小区三元组分析',
        roles: ['admin', 'user']
      }
    }, {
      path: 'network_structure',
      name: 'network_structure',
      component: () => import('@/views/analysis/network_structure'),
      meta: {
        title: '网络干扰结构分析',
        roles: ['admin', 'user']
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
