import React from 'react';
import { Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import './App.css';
import useARH from 'use-antd-resizable-header';
import 'use-antd-resizable-header/dist/style.css';
import 'antd/es/table/style/index.css';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

function App() {
  const [x, setX] = useReducer((s) => s + 1, 0);

  const columns = [
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
      title: 'Column 1',
      dataIndex: 'address',
    },
    {
      title: 'test render',
      dataIndex: 'testRender',
      width: 200,
      render: () => {
        return <div onClick={() => setX()}>{x}</div>;
      },
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (record: any) => {
        return <span>{record?.address || ''}</span>;
      },
    },
  ];

  useEffect(() => {
    console.log('x', x);
  }, [x]);


  const { components, resizableColumns, tableWidth } = useARH({ columns: useMemo(()=>columns, [x]) });

  const {
    components: proComponents,
    resizableColumns: proResizableColumns,
    tableWidth: proTableWidth,
  } = useARH({ columns: useMemo(() => columns, [x]) });

  return (
    <div className="App">
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      ></Table>

      <ProTable
        columns={proResizableColumns}
        components={proComponents}
        dataSource={data}
        scroll={{ x: proTableWidth }}
      ></ProTable>
    </div>
  );
}

export default React.memo(App);
