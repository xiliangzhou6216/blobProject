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
    name: 'others二级菜单关于',
    uri: '/api/user/permission',
  },
  {
    action: 'post',
    module: 'otherschild',
    name: 'otherschild组件c',
    uri: '/api/user/permission1',
  },
]

const hash = {}
modules.forEach((item) => {
  if (!hash[item.module]) {
    hash[item.module] = true
  }
})
const permissionList = Object.keys(hash)
const routes = cloneDeep(accessRoutes)
function filterAsyncRouter(routerMap, permissionList) {
  const res = []
  routerMap.forEach((route) => {
    const permission = route.meta?.permission
    if (permission && permissionList.includes(permission)) {
      if (route.children) {
        route.children = filterAsyncRouter(route.children, permissionList)
      }
      res.push(route)
    } else {
      console.log(route)
      if (route.children) {
        route.children = filterAsyncRouter(route.children, permissionList)
        res.push(route)
      }
    }
  })
  return res
}
const ceshi = () => {
  console.log(cloneDeep(accessRoutes), permissionList)
  console.log(filterAsyncRouter(routes, permissionList))
}
</script>
