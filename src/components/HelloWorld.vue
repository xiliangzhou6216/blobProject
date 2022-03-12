<script setup lang="ts">
import { ref, computed } from 'vue'
import useDarks from '~/composables/useDarks'
const { isDark, toggleDark } = useDarks()
const { locale, t, availableLocales } = useI18n()

defineProps<{ msg: string }>()

const count = ref(0)
const theme = computed(() => (isDark.value ? '黑色' : '白色'))
const language = computed(() => (locale.value === 'zh-CN' ? '中文' : 'English'))
const toggleLocal = () => {
  locale.value = locale.value === 'en' ? 'zh-CN' : 'en'
  console.log(t('languages'))
}
const name = ref('xiliang')
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <div class="cursor-pointer m-6" @click="toggleDark()">theme: {{ theme }}</div>
  <div class="cursor-pointer m-6" @click="toggleLocal()">
    <div>语言{{ language }}</div>
    <div>base: {{ t('about') }}</div>
    <div>{{ t('nesting.sir') }}</div>
    <div>
      {{ t('nesting.hi', { name: name }) }}
    </div>
    <div>
      {{ t('languages') }}
    </div>
    <!-- <div  v-for="(item, index) in t('localArr')" :key="index">
        {{}}
    </div> -->
  </div>
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
