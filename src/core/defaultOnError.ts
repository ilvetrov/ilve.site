export default function defaultOnError<T>(
  value: () => T,
  defaultValue: () => T,
): () => T {
  return () => {
    try {
      return value()
    } catch (_error) {
      return defaultValue()
    }
  }
}
