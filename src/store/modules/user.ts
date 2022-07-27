import { defineStore } from 'pinia'
import { store } from '~/store/index'
import { getToken, setToken, removeToken } from '~/utils/auth'
import { loginRequest } from '~/api/user/index'
import { router } from '~/router/index'

// 全局错误拦截
interface log {
  url: unknown
  info?: string
  time: string | null
  err: string | any
  name: string
  type: string
}
interface UserState {
  count: number
  token: string
  auths: string[]
  errorLog: log[]
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    count: 1,
    token: '',
    auths: [],
    errorLog: [],
  }),
  getters: {
    getCount(): number {
      return this.count
    },
    getToken(): string {
      return this.token || getToken()
    },
    getErrorLog(): log[] {
      return this.errorLog
    },
  },
  actions: {
    setErrorLog(info: log) {
      this.errorLog.push(info)
    },
    setToken(info: string) {
      this.token = info ?? '' // for null or undefined value
      setToken(info)
    },
    setAuth(auths: string[]) {
      this.auths = auths
    },
    resetState() {
      this.token = ''
      this.auths = []
    },
    countPlusOne() {
      this.count++
    },
    /**
     * @description: login
     * @param params {}
     * @returns
     */
    async login(params: any) {
      const { data } = await loginRequest(params)
      if (data && data.result) {
        // save token
        this.setToken(data.result.token)
      }
      return data
    },
    /**
     * @description logout
     * @param
     * @return void
     */
    async logout() {
      this.resetState()
      removeToken()
      router.replace('/login')
      // 重新加载
      location.reload()
    },
  },
})

// 需要手动注入store  组件外使用
export function useUserStoreWithOut() {
  return useUserStore(store)
}
