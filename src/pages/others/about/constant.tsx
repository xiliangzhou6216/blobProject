// import type { TableColumnsType } from 'ant-design-vue'
import { ColumnProps } from 'ant-design-vue/es/table'
import { Tag, Tooltip, Space } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
// import 'ant-design-vue/es/tag/style' // 加载 LESS
export const columns: ColumnProps[] = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'toIndex',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: ['name', 'first'], // 数组查询嵌套路径
  },
  {
    title: 'City',
    dataIndex: ['location', 'city'], // 数组查询嵌套路径
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
    title: (
      <Tooltip placement='topLeft' title='邮箱'>
        <Space align='center'>
          <span>邮箱</span>
          <QuestionCircleOutlined style='vertical-align:2px' />
        </Space>
      </Tooltip>
    ),
    dataIndex: 'email',
  },
  {
    title: 'Cell',
    dataIndex: 'cell',
    customRender: ({ text }) => {
      return (
        <Tooltip placement='topLeft' title={text}>
          {text}
        </Tooltip>
      )
    },
  },
  {
    title: '日期',
    key: 'toDate',
  },
  {
    title: '日期时间',
    key: 'toDateTime',
  },
  {
    title: 'picture',
    dataIndex: 'picture',
    customRender: ({ record }: any) => {
      return <img src={record.picture.medium}></img>
    },
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    customRender: ({}) => {
      const color = 'green'
      return <Tag color={color}>{() => '操作'}</Tag>
    },
  },
  {
    title: '操作',
    key: 'action',
  },
]
