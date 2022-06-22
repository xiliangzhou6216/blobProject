<template>
  <div>
    <div class="container-box">
      <div class="container-box-left"><div class="container-box-left-img"></div></div>
      <div class="container-box-right">
        <div class="container-box-content">
          <div class="container-box-header">
            <span>
              <img class="container-box-header-logo" :src="logo" alt="login-logo" />
              <span class="container-box-header-title">艾德CRM系统</span>
            </span>
          </div>
          <div class="container-box-login">
            <login-form />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from '~/assets/login/logo.svg'
import LoginForm from './form.vue'
</script>

<style lang="less" scoped>
.container-box {
  display: flex;
  justify-content: space-between;
  &-left,
  &-right {
    flex: 1;
  }
  &-left-img {
    height: 100vh;
    background: url(~/assets/login/plate.svg) no-repeat center;
    background-size: cover;
  }
  &-header {
    text-align: center;
    margin-bottom: 60px;
    &-logo {
      display: inline-block;
      height: 50px;
      vertical-align: top;
      border-style: none;
    }
    &-title {
      font-size: 32px;
      margin: 0 20px;
      font-family: PingFangHK, PingFangHK-Medium;
      font-weight: 500;
      text-align: left;
      color: #3773e1;
    }
  }
  &-content {
    background: #f0f2f5 url(~/assets/login/background.svg) no-repeat center;
    background-size: 100%;
    padding: 204px 0 223px;
    height: 100%;
  }
}
</style>
