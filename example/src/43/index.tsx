import { useAntdResizableHeader } from '@minko-fe/use-antd-resizable-header'
import '@minko-fe/use-antd-resizable-header/dist/style.css'
import React, { useMemo } from 'react'
import { Table } from 'antd'

const columns: any[] = [
  {
    title: <div>title1</div>,
    dataIndex: 'putrecNo',
    width: 150,
    key: 'putrecNo',
    ellipsis: true,
    search: false,
  },
  {
    title: <div>title2</div>,
    dataIndex: 'createTime',
    key: 'createTime',
    valueType: 'dateRange',
    hideInTable: true,
  },
]

const data: any[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    remark: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  })
}

const ResizableTable = () => {
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns: useMemo(() => columns, []),
    columnsState: {
      persistenceKey: 'localKey',
      persistenceType: 'localStorage',
    },
    onResizeEnd: (col) => {
      console.log(col)
    },
  })
  return (
    <>
      <div>
        <h1>Hello!</h1>
        <Table columns={resizableColumns} components={components} dataSource={data} scroll={{ x: tableWidth }} />
      </div>
    </>
  )
}

export default ResizableTable
