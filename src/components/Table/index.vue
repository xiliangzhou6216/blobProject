<template>
  <div>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      ref="searchInput"
      tableLayout="fixed"
      :scroll="{ x: 1300, y: 540 }"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'name'">
          <a>xixi</a>
        </template>
      </template>
    </a-table>

    <div ref="p">6666</div>
  </div>
</template>

<script setup lang="ts">
import { createUserRequest } from '~/api/account'
import type { TableColumnsType } from 'ant-design-vue'
const dataSource = reactive(
  [...Array(100)].map((_, i) => ({
    key: i,
    name: `Edward King军军军军军军军军所 ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    address1: `London, Park Lane no. ${i}`,
    address2: `London, Park Lane no. ${i}`,
    address3: `London, Park Lane no. ${i}`,
  }))
)

const columns = reactive<TableColumnsType>([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    fixed: 'left',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '住址14',
    dataIndex: 'address1',
    key: 'address1',
    width: 200,
  },
  {
    title: '住址133',
    dataIndex: 'address2',
    key: 'address2',
    width: 200,
  },
  {
    title: '住址2',
    dataIndex: 'address3',
    key: 'address3',
    width: 200,
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8', fixed: 'right' },
])
const res = await createUserRequest()
console.log(res, 666)
const searchInput = ref()
console.log(searchInput)
</script>
