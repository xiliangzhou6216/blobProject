<template>
  <div>
    <Table
      ref="tableRef"
      :columns="columns"
      :url="queryData"
      :tableFilterSearchColumns="tableFilterSearchColumns"
      :tableFilterSearchParams="tableFilterSearchParams"
      :actions="tableActions"
      :scroll="{ x: 2000 }"
      rowKey="login.uuid"
    >
      <template #headerCell="column">
        <template v-if="column.dataIndex === 'gender'">
          <smile-outlined />
          {{ column.title }}
        </template>
      </template>
      <template #tableHeader="{ isSelected, selectedAllRowKeys }">
        <a-space>
          <a-button @click="addClick">新增</a-button>
          <a-button @click="processClick(selectedAllRowKeys)" :disabled="!isSelected"
            >批量审核</a-button
          >
          <a-button @click="deleteClick(selectedAllRowKeys)" :disabled="!isSelected"
            >批量删除</a-button
          >
          <a-button @click="selectedAllClick(selectedAllRowKeys)" :disabled="!isSelected"
            >跨页多选</a-button
          >
        </a-space>
      </template>
    </Table>
    <UserModal ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
// import type { TableColumnsType } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
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
    [key: string]: any
  }[]
}
const { createMessage } = useMessage()
// 获取table组件实例
const tableRef = ref<any>()
const refresh = () => tableRef.value?.refresh()

// 初始化参数
const initParams = reactive({
  name: 'xiliang',
})

const queryData = async (params: apiParams) => {
  // 处理日期格式
  params = paramsHandleToDate({ ...initParams, ...params })
  const data = await axios.get<apiResult>('https://randomuser.me/api?noinfo', { params })
  return {
    list: data.data.results || [],
    total: 100,
  }
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
    onClick: async (row: object) => {
      openModal('新增', {})
      console.log(row, modalRef.value)
    },
  },
  {
    label: '查看',
    permission: ['home.post'],
    onClick: async (row: object) => {
      openModal('查看', { mobile: '18787777777', role_id: 2 })
      console.log(row, modalRef.value)
    },
  },
  {
    label: '编辑',
    permission: ['home.post'],
    // ifShow: false,
    onClick: async (row: any) => {
      openModal('编辑', { mobile: '2222222222222', role_id: 2 })
      console.log(row, modalRef.value)
    },
  },
  {
    label: '删除',
    permission: ['others.post'],
    popConfirm: {
      title: '确认删除吗？',
      onConfirm: async (row: any) => {
        const res = await mock(1)
        if (res) {
          createMessage.success('删除成功')
          refresh()
        }
        console.log('row', row, res)
      },
      onCancel: async (row: any) => {
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

// 新增
const addClick = () => {
  openModal('新增', {})
}

// 审核
const processClick = (val: any) => {
  createMessage.success(`审核所选${toRaw(val).join('------')}用户信息成功`)
}

// 删除
const deleteClick = (val: any) => {
  createMessage.success(`删除所选${val.join('------')}用户信息成功`)
}
// 多选全选
const selectedAllClick = (val: any) => {
  createMessage.success(`跨页勾选所选${val.join('------')}用户信息成功`)
}

onMounted(() => {
  // console.log(tableRef)
  // console.log(tableRef.value, unref(tableRef.value.b))
})
</script>
