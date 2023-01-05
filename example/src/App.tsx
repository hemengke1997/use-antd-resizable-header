import React, { useMemo, useReducer } from 'react'
import { Table } from 'antd'
import ProTable from '@ant-design/pro-table'
import './App.css'
import { useAntdResizableHeader } from '@minko-fe/use-antd-resizable-header'
import '@minko-fe/use-antd-resizable-header/dist/style.css'

const data: any[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    x: i,
    y: i,
    address: `London Park no. ${i}`,
  })
}

function App() {
  const [x, setX] = useReducer((s) => s + 1, 0)

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        filters: [
          { text: 'test', value: '1' },
          { text: 'test2', value: '2' },
        ],
        defaultFilteredValue: ['1'],
      },
      {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'x',
        width: 100,
        dataIndex: 'x',
        key: 'x',
      },
      {
        title: 'y',
        width: 100,
        dataIndex: 'y',
        key: 'y',
      },
      {
        title: 'Column 1',
        width: 100,
        dataIndex: 'address',
      },

      {
        title: 'test render',
        dataIndex: 'testRender',
        width: 333,
        render: () => {
          return <div onClick={() => setX()}>{x}</div>
        },
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: (_, record) => {
          return <span>{record?.age}</span>
        },
      },
    ],
    [x],
  )

  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns,
  })

  const proColumns = useMemo(
    () => [
      {
        title: 'Pro-Name',
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
      },
      {
        title: 'x',
        width: 100,
        dataIndex: 'x',
        key: 'x',
      },
      {
        title: 'y',
        width: 100,
        dataIndex: 'y',
        key: 'y',
      },
      {
        title: 'Column 1',
        dataIndex: 'address',
      },
      {
        title: 'test render',
        dataIndex: 'testRender',
        width: 333,
        render: () => {
          return <div onClick={() => setX()}>{x}</div>
        },
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: (_, record) => {
          return <span>{record?.age}</span>
        },
        width: 100,
      },
    ],
    [x],
  )

  const { components: cp, resizableColumns: rp, tableWidth: tp } = useAntdResizableHeader({ columns: proColumns })

  return (
    <div className='App'>
      <Table columns={resizableColumns} components={components} dataSource={data} scroll={{ x: tableWidth }} />

      <ProTable columns={rp} components={cp} dataSource={data} scroll={{ x: tp }} />
    </div>
  )
}

// eslint-disable-next-line no-restricted-syntax
export default App
