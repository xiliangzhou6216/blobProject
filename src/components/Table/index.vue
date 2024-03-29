<template>
  <div>
    <SearchForm
      ref="searchFormElRef"
      :search="search"
      :reset="reset"
      :searchParams="searchParams"
      :searchColumns="searchColumns"
      :colConfig="tableFilterSearchCol"
      v-show="isShowSearch"
    />
    <div class="table-el">
      <a-card>
        <!-- 表格header 按钮 -->
        <div class="table-el-header">
          <!-- 新增 导出 按钮 -->
          <div class="table-el-header-button-left">
            <slot
              name="tableHeader"
              :selectedAllRowKeys="selectedAllRowKeys"
              :selectedRows="selectedRows"
              :selectedRowKeys="selectedRowKeys"
              :isSelected="isSelected"
            ></slot>
          </div>
          <!-- 表格下载 列设置按钮 -->
          <div class="table-el-header-button-right">
            <a-space>
              <a-button>
                <template #icon>
                  <setting-outlined />
                </template>
                列设置
              </a-button>
              <a-button>
                <template #icon>
                  <download-outlined />
                </template>
                下载
              </a-button>
            </a-space>
          </div>
        </div>
        <a-table
          ref="tableElRef"
          :class="['ant-table-striped', { border: hasBordered }]"
          :columns="columns"
          :data-source="listData"
          :row-key="getRowKeys"
          :row-selection="rowSelection"
          :pagination="pagination"
          :loading="loading"
          :scroll="scroll"
          @change="handleTableChange"
        >
          <!-- 表格默认插槽 -->
          <slot></slot>
          <!-- header头部单元格 -->
          <template #headerCell="{ column }">
            <slot name="headerCell" v-bind="column"></slot>
          </template>
          <!-- column单元格 -->
          <template #bodyCell="{ column, index, record, text }">
            <template v-if="column.key === 'toIndex'">
              <span>
                {{ index + 1 }}
              </span>
            </template>
            <template v-if="column.key === 'toDate'">
              <span>
                {{ text ? formatDate(text) : '--' }}
              </span>
            </template>
            <template v-if="column.key === 'toDateTime'">
              <span>
                {{ text ? formatDate(text, 'time') : '--' }}
              </span>
            </template>
            <!-- 操作列 -->
            <template v-if="column.key === 'action'">
              <template v-for="(item, index) in getActions" :key="`${index}-${item.label}`">
                <!-- 气泡确认框 -->
                <a-popconfirm
                  v-if="item.enable"
                  :title="item?.title"
                  @confirm="item.onConfirm(record)"
                  @cancel="item.onCancel(record)"
                >
                  <a
                    @click.prevent="() => {}"
                    :class="{ 'mr-2': !!item.label }"
                    :type="item.type"
                    >{{ item.label }}</a
                  >
                </a-popconfirm>
                <!-- 普通按钮 -->
                <a
                  v-else
                  @click="item?.onClick(record)"
                  :class="{ 'mr-2': !!item.label }"
                  :type="item.type"
                  >{{ item.label }}
                </a>
                <a-divider v-if="index < getActions.length - 1" type="vertical" />
              </template>
            </template>
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { TableProps } from 'ant-design-vue'
import { ActionItem } from './type'
import { formatDate } from '~/utils/dateUtil'
import { usePagination } from 'vue-request'
import { usePermission } from '~/hooks/usePermission'
import { isBoolean } from '~/utils/is'
import { BreakPoint } from '~/components/SearchForm/type'
import { cloneDeep } from 'lodash-es'
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { useSelection } from '~/hooks/useSelection'

const props = defineProps({
  columns: {
    /* Table组件：columns不包含操作列 */
    type: Array as PropType<TableProps['columns']>,
    default: () => [],
  },
  url: {
    /* 请求接口 Promise  */
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  actions: {
    /* Table组件：操作列 */
    type: Object as PropType<ActionItem[]>,
    default: () => null,
  },
  scroll: {
    /* 设置水平或垂直滚动​​，也可用于指定滚动区域的宽度和高度  宽度必须大于表格本身占比宽度 才会滚动效果*/
    type: Object as PropType<{ x?: number; y?: number }>,
    default: null,
  },
  bordered: {
    /* 边框样式 */
    type: Boolean,
    default: () => true,
  },
  isPagination: {
    /* 展示分页 */
    type: Boolean,
    default: true,
  },
  resKey: {
    // ['a', 'b']
    type: Array as PropType<string[]>,
    default: () => [],
  },
  isToolButton: {
    /* 显示表格功能按钮 */
    type: Boolean,
    default: () => true,
  },
  isSelection: {
    /* 显示自定义选择项 */
    type: Boolean,
    default: () => true,
  },
  isShowSearch: {
    /* 显示表格查询按钮 */
    type: Boolean,
    default: () => true,
  },
  tableFilterSearchCol: {
    /* 表格搜索项 每列占比配置 */
    type: Object as PropType<Partial<Record<BreakPoint, number>>>,
    default: () => ({ xs: 8, sm: 16, md: 24, lg: 32 }),
  },
  tableFilterSearchColumns: {
    /* 搜索配置列 */
    type: Array as PropType<any>,
    default: () => [],
  },
  tableFilterSearchParams: {
    /*  搜索参数 */
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  rowKey: {
    /* 选中key */
    type: String,
    default: () => 'key',
  },
})

const searchFormElRef = ref()
// 表格DOM
const tableElRef = ref<any>()
const filteredInfo = ref()
const sortedInfo = ref()

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
  refresh,
  total,
} = usePagination(props.url, {
  defaultParams: [
    // 默认参数
    {
      results: 10,
      page: 1,
    },
  ],
  pagination: {
    currentKey: 'page', // 指定接口当前页参数的属性值
    pageSizeKey: 'results', //每页条数
  },
})

const { hasPermission } = usePermission()
// 按钮业务控制显示
function isIfShow(val: boolean | undefined): boolean {
  const ifShow = val
  let flag = true
  if (isBoolean(ifShow)) {
    flag = ifShow
  }
  return flag
}

// 表格action操作
const getActions = computed(() => {
  return (toRaw(props.actions) || [])
    .filter((item) => hasPermission(item.permission) && isIfShow(item?.ifShow))
    .map((item) => {
      const { popConfirm } = item
      return {
        type: 'link',
        ...item,
        ...(item.popConfirm || {}),
        onClick: item?.onClick || (() => {}),
        onConfirm: popConfirm?.onConfirm || (() => {}),
        onCancel: popConfirm?.onCancel || (() => {}),
        enable: !!item.popConfirm,
      }
    })
})

// 表格多选操作
const {
  selectedRowKeys,
  onSelectChange,
  getRowKeys,
  selectedRows,
  isSelected,
  selectedAllRowKeys,
} = useSelection(props.rowKey)

const rowSelection = props.isSelection
  ? computed(() => ({
      selectedRowKeys: unref(selectedRowKeys),
      onChange: (rowKeys: any, Rows: any) => onSelectChange(rowKeys, Rows, unref(current)),
    }))
  : undefined

// loadsh_get 获取对象路径
// const getResults = computed(() => {
//   const pathList = unref(props.resKey)
//   if (pathList?.length) {
//     let res = dataSource.value?.data
//     for (let i = 0; i < pathList.length; i++) {
//       res = res[pathList[i]]
//     }
//     console.log(res, dataSource.value?.data)
//     return res
//   }
//   return (dataSource.value?.list as Recordable) || []
// })

const hasBordered = computed(() => props.bordered ?? true)

// 数据
const listData = computed(() => dataSource.value?.list)

// 分页
const pagination = computed(() => {
  return props.isPagination
    ? {
        total: dataSource.value?.total,
        hideOnSinglePage: true,
        current: current.value,
        pageSize: pageSize.value,
        showQuickJumper: true,
        showSizeChanger: true,
        // showTotal: (total: any) => h('span', {}, `共 ${total} 条`),
        showTotal: (total: number) => `总 ${total} 条`,
      }
    : false
})

// SearchFrom
const searchParams = computed(() => props.tableFilterSearchParams)
const searchColumns = computed(() => props.tableFilterSearchColumns)

/**
 * @description 表格 分页、排序、筛选变化
 * @param pag
 * @param filters
 * @param sorter  descend 降序 ascend 升序
 */
const handleTableChange: TableProps['onChange'] = (pag: any, filters: any, sorter: any) => {
  filteredInfo.value = filters
  sortedInfo.value = sorter
  run({
    results: pag.pageSize,
    page: pag.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
    ...searchParams.value, // 表单查询参数
  })
}

// 重新查询
const runSearch = (initParams: object) => {
  run({
    results: pageSize.value,
    page: current.value,
    sortField: sortedInfo.value?.field,
    sortOrder: sortedInfo.value?.order,
    ...initParams,
    ...filteredInfo.value,
  })
}

// 请求
const search = () => {
  const args = searchParams.value || {}
  runSearch(args)
}

const initSearchParams = cloneDeep(props.tableFilterSearchParams)

// 重置请求
const reset = () => {
  // 初始化参数
  Object.keys(props.tableFilterSearchParams).forEach((item: string) => {
    ;(props.tableFilterSearchParams as Recordable)[item] = initSearchParams[item]
  })
  filteredInfo.value = null
  sortedInfo.value = null
  run({ results: 10, page: 1, ...initSearchParams })
}

// 暴露 Table提供的API
defineExpose({
  searchFormEl: searchFormElRef,
  refresh,
  total,
  run,
  runSearch,
  reset,
})
</script>
<style lang="less" scoped>
.table-el {
  .ant-card:deep(.anticon) {
    vertical-align: 1.5px;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    &-button-left {
    }

    &-button-right {
    }
  }

  // .ant-table-striped :deep(.table-striped) td {
  //   background-color: #fafafa;
  // }

  // .ant-table-striped :deep(.ant-table-pagination.ant-pagination) {
  //   margin: 30px auto;
  //   width: 100%;
  //   text-align: center;

  //   .ant-pagination-prev,
  //   .ant-pagination-next {
  //     .anticon {
  //       // vertical-align: 1.5px;
  //     }
  //   }
  // }

  // .ant-table-striped :deep(.ant-pagination-item-active) {
  //   background: #3860f4;

  //   a {
  //     color: #ffffff;
  //   }
  // }

  .border {
    border: 0.5px solid rgba(210, 210, 210, 0.5);
  }
}
</style>
