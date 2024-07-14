import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook that debounces a callback function.
 *
 * @param callback The callback function to be debounced.
 * @param delay The delay in milliseconds before invoking the callback after the last call.
 * @returns A debounced version of the callback function.
 */
export const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay: number,
) => {
  if (delay < 0) {
    throw new Error("Delay must be non negative value");
  }

  const timer: React.MutableRefObject<null | ReturnType<typeof setTimeout>> =
    useRef<null | ReturnType<typeof setTimeout>>(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      timer.current && clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
  return debouncedCallback;
};
