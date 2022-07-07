<template>
  <div>
    home
    <Icon icon="noto-v1:1st-place-medal" class="www" :size="50" />
  </div>
</template>

<script setup>
import { usePermission } from '~/hooks/usePermission'
const { hasPermission } = usePermission()
console.log(hasPermission('home.post'))
</script>
