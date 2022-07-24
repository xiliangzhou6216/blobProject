<template>
  <div>
    <a-button type="primary" @click="() => router.push('/app/home')">login</a-button>
    <span>{{ store.count }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~/store/modules/user'
const router = useRouter()
const store = useUserStore()
</script>
