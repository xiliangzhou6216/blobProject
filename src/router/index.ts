import { createRouter, createWebHistory } from 'vue-router'
import constantRoutes from './router.config'
// console.log(constantRoutes)
export const router = createRouter({
  routes: constantRoutes, // // 这里路由默认使用 constantRoutes
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  // https://juejin.cn/post/7051826951463370760#heading-27
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
