// import type { TableColumnsType } from 'ant-design-vue'
import { ColumnProps } from 'ant-design-vue/es/table'
import { Tag } from 'ant-design-vue'
// import 'ant-design-vue/es/tag/style' // 加载 LESS
export const columns: ColumnProps[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: 'Cell',
    dataIndex: 'cell',
  },
  {
    title: 'date',
    dataIndex: 'registered',
    customRender: ({ text, record }) => {
      return <div class='date'> record.registered.date</div>
    },
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    customRender: ({}) => {
      const color = 'green'
      return <Tag color={color}>{() => 'ceshi'}</Tag>
    },
  },
]
