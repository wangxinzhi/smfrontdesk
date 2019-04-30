import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login/login'
import layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/redirect',
    component: layout,
    hidden: true
  },

  {
    path: '',
    component: layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },

  {
    path: 'github',
    component: layout,
    children: [
      {
        path: 'https://github.com/wangxinzhi/screenmanager',
        meta: { title: 'github', icon: 'github' }
      }
    ]
  },

  /* {
    path: '/admin/doc',
    component: layout,
    name: 'doc',
    meta: {
      title: 'doc',
      icon: 'doc'
    },
    children: [
      {
        path: 'api',
        name: 'api',
        meta: { title: 'api', icon: 'api' }
      },
      {
        path: 'router',
        name: 'router',
        meta: { title: 'router', icon: 'router' }
      }
    ]
  }, */

  {
    path: '/user',
    component: layout,
    name: 'user',
    meta: {
      title: 'UserManagement',
      icon: 'user'
    },
    children: [
      {
        path: 'add',
        name: 'addUser',
        component: () => import('@/views/user/create'),
        meta: { title: 'AddUser', icon: 'users' }
      }
      /* {
        path: 'edit',
        name: 'editUser',
        meta: { title: 'editUser', icon: 'edit' }
      },
      {
        path: 'delete',
        name: 'deleteUser',
        meta: { title: 'deleteUser', icon: 'delete-user' }
      } */
    ]
  },

  {
    path: '/role',
    name: 'role',
    component: layout,
    meta: { title: 'role', icon: 'privilege' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/role/index'),
        meta: { title: 'PrivilegeMG', icon: '' }
      }
    ]
  },

  {
    path: '/organization',
    name: 'organization',
    component: layout,
    meta: { title: 'organization', icon: 'organization' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/organization/index'),
        meta: { title: 'OrganizationTree', icon: '' }
      }
    ]
  },

  {
    path: '/program',
    component: layout,
    name: 'program',
    meta: {
      title: 'ProgramMG',
      icon: 'program'
    },
    children: [
      {
        path: 'add',
        name: 'addProgram',
        component: () => import('@/views/program/programs'),
        meta: { title: 'AddProgram', icon: 'addpage' }
      },
      {
        path: 'verify',
        name: 'verifyProgram',
        component: () => import('@/views/program/verify'),
        meta: { title: 'VerifyProgram', icon: 'audited' }
      }
    ]
  },

  {
    path: '/system',
    component: layout,
    name: 'system',
    meta: {
      title: 'SystemMonitor',
      icon: 'system-s'
    },
    children: [
      {
        path: 'online',
        name: 'OnlineUsers',
        component: () => import('@/views/monitor/onlineuser'),
        meta: { title: 'OnlineUsers', icon: 'online-users' }
      },
      {
        path: 'landinglog',
        name: 'LandingLog',
        component: () => import('@/views/monitor/landlog'),
        meta: { title: 'LandingLog', icon: 'landing-log' }
      }
    ]
  },

  { path: '/404', component: () => import('@/views/404'), hidden: true },

  { path: '*', redirect: '/404', hidden: true }

]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
