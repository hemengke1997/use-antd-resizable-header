import ProTable, { type ProColumns } from '@ant-design/pro-table'
import { Tooltip } from 'antd'
import { useMemo } from 'react'
import { useAntdResizableHeader } from 'use-antd-resizable-header'

const columns: ProColumns[] = [
  {
    title: 'title mmmmmmmmmmmmmmmmmm',
    dataIndex: 'name',
    width: 150,
    key: 'name',
    ellipsis: {
      showTitle: true,
    },
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
    tooltipRender: (props) => <Tooltip {...props} />,
  })
  return (
    <>
      <div>
        <ProTable columns={resizableColumns} components={components} dataSource={data} scroll={{ x: tableWidth }} />
        <Tooltip title={'123'} open={undefined} children='test'></Tooltip>
      </div>
    </>
  )
}

export default ResizableTable
