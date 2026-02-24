/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Hook para debounce de uma função
 * @param callback - A função a ser debounced
 * @param delay - O delay em milissegundos
 * @returns A função debounced
 */
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
