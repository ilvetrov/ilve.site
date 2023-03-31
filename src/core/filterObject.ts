export function filterObject<
  T extends Record<string | symbol, unknown>,
  NewT extends Record<string | symbol, unknown>,
>(object: T, filter: (value: T[keyof T], key: keyof T) => boolean): NewT {
  const newObject: Record<string | symbol, unknown> = { ...object }

  Object.keys(newObject).forEach((key: keyof T) => {
    if (!filter(object[key], key)) {
      delete newObject[key as string]
    }
  })

  return newObject as unknown as NewT
}

export function objectWithoutNullable<
  T extends Record<string | symbol, unknown>,
>(
  object: T,
): {
  [Key in keyof T as T[Key] extends undefined | null | void
    ? never
    : Key]: Exclude<T[Key], undefined | null | void>
} {
  return filterObject(object, (value) => value !== undefined && value !== null)
}
