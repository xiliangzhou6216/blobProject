import { router } from '~/modules/router'
const whiteList = ['/login'] // 重定向白名单
import { getToken } from '~/utils/auth'

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
      next()
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
