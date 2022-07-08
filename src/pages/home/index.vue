<template>
  <div>
    home
    <Icon icon="noto-v1:1st-place-medal" class="www" :size="50" />
    <a-button type="primary" @click="ceshi">测试</a-button>
  </div>
</template>

<script setup>
const ceshi = () => {
  console.log(1111)
}
</script>
