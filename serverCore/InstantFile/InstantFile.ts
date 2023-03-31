import fs from 'fs'
import fsPromise from 'fs/promises'
import { afterPromise } from '~/core/afterPromise'

export interface IInstantFile {
  content(): Buffer
}

export function InstantFile(path: string): IInstantFile {
  const content = afterPromise(
    () => fsPromise.readFile(path),
    () => fs.readFileSync(path),
  )

  return {
    content: () => content().value,
  }
}
