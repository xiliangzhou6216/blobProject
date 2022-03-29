import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from '~/layouts/BasicLayout/index.vue'

// import { h } from 'vue'
// const RouteView = h('router-view')
export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: BasicLayout,
    name: 'app',
    redirect: '/app/home',
    meta: { title: 'vue平台' },
    children: [
      {
        path: '/app/home',
        component: () => import('~/pages/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'liulanqi',
          auth: ['home'],
        },
      },
      {
        path: '/app/others',
        name: 'others',
        component: () => import('~/pages/BlankLayout.vue'),
        redirect: '/app/others/about',
        meta: {
          title: '其他菜单',
          icon: 'xitongrizhi',
          auth: ['others'],
        },
        children: [
          {
            path: '/app/others/about',
            name: 'about',
            component: () => import('~/pages/others/about/index.vue'),
            meta: { title: '关于', keepAlive: true, hiddenWrap: true },
          },
          {
            path: '/app/others/antdv',
            name: 'antdv',
            component: () => import('~/pages/others/antdv/index.vue'),
            meta: { title: '组件', keepAlive: true, breadcrumb: true },
          },
        ],
      },
    ],
  },
  // ...accessRoutes,
]

export const publicRoutes = [
  {
    path: '/redirect',
    component: () => import('~/pages/BlankLayout.vue'),
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('~/pages/404.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('~/pages/404.vue'),
  },
]

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('~/pages/login/index.vue'),
    name: 'login',
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/app',
    meta: {
      title: 'Root',
    },
  },
  // ...accessRoutes,
]

export default constantRoutes
