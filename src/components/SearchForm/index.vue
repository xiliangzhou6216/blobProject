<template>
  <a-card :body-style="{ padding: '0 0 24px 0' }" :bordered="false">
    <a-form :model="formState">
      <a-row type="flex" :gutter="[{ xs: 8, sm: 16, md: 24, lg: 32 }]">
        <a-col>
          <a-form-item label="Activity">
            <a-input v-model:value="formState.name1" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="Activity444">
            <a-input v-model:value="formState.name1" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="创建时间">
            <a-date-picker v-model:value="formState.value1" @change="change" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-button type="primary" @click="search">点击</a-button>
          <a-button @click="reset">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { BreakPoint } from './type'
import { formatToDate } from '~/utils/dateUtil'
interface TableProps {
  searchColumns?: []
  searchParams?: { [key: string]: any } // 搜索参数
  colConfig: Record<BreakPoint, number>
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
}

// 默认值
const props = withDefaults(defineProps<TableProps>(), {
  searchColumns: () => [],
  searchParam: () => ({}),
})
console.log(props)

// 获取栅格占位格数
const getgetResponsive = (item) => {
  return {
    span: item?.span ?? 6,
		offset: item?.offset ?? 0,
  }
}

const change = (_val) => {
  console.log(_val, formatToDate(_val))
}

const formState = reactive({
  name: '',
  name1: '',
  value1: ref(),
})
</script>
