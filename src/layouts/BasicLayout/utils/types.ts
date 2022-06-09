export interface MetaRecord {
  title?: string
  [key: string]: any
}

export interface MenuItemData {
  path: string
  name?: string | symbol
  meta?: MetaRecord
  /**
   * 子菜单
   */
  children?: MenuItemData[]
}
