import ProTable from '@ant-design/pro-table'
import { useAntdResizableHeader } from 'use-antd-resizable-header'

const columns: any[] = [
  {
    // fixed: 'left',
    width: 100,
    hideInSetting: true,
    dataIndex: 'name',
    title: 'name',
    key: 'name',
    disable: true,
  },
  {
    width: 150,
    dataIndex: 'size',
    title: 'size',
    key: 'size',
  },
  // {
  //   width: 100,
  //   dataIndex: 'date',
  //   title: 'date',
  //   key: 'date',
  // },
  // {
  //   width: 150,
  //   dataIndex: 'entityId',
  //   title: 'entityId',
  //   key: 'entityId',
  // },
  // {
  //   width: 150,
  //   dataIndex: 'deviceId',
  //   title: 'deviceId',
  //   key: 'deviceId',
  // },
  {
    dataIndex: 'customerId',
    title: 'customerId',
    key: 'customerId',
  },
  {
    width: 150,
    hideInSetting: true,
    fixed: 'right',
    disable: true,
    valueType: 'option',
    hideInDescriptions: false,
    title: 'actions',
    key: 'action',
  },
]

const data: any[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: '1',
    size: i + 1,
    date: 'Lake Park',
    entityId: 'C',
    deviceId: 2035,
    customerId: 'Lake Street 42',
    actions: 'SoftLake Co',
  })
}

export default function App() {
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns,
  })

  return (
    <div>
      <ProTable columns={resizableColumns} components={components} dataSource={data} scroll={{ x: tableWidth }} />
    </div>
  )
}
