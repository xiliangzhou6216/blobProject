<script setup lang="ts">
import { ref } from 'vue'
import useDarks from '~/composables/useDarks'
const {isDark,toggleDark} =useDarks()

defineProps<{ msg: string }>()

console.log(9999,isDark.value)

const count = ref(0)
const theme = computed(() => isDark.value ? '黑色' : '白色')
</script>

<template>
  <h1>{{ msg }} </h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <div class="cursor-pointer m-6" @click="toggleDark()">theme: {{ theme }}</div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
