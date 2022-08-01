import { useLocaleStoreWithOut } from '~/store/modules/locale'
import { unref, computed } from 'vue'
import { i18n } from '~/modules/i18n'
import type { LocaleType } from '#/global'
import { setHtmlPageLang } from './help'
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

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }
    const messages = Object.fromEntries(
      Object.entries(
        import.meta.globEager('./locales/*.y(a)?ml') //匹配所有在locales路径下的y(a)?ml文件
      ).map(([key, value]) => {
        const yaml = key.endsWith('.yaml')
        return [key.slice(14, yaml ? -5 : -4), value.default]
      })
    )
    console.log(locale, messages, import.meta.globEager('./**/.yml'))
    globalI18n.setLocaleMessage(locale, messages[locale])
    setI18nLanguage(locale)
    return locale
  }

  return {
    changeLocale,
    getLocale,
  }
}
