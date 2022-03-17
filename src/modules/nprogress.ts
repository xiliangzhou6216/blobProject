import { router } from './router'
import { App } from 'vue'
import NProgress from 'nprogress'

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */

export default (app: App) => {
  router.beforeEach((to,from) => {
  console.log('全局路由前置守卫：to,from\n', to, from);
  // 设置页面标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE;
    if (!NProgress.isStarted()) {
      NProgress.start();
    }
  })
  router.afterEach((to, from) => {
    console.log('全局路由后置守卫：to,from\n', to, from);
    NProgress.done()
  })
}
