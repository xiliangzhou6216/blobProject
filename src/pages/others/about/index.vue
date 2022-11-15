<template>
  <div>
    <Table ref="ELRef" :columns="columns" :url="queryData" :actions="tableActions" />
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

// table actions
const tableActions = reactive([
  {
    label: '点击',
    // auth: AuthEnum.user_update,
    onClick: async (row) => {
      console.log(row)
    },
  },
  {
    label: '删除',
    popConfirm: {
      title: '确认删除吗？',
      onConfirm: async (row) => {
        console.log('row', row)
      },
      onCancel: async (row) => {
        console.log('row', row)
      },
    },
  },
])

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
