import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, loadedLanguages } from '../../locales/help'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import { LocaleDefault } from '~/settings/localeSetting'

const { fallback } = LocaleDefault
// 导出
export let i18n: any

import { useLocaleStoreWithOut } from '~/store/modules/locale'

function setI18nMessages(prefix = 'zh-CN') {
  // 可以换成读取后台的多语言信息
  return Object.fromEntries(
    Object.entries(
      import.meta.globEager('../../locales/*.y(a)?ml') //匹配所有在locales路径下的y(a)?ml文件
    ).map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    })
  )[prefix]
}

// 这里也可以引入时间库
export const localesConfigs = {
  en: {
    ...setI18nMessages('en'),
    antdLocale: enUS,
  },
  'zh-CN': {
    ...setI18nMessages('zh-CN'),
    antdLocale: zhCN,
  },
}

function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  setHtmlPageLang(locale)
  loadedLanguages.push(locale)
  return {
    legacy: false,
    locale,
    fallbackLocale: fallback, // 语言缺少翻译时备用
    messages: {
      [locale]: localesConfigs[locale],
    },
  }
}

export const setupI18n = async (app: App) => {
  const options = createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
