import { useContext, useMemo } from 'react'
import { nonNullable } from '~/core/nonNullable'
import { LangContext } from './Context'
import type { ILang } from '@root/pages/api/lang'

export interface Lang {
  lang: ILang['name']
  langs: ILang['names']
  dict: ILang['dict']
  nextLang: string
}

export default function useLang(): Lang {
  const { dict, name, names } = useContext(LangContext)
  const nextLang = useMemo(() => {
    const index = names.indexOf(name)
    const nextIndex = index + 1 >= names.length ? 0 : index + 1

    return nonNullable(names[nextIndex])
  }, [name, names])

  return {
    lang: name,
    langs: names,
    dict,
    nextLang,
  }
}
