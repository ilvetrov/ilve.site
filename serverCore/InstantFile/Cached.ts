type BaseOrigin = (...args: any[]) => unknown

function cacheKey(args: unknown[]): string {
  return JSON.stringify(args)
}

export function Cached<T extends BaseOrigin>(
  origin: T,
  cache: Map<string, ReturnType<T>> = new Map(),
): T {
  return ((...args) => {
    const argsStr = cacheKey(args)

    if (!cache.has(argsStr)) {
      cache.set(argsStr, origin(...args) as ReturnType<T>)
    }

    return cache.get(argsStr)
  }) as T
}
