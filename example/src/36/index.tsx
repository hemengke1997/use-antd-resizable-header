import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import TableComponent from './TableComponent'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const Hello: React.FC = () => {
  const [otherColumns, setOtherColumns] = useState<any[]>([])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // width: 300,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 100,
    },
    ...otherColumns,
  ]

  useEffect(() => {
    setTimeout(() => {
      setOtherColumns([
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 100,
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          width: 200,
          render: (tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green'
                if (tag === 'loser') {
                  color = 'volcano'
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                )
              })}
            </>
          ),
        },
      ] as any[])
    }, 300)
  }, [])

  return <TableComponent dataSource={data} columns={columns} />
}

export default Hello
