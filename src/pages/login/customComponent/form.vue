<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item name="price" label="Price" :rules="[{ validator: checkPrice }]">
      <priceInput v-model:value="formState.price" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import priceInput from './price-input.vue'
import type { Currency } from './price-input.vue'
interface FormState {
  username: string
  password: string
  remember: boolean
  price: unknown
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
  price: {
    number: 0,
    currency: 'rmb' as Currency,
  },
})
const checkPrice = (_: any, value: { number: number }) => {
  if (value.number > 0) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Price must be greater than zero!'))
}
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
