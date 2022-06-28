import { defineStore } from 'pinia'
import { store } from '~/store'
import { permissionRequest } from '~/api/user'
interface PermissioState {
  isGetUserInfo: boolean // 是否获取过用户信息
  isAdmin: 0 | 1 // 是否为管理员
  auths: string[] // 当前用户权限
  modules: string[] // 模块权限
  role: 0 | 1
}
export const usePermissioStore = defineStore({
  id: 'app-permission',
  state: (): PermissioState => ({
    isGetUserInfo: false,
    isAdmin: 0,
    auths: [],
    modules: [],
    role: 0,
  }),
  getters: {
    getAuths(): string[] {
      return this.auths
    },
    getRole(): 0 | 1 {
      return this.role
    },
    getModules(): string[] {
      return this.modules
    },
    getIsAdmin(): 0 | 1 {
      return this.isAdmin
    },
    getIsGetUserInfo(): boolean {
      return this.isGetUserInfo
    },
  },
  actions: {
    setAuth(auths: string[], modules: string[]) {
      this.auths = auths
      this.isGetUserInfo = true
      this.modules = modules
    },
    setIsAdmin(isAdmin: 0 | 1) {
      this.isAdmin = isAdmin
    },
    resetState() {
      this.isGetUserInfo = false
      this.isAdmin = 0
      this.auths = []
      this.modules = []
      this.role = 0
    },
    /**
     * 获取当前用户权限
     */
    async getPermission() {
      const {
        data: { result },
      } = await permissionRequest()
      if (result) {
        this.setAuth(result.auths, result.modules)
        this.setIsAdmin(result.is_admin)
      }
      return result
    },
  },
})

// 组件外使用
export function usePermissioStoreWithOut() {
  return usePermissioStore(store)
}
