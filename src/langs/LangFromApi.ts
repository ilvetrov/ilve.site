import {
  optionalUrlParams,
  urlParamsWithQuestionMark,
} from '~/core/OptionalUrlParams'
import type { ILang } from '@root/pages/api/lang'

export interface ILangFromApi {
  content(): Promise<ILang>
}

export function LangFromApi(name?: string, hash?: string): ILangFromApi {
  return {
    async content() {
      return fetch(
        `/api/lang${urlParamsWithQuestionMark(
          optionalUrlParams({ name, hash }),
        )}`,
      ).then((res) => res.json())
    },
  }
}
