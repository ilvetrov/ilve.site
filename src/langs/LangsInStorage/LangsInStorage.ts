import type { ILang } from '@root/pages/api/lang'

type ILangs = Pick<ILang, 'names' | 'defaultName' | 'hash'> & {
  dicts: Record<string, ILang['dict']>
}

export interface ILangsInStorage {
  content(): ILangs | undefined
  write(langs: ILangs): void
  clear(): void
}
