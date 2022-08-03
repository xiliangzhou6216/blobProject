// declare type Recordable<T = any> = Record<string, T>
export type LocaleType = 'zh-CN' | 'en'

export interface LocaleState {
  localInfo: LocaleType
  showPicker: boolean
}
