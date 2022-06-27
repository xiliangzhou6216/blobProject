import { defineStore } from 'pinia'
import { store } from '~/store/index'
import { getToken, setToken, removeToken } from '~/utils/auth'
import { loginRequest } from '~/api/user/index'
import { router } from '~/modules/router'

interface UserState {
  count: number
  token: string
  auths: string[]
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    count: 1,
    token: '',
    auths: [],
  }),
  getters: {
    getCount(): number {
      return this.count
    },
    getToken(): string {
      return this.token || getToken()
    },
  },
  actions: {
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
