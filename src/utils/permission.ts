/**
 * @name permission
 * @description 路由处理工具
 */
import type { RouteRecordRaw } from 'vue-router'
type metaType = { permission?: string; title?: string }

// 不需要权限过滤的 白名单
export const WhiteList = [
  '/api/user/login',
  '/api/user/permission',
  '/api/account/info',
  '/api/createUser',
]

export function filterAsyncRouter(
  routerMap: RouteRecordRaw[],
  permissionList: string[]
): RouteRecordRaw[] {
  const accessedRouters: RouteRecordRaw[] = routerMap.filter((route) => {
    const { permission } = (route.meta as metaType) || {}
    if (permission && permissionList.includes(permission)) {
      return true
    } else if (route.children) {
      route.children = filterAsyncRouter(route.children, permissionList)
      return route.children.length !== 0
    } else {
      return false
    }
  })
  return accessedRouters
}
