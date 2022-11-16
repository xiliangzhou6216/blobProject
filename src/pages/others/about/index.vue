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
import { useMessage } from '~/hooks/useMessage'

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
// 获取组件实例
const ELRef = ref<any>()
const refresh = () => ELRef.value?.refresh()

const queryData = (params: apiParams) => {
  return axios.get<apiResult>('https://randomuser.me/api?noinfo', { params })
}

function mock() {
  return new Promise((res) => {
    setTimeout(() => {
      res(1)
    }, 1000)
  })
}

const { createMessage } = useMessage()
// table actions
const tableActions = reactive([
  {
    label: '编辑',
    permission: ['home.post'],
    // ifShow: false,
    onClick: async (row) => {
      console.log(row)
    },
  },
  {
    label: '删除',
    permission: ['others.post'],
    popConfirm: {
      title: '确认删除吗？',
      onConfirm: async (row) => {
        const res = await mock()
        if (res) {
          createMessage.success('删除成功')
          refresh()
        }
        console.log('row', row, res)
      },
      onCancel: async (row) => {
        console.log('row', row)
      },
    },
  },
])


const handleSubmit = () => {
  console.log('ELRef.value', ELRef.value)
  refresh()
}

onMounted(() => {
  console.log(ELRef.value, unref(ELRef.value.b))
})
</script>
