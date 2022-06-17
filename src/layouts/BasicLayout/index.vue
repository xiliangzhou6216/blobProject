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
        <div class="sys-setting">系统设置</div>
      </a-layout-header>
      <a-layout>
        <SideMenu v-bind="layoutConf" />
        <a-layout class="basicLayout-section">
          <div class="basicLayout-breadcrumb">
            <Breadcrumb />
          </div>
          <a-layout-content class="basicLayout-main">
            <a-card>
              <router-view v-slot="{ Component, route }">
                <!-- https://www.jianshu.com/p/399667ec9ef8  -->
                <transition name="fade-slide" mode="out-in" appear>
                  <div :key="route.name">
                    <component :is="Component" />
                  </div>
                </transition>
                <!-- <transition name="fade-slide" mode="out-in" appear>
                  <suspense>
                    <template #default>
                      <component :is="Component" :key="route.name" />
                    </template>
                    <template #fallback> Loading... </template>
                  </suspense>
                </transition> -->
              </router-view>
            </a-card>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
// 子组件 sfc interface 定义 emits  props
import avatar from '~/assets/avatar.png'
import SideMenu from './components/SiderMenu/src/SideMenu'
import { clearMenuItem, filterRoutes } from './utils/index'
const router = useRouter()
const mdata = clearMenuItem(router.getRoutes()).filter(({ path }) => path.startsWith('/app/'))
const menuData = filterRoutes(mdata)
const layoutConf = reactive({ menuWidth: 208, theme: 'light', menuData })
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
    color: #fff;
    background: #fff;
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
          color: black;
          padding: 0 10px;
        }
      }
    }
    .sys-setting {
      color: black;
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
    background-color: #fff;
  }
}

.site-layout-background {
  background: #fff;
}
</style>
