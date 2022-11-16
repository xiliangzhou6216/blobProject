// import { roleEnum } from '~/enums/roleEnum'
export interface ActionItem {
  label?: string
  color?: 'success' | 'error' | 'warning'
  onClick?: Fn
  popConfirm?: popConfirmType
  // 权限控制
  permission?: string | string[]
  // 业务控制是否显示
  ifShow?: boolean
  // [propName: string]: any 接口任意类型
}
export interface popConfirmType {
  title: string
  okText?: string
  cancelText?: string
  onConfirm?: Fn
  onCancel?: Fn
}
