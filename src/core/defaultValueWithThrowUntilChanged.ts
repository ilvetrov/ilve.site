export function defaultValueWithThrowUntilChanged<T extends object>(): T {
  return new Proxy(
    {},
    {
      get() {
        throw new Error('Do not use me. Set value.')
      },
      set() {
        throw new Error('Do not use me. Set value.')
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any
}
