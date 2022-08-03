<template>
  <a-config-provider :locale="getAntdLocale">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { useLocaleHook } from '../locales/useLocale'
// 支持多语言
const { getAntdLocale } = useLocaleHook()
</script>
