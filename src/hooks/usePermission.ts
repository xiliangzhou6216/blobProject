/**permissionStore
 *
 * @description 处理权限
 */

import { usePermissionStore } from '~/store/modules/permission'

type modulesState = {
  action: string
  module: string
  name: string
  url: string
}

export function usePermission() {
  const permissionStore = usePermissionStore()
  function hasPermission(value?: string | string[], def = true): boolean {
    if (!value) {
      return def
    }
    // 管理员不验证
    // if (permissionStore.getIsAdmin === 1) {
    //   return true
    // }
    if (Array.isArray(value)) {
      for (const iterator of value) {
        const [module, action] = iterator.split('.')
        return permissionStore.getModules.some(
          (item: modulesState) => item.module === module && item.action === action
        )
      }
    }
    if (!Array.isArray(value)) {
      return permissionStore.getModules.some(
        (item: modulesState) =>
          item.module === value.split('.')[0] && item.action === value.split('.')[1]
      )
    }
    return true
  }
  return { hasPermission }
}
