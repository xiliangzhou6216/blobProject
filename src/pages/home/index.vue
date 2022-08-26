<template>
  <a-card>
    {{ t('about') }}
    {{ t('nesting.sir') }}
    <Icon icon="noto-v1:1st-place-medal" class="www" :size="50" />
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <div class="option">555555555555555</div>
    <div class="text-pink-300 min-h-800px">我是红色背景的白色文本11</div>
  </a-card>
</template>

<script setup lang="ts">
// import axios from 'axios'
// const { t } = useI18n()
import { useI18n } from '~/hooks/useI18n'

// console.log(useI18n)
const { t } = useI18n()

const visible = ref<boolean>(false)
const showModal = () => {
  visible.value = true
}
const handleOk = (e: MouseEvent) => {
  console.log(e)
  visible.value = false
}
</script>
<style lang="less">
.option {
  background: var(--prism-background);
  color: var(--prism-foreground);
}
</style>
