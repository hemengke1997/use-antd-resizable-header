import { useMemo, useState } from 'react'
import { Button, Table, type TableColumnsType, Tag } from 'antd'
import { type ResizableColumnsType, useAntdResizableHeader } from 'use-antd-resizable-header'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

type Columns = ResizableColumnsType<TableColumnsType<DataType>>

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

export function Component() {
  const [times, setTimes] = useState(0)

  const columns: Columns = [
    {
      title: 'Name',
      width: 300,
      dataIndex: 'name',
      key: 'name',
      // 设置拖拽最小宽度
      minConstraints: 20,
      render: (text) => <a>{text}</a>,
    },
    Table.SELECTION_COLUMN,
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 100,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
      width: 300,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className={'w-full truncate space-x-1'}>
          <span>{record.name}</span>
          <a
            onClick={() => {
              setTimes((t) => t + 1)
            }}
          >
            Render
          </a>
          <span>{times}</span>
        </div>
      ),
    },
  ]

  const { components, resizableColumns, tableWidth, resetColumns } = useAntdResizableHeader({
    columns: useMemo(() => columns, [times]),
    columnsState: {
      persistenceKey: 'row-selection-order',
      persistenceType: 'sessionStorage',
    },
  })

  return (
    <div className='App'>
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
        rowSelection={{}}
      />
      <Button
        onClick={() => {
          resetColumns()
        }}
      >
        Reset
      </Button>
    </div>
  )
}
