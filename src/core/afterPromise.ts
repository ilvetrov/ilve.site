export type AfterPromise<T> = {
  value: T
  resolved: boolean
}

export function afterPromise<T>(
  promise: () => Promise<T>,
): () => AfterPromise<T | undefined>

export function afterPromise<T>(
  promise: () => Promise<T>,
  defaultValue: () => T,
): () => AfterPromise<T>

export function afterPromise<T>(
  promise: () => Promise<T>,
  defaultValue?: () => T,
): () => AfterPromise<T | undefined> {
  const status: AfterPromise<T | undefined> = {
    value: undefined,
    resolved: false,
  }

  return () => {
    if (!status.resolved && defaultValue) {
      status.value = defaultValue()
      status.resolved = true
    } else {
      promise().then((value) => {
        status.value = value
        status.resolved = true
      })
    }

    return status
  }
}
