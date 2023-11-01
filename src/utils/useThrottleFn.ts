import throttle from 'lodash.throttle'
import { useEffect, useRef } from 'react'
import { type Options } from './options'
import { useCreation } from './useCreation'

type Fn = (...args: any) => any

function useThrottleFn<T extends Fn>(fn: T, options?: Options) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const wait = options?.wait ?? 1000

  const throttled = useCreation(
    () =>
      throttle<T>(
        ((...args: any[]) => {
          return fnRef.current(...args)
        }) as T,
        wait,
        options,
      ),
    [],
  )

  useEffect(() => {
    throttled.cancel()
  }, [])

  return {
    run: throttled as unknown as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  }
}

export { useThrottleFn }
