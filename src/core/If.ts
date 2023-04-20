export default function If<F, S>(
  condition: () => unknown,
  first: () => F,
  second: () => S,
): () => F | S {
  return () => (condition() ? first() : second())
}
