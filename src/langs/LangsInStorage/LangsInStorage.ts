import type { ILang } from '@root/serverCore/lang/langs'

type ILangs = Pick<ILang, 'names' | 'defaultName' | 'hash'> & {
  dicts: Record<string, ILang['dict']>
}

export interface ILangsInStorage {
  content(): ILangs | undefined
  write(langs: ILangs): void
  clear(): void
}
