import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

export function HydrateFallback() {
  return <div></div>
}
