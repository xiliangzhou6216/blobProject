import { router } from '~/router/index'
const whiteList = ['/login'] // 重定向白名单
import { getToken, removeToken } from '~/utils/auth'
import { usePermissionStoreWithOut } from '~/store/modules/permission'
import { useMessage } from '~/hooks/useMessage'
const { createMessage } = useMessage()
const permissioStore = usePermissionStoreWithOut()

// 防止路由无限循环
let routeFlag: Boolean = false

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  // console.log(to, from, hasToken)
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      // console.log(111111)
      next({ path: '/' })
    } else {
      // 调用用户信息接口 获取用户的角色有没有权限
      // 没有权限的话 跳转到登录页面
      // 有权限的话 拿到角色访问的路由表，生成路由表，再通过router.addRoutes 添加到路由实例，实现权限的过滤
      if (routeFlag) {
        if (permissioStore.getModules.length === 0) {
          removeToken()
          next('/login')
          createMessage.error('没有任何权限')
        } else {
          // console.log(555555)
          next()
        }
      } else {
        // 过滤权限路由
        const res = await permissioStore.getPermission()
        const routes = await permissioStore.buildRoutesAction()
        routes.forEach((route) => {
          router.addRoute(route)
        })
        routeFlag = true
        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        const redirectPath = (from.query.redirect || to.path) as string
        const redirect = decodeURIComponent(redirectPath)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        next(nextData)
        console.log(4444444, res, routes)
        // 不使用 next() 是因为，在执行完 router.addRoute 后，
        // 原本的路由表内还没有添加进去的路由，会 No match
        // replace 使路由从新进入一遍，进行匹配即可
      }
    }
  } else {
    // console.log(222222)
    routeFlag = false
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// console.log(router)
