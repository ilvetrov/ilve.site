import {
  defaulted,
  define,
  mask,
  object,
  optional,
  string,
  StructError,
} from 'superstruct'
import {
  defaultLang,
  LangDict,
  langNames,
  langs,
  langsHash,
} from '@root/serverCore/lang/langs'
import { nonNullable } from '~/core/nonNullable'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ILang = {
  name: string
  defaultName: string
  names: string[]
  dict: LangDict
  hash: string
}

export type Success = ILang

export type Fail = {
  reason: string
}

export type Data = Success | Fail

// Langs

export const LangName = define<string>('LangName', (value) => {
  if (typeof value !== 'string') return false

  return langNames().includes(value)
})

const Query = object({
  name: defaulted(LangName, defaultLang),
  hash: optional(string()),
})

export const Lang: (name: string) => ILang = (name) => ({
  name,
  names: langNames(),
  defaultName: defaultLang(),
  dict: nonNullable(langs.content()[name], `Lang "${name}" does not exist`),
  hash: langsHash(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const query = mask(req.query, Query, '')
    const result: Success = Lang(query.name)

    if (!query.hash || query.hash === result.hash) {
      // Cache for 1 week or 1 hour
      res.setHeader('Cache-Control', `max-age=${query.hash ? 604800 : 3600}`)
    }

    res.status(200).json(result)
  } catch (error) {
    if (error instanceof StructError) {
      res.status(400).json({
        reason:
          typeof error.cause === 'string' ? error.cause : 'Incorrect query',
      })

      return
    }

    if (error instanceof TypeError) {
      res.status(400).json({
        reason: error.message || 'Incorrect query',
      })

      return
    }

    res.status(400).json({
      reason: 'Incorrect query. Try again after few minutes',
    })
  }
}
