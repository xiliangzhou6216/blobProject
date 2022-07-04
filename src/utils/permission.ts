/**
 * @name permission
 * @description 路由处理工具
 */
import type { RouteRecordRaw } from 'vue-router'
type metaType = { permission?: string; title?: string }

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
