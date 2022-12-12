<template>
  <a-config-provider :locale="getAntdLocale">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
// import { ConfigProvider } from 'ant-design-vue'
import { useLocaleHook } from '../locales/useLocale'
import { usePageTitle } from '~/hooks/usePageTitle'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// 支持多语言
const { getAntdLocale } = useLocaleHook()
console.log('my config env: ', import.meta.env, import.meta.env.PROD)

// const colorState = reactive({
//   primaryColor: '#faad14',
//   linkColor: 'red',
//   errorColor: '#ff4d4f',
//   warningColor: '#faad14',
//   successColor: '#52c41a',
//   infoColor: '#1890ff',
// })
// ConfigProvider.config({
//   theme: colorState,
// })
usePageTitle()
</script>
