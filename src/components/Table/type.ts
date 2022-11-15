export interface ActionItem {
  label?: string
  color?: 'success' | 'error' | 'warning'
  onClick?: Fn
  popConfirm?: popConfirmType
  // [propName: string]: any 接口任意类型
}
export interface popConfirmType {
  title: string
  okText?: string
  cancelText?: string
  onConfirm?: Fn
  onCancel?: Fn
}
