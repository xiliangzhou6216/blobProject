import { router } from '~/router/index'
const whiteList = ['/login'] // 重定向白名单
import { getToken } from '~/utils/auth'
import { usePermissioStoreWithOut } from '~/store/modules/permission'
import { useMessage } from '~/hooks/useMessage'
const { createMessage } = useMessage()
const permissioStore = usePermissioStoreWithOut()
// const TogetInfo = true

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  console.log(to, from, hasToken)
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      console.log(111111)
      next({ path: '/' })
    } else {
      // 调用用户信息接口 获取用户的角色有没有权限
      // 没有权限的话 跳转到登录页面
      // 有权限的话 拿到角色访问的路由表，生成路由表，再通过router.addRoutes 添加到路由实例，实现权限的过滤
      const res = await permissioStore.getPermission()
      if (res?.modules?.length === 0) {
        // next('/login')
        next('/login')
        createMessage.error('没有任何权限')
        console.log(22222)
      } else {
        // 过滤权限路由
        const routes = await permissioStore.buildRoutesAction()
        // 404 路由一定要放在 权限路由后面
        routes.forEach((route) => {
          router.addRoute(route)
        })
        // console.log(routes, router)
        // next()
        // hack 方法
        // 不使用 next() 是因为，在执行完 router.addRoute 后，
        // 原本的路由表内还没有添加进去的路由，会 No match
        // replace 使路由从新进入一遍，进行匹配即可
        // next({ ...to, replace: true })
        next()
      }
      console.log(res, res?.modules?.length)
    }
  } else {
    console.log(2222)
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// console.log(router)
