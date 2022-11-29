<template>
  <a-card :body-style="{ padding: '0 0 24px 0' }" :bordered="false">
    <a-form :model="getSearchParams">
      <a-row type="flex" :gutter="[{ xs: 8, sm: 16, md: 24, lg: 32 }]">
        <template v-for="item in getSearchColumns" :key="item.name">
          <a-col :span="item?.col">
            <a-form-item :label="`${item.label}`" :name="item.name">
              <component
                v-if="item.type"
                :is="componentMap[item.type]"
                :options="item?.options"
                v-model:value="getSearchParams[item.name]"
                :placeholder="item.placeholder"
              />
            </a-form-item>
          </a-col>
        </template>
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
import { Input, Select } from 'ant-design-vue'
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
  searchParams: () => ({}),
})

// 查询类型
const getSearchColumns = computed(() => {
  return props.searchColumns.map((item: any) => {
    return {
      ...item,
      type: item.type,
    }
  })
})
const getSearchParams = reactive(props.searchParams || {})
console.log(Input)
// 表单组件类型
const componentMap: any = {
  Input,
  Select,
}
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
</script>
