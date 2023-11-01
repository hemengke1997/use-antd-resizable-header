import debounce from 'lodash.debounce'
import { useEffect, useRef } from 'react'
import { type Options } from './options'
import { useCreation } from './useCreation'

type Fn = (...args: any) => any

function useDebounceFn<T extends Fn>(fn: T, options?: Options) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const wait = options?.wait ?? 1000

  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args)
        }) as T,
        wait,
        options,
      ),
    [],
  )

  useEffect(() => {
    debounced.cancel()
  }, [])

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}

export { useDebounceFn }
