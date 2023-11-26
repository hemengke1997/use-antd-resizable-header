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

  const modules = import.meta.glob('./**/index.tsx')
  const routes = Object.keys(modules).map((key) => {
    return {
      path: key.replace('./', '').replace('/index.tsx', ''),
      /* @vite-ignore */
      component: () => import(key),
    }
  })

  const element = useRoutes(
    routes.map((t) => ({
      element: comp(lazy(t.component as FunctionalImportType)),
      ...t,
    })),
  )

  return <div>{element}</div>
}
