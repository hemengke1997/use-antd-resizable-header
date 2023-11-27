import ProTable, { type ProColumns } from '@ant-design/pro-table'
import Table, { type ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { useAntdResizableHeader } from 'use-antd-resizable-header'

export default function () {
  const [proCols, _setProCols] = useState<ProColumns[]>([])
  const { resizableColumns: proResizableColumns } = useAntdResizableHeader({
    columns: proCols,
  })

  const [cols, _setCols] = useState<ColumnsType<object>>([])
  const { resizableColumns } = useAntdResizableHeader({
    columns: cols,
  })

  return (
    <>
      <ProTable columns={proResizableColumns}></ProTable>
      <Table columns={resizableColumns} />
    </>
  )
}
