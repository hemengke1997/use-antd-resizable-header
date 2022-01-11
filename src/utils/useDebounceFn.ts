import React from 'react';
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import useCreation from './useCreation';
import { Options } from './options';

type Fn = (...args: any) => any;

function useDebounceFn<T extends Fn>(fn: T, options?: Options) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  React.useEffect(() => {
    debounced.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;
