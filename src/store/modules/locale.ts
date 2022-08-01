import { defineStore } from 'pinia'
import { store } from '~/store/index'
import storage from 'store'
import { LOCALE_KEY } from '~/enums/cacheEnum'
// import { localeSetting } from '~/settings/localeSetting'
import type { LocaleType, LocaleState } from '#/global'

console.log(storage)
const localeSetting = {
  showPicker: true,
  localInfo: 'zh-CN',
}

export const useLocaleStore = defineStore('app-locale', {
  state: (): LocaleState => localeSetting as LocaleState,
  getters: {
    getShowPicker(): boolean {
      return this.showPicker
    },
    getLocale(): LocaleType {
      return this.localInfo ?? 'zh-CN'
    },
  },
  actions: {
    /**
     * 设置多语言信息和缓存
     * @param info
     */
    setLocaleInfo(info: LocaleType) {
      this.localInfo = info
      storage.set(LOCALE_KEY, this.localInfo)
    },
    /**
     * 初始化多语言信息并从本地缓存中加载现有配置
     */
    initLocale() {
      this.setLocaleInfo(localeSetting.localInfo as LocaleType)
    },
  },
})

// 需要在设置之外使用
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
