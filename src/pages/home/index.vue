<template>
  <div>
    {{ t('about') }}
    {{t('nesting.sir')}}
    <Icon icon="noto-v1:1st-place-medal" class="www" :size="50" />
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
// const { t } = useI18n()
import { useI18n } from '~/hooks/useI18n'

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
