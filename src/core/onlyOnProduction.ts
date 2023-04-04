const isProduction = process.env.NODE_ENV !== 'development'

export function onlyOnProduction<T extends (...args: any[]) => unknown>(
  origin: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args) => {
    if (isProduction) {
      return origin(...args) as ReturnType<T>
    }

    return undefined
  }
}

export function decoratorOnlyOnProduction<T, D extends (origin: T) => T>(
  decorator: D,
  origin: T,
): T {
  if (isProduction) {
    return decorator(origin)
  }

  return origin
}
