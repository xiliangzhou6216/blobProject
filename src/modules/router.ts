import { App } from 'vue'
import generatedRoutes from 'virtual:generated-pages' // pages下自动生成的路由数据
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

const routes = setupLayouts(generatedRoutes)
console.log(import.meta.env)

export const router = createRouter({
  routes,
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  // https://juejin.cn/post/7051826951463370760#heading-27
  history: createWebHistory(import.meta.env.BASE_URL),
})

export default (app: App) => app.use(router)
