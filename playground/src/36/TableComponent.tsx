import { Table } from 'antd'
import React from 'react'
import { useAntdResizableHeader } from 'use-antd-resizable-header'

interface IProps {
  columns: any[]
  dataSource: any[]
}
const TableComponent: React.FC<IProps> = (props) => {
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns: props.columns,
    minConstraints: 70,
    defaultWidth: 222,
    columnsState: {
      persistenceType: 'localStorage',
      persistenceKey: 'localColumns',
    },
  })

  return (
    <div style={{ width: 500 }}>
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={props.dataSource}
        scroll={{ x: tableWidth }}
      />
    </div>
  )
}

export default TableComponent
