import type { FC } from 'react'
import { describe, expect, it } from 'vitest'
import { Table } from 'antd'
import useAntdResizableHeader from '../src'
import { render, renderHook } from './test-utils'

describe('Basic Render', () => {
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

  const columns: any[] = [
    {
      title: '333',
      dataIndex: 'name',
      key: 'name',
      width: 100,
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

  const { result } = renderHook(() =>
    useAntdResizableHeader({
      columns,
    }),
  )

  const { resizableColumns, components, tableWidth } = result.current

  const Comp: FC = () => (
    <Table columns={resizableColumns} components={components} dataSource={data} scroll={{ x: tableWidth }} />
  )

  it('resizableColumns correctly', () => {
    expect(resizableColumns.length).eq(columns.length)
  })

  it('snapshot basic render', () => {
    const c = render(<Comp />)
    expect(c).toMatchSnapshot()
  })
})
