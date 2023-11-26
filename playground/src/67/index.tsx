import ProTable, { type ProColumnType, type ProColumns } from '@ant-design/pro-table'
import Table, { type ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { useAntdResizableHeader } from 'use-antd-resizable-header'

export default function () {
  const [proCols, _setProCols] = useState<ProColumns<any>[]>([])
  const {} = useAntdResizableHeader<ProColumnType>({
    columns: proCols,
  })

  const [cols, _setCols] = useState<ColumnsType>([{ title: 'Name', dataIndex: 'name' }])
  const { resizableColumns } = useAntdResizableHeader<ColumnsType[number]>({
    columns: cols,
  })

  return (
    <>
      <ProTable columns={proCols}></ProTable>
      <Table columns={resizableColumns} />
    </>
  )
}
