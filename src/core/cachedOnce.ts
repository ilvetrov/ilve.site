export function cachedOnce<T extends (...args: any[]) => unknown>(
  origin: T,
): T {
  let lastArgs: unknown | undefined
  let cached: ReturnType<T> | undefined

  return ((...args) => {
    const currentArgs = getArgsValue(...args)

    if (lastArgs && cached && lastArgs === currentArgs) {
      return cached
    }

    lastArgs = currentArgs

    return (cached = origin(...args) as ReturnType<T>)
  }) as T
}

function getArgsValue(...args: any[]): unknown {
  if (args.length === 0) {
    return ''
  }

  if (args.length === 1 && typeof args[0] !== 'object') {
    return args[0]
  }

  return JSON.stringify(args)
}

type CachedOriginReplaceable<T extends (...args: any[]) => unknown> = T & {
  replace: (newCache: ReturnType<T>, ...args: Parameters<T>) => void
}

export function cachedOnceReplaceable<T extends (...args: any[]) => unknown>(
  origin: T,
): CachedOriginReplaceable<T> {
  let lastArgs: unknown | undefined
  let cached: ReturnType<T> | undefined

  const cachedOrigin = ((...args) => {
    const currentArgs = getArgsValue(...args)

    if (lastArgs && cached && lastArgs === currentArgs) {
      return cached
    }

    lastArgs = currentArgs

    return (cached = origin(...args) as ReturnType<T>)
  }) as CachedOriginReplaceable<T>

  cachedOrigin.replace = (newCache, ...args) => {
    const currentArgs = getArgsValue(...args)

    if (lastArgs === undefined && cached === undefined) {
      lastArgs = currentArgs
      cached = newCache

      return
    }

    if (lastArgs === currentArgs) {
      cached = newCache
    }
  }

  return cachedOrigin
}
