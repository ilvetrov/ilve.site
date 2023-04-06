export function cachedOnce<T extends (...args: any[]) => unknown>(
  origin: T,
): T {
  let lastArgs: string | undefined
  let cached: ReturnType<T> | undefined

  return ((...args) => {
    const currentArgs = getArgsString(...args)

    if (lastArgs && cached && lastArgs === currentArgs) {
      return cached
    }

    lastArgs = currentArgs

    return (cached = origin(...args) as ReturnType<T>)
  }) as T
}

function getArgsString(...args: any[]): string {
  return args.length === 1 && typeof args[0] !== 'object'
    ? args[0]
    : JSON.stringify(args)
}

type CachedOriginReplaceable<T extends (...args: any[]) => unknown> = T & {
  replace: (newCache: ReturnType<T>, ...args: Parameters<T>) => void
}

export function cachedOnceReplaceable<T extends (...args: any[]) => unknown>(
  origin: T,
): CachedOriginReplaceable<T> {
  let lastArgs: string | undefined
  let cached: ReturnType<T> | undefined

  const cachedOrigin = ((...args) => {
    const currentArgs = getArgsString(...args)

    if (lastArgs && cached && lastArgs === currentArgs) {
      return cached
    }

    lastArgs = currentArgs

    return (cached = origin(...args) as ReturnType<T>)
  }) as CachedOriginReplaceable<T>

  cachedOrigin.replace = (newCache, ...args) => {
    const currentArgs = getArgsString(...args)

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
