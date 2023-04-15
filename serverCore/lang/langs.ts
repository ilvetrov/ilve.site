import langsConfig from '@root/langs.config'
import { nonNullable } from '~/core/nonNullable'
import { decoratorOnlyOnProduction } from '~/core/onlyOnProduction'
import { cachedOnce } from '../../src/core/cachedOnce'
import { AutoUpdatingCache } from '../InstantFile/AutoUpdatingCache'
import { insecureHash } from '../InstantFile/InsecureHash'
import { JsonStorages } from '../InstantFile/JsonStorages'

export type LangDict = typeof import('@root/langs/en.json')

export type ILang = {
  name: string
  defaultName: string
  names: string[]
  dict: LangDict
  hash: string
}

export const langs = decoratorOnlyOnProduction(
  (origin) => AutoUpdatingCache(origin.content, 10_000),
  JsonStorages<LangDict>('./langs'),
)

const cachedHash = cachedOnce(insecureHash)

export const langsHash = () => cachedHash(JSON.stringify(langs.content()))

export const langNames = () => Object.keys(langs.content())

export const defaultLang = () => nonNullable(langsConfig?.defaultLocale)

export const Lang: (name: string) => ILang = (name) => ({
  name,
  names: langNames(),
  defaultName: defaultLang(),
  dict: nonNullable(langs.content()[name], `Lang "${name}" does not exist`),
  hash: langsHash(),
})
