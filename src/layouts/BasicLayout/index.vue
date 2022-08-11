<template>
  <div>
    <a-layout class="basicLayout-wrap">
      <a-layout-header class="header">
        <div class="layout-logo-box">
          <div class="layout-logo">
            <img :src="avatar" class="logo" alt="logo" />
            <div class="title">admin</div>
          </div>
        </div>
        <div class="cursor-pointer">
          <a-space>
            <div class="cursor-pointer m-6" @click="toggleDark()">theme: {{ theme }}</div>
            <AppLocale/>
            <div class="cursor-pointer ml-6" @click="exitSystem">退出系统</div>
          </a-space>
        </div>
      </a-layout-header>
      <a-layout>
        <SideMenu v-bind="layoutConf" />
        <a-layout class="basicLayout-section">
          <div class="basicLayout-breadcrumb">
            <Breadcrumb />
          </div>
          <a-layout-content class="basicLayout-main">
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
    </a-layout>
  </div>
</template>
<script setup lang="ts">
// 子组件 sfc interface 定义 emits  props
import avatar from '~/assets/logo.png'
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
  .basicLayout-content {
  }
  .ant-layout-header {
    display: flex;
    justify-content: space-between;
    background: var(--prism-background);
    color: var(--prism-foreground);
    align-items: center;
    padding: 0 16px;
    box-shadow: 0 1px 4px #00152914;
    z-index: 1;
    .layout-logo-box {
      height: 100%;
      .layout-logo {
        display: flex;
        .logo {
          width: 50px;
          height: 50px;
        }
        .title {
          font-size: 20px;
          // color: black;
          padding: 0 10px;
        }
      }
    }
  }
  .basicLayout-section {
    height: calc(100vh - 64px);
    overflow-y: auto;
    margin: 0;
    // padding: 24px;
  }
  .basicLayout-main {
    padding: 12px;
  }
  .basicLayout-breadcrumb {
    padding: 12px;
    // background: var(--prism-background);
    // color: var(--prism-foreground);
  }
}
</style>
