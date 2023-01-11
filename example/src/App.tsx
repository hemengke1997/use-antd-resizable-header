import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'

interface FunctionalImportType {
  (): any
}

// eslint-disable-next-line no-restricted-syntax
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
  ]

  const element = useRoutes(
    routes.map((t) => ({
      element: comp(lazy(t.component as FunctionalImportType)),
      ...t,
    })),
  )

  return <div>{element}</div>
}
