import React from 'react';

function useFunction<T extends (...args: any[]) => any>(fn: T) {
  const ref = React.useRef<Function>(() => {
    throw new Error('Cannot call function while rendering.');
  });

  ref.current = fn;

  return React.useCallback(ref.current as T, [ref]);
}

export default useFunction;
