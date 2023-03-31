import { IInstantFile } from './InstantFile'

type BaseOrigin = Record<string | number, unknown>

export interface IJsonOnDisk<T extends BaseOrigin = BaseOrigin> {
  content(): T
}

export function JsonOnDisk<T extends BaseOrigin = BaseOrigin>(
  origin: IInstantFile,
): IJsonOnDisk<T> {
  return {
    content() {
      try {
        return JSON.parse(origin.content().toString())
      } catch (error) {
        throw new TypeError(`File ${origin} is not JSON`)
      }
    },
  }
}
