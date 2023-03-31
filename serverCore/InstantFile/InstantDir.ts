import fs from 'fs'
import fsPromise from 'fs/promises'
import { afterPromise } from '~/core/afterPromise'

export interface IInstantDir {
  content(): string[]
}

export function InstantDir(path: string): IInstantDir {
  const content = afterPromise(
    () => fsPromise.readdir(path),
    () => fs.readdirSync(path),
  )

  return {
    content: () => content().value,
  }
}
