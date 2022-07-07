<template>
  <div>
    <span ref="elRef" :class="[$attrs.class, 'anticon']" :style="getWrapStyle"></span>
  </div>
</template>
<script lang="ts" setup>
import Iconify from '@purge-icons/generated'
import { CSSProperties } from 'vue'
interface Props {
  icon: string //icon的名字
  size?: number //字体大小
  color?: string //字体颜色
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
})

const elRef = ref<Element>()
const getWrapStyle = computed((): CSSProperties => {
  return {
    color: props.color,
    fontSize: `${props.size}px`,
    display: 'inline-flex',
  }
})

const update = async () => {
  const el = unref(elRef)
  if (!el) return
  await nextTick()
  const svg = Iconify.renderSVG(props.icon)
  if (!svg) {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = props.icon
    el.textContent = ''
    el.appendChild(span)
  } else {
    console.log(555)
    el.textContent = ''
    el.appendChild(svg)
  }
}

onMounted(() => {
  update()
})
</script>
