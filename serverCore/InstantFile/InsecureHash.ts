/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-bitwise */
export function insecureHash(string: string) {
  let hash = 0

  const stringLenght = string.length

  for (let i = 0; i < stringLenght; i++) {
    const char = string.charCodeAt(i)

    hash = (hash << 5) - hash + char
    hash &= hash // Convert to 32bit integer
  }

  return new Uint32Array([hash])[0]!.toString(36)
}
