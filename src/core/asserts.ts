import { nonNullable } from './nonNullable'

export function assertsNonNullable<T>(
  value: T | undefined | null,
): asserts value is T {
  nonNullable(value)
}
