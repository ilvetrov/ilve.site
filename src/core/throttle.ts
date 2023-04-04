/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): T & { cancel: () => void } {
  let lastReturn: ReturnType<T>
  let lastRan: number
  let timeout: NodeJS.Timeout

  function throttledFunc(this: any, ...args: Parameters<T>): ReturnType<T> {
    const context = this

    if (!lastRan) {
      lastReturn = func.apply(context, args)
      lastRan = Date.now()

      return lastReturn
    }

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      if (Date.now() - lastRan >= limit) {
        lastReturn = func.apply(context, args)
        lastRan = Date.now()
      }
    }, limit - (Date.now() - lastRan))

    return lastReturn
  }

  throttledFunc.cancel = () => clearTimeout(timeout)

  return throttledFunc as T & { cancel: () => void }
}
