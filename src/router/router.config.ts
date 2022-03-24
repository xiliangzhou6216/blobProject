import type { RouteRecordRaw } from 'vue-router'
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/pages/index.vue'),
    name: 'index',
    meta: { title: 'cccsasas' },
    props: true,
  },
  // ...accessRoutes,
]

export default constantRoutes
