import { useLocaleStoreWithOut } from '~/store/modules/locale'
import { unref, computed } from 'vue'
import { i18n, localesConfigs } from './i18n'
import type { LocaleType } from '#/global'
import { setHtmlPageLang, loadedLanguages } from './help'
function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setLocaleInfo(locale)
  setHtmlPageLang(locale)
}

/**
 * 切换语言环境
 * @returns
 */
export function useLocaleHook() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)
  const getAntdLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {}
  })
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }
    if (loadedLanguages.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    if (!localesConfigs[locale]) return
    globalI18n.setLocaleMessage(locale, localesConfigs[locale])
    loadedLanguages.push(locale)
    setI18nLanguage(locale)
    return locale
  }

  return {
    changeLocale,
    getLocale,
    getAntdLocale,
  }
}
