import { defineStore } from 'pinia'
import { store } from '~/store/index'
import { setToken } from '~/utils/auth'
export const useUserStore = defineStore('app-user', {
  state: () => ({
    count: 1,
    token: '',
    auths: [],
  }),
  getters: {
    getCount(): number {
      return this.count
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
    async login(params: any) {
      const res = await Promise.resolve(params)
      this.setToken(res)
      return res
    },
  },
})

// 需要手动注入store  组件外使用
export function useUserStoreWithOut() {
  return useUserStore(store)
}
