import type { TableColumnsType } from 'ant-design-vue'
import { Tag, Tooltip } from 'ant-design-vue'
export const columns: TableColumnsType = [
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
      console.log(record)
      return record.registered.date
    },
  },
]
