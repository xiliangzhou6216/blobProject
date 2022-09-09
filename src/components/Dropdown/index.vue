<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <a-menu @click="onClick" :selectedKeys="selectedKeys">
        <template v-for="item in dropMenuList" :key="item.key">
          <a-menu-item v-bind="getAttr(item.key)">{{ item.text }}</a-menu-item>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'
import { PropType } from 'vue'
import { DropMenuType } from './type'

const props = defineProps({
  /**
   * @default ['hover']
   */
  trigger: {
    type: Array as PropType<('contextmenu' | 'click' | 'hover')[]>,
    default: () => ['contextmenu'], // 上下文菜单键
  },
  dropMenuList: {
    type: Array as PropType<DropMenuType[]>,
    default: () => [],
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

// 注册
const emit = defineEmits(['menuEvent'])

const onClick: MenuProps['onClick'] = ({ key }) => {
  const menu = props.dropMenuList.find((item: DropMenuType) => item.key === key)
  emit('menuEvent', menu)
}
// 小技巧 把属性绑定表达式
const getAttr = (key: string) => ({ key })

const a = 1
const b = ref(2)

defineExpose({
  a,
  b,
})
</script>

<style lang="less" scoped></style>
