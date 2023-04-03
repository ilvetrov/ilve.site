const isServer = typeof window === 'undefined'

export interface IOnlyOnClient<T> {
  value: () => T | undefined
}

export function onlyOnClient<T>(value: () => T): IOnlyOnClient<T> {
  return {
    value() {
      if (isServer) {
        return undefined
      }

      return value()
    },
  }
}
