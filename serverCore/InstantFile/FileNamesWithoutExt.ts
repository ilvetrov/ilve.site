export function FileNamesWithoutExt(origin: () => string[]): {
  content(): string[]
} {
  return {
    content() {
      return origin().map((name) => name.split('.').slice(0, -1).join('.'))
    },
  }
}
