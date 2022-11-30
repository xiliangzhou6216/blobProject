<template>
  <a-card v-if="!isHidden" :body-style="{ padding: '24px 24px 0 24px' }" :bordered="false">
    <a-form :model="getSearchParams">
      <a-row type="flex" :gutter="[{ xs: 8, sm: 16, md: 24, lg: 32 }]">
        <template v-for="item in getSearchColumns" :key="item.name">
          <a-col v-bind="getResponsive(item)">
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
        <a-col :span="4" :class="showExpand ? 'mb-6' : ''">
          <a-space>
            <a-button type="primary" @click="search">点击</a-button>
            <a-button @click="reset">重置</a-button>
            <a-button v-if="showExpand" type="link" @click="expand = !expand" class="search-isOpen">
              <template v-if="expand">
                收起
                <UpOutlined />
              </template>
              <template v-else>
                展开
                <DownOutlined />
              </template>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { BreakPoint } from './type'
import { formatToDate } from '~/utils/dateUtil'
import { Input, Select } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
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

const isHidden = ref<boolean>(true)
watchEffect(() => {
  isHidden.value = props.searchColumns.length ? false : true
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

// 默认栅格宽度
const SPAN_WIDTH = 4

// 获取栅格布局
const getResponsive = (item: any) => {
  return {
    span: item?.col?.span ?? SPAN_WIDTH,
    offset: item?.col?.offset ?? 0,
    lg: item?.col?.lg,
    md: item?.col?.md,
    sm: item?.col?.sm,
    xs: item?.col?.xs,
  }
}

const expand = ref<boolean>(false)
const showExpand = computed(() => {
  const spanTotal = props.searchColumns.reduce((pre: number, item: any) => {
    pre += item?.col?.span ?? SPAN_WIDTH
    return pre
  }, 0)
  return spanTotal > 20 ? true : false
})

let len: any = unref(props.searchColumns)
const findIndex = () => {
  let num = 0
  for (let i = 0; i < len.length; i++) {
    num += len[i]?.col?.span ?? SPAN_WIDTH
    if (num > 20) {
      console.log(i)
      // break
      // return i
    }
  }
}
console.log(findIndex(), 9999)
const change = (_val) => {
  console.log(_val, formatToDate(_val))
}
</script>
<style lang="less" scoped>
.search-isOpen {
  display: inline-flex;
  align-items: center;
}
</style>
