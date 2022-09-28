<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="listData"
      :row-key="(record) => record.login.uuid"
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
// import { createUserRequest } from '~/api/account'
import type { TableProps } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { usePagination } from 'vue-request'
import axios from 'axios'

const columns: TableColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]
type apiParams = {
  results: number
  page?: number
  sortField?: string
  sortOrder?: number
  [key: string]: any
}

type apiResult = {
  results: {
    gender: 'female' | 'male'
    name: string
    email: string
  }[]
}
const queryData = (params: apiParams) => {
  return axios.get<apiResult>('https://randomuser.me/api?noinfo', { params })
}

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
})

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
