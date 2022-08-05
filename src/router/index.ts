import { createRouter, createWebHistory } from 'vue-router'
import routes from './router.config'
console.log(routes)
export const router = createRouter({
  routes, // // 这里路由默认使用 constantRoutes
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  // https://juejin.cn/post/7051826951463370760#heading-27
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
