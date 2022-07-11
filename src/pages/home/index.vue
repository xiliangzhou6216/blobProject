<template>
  <div>
    home
    <Icon icon="noto-v1:1st-place-medal" class="www" :size="50" />
    <a-button @click="info">Info</a-button>
  </div>
</template>

<script setup>
import { useMessage } from '~/hooks/useMessage'
const { createErrorModal } = useMessage()
const info = () => {
  createErrorModal({ title: 'fsfsdfsf', content: 'dfsffsdd' })
}
</script>
