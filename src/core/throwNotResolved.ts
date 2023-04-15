import { AfterPromise } from './afterPromise'

export default function throwNotResolved<T>(
  valueAfterPromise: () => AfterPromise<T | undefined>,
): { value: () => T; requestSafety: () => void } {
  return {
    value() {
      const afterPromise = valueAfterPromise()

      if (afterPromise.resolved) {
        return afterPromise.value as T
      }

      throw new Error('Value not yet resolved. Try again.')
    },
    requestSafety: valueAfterPromise,
  }
}
