<template>
  <div>
    <Table ref="ELRef" :columns="columns" :url="queryData" />
    <a-button @click="handleSubmit">刷新</a-button>
  </div>
</template>
<script setup lang="ts">
// import type { TableColumnsType } from 'ant-design-vue'
import axios from 'axios'
import { columns } from './constant'

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
    [key: string]: any
  }[]
}
const queryData = (params: apiParams) => {
  return axios.get<apiResult>('https://randomuser.me/api?noinfo', { params })
}

// const columns: TableColumnsType = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     sorter: true,
//   },
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     filters: [
//       { text: 'Male', value: 'male' },
//       { text: 'Female', value: 'female' },
//     ],
//   },
//   {
//     title: 'Email',
//     dataIndex: 'email',
//     customRender: (value) => {
//       return value
//     },
//   },
//   {
//     title: 'Cell',
//     dataIndex: 'cell',
//   },
//   {
//     title: 'date',
//     dataIndex: 'registered',
//   },
// ]
// 获取组件实例
const ELRef = ref<any>()
const refresh = () => ELRef.value?.refresh()
const handleSubmit = () => {
  console.log('ELRef.value', ELRef.value)
  refresh()
}

onMounted(() => {
  console.log(ELRef.value, unref(ELRef.value.b))
})
</script>
