<template>
  <div>
    <SearchForm
      :search="tableFilterSearch"
      :reset="tableFilterReset"
      :searchParam="tableFilterSearchParam"
      :columns="tableFilterSearchColumns"
      :colConfig="tableFilterSearchCol"
      v-show="isShowSearch"
    />
    <a-table
      :class="['ant-table-striped', { border: hasBordered }]"
      :columns="columns"
      :data-source="listData"
      :row-key="(record: any) => record.login.uuid"
      :pagination="pagination"
      :loading="loading"
      :scroll="scroll"
      @change="handleTableChange"
    >
      <!-- 默认插槽 -->
      <slot></slot>
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
              <a @click.prevent="() => {}" :class="{ 'mr-2': !!item.label }" :type="item.type">{{
                item.label
              }}</a>
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
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { TableProps } from 'ant-design-vue'
import { ActionItem } from './type'
import { formatToDate, formatToDateTime } from '~/utils/dateUtil'
import { usePagination } from 'vue-request'
import { usePermission } from '~/hooks/usePermission'
import { isBoolean } from '~/utils/is'
import { BreakPoint } from '~/components/SearchForm/type'

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
    /* 设置水平或垂直滚动​​，也可用于指定滚动区域的宽度和高度 */
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
    default: () => true,
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
  isShowSearch: {
    /* 显示表格查询按钮 */
    type: Boolean,
    default: () => true,
  },
  tableFilterSearchCol: {
    /* 表格搜索项 每列占比配置 */
    type: Object as PropType<Record<BreakPoint, number>>,
    default: () => ({ xs: 8, sm: 16, md: 24, lg: 32 }),
  },
  tableFilterSearchColumns: {
    /* 搜索配置列 */
    type: Array,
    default: () => [],
  },
  tableFilterSearchParam: {
    /*  搜索参数 */
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
})

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
  refresh,
  total,
} = usePagination(props.url, {
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
})

// 按钮业务控制显示
function isIfShow(val: boolean | undefined): boolean {
  const ifShow = val
  let flag = true
  if (isBoolean(ifShow)) {
    flag = ifShow
  }
  return flag
}

const { hasPermission } = usePermission()

// 表格操作
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

const getResults = computed(() => {
  // const pathList = unref(props.resKey)
  // if (pathList?.length) {
  //   let res = dataSource.value?.data
  //   for (let i = 0; i < pathList.length; i++) {
  //     res = res[pathList[i]]
  //   }
  //   console.log(res, dataSource.value?.data)
  //   return res
  // }
  return (dataSource.value?.data as Recordable)?.['results'] || []
})
const hasBordered = computed(() => props.bordered ?? true)

// 数据
const listData = computed(() => getResults.value)

// 分页
const pagination = computed(() => {
  return props.isPagination
    ? {
        total: 200,
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

// 表格 分页、排序、筛选变化
const handleTableChange: TableProps['onChange'] = (pag: any, filters: any, sorter: any) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  })
}

/**
 * @description  日期格式化
 * @param str
 * @param type
 */
const formatDate = (str: string, type: 'date' | 'time' = 'date') => {
  const formatFn = type === 'date' ? formatToDate : formatToDateTime
  // dayjs格式化 毫秒数需要13位
  return str.length === 10 ? formatFn(Number(str) * 1000) : formatFn(str)
}

const b = ref(2)
console.log(dataSource, props.actions)

const tableFilterSearch = () => { }
const tableFilterReset = () => { }

// 暴露 Table提供的API
defineExpose({
  b,
  refresh,
  total,
  run,
})
</script>
<style lang="less" scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

.ant-table-striped :deep(.ant-table-pagination.ant-pagination) {
  margin: 30px auto;
  width: 100%;
  text-align: center;

  .ant-pagination-prev,
  .ant-pagination-next {
    .anticon {
      vertical-align: 1.5px;
    }
  }
}

.ant-table-striped :deep(.ant-pagination-item-active) {
  background: #3860f4;

  a {
    color: #ffffff;
  }
}

.border {
  border: 0.5px solid rgba(210, 210, 210, 0.5);
}
</style>
