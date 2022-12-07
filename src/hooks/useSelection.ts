import { get } from 'lodash-es' // 获取对象路径

/**
 * @description 表格多选数据操作
 * */
export const useSelection = (rowKey: string) => {
  // 选中的key
  const selectedRowKeys = ref([])
  // 选中行的数据列表
  const selectedRows = ref([])

  // 是否选中数据
  const isSelected = ref<boolean>(false)

  // 每一页作为key  勾选作为value
  const selectedRowKeysMap = ref(new Map<number, string[]>())

  // 当前选中的所有keys(数组)
  const selectedAllRowKeys: any = computed(() => {
    return [...selectedRowKeysMap.value.values()].flatMap((x: any) => x)
  })

  /**
   * @description 选中项发生变化时 多选操作
   * @param rowKeys
   */

  const onSelectChange = (rowKeys: any, Rows: any, current: number) => {
    selectedRowKeysMap.value.set(current, rowKeys)
    // 选中的数据 优先使用selectedRowKeysMap的中current对应的值  selectedRowKeys.valued的是proxy  toRaw()可以转换成原始对象
    selectedRowKeys.value = selectedRowKeysMap.value.get(current) ?? rowKeys
    // selectedRowKeys.value = selectedAllRowKeys.value
    selectedRows.value = Rows
    isSelected.value = selectedAllRowKeys.value.length === 0 ? false : true
    console.log(rowKeys, isSelected.value)
  }

  // 表格行 key 的取值 跨页多选
  const getRowKeys = (row: any) => {
    return get(row, rowKey)
  }

  return {
    selectedRows,
    selectedAllRowKeys,
    isSelected,
    selectedRowKeys,
    onSelectChange,
    getRowKeys,
  }
}
