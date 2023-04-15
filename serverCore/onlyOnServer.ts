export default function onlyOnServer<T>(value: () => T): () => T | undefined {
  return () => {
    if (typeof window === 'undefined') {
      return value()
    }

    return undefined
  }
}
