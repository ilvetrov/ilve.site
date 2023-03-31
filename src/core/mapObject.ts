/* eslint-disable no-restricted-syntax */
export default function mapObject<
  T extends Record<string, unknown>,
  Result = T[string],
>(
  object: T,
  callback: (value: T[string], key: string | number | symbol) => Result,
) {
  const newObject: Record<string, unknown> = {}

  Object.keys(object).forEach((key: keyof T) => {
    const value = object[key] as T[string]

    newObject[key as string] = callback(value, key)
  })

  return newObject as { [Key in keyof T]: Result }
}
