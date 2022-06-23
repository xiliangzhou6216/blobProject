<template>
  <div class="login-form-box">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item name="username" :rules="[{ required: true, message: '请输入账户' }]">
        <a-input v-model:value="formState.username" placeholder="admin" />
      </a-form-item>
      <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="formState.password" placeholder="123456" />
      </a-form-item>
      <div class="login-form-wrap">
        <a-row>
          <a-col :span="12">
            <a-form-item name="remember" no-style>
              <a-checkbox size="small" v-model:checked="formState.remember">记住我</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col
            :span="12"
            :style="{
              'text-align': 'right',
              color: 'red',
            }"
          >
            <a-button size="small" type="link">忘记密码?</a-button>
          </a-col>
        </a-row>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: 'admin',
  password: '123456',
  remember: true,
})

const formRef = ref<FormInstance>()
const loading = ref(false)

const onFinish = (values: any) => {
  console.log('Success:', values)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
  console.log(formRef)
}
</script>
