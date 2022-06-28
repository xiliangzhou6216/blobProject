import { router } from '~/router/index'
const whiteList = ['/login'] // 重定向白名单
import { getToken } from '~/utils/auth'
import { usePermissioStoreWithOut } from '~/store/modules/permission'
const permissioStore = usePermissioStoreWithOut()

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  console.log(to, from, hasToken)
  if (hasToken) {
    // 已登录
    // next('/')
    if (to.path === '/login') {
      next({ path: '/' })
      console.log(11111)
    } else {
      console.log(22222)
      // 调用用户信息接口 获取用户的角色有没有权限
      // 没有权限的话 跳转到登录页面
      // 有权限的话 拿到角色访问的路由表，生成路由表，再通过router.addRoutes 添加到路由实例，实现权限的过滤

      //是否获取过用户信息
      const isGetUserInfo = permissioStore.getIsGetUserInfo
      if (isGetUserInfo) {
        next()
      } else {
        const res = await permissioStore.getPermission()
        console.log(res, 6666)
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// console.log(router)
