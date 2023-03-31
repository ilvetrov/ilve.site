export function FileNamesWithout(
  origin: () => string[],
  without: string[],
): {
  content(): string[]
} {
  return {
    content() {
      return origin().filter((name) => !without.includes(name))
    },
  }
}
