import type { TableColumnsType } from 'antd'
import { Table } from 'antd'
import React from 'react'
import { type ResizableColumnsType, useAntdResizableHeader } from 'use-antd-resizable-header'
import styles from './index.module.css'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: ResizableColumnsType<TableColumnsType<DataType>> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    sorter: true,
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
]

export const Component: React.FC = () => {
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns,
  })

  return (
    <Table
      className={styles.table}
      columns={resizableColumns}
      components={components}
      dataSource={data}
      scroll={{ x: tableWidth }}
    />
  )
}
