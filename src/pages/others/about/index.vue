<template>
  <div class="qwe">
    <Table
      ref="tableRef"
      :columns="columns"
      :url="queryData"
      :tableFilterSearchColumns="tableFilterSearchColumns"
      :tableFilterSearchParams="tableFilterSearchParams"
      :actions="tableActions"
      :scroll="{ x: 1900 }"
    />
    <UserModal ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
// import type { TableColumnsType } from 'ant-design-vue'
import { dateUtil, paramsHandleToDate } from '~/utils/dateUtil'
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
  // 处理日期格式
  params = paramsHandleToDate({ name: 'xiliang', ...params })
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

// 打开弹窗（新增/编辑/查看）
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
      openModal('查看', { mobile: '18787777777', role_id: 2 })
      console.log(row, modalRef.value)
    },
  },
  {
    label: '编辑',
    permission: ['home.post'],
    // ifShow: false,
    onClick: async (row) => {
      openModal('编辑', { mobile: '2222222222222', role_id: 2 })
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

// table search
const roleOptions = computed(() => [
  { label: '管理员', value: 1 },
  { label: '普通', value: 2 },
])

const tableFilterSearchColumns = [
  {
    type: 'Select', // 元素类型
    name: 'role_id', // 字段
    label: '角色',
    placeholder: '请选择角色',
    col: {
      span: 12,
    }, // 栅格占比
    // defaultValue: [], // 默认值
    options: roleOptions.value, // 数据
    fieldNames: { label: 'label', value: 'value' }, // select下拉 字段名字
  },
  {
    type: 'Input',
    label: '账号',
    name: 'search',
    placeholder: '请输入姓名',
    col: {
      span: 7,
    },
  },
  {
    type: 'Input',
    label: '菜单',
    name: 'menu',
    placeholder: '请输入姓名',
    col: {
      span: 8,
    },
  },
  {
    type: 'DatePicker',
    label: '创建时间',
    name: 'date',
    placeholder: '时间',
    col: {
      span: 6,
    },
  },
  {
    type: 'MonthPicker',
    label: '选择月份',
    name: 'month',
    placeholder: '时间',
    col: {
      span: 6,
    },
  },
]
const tableFilterSearchParams = reactive({
  role_id: 1,
  search: 'xixi',
  menu: '',
  date: dateUtil('2022/12/01'),
  month: dateUtil('2022/11'),
})
onMounted(() => {
  // console.log(tableRef)
  // console.log(tableRef.value, unref(tableRef.value.b))
})
</script>
