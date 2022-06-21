<template>
  <div>
    <div class="container-box">
      <div class="container-box-left"><div class="container-box-left-img"></div></div>
      <div class="container-box-right"><img :src="logo" alt="" /></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~/store/modules/user'
import logo from '~/assets/logo.png'
// import plate from '~/assets/login/plate.svg'
const router = useRouter()
const store = useUserStore()
</script>

<style lang="less" scoped>
.container-box {
  display: flex;
  justify-content: space-between;
  .container-box-left,
  .container-box-right {
    flex: 1;
  }
  .container-box-left-img {
    height: 100vh;
    background: url('~/assets/login/plate.svg');
    background-size: cover;
  }
}
</style>
