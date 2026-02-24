/* eslint-disable @typescript-eslint/no-explicit-any */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
