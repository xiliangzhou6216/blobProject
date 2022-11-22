<template>
  <div>
    <Table ref="tableRef" :columns="columns" :url="queryData" :actions="tableActions" />
    <UserModal ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
// import type { TableColumnsType } from 'ant-design-vue'
import axios from 'axios'
import { columns } from './constant'
import { useMessage } from '~/hooks/useMessage'
import UserModal from './components/UserModal.vue'

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
const { createMessage } = useMessage()
// 获取table组件实例
const tableRef = ref<any>()
const refresh = () => tableRef.value?.refresh()

const queryData = (params: apiParams) => {
  return axios.get<apiResult>('https://randomuser.me/api?noinfo', { params })
}
// 打开modal(新增/查看/编辑)
function addUser(val: any) {
  return new Promise((res) => {
    setTimeout(() => {
      res(val)
    }, 1000)
  })
}

function editUser(val: any) {
  return new Promise((res) => {
    setTimeout(() => {
      res(val)
    }, 2000)
  })
}

const modalRef = ref()
const openModal = (title: string, rowData: any) => {
  let params = {
    title,
    rowData: { ...rowData },
    disabled: title === '查看',
    api: title === '新增' ? addUser : title === '编辑' ? editUser : '',
    getTableList: tableRef.value.refresh,
  }
  modalRef.value.acceptParams(params)
}

function mock(val: any) {
  return new Promise((res) => {
    setTimeout(() => {
      res(val)
    }, 1000)
  })
}

// table actions
const tableActions = reactive([
  {
    label: '新增',
    permission: ['home.post'],
    onClick: async (row) => {
      openModal('新增', {})
      console.log(row, modalRef.value)
    },
  },
  {
    label: '查看',
    permission: ['home.post'],
    onClick: async (row) => {
      openModal('查看', { mobile: '44444444445454', role_id: 2 })
      console.log(row, modalRef.value)
    },
  },
  {
    label: '编辑',
    permission: ['home.post'],
    // ifShow: false,
    onClick: async (row) => {
      openModal('编辑', { mobile: '44444444445454', role_id: 2 })
      console.log(row, modalRef.value)
    },
  },
  {
    label: '删除',
    permission: ['others.post'],
    popConfirm: {
      title: '确认删除吗？',
      onConfirm: async (row) => {
        const res = await mock(1)
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

onMounted(() => {
  // console.log(tableRef.value, unref(tableRef.value.b))
})
</script>
