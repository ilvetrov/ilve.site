export function CachedOnce<T extends (...args: any[]) => unknown>(
  origin: T,
): T {
  let lastArgs: string | undefined
  let cached: ReturnType<T> | undefined

  return ((...args) => {
    const currentArgs =
      args.length === 1 && typeof args !== 'object'
        ? args[0]
        : JSON.stringify(args)

    if (lastArgs && cached && lastArgs === currentArgs) {
      return cached
    }

    lastArgs = currentArgs

    return (cached = origin(...args) as ReturnType<T>)
  }) as T
}
