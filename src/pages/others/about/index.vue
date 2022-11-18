<template>
  <div>
    <Table
      ref="ELRef"
      :columns="columns"
      :url="queryData"
      :actions="tableActions"
      :resKey="['result', 'data']"
    />
    <a-modal v-bind="modalState" @ok="handleSubmit" @cancel="handleCancel">
      <a-form
        ref="FormRef"
        name="dynamic_form_item"
        :model="formState"
        v-bind="layout"
        :rules="rules"
      >
        <a-form-item label="用户手机号" name="mobile">
          <a-input v-model:value="formState.mobile" placeholder="请输入用户手机号" />
        </a-form-item>
        <a-form-item label="角色" name="role_id">
          <a-select
            v-model:value="formState.role_id"
            :options="roleOptions"
            placeholder="请选择角色"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
// import type { TableColumnsType } from 'ant-design-vue'
import axios from 'axios'
import { columns } from './constant'
import { useMessage } from '~/hooks/useMessage'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
const roleOptions = computed(() => [
  { label: '管理员', value: 1 },
  { label: '普通', value: 2 },
])

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
// 获取组件实例
const FormRef = ref<FormInstance>()
const ELRef = ref<any>()
const refresh = () => ELRef.value?.refresh()
const layout = {
  labelCol: { style: { width: '110px' } },
  wrapperCol: { span: 17 },
}

const queryData = (params: apiParams) => {
  return axios.get<apiResult>('https://randomuser.me/api?noinfo', { params })
}

function mock(val: any) {
  return new Promise((res) => {
    setTimeout(() => {
      res(val)
    }, 1000)
  })
}

// form
interface FormState {
  mobile: string
  role_id: unknown
}

const formState = ref<FormState>({
  mobile: '',
  role_id: undefined,
})

const rules: Record<string, Rule[]> = {
  mobile: [
    {
      validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请输入用户手机号')),
      required: true,
      trigger: 'blur',
    },
  ],
  role_id: [
    {
      validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      required: true,
      trigger: 'change',
    },
  ],
}

// modal
const modalState = reactive({
  title: '新增用户',
  okText: '确定',
  loading: false,
  visible: false,
})

// table actions
const tableActions = reactive([
  {
    label: '编辑',
    permission: ['home.post'],
    // ifShow: false,
    onClick: async (row) => {
      modalState.title = '修改用户'
      modalState.okText = '修改'
      modalState.visible = true
      formState.value = {
        mobile: '44444444445454',
        role_id: 2,
      }
      console.log(row)
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

// form submit
const handleSubmit = () => {
  console.log(FormRef.value)
  FormRef.value
    ?.validate()
    .then(async (res) => {
      modalState.loading = true
      const result = await mock(res)
      modalState.loading = false
      console.log(formState.value, res)
      if (result) {
        createMessage.success(`${modalState.title === '新增用户' ? '新增' : '修改'}用户成功`)
        handleCancel()
        refresh()
      }
    })
    .catch(console.log)
}
const handleCancel = () => {
  modalState.visible = false
  FormRef.value?.resetFields()
}

onMounted(() => {
  console.log(ELRef.value, unref(ELRef.value.b))
})
</script>
