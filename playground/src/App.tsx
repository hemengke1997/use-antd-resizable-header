import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'

interface FunctionalImportType {
  (): any
}

export default function App() {
  const comp = (C) => {
    return (
      <Suspense fallback={<div />}>
        <C />
      </Suspense>
    )
  }

  const routes = [
    {
      path: '/',
      component: () => import('./basic'),
    },
    {
      path: '/36',
      component: () => import('./36'),
    },
    {
      path: '/37',
      component: () => import('./37'),
    },
    {
      path: '/42',
      component: () => import('./42'),
    },
    {
      path: '/43',
      component: () => import('./43'),
    },
    {
      path: '/44',
      component: () => import('./44'),
    },
  ]

  const element = useRoutes(
    routes.map((t) => ({
      element: comp(lazy(t.component as FunctionalImportType)),
      ...t,
    })),
  )

  return <div>{element}</div>
}
