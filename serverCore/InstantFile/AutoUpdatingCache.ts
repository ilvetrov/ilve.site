export interface IAutoUpdatingCache<T> {
  content(): T
}

export function AutoUpdatingCache<T>(
  origin: () => T,
  timeout: number,
): IAutoUpdatingCache<T> {
  let cached: T | undefined

  let updateScheduled = false

  return {
    content() {
      if (cached !== undefined) {
        if (!updateScheduled) {
          updateScheduled = true
          setTimeout(() => {
            cached = origin()
            updateScheduled = false
          }, timeout)
        }

        return cached
      }

      return (cached = origin())
    },
  }
}
