<template>
  <div>
    <a-modal v-bind="modalState" @ok="handleSubmit" @cancel="handleCancel">
      <a-form
        ref="FormRef"
        name="dynamic_form_item"
        :model="modalState.rowData"
        :disabled="modalState.disabled"
        v-bind="layout"
        :rules="rules"
      >
        <a-form-item label="用户手机号" name="mobile">
          <a-input
            v-model:value="modalState.rowData!.mobile"
            :disabled="modalState.disabled"
            placeholder="请输入用户手机号"
          />
        </a-form-item>
        <a-form-item label="角色" name="role_id">
          <a-select
            v-model:value="modalState.rowData!.role_id"
            :options="roleOptions"
            placeholder="请选择角色"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useMessage } from '~/hooks/useMessage'
const { createMessage } = useMessage()
const roleOptions = computed(() => [
  { label: '管理员', value: 1 },
  { label: '普通', value: 2 },
])
const layout = {
  labelCol: { style: { width: '110px' } },
  wrapperCol: { span: 17 },
}

const FormRef = ref<FormInstance>()
// form
interface FormState {
  mobile: string
  role_id: number
}

interface modalProps {
  title: string
  disabled: boolean
  rowData?: FormState
  api?: (...arg: any[]) => Promise<any>
  getTableList?: () => void
  loading?: boolean
  visible?: boolean
}

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

// modal框状态
const modalState = ref<modalProps>({
  disabled: false,
  title: '',
  loading: false,
  visible: false,
})

let modalStateRef = modalState.value

// 接受父组件传过来的参数
const acceptParams = (params: modalProps): void => {
  console.log(modalState, params)
  modalState.value = params
  modalStateRef = modalState.value
  modalStateRef.visible = true
}

// 提交数据 （新增/编辑）
const handleSubmit = () => {
  console.log(FormRef.value)
  FormRef.value
    ?.validate()
    .then(async (res) => {
      modalStateRef.loading = true
      const result = await modalStateRef.api!(res) // 非空断言
      modalStateRef.loading = false
      console.log(res)
      if (result) {
        createMessage.success(`${modalStateRef.title}用户成功！`)
        modalStateRef.getTableList!()
        handleCancel()
      }
    })
    .catch(console.log)
}
const handleCancel = () => {
  modalStateRef.visible = false
  FormRef.value?.resetFields()
}

defineExpose({
  acceptParams,
})
</script>

<style scoped></style>
