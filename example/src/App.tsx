import React, { useState } from 'react';
import { Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import useResizableHeader from 'use-antd-resizable-header';

import 'antd/dist/antd.min.css';

import './App.css';

const x = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function App() {
  const columns = x.map((item) => ({ title: 'title', dataIndex: item, width: 300 }));

  const dataSource = x.map((item) => ({ [item]: '测试数据' }));

  const { resizableColumns, components, tableWidth } = useResizableHeader(columns);

  console.log(resizableColumns, 'resizableColumns');

  return (
    <div className="App">
      <div>132</div>
    </div>
  );
}

export default App;
