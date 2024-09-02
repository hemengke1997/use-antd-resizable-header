import type { TableColumnsType } from 'antd'
import { Table } from 'antd'
import React from 'react'
import { type ResizableColumnsType, useAntdResizableHeader } from 'use-antd-resizable-header'
import styles from './index.module.css'

interface DataType {
  'key': React.Key
  'name': string
  'age': number
  'address-1': string
  'address-2': string
  'address-3': string
  'address-4': string
  'address-5': string
  'address-6': string
  'address-7': string
  'address-8': string
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
  { title: 'Column 1', dataIndex: 'address-1', key: '1', width: 100 },
  { title: 'Column 2', dataIndex: 'address-2', key: '2', width: 50 },
  { title: 'Column 3', dataIndex: 'address-3', key: '3', width: 200 },
  { title: 'Column 4', dataIndex: 'address-4', key: '4', width: 100 },
  { title: 'Column 5', dataIndex: 'address-5', key: '5', width: 100 },
  { title: 'Column 6', dataIndex: 'address-6', key: '6', width: 100 },
  { title: 'Column 7', dataIndex: 'address-7', key: '7', width: 100 },
  { title: 'Column 8', dataIndex: 'address-8', key: '8', width: 100 },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    render: () => <a>action</a>,
  },
]

const data: DataType[] = [
  {
    'key': '1',
    'name': 'John Brown',
    'age': 32,
    'address-1': 'New York Park',
    'address-2': 'New York Park',
    'address-3': 'New York Park',
    'address-4': 'New York Park',
    'address-5': 'New York Park',
    'address-6': 'New York Park',
    'address-7': 'New York Park',
    'address-8': 'New York Park',
  },
  {
    'key': '2',
    'name': 'Jim Green',
    'age': 40,
    'address-1': 'London Park',
    'address-2': 'London Park',
    'address-3': 'London Park',
    'address-4': 'London Park',
    'address-5': 'London Park',
    'address-6': 'London Park',
    'address-7': 'London Park',
    'address-8': 'London Park',
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
