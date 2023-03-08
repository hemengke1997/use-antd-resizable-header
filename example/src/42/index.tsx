import { Tooltip } from 'antd'
import { useAntdResizableHeader } from '@minko-fe/use-antd-resizable-header'
import '@minko-fe/use-antd-resizable-header/dist/style.css'
import React from 'react'
import ProTable from '@ant-design/pro-table'

const columns: any[] = [
  {
    title: 'SN',
    dataIndex: 'sn',
    key: 'sn',
    align: 'center',
    width: 90,
  },
  {
    title: '类型',
    dataIndex: 'deviceType',
    key: 'deviceType',
    align: 'center',
    width: 90,
  },
  {
    title: '设备',
    dataIndex: 'dis',
    key: 'dis',
    align: 'center',
    width: 90,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    width: 90,
    ellipsis: false, // ellipsis 跟 tooltip冲突
    render: (text: any) => {
      // debugger
      return (
        <Tooltip title={text}>
          <div>{text}</div>
        </Tooltip>
      )
    },
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
    columns,
  })
  return (
    <>
      <div>
        <h1>Hello!</h1>
        <ProTable
          columns={resizableColumns}
          components={components}
          dataSource={data}
          scroll={{ x: tableWidth }}
          toolBarRender={false}
          search={false}
        />
      </div>
    </>
  )
}

export default ResizableTable
