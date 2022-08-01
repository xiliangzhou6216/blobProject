import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang } from '../../locales/help'

// 导出
export let i18n: any

import { useLocaleStoreWithOut } from '~/store/modules/locale'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../../locales/*.y(a)?ml') //匹配所有在locales路径下的y(a)?ml文件
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')
    return [key.slice(14, yaml ? -5 : -4), value.default]
  })
)
console.log(import.meta.globEager('../../locales/*.y(a)?ml'), messages)

export default (app: App) => {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  console.log(messages, 99999)
  setHtmlPageLang(locale)
  i18n = createI18n({
    legacy: false,
    locale,
    messages, // {}
  })

  app.use(i18n)
}
