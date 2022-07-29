<template>
  <a-dropdown placement="bottom">
    <a class="ant-dropdown-link" @click.prevent>
      <Icon icon="carbon:language" class="www" :size="20" />
    </a>
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item key="1">1st menu item</a-menu-item>
        <a-menu-item key="2">2nd menu item</a-menu-item>
        <a-menu-item key="3">3rd menu item</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'
import { PropType } from 'vue'

const props = defineProps({
  trigger: {
    type: Array as PropType<('contextmenu' | 'click' | 'hover')[]>,
    default: () => ['contextmenu'],
  },
  dropMenuList: {
    type: Array,
    default: () => [],
  },
})

const onClick: MenuProps['onClick'] = ({ key }) => {
  console.log(`Click on item ${key}`)
}
</script>

<style lang="less" scoped></style>
