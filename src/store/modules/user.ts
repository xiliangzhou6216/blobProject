import { defineStore } from 'pinia'
import { store } from '~/store/index'
import { getToken, setToken, removeToken } from '~/utils/auth'
import { loginRequest } from '~/api/user/index'
import { router } from '~/router/index'
const isDark = useDark()

// 全局错误拦截
interface log {
  url: unknown
  info?: string
  time: string | null
  err: string | any
  name: string
  type: string
}
interface themeConfigType {
  primary: string
  isDark: boolean
}

interface UserState {
  count: number
  token: string
  auths: string[]
  errorLog: log[]
  themeConfig: themeConfigType
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    count: 1,
    token: '',
    auths: [],
    errorLog: [],
    themeConfig: {
      // 默认 primary 主题颜色
      primary: '#1890ff',
      // 深色模式
      isDark: isDark.value,
    },
  }),
  getters: {
    getThemeConfig(): themeConfigType {
      return this.themeConfig
    },
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
    setThemeConfig(themeConfig: themeConfigType) {
      this.themeConfig = themeConfig
    },
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
