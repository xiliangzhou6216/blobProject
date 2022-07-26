<template>
  <div class="login-form-box">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
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
        <a-button type="primary" :loading="loading" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~/store/modules/user'
import { useMessage } from '~/hooks/useMessage'
const loading = ref(false)
const userStore = useUserStore()
const { createMessage } = useMessage()
const router = useRouter()

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

const onFinish = async (values: unknown) => {
  console.log('Success:', values)
  loading.value = true
  const res = await userStore.login(values)
  loading.value = false
  if (res.result) {
    createMessage.success('登录成功')
    router.replace('/')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
