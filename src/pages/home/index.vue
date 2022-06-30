<template>
  <div>home</div>
  <div><a-button @click="ceshi"> 点击 </a-button></div>
</template>

<script setup>
import constantRoutes, { accessRoutes, publicRoutes } from '~/router/router.config'
import { cloneDeep } from 'lodash-es'

const modules = [
  {
    action: 'post',
    module: 'home',
    name: 'home模块',
    uri: '/api/user/login',
  },
  {
    action: 'post',
    module: 'others',
    name: 'others二级菜单',
    uri: '/api/user/permission',
  },
]

const hash = {}
modules.forEach((item) => {
  if (!hash[item.module]) {
    hash[item.module] = true
  }
})
const ceshi = () => {
  console.log(accessRoutes)
}
</script>
