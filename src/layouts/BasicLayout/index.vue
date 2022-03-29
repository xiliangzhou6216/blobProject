<template>
  <div>
    <a-layout class="components-layout-demo">
      <a-layout-header class="header">
        <div class="layout-logo-box">
          <div class="layout-logo">
            <img :src="avatar" class="logo" alt="logo" />
            <div class="title">vite+ts+vue3</div>
          </div>
        </div>
        <div class="sys-setting">aafaf</div>
      </a-layout-header>
      <a-layout>
        <SideMenu />
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            Content
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
// 子组件 sfc interface 定义 emits  props
// import { UserOutlined, LaptopOutlined } from '@ant-design/icons-vue'
import avatar from '~/assets/avatar.png'
import SideMenu from '~/layouts/BasicLayout/SideMenu'

// const selectedKeys2 = ref<string[]>(['1'])
// const openKeys = ref<string[]>(['sub1'])
</script>
<style scoped lang="less">
.components-layout-demo {
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
  .ant-layout-header {
    display: flex;
    justify-content: space-between;
    color: #fff;
    background: #fff;
    align-items: center;
    padding: 0 16px;
  }
}

.site-layout-background {
  background: #fff;
}
</style>
