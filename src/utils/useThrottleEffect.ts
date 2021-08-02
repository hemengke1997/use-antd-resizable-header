import React from 'react';
import { useEffect, EffectCallback, DependencyList, useState } from 'react';
import { Options } from './options';
import useThrottleFn from './useThrottleFn';
import useUpdateEffect from './useUpdateEffect';

function useThrottleEffect(effect: EffectCallback, deps?: DependencyList, options?: Options) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  React.useEffect(cancel, []);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;
