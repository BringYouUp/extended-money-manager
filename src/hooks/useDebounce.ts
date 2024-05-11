import { useCallback, useRef } from 'react';

export const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const timer: React.MutableRefObject<null | ReturnType<typeof setTimeout>> = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      timer.current && clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
  return debouncedCallback;
};
