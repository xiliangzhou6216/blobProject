<template>
  <div class="basicLayout-breadcrumb">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: any, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
const { currentRoute, push } = useRouter()
const routes = ref<any>([])
// const routes = ref<RouteLocationMatched[]>([])

watchEffect(() => {
  // 过滤路由
  const routeMatched = currentRoute.value.matched.filter(
    (item) => !['/', '/app'].includes(item.path)
  )
  // console.log(routeMatched)
  routes.value = routeMatched
})

const handleClick = (route: RouteLocationMatched, paths: string[], e: Event) => {
  e.preventDefault()
  const { path, redirect } = route
  // 有动态参数需要再单独处理
  const goPath = /^\//.test(path) ? path : `/${path}`
  if (redirect) {
    push(redirect as string)
  } else {
    push(goPath)
  }
}
</script>

<style scoped lang="less">
.basicLayout-breadcrumb {
  padding: 15px;
}
</style>
