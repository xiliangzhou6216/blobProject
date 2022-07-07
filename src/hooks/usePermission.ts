/**
 *
 * @description 处理权限
 */

import { usePermissionStore } from '~/store/modules/permission'

type modulesState = {
  action: string
  module: string
  name: string
  uri: string
}

export function usePermission() {
  const permissioStore = usePermissionStore()
  function hasPermission(value?: string | string[]): boolean {
    if (!value) {
      return true
    }
    // 管理员不验证
    if (permissioStore.getIsAdmin === 1) {
      return true
    }
    if (Array.isArray(value)) {
      for (const iterator of value) {
        const [module, action] = iterator.split('.')
        return permissioStore.getModules.some(
          (item: modulesState) => item.module === module && item.action === action
        )
      }
    }
    if (!Array.isArray(value)) {
      return permissioStore.getModules.some(
        (item: modulesState) =>
          item.module === value.split('.')[0] && item.action === value.split('.')[1]
      )
    }
    return true
  }
  return { hasPermission }
}
