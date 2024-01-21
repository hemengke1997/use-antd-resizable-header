import { Table } from 'antd'
import { useMemo } from 'react'
import { useAntdResizableHeader } from 'use-antd-resizable-header'

const columns: any[] = [
  {
    title: <div>title1</div>,
    dataIndex: 'name',
    width: 150,
    key: 'name',
    ellipsis: true,
    search: false,
  },
  {
    title: <div>title2</div>,
    dataIndex: 'street',
    key: 'street',
    valueType: 'dateRange',
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
