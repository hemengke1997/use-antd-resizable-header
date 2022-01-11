import throttle from 'lodash.throttle';
import { useRef, useEffect } from 'react';
import useCreation from './useCreation';
import { Options } from './options';

type Fn = (...args: any) => any;

function useThrottleFn<T extends Fn>(fn: T, options?: Options) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const throttled = useCreation(
    () =>
      throttle<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  useEffect(() => {
    throttled.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    run: throttled as unknown as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
