import type { DependencyList, EffectCallback } from 'react'
import React, { useEffect, useState } from 'react'

import type { Options } from './options'
import useThrottleFn from './useThrottleFn'
import useUpdateEffect from './useUpdateEffect'

function useThrottleEffect(effect: EffectCallback, deps?: DependencyList, options?: Options) {
  const [flag, setFlag] = useState({})

  const { run, cancel } = useThrottleFn(() => {
    setFlag({})
  }, options)

  useEffect(() => {
    return run()
  }, deps)

  React.useEffect(cancel, [])

  useUpdateEffect(effect, [flag])
}

export { useThrottleEffect }
