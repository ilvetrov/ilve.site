const isServer = typeof window === 'undefined'

export function onlyOnClient<T>(value: () => T): () => T | undefined {
  return () => {
    if (isServer) {
      return undefined
    }

    return value()
  }
}

export function isClient<T>(
  definedOnClient: T | undefined,
): definedOnClient is T {
  return !isServer
}
