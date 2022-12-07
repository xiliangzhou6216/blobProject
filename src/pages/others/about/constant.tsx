import type { TableColumnsType } from 'ant-design-vue'
// import { ColumnProps } from 'ant-design-vue/es/table'
import { Tag, Tooltip, Space } from 'ant-design-vue'
import { QuestionCircleOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons-vue'
// import 'ant-design-vue/es/tag/style' // 加载 LESS
export const columns: TableColumnsType = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'toIndex',
    sorter: true,
    width: 100,
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
    customRender: ({ text }) => {
      const color = text === 'female' ? 'green' : '#cd201f'
      const com = text === 'female' ? TwitterOutlined : YoutubeOutlined
      return (
        <Tag color={color} icon={<com />}>
          {() => text}
        </Tag>
      )
    },
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
    width: 230,
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
    width: 150,
    key: 'toDate',
    dataIndex: ['registered', 'date'],
  },
  {
    title: '日期时间',
    key: 'toDateTime',
    width: 200,
    dataIndex: ['registered', 'date'],
  },
  {
    title: 'picture',
    dataIndex: 'picture',
    customRender: ({ record }: any) => {
      return <img src={record.picture.medium}></img>
    },
  },
  {
    title: '操作',
    width: 250,
    fixed: 'right',
    key: 'action',
  },
]
