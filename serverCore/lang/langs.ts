import langsConfig from '@root/langs.config'
import { nonNullable } from '~/core/nonNullable'
import { decoratorOnlyOnProduction } from '~/core/onlyOnProduction'
import { CachedOnce } from '../../src/core/cachedOnce'
import { AutoUpdatingCache } from '../InstantFile/AutoUpdatingCache'
import { insecureHash } from '../InstantFile/InsecureHash'
import { JsonStorages } from '../InstantFile/JsonStorages'

export type LangDict = typeof import('@root/langs/en.json')

export const langs = decoratorOnlyOnProduction(
  (origin) => AutoUpdatingCache(origin.content, 10_000),
  JsonStorages<LangDict>('./langs'),
)

const cachedHash = CachedOnce(insecureHash)

export const langsHash = () => cachedHash(JSON.stringify(langs.content()))

export const langNames = () => Object.keys(langs.content())

export const defaultLang = () => nonNullable(langsConfig?.defaultLocale)
