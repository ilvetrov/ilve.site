/* eslint-disable @typescript-eslint/no-explicit-any */
export function ObjectFromArray<T extends ReadonlyArray<string>>(
  array: () => T,
): () => Record<T[number], undefined> {
  return () => {
    const object = {} as Record<T[number], undefined>

    array().forEach((key: T[number]) => (object[key] = undefined))

    return object
  }
}

export function ObjectFromArrayByKeys<
  KeyName extends string,
  ValueName extends string,
  Value,
>(
  keyName: KeyName,
  valueName: ValueName,
  array: ({ [key in KeyName]: string } & { [key in ValueName]: Value })[],
): Record<string, Value> {
  const result: Record<string, Value> = {}

  array.forEach((item) => {
    result[item[keyName]] = item[valueName]
  })

  return result
}

export function MappedObject<
  T extends Record<string, unknown>,
  Return = T[keyof T],
  Deps = undefined,
>(
  origin: () => T,
  forEach: (value: T[keyof T], key: keyof T, deps: Deps) => Return = (value) =>
    value as Return,
) {
  return ((deps: Deps) => {
    const object = { ...origin() }

    Object.keys(object).forEach(
      (key: keyof T) => (object[key] = forEach(object[key], key, deps) as any),
    )

    return object as Record<keyof T, Return>
  }) as undefined extends Deps
    ? Deps extends undefined
      ? () => Record<keyof T, Return>
      : (deps?: Deps) => Record<keyof T, Return>
    : (deps: Deps) => Record<keyof T, Return>
}

export function FilteredObject<
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

export function OmittedObject<
  T extends Record<string, unknown>,
  Removed extends keyof T,
>(origin: () => T, removed: Removed): () => Omit<T, Removed> {
  return () => {
    const object = { ...origin() }

    Object.keys(removed).forEach((key: keyof T) => delete object[key])

    return object
  }
}
