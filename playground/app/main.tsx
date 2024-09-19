import { startTransition } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { routes } from 'virtual:remix-flat-routes'
import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root')!)

startTransition(() => {
  root.render(<RouterProvider router={createHashRouter(routes)} />)
})
