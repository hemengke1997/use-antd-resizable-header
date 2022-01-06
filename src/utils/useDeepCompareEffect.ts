import isEqualWith from 'lodash.isequalwith';
import isFunction from 'lodash.isfunction';
import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqualWith(aDeps, bDeps, (a, b) => {
    if (isFunction(a) && isFunction(b) && a.toString() === b.toString()) {
      return true;
    }
  });
};

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!depsEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  useEffect(effect, [signalRef.current]);
};

export default useDeepCompareEffect;
