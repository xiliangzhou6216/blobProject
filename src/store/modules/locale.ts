import { defineStore } from 'pinia'
import { store } from '~/store/index'
import storage from 'store'
import { LOCALE_KEY } from '~/enums/cacheEnum'
import { LocaleDefault } from '~/settings/localeSetting'
import type { LocaleType, LocaleState } from '#/config'
const { locale } = LocaleDefault
const localeConfigs = {
  showPicker: true,
  localInfo: storage.get(LOCALE_KEY) || locale,
}

export const useLocaleStore = defineStore('app-locale', {
  state: (): LocaleState => localeConfigs as LocaleState,
  getters: {
    getShowPicker(): boolean {
      return this.showPicker
    },
    getLocale(): LocaleType {
      return this.localInfo
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
      this.setLocaleInfo(this.localInfo as LocaleType)
    },
  },
})

// 需要在setup之外使用
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
