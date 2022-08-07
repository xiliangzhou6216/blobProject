import { i18n } from '../../locales/i18n'

/**
 * @description 模板外使用
 * @returns TranslateResult
 */
export function useI18n() {
  const { t, ...methods } = i18n.global
  // console.log(i18n, getLocale)
  return {
    t: (key: string) => {
      if (!key) {
        return ''
      }
      return t(key)
    },
    ...methods,
  }
}
