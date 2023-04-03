/* eslint-disable @typescript-eslint/no-explicit-any */
export function ArrayFromObject<T extends ReadonlyArray<string>>(
  array: () => T,
): () => Record<T[number], undefined> {
  return () => {
    const object = {} as Record<T[number], undefined>

    array().forEach((key: T[number]) => (object[key] = undefined))

    return object
  }
}

export function MapObject<
  T extends Record<string, unknown>,
  Return = T[keyof T],
>(
  origin: () => T,
  forEach: (value: T[keyof T], key: keyof T) => Return = (value) =>
    value as Return,
): () => Record<keyof T, Return> {
  return () => {
    const object = { ...origin() }

    Object.keys(object).forEach(
      (key: keyof T) => (object[key] = forEach(object[key], key) as any),
    )

    return object as Record<keyof T, Return>
  }
}

export function FilterObject<
  T extends Record<string, unknown>,
  R extends Record<string, unknown>,
>(
  origin: () => T,
  filter: (value: T[keyof T], key: keyof T) => boolean,
): () => R {
  return () => {
    const object = { ...origin() }

    Object.keys(object).forEach((key: keyof T) => {
      if (!filter(object[key], key)) {
        delete object[key]
      }
    })

    return object as any as R
  }
}

export function OmitObject<
  T extends Record<string, unknown>,
  Removed extends keyof T,
>(origin: () => T, removed: Removed): () => Omit<T, Removed> {
  return () => {
    const object = { ...origin() }

    Object.keys(removed).forEach((key: keyof T) => delete object[key])

    return object
  }
}
