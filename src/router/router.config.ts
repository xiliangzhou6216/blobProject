import type { RouteRecordRaw } from 'vue-router'
// import { h } from 'vue'
// const RouteView = h('router-view')
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/pages/index.vue'),
    name: 'index',
    meta: { title: 'vue平台' },
    props: true,
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

export default constantRoutes
