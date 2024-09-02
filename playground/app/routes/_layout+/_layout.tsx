import { Button, Space } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'

export default function () {
  return (
    <main className={'mx-6'}>
      <h1>
        <a href={'https://github.com/hemengke1997/use-antd-resizable-header'} target='_blank'>
          use-antd-resizable-header
        </a>
      </h1>
      <Space className={'mb-4'}>
        <NavLink to='basic'>
          <Button>Basic Demo</Button>
        </NavLink>

        <NavLink to='header-group'>
          <Button>Header Group Demo</Button>
        </NavLink>

        <NavLink to='fixed'>
          <Button>Fixed Demo</Button>
        </NavLink>

        <NavLink to='pro-table-basic'>
          <Button>Pro Table Basic Demo</Button>
        </NavLink>
      </Space>
      <Outlet />
    </main>
  )
}
