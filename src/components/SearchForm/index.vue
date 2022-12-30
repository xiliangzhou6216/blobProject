<template>
  <div class="mb-4">
    <a-card v-if="!isHidden" :body-style="{ padding: '24px 24px 0 24px' }" :bordered="false">
      <a-form name="search_columns" id="search_columns" :model="getSearchParams">
        <a-row type="flex" :gutter="colConfig">
          <template v-for="(item, i) in getSearchColumns" :key="item.name">
            <a-col v-show="expand || i <= expandFindIndex" v-bind="getResponsive(item)">
              <a-form-item :label="`${item.label}`" :name="item.name">
                <component
                  v-if="item.type"
                  :is="componentMap[item.type]"
                  :options="item?.options"
                  v-model:value="getSearchParams[item.name]"
                  allowClear
                  :placeholder="item.placeholder"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :span="4" :class="colSpanTotal > 20 ? 'mb-6' : ''">
            <a-space>
              <a-button type="primary" @click="search">点击</a-button>
              <a-button @click="reset">重置</a-button>
              <a-button
                v-if="showExpand"
                type="link"
                @click="expand = !expand"
                class="search-isOpen"
              >
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
  </div>
</template>

<script setup lang="ts">
import { BreakPoint } from './type'
import { Input, Select, DatePicker, MonthPicker, RangePicker } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
interface TableProps {
  searchColumns?: []
  searchParams?: { [key: string]: any } // 搜索参数
  colConfig: Partial<Record<BreakPoint, number>>
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
}

// const labelCol = { style: { width: '80px' } }
// const labelCol = { span: 6 }

// 表单组件类型
const componentMap: any = {
  Input,
  Select,
  DatePicker,
  MonthPicker,
  RangePicker,
}

// 默认值
const props = withDefaults(defineProps<TableProps>(), {
  searchColumns: () => [],
  searchParams: () => ({}),
})

// 栅格间隔
// const colGutter = [props?.colConfig, {}]
// 隐藏查询表单列
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

// 默认展开不显示
const expand = ref<boolean>(false)

// 查询列 栅格占比数
const colSpanTotal = computed(() => {
  return props.searchColumns.reduce((pre: number, item: any) => {
    pre += item?.col?.span ?? SPAN_WIDTH
    return pre
  }, 0)
})
// 显示展开/收起
const showExpand = computed(() => (colSpanTotal.value > 24 ? true : false))

let columnsList: any = unref(props.searchColumns)

// 栅格显示最小数
const expandFindIndex = computed((defaultV = 0) => {
  const len = columnsList.length
  if (!columnsList) return 0
  let num = 0
  for (let i = 0; i < len; i++) {
    num += columnsList[i].col?.span ?? SPAN_WIDTH
    if (num >= 20) {
      // 栅格布局占比大于24时 需要隐藏计算时最后一个
      if (num > 24) {
        return i - 1
      }
      return i
    }
  }
  // 栅格布局占比小于20
  if (num <= 20) return len - 1
  // 兜底 防止其他条件不满足时
  return defaultV
})
console.log(expandFindIndex.value, 9999)
</script>
<style lang="less" scoped>
#search_columns .ant-picker {
  width: 100%;
}
.search-isOpen {
  display: inline-flex;
  align-items: center;
}
</style>
