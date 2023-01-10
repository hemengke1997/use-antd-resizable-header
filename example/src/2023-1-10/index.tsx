import { Table } from 'antd'
import useARH from '@minko-fe/use-antd-resizable-header'
import '@minko-fe/use-antd-resizable-header/dist/style.css'
import React, { useEffect, useMemo, useState } from 'react'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    ellipsis: true,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
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
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  })
}

const ResizableTable = () => {
  const [col, setCol] = useState<any>([])
  useEffect(() => {
    setTimeout(() => {
      setCol(columns)
    }, 200)
  }, [])
  const { components, resizableColumns, tableWidth } = useARH({
    columns: useMemo(() => {
      console.log(col)
      return col
    }, [col]),
    columnsState: {
      persistenceKey: '2023-1-10',
      persistenceType: 'localStorage',
    },
  })

  return (
    <>
      <Table columns={resizableColumns} dataSource={data} components={components} scroll={{ x: tableWidth }} />
    </>
  )
}

export default ResizableTable
