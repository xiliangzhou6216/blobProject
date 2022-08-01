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
import { DropMenu } from './type'

const props = defineProps({
  /**
   * @default ['hover']
   */
  trigger: {
    type: Array as PropType<('contextmenu' | 'click' | 'hover')[]>,
    default: () => ['contextmenu'], // 上下文菜单键
  },
  dropMenuList: {
    type: Array as PropType<DropMenu[]>,
    default: () => [],
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits(['menuEvent'])

const onClick: MenuProps['onClick'] = ({ key }) => {
  const menu = props.dropMenuList.find((item: DropMenu) => item.key === key)
  emit('menuEvent', menu)
  console.log(`Click on item ${key}`)
}
// 小技巧 把属性绑定表达式
const getAttr = (key: string) => ({ key })
</script>

<style lang="less" scoped></style>
