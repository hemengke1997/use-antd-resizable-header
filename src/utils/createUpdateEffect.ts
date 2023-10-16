import { type useEffect, type useLayoutEffect, useRef } from 'react'
import { type useThrottleEffect } from './useThrottleEffect'

type EffectHookType = typeof useEffect | typeof useLayoutEffect | typeof useThrottleEffect

export const createUpdateEffect: (hook: EffectHookType) => EffectHookType = (hook) => (effect, deps) => {
  const isMounted = useRef(false)

  // for react-refresh
  hook(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      return effect()
    }
  }, deps)
}
