import type { LocaleType } from '#/global'

// 加载的语言
export const loadedLanguages: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}
