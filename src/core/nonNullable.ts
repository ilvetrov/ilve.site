export function nonNullable<T>(
  value: T | undefined | null | void,
  msg?: string,
): T {
  if (value === undefined || value === null) {
    throw new TypeError(msg ?? `value is ${value}`)
  }

  return value
}
