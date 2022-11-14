<template>
  <a-config-provider :locale="getAntdLocale">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { useLocaleHook } from '../locales/useLocale'
import { usePageTitle } from '~/hooks/usePageTitle'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// 支持多语言
const { getAntdLocale } = useLocaleHook()
console.log('my config env: ', import.meta.env, import.meta.env.PROD)
usePageTitle()
</script>
