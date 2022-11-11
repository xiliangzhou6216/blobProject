<template>
  <div>
    <a-table
      :class="['ant-table-striped', { border: hasBordered }]"
      :columns="columns"
      :data-source="listData"
      :row-key="(record:any) => record.login.uuid"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { TableProps } from 'ant-design-vue'
import { usePagination } from 'vue-request'

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
  actionColumn: {
    /* Table组件：操作列 */
    type: Object as PropType<any>,
    default: null,
  },
  scroll: {
    /* 设置水平或垂直滚动​​，也可用于指定滚动区域的宽度和高度 */
    type: Object as PropType<{ x?: number; y?: number }>,
    default: null,
  },
  bordered: {
    /* 边框样式 */
    type: Boolean,
    default: null,
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
const b = ref(2)
defineExpose({
  b,
  refresh,
  total,
})

const hasBordered = computed(() => props.bordered ?? true)
const listData = computed(() => dataSource.value?.data.results || [])
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}))

const handleTableChange: TableProps['onChange'] = (pag: any, filters: any, sorter: any) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  })
}
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
