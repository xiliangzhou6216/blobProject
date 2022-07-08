import { defineStore } from 'pinia'
import { store } from '~/store'
import { permissionRequest } from '~/api/user'
import type { RouteRecordRaw } from 'vue-router'
import constantRoutes, { accessRoutes, publicRoutes } from '~/router/router.config'
import { cloneDeep } from 'lodash-es'
import { filterAsyncRouter } from '~/utils/permission'

declare interface PermissionUserState {
  isGetUserInfo: boolean // 是否获取过用户信息
  isAdmin: 0 | 1 // 是否为管理员，当为角色为管理员时，跳过权限筛选
  auths: string[] // 当前用户权限：按钮操作、接口控制
  modules: modulesState[] // 模块权限：菜单与路由控制
  role: 0 | 1 // // 账号角色
  addRouters: RouteRecordRaw[] // 用户有权限的路由
}

declare interface modulesState {
  action: string
  module: string
  name: string
  url: string
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionUserState => ({
    isGetUserInfo: false,
    isAdmin: 0,
    auths: [],
    modules: [],
    role: 0,
    addRouters: [],
  }),
  getters: {
    getAuths(): string[] {
      return this.auths
    },
    getRole(): 0 | 1 {
      return this.role
    },
    getModules(): modulesState[] {
      return this.modules
    },
    getIsAdmin(): 0 | 1 {
      return this.isAdmin
    },
    getIsGetUserInfo(): boolean {
      return this.isGetUserInfo
    },
    getAddRouters(): RouteRecordRaw[] {
      return this.addRouters
    },
  },
  actions: {
    setAuth(auths: string[], modules: modulesState[]) {
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
      try {
        const {
          data: { result },
        } = await permissionRequest()
        if (result) {
          this.setAuth(result.auths, result.modules)
          this.setIsAdmin(result.is_admin)
        }
        return result
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 获取路由
     */
    async buildRoutesAction(): Promise<RouteRecordRaw[]> {
      const hash: any = {}
      this.modules.forEach((item: any) => {
        if (!hash[item.module]) {
          hash[item.module] = true
        }
      })
      const permissionList = Object.keys(hash)
      const routerMap = cloneDeep(accessRoutes)
      const accessRoutesFilter = filterAsyncRouter(routerMap, permissionList)
      this.addRouters = accessRoutesFilter
      // 404 路由一定要放在 权限路由后面
      const routes: RouteRecordRaw[] = [...constantRoutes, ...accessRoutesFilter, ...publicRoutes]
      return routes
    },
  },
})

// 组件外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
