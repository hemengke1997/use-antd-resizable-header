import React, { useMemo, useReducer } from 'react'
import { Table } from 'antd'
import ProTable from '@ant-design/pro-table'
import './App.css'
import useARH from '@minko-fe/use-antd-resizable-header'
import '@minko-fe/use-antd-resizable-header/dist/style.css'
import 'antd/es/table/style/index.css'

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
        width: 200,
        render: () => {
          return <div onClick={() => setX()}>{x}</div>
        },
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return <span>{record?.age}</span>
        },
      },
    ],
    [x],
  )

  const { components, resizableColumns, tableWidth } = useARH({
    columns,
  })

  // const {
  //   components: proComponents,
  //   resizableColumns: proResizableColumns,
  //   tableWidth: proTableWidth,
  // } = useARH({ columns: useMemo(() => columns, [x]) });

  // useEffect(() => {
  //   console.log(proTableWidth, 'proTableWidth');
  // }, [proTableWidth]);

  return (
    <div className='App'>
      <Table columns={resizableColumns} components={components} dataSource={data} scroll={{ x: tableWidth }}></Table>
      {/*
      <ProTable
        columns={proResizableColumns}
        components={proComponents}
        dataSource={data}
        scroll={{ x: proTableWidth }}
      ></ProTable> */}
    </div>
  )
}

export default React.memo(App)
