import { App } from 'vue'
import generatedRoutes from 'virtual:generated-pages' // pages下自动生成的路由数据
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default (app: App) => app.use(router)
