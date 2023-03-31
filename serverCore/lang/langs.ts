import nextConfig from '@root/next.config'
import { nonNullable } from '~/core/nonNullable'
import { CachedOnce } from '../CachedOnce'
import { AutoUpdatingCache } from '../InstantFile/AutoUpdatingCache'
import { insecureHash } from '../InstantFile/InsecureHash'
import { JsonStorages } from '../InstantFile/JsonStorages'

export type LangDict = typeof import('@root/langs/en.json')

export const langs = AutoUpdatingCache(
  JsonStorages<LangDict>('./langs').content,
  10_000,
)

const cachedHash = CachedOnce(insecureHash)

export const langsHash = () => cachedHash(JSON.stringify(langs.content()))

export const langNames = () => Object.keys(langs.content())

export const defaultLang = () => nonNullable(nextConfig.i18n?.defaultLocale)
