import { startTransition } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'virtual:remix-flat-routes'
import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root')!)

startTransition(() => {
  root.render(
    <RouterProvider
      router={createBrowserRouter(routes, {
        basename: '/use-antd-resizable-header',
      })}
    />,
  )
})
