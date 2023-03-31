import { createContext } from 'react'
import { defaultValueWithThrowUntilChanged } from '~/core/defaultValueWithThrowUntilChanged'
import type { ILang } from '@root/pages/api/lang'

export const LangContext = createContext<ILang>(
  defaultValueWithThrowUntilChanged<ILang>(),
)
