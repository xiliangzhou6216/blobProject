import { get } from 'lodash-es'

/**
 * @description 表格多选数据操作
 * */
export const useSelection = (selectKey: string) => {
  // 选中的key
  const selectedRowKeys = ref([])
  // 选中的数据列表
  const selectedRows = ref([])

  // 是否选中数据
  const isSelected = ref<boolean>(false)

  // 当前选中的所有keys(数组)
  const selectedKeys = computed(() => {
    const ids: string[] = []
    selectedRows.value.forEach((item: any) => {
      ids.push(get(item, 'login.uuid'))
    })
    return ids
  })

  /**
   * @description 选中项发生变化时 多选操作
   * @param rowKeys
   */
  const onSelectChange = (rowKeys: any, Rows: any) => {
    isSelected.value = rowKeys.length === 0 ? false : true
    selectedRowKeys.value = rowKeys
    selectedRows.value = Rows
    console.log(Rows, rowKeys, selectedKeys.value, selectKey)
  }

  // 表格行 key 的取值 跨页多选
  const getRowKeys = (row: any) => {
    // console.log(get(row, 'login.uuid'), 99999)
    return get(row, 'login.uuid')
  }

  return {
    selectedRows,
    selectedKeys,
    isSelected,
    selectedRowKeys,
    onSelectChange,
    getRowKeys,
  }
}
