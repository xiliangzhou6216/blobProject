import type { LocaleType } from '#/global'
export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}
