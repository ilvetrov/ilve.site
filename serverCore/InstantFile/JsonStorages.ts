import { ArrayFromObject, FilterObject, MapObject } from './ArrayFromObject'
import { ErrorsToUndefined } from './ErrorsToUndefined'
import { FileNamesWithoutExt } from './FileNamesWithoutExt'
import { InstantDir } from './InstantDir'
import { InstantFile } from './InstantFile'
import { JsonOnDisk } from './JsonOnDisk'

export interface IJsonStorages<T> {
  content(): T
}

export function JsonStorages<T extends Record<string, unknown>>(
  path: string,
): IJsonStorages<Record<string, T>> {
  return {
    content: FilterObject<Record<string, T | undefined>, Record<string, T>>(
      MapObject(
        ArrayFromObject(FileNamesWithoutExt(InstantDir(path).content).content),
        (_value, fileName) =>
          ErrorsToUndefined(
            JsonOnDisk<T>(InstantFile(`${path}/${fileName}.json`)).content,
          )(),
      ),
      (value) => value !== undefined,
    ),
  }
}
