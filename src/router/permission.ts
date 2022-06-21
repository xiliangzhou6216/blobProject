import { router } from '~/modules/router'
const whiteList = ['/login'] // 重定向白名单

router.beforeEach(async (to, from, next) => {
  const token = false
  console.log(to, from)
  // 未登录
  if (token) {
    console.log('token')
  } else {
    // 免登录白名单
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// console.log(router)
