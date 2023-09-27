import { useEffect, useRef } from 'react';

export const useOnUnmount = (fn: () => void): void => {
  const onUnmount = useRef(fn);

  useEffect(() => {
    onUnmount.current = fn;
  }, [fn]);

  useEffect(
    () => () => {
      onUnmount.current();
    },
    [],
  );
};
