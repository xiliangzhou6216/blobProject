import type { LocaleType } from '#/global'
export const localeList = [
  {
    key: 'zh-CN',
    text: '简体中文',
  },
  {
    key: 'en',
    text: 'English',
  },
]
interface LocaleSetting {
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
}

export const LocaleDefault: LocaleSetting = {
  fallback: 'zh-CN',
  locale: 'zh-CN',
}
