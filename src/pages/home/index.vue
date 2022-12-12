<template>
  <a-card>
    <!-- <div>{{ infoRef.newKey }} {{ infoRef.bar }}</div>
    <div>{{ state.data }}</div> -->
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
// const state = reactive({
//   data: [1],
// })

// const infoRef = ref<any>(source()) // template 里必须绑定的是 infoRef 不能是 info !!
// let info = infoRef.value // Js里操作只操作 info 就可以不用 infoRef.value 了
// function reset() {
//   // 这样需要重置整个响应式对象就不需要 Object.assign和考虑深拷贝问题了
//   infoRef.value = source()
//   // 重新初始化整个响应式对象时，用来数据操作的实际变量也需要重新赋值！
//   info = infoRef.value
// }
// function source() {
//   return {
//     foo: 1,
//     bar: 2,
//     obj: { a: 1 },
//   }
// }

// 测试
// setTimeout(() => {
//   // let { data } = toRefs(state)
//   state.data = [1, 2, 3]
//   info.bar *= 110
//   info.newKey = 666
// }, 3000)
// setTimeout(() => {
//   reset()
// }, 4000);
// setTimeout(() => {
//   info.bar = 987654321
// }, 5000);
</script>
<style lang="less">
.option {
  background: var(--prism-bg-color);
  color: var(--prism-text-color);
}
</style>
