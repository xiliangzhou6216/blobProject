<template>
  <div>
    <a-layout class="basicLayout-wrap">
      <SideMenu v-bind="layoutConf" />
      <a-layout class="basicLayout-section">
        <a-layout-header class="header">
          <div class="cursor-pointer">
            <a-space>
              <div class="cursor-pointer flex" @click="toggleDark()">
                <Icon icon="fluent:dark-theme-20-filled" :size="20" />
                <div class="ml-2">
                  {{ theme }}
                </div>
              </div>
              <AppLocale />
              <div class="cursor-pointer ml-6" @click="exitSystem">退出系统</div>
            </a-space>
          </div>
        </a-layout-header>
        <a-layout-content class="basicLayout-main">
          <Breadcrumb />
          <router-view v-slot="{ Component, route }">
            <transition name="fade-slide" mode="out-in" appear>
              <div :key="route.name">
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
// 子组件 sfc interface 定义 emits  props
import SideMenu from './components/SiderMenu/src/SideMenu'
import { clearMenuItem, filterRoutes } from './utils/index'
import { useUserStoreWithOut } from '~/store/modules/user'
import AppLocale from './components/Header/AppLocale.vue'
import useDarks from '~/composables/useDarks'
const router = useRouter()
const mdata = clearMenuItem(router.getRoutes()).filter(({ path }) => path.startsWith('/app/'))
const menuData = filterRoutes(mdata)
const userStore = useUserStoreWithOut()

const exitSystem = () => {
  userStore.logout()
  console.log(userStore.token)
}
const { isDark, toggleDark } = useDarks()
const theme = computed(() => (isDark.value ? 'dark' : 'light'))
const layoutConf = reactive({ menuWidth: 208, theme: 'dark', menuData })
watchEffect(() => {
  layoutConf.theme = unref(theme)
})
</script>
<style scoped lang="less">
.basicLayout-wrap {
  height: 100vh;
  overflow: hidden;

  .ant-layout-header {
    display: flex;
    justify-content: end;
    align-items: center;
    box-shadow: 0 1px 4px #00152914;
    z-index: 1;
  }

  .basicLayout-main {
    overflow-y: auto;
    padding: 0px 12px 12px;
  }
}
</style>
