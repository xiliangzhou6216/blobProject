<template>
  <div>
    <a-layout class="basicLayout-wrap">
      <a-layout-header class="header">
        <div class="layout-logo-box">
          <div class="layout-logo">
            <img :src="avatar" class="logo" alt="logo" />
            <div class="title">vue3-admin</div>
          </div>
        </div>
        <div class="sys-setting">系统设置</div>
      </a-layout-header>
      <a-layout>
        <SideMenu />
        <a-layout class="basicLayout-content">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
            <div>dddd</div>
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
  .basicLayout-content {
    height: calc(100vh - 64px);
    overflow-y: auto;
    margin: 0;
    padding: 24px;
  }
}

.site-layout-background {
  background: #fff;
}
</style>
