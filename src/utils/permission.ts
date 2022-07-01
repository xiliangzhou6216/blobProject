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
  const res: RouteRecordRaw[] = []
  routerMap.forEach((route) => {
    const { permission } = (route.meta as metaType) || {}
    if (permission && permissionList.includes(permission)) {
      if (route.children?.length) {
        route.children = filterAsyncRouter(route.children, permissionList)
      }
      res.push(route)
    } else {
      console.log(route)
      if (route.children?.length) {
        route.children = filterAsyncRouter(route.children, permissionList)
        // console.log(route, route.children?.length)
        res.push(route)
      }
    }
  })
  return res
}
