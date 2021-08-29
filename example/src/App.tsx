import React from 'react';
import { Table, TableColumnType } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import './App.css';
import useATRH from 'use-antd-resizable-header';
import 'use-antd-resizable-header/dist/style.css';
import 'antd/es/table/style/index.css';

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
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
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7777777777777',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
    width: 150,
  },
  {
    title: 'Column 9',
    dataIndex: 'address',
    key: '9',
    width: 150,
  },
  { title: 'Column 10', dataIndex: 'address', key: '10' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (record) => {
      return <span>{record.address}</span>;
    },
  },
];

const proColumns: ProColumns<any>[] = [
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
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7777777777777',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
    width: 150,
  },
  {
    title: 'Column 9',
    dataIndex: 'address',
    key: '9',
    width: 150,
  },
  { title: 'Column 10', dataIndex: 'address', key: '10' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

function App() {
  const { components, resizableColumns, tableWidth } = useATRH({columns});

  const {
    components: proComponents,
    resizableColumns: proResizableColumns,
    tableWidth: proTableWidth,
  } = useATRH({columns: proColumns});

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
