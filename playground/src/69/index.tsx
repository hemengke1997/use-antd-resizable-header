import ProTable, { type ProColumns } from '@ant-design/pro-table'
import { Space, Tag } from 'antd'
import { useMemo } from 'react'
import request from 'umi-request'
import { useAntdResizableHeader } from 'use-antd-resizable-header'

type GithubIssueItem = {
  url: string
  id: number
  number: number
  title: string
  labels: {
    name: string
    color: string
  }[]
  state: string
  comments: number
  created_at: string
  updated_at: string
  closed_at?: string
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    width: 200,
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    width: 100,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    width: 180,
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_)
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'aaa',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    width: 200,
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        }
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'date',
    width: 200,
    sorter: true,
    hideInSearch: true,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _) => [
      <a href={record.url} target='_blank' rel='noopener noreferrer' key='view'>
        查看
      </a>,
    ],
  },
]

export default () => {
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns: useMemo(() => columns, []),
    columnsState: {
      persistenceType: 'localStorage',
      persistenceKey: 'aaaaa',
    },
  })
  return (
    <ProTable<GithubIssueItem>
      columns={resizableColumns}
      components={components}
      scroll={{ x: tableWidth }}
      cardBordered
      request={async (params = {}) => {
        return request<{
          data: GithubIssueItem[]
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        })
      }}
      rowKey='id'
      headerTitle='高级表格'
    />
  )
}
