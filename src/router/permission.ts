import { router } from '~/modules/router'
const whiteList = ['/login'] // 重定向白名单

router.beforeEach(async (to, _, next) => {
  // console.log(to, _, next)
  // 未登录
  if (whiteList.includes(to.path)) {
    next()
  } else {
    next('/login')
  }
})
console.log(router)
