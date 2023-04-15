import { createContext } from 'react'
import { defaultValueWithThrowUntilChanged } from '~/core/defaultValueWithThrowUntilChanged'
import type { ILang } from '@root/serverCore/lang/langs'

export const LangContext = createContext<ILang>(
  defaultValueWithThrowUntilChanged<ILang>(),
)
