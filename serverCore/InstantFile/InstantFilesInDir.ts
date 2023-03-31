import { IInstantDir } from './InstantDir'
import { IInstantFile, InstantFile } from './InstantFile'

export interface IInstantFilesInDir {
  content(): IInstantFile[]
}

export function InstantFilesInDir(origin: IInstantDir): IInstantFilesInDir {
  return {
    content() {
      return origin.content().map((path) => InstantFile(path))
    },
  }
}
