<template>
  <div>
    <a-button type="primary" @click="denglu">login</a-button>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter()
const denglu = () => {
  console.log(router.getRoutes(), 6666)
  router.replace('/app')
}
</script>
