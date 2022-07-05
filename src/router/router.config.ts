import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from '~/layouts/BasicLayout/index.vue'

// const icons: string[] = ['fanhui', 'facebook', 'twitter', 'xiangxia', 'youxiang']

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
          title: '分析管理',
          icon: 'twitter',
        },
        children: [
          {
            path: '/app/home/antdv',
            name: 'antdv',
            component: () => import('~/pages/others/antdv/index.vue'),
            meta: { title: '组件', keepAlive: true, breadcrumb: true, permission: 'home' },
          },
        ],
      },
      {
        path: '/app/others',
        name: 'others',
        component: () => import('~/pages/BlankLayout.vue'),
        redirect: '/app/others/about',
        meta: {
          title: '菜单管理',
          icon: 'facebook',
        },
        children: [
          {
            path: '/app/others/about',
            name: 'about',
            component: () => import('~/pages/others/about/index.vue'),
            meta: { title: '关于', keepAlive: true, hiddenWrap: true, permission: 'others' },
          },
          {
            path: '/app/others/child',
            name: 'otherschild',
            component: () => import('~/pages/BlankLayout.vue'),
            redirect: '/app/others/child/aboutc',
            meta: {
              title: '三级菜单',
              icon: 'youxiang',
            },
            children: [
              {
                path: '/app/others/child/aboutc',
                name: 'aboutc',
                component: () => import('~/pages/others/about/aboutc/index.vue'),
                meta: { title: '组件c', permission: 'otherschild' },
              },
            ],
          },
        ],
      },
    ],
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

export default constantRoutes
