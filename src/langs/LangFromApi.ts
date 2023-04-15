import {
  optionalUrlParams,
  urlParamsWithQuestionMark,
} from '~/core/optionalUrlParams'
import type { ILang } from '@root/serverCore/lang/langs'

export interface ILangFromApi {
  content(): Promise<ILang>
}

export function LangFromApi(
  name?: string,
  hash?: string,
  abortSignal?: AbortSignal,
): ILangFromApi {
  return {
    async content() {
      return fetch(
        `/api/lang${urlParamsWithQuestionMark(
          optionalUrlParams({ name, hash }),
        )}`,
        { signal: abortSignal },
      ).then((res) => res.json())
    },
  }
}
