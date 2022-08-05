import { i18n } from '~/modules/i18n'
/**
 * @description 模板外使用
 * @returns TranslateResult
 */
export function useI18n() {
  console.log(i18n)
  const { t, ...methods } = i18n.global
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
