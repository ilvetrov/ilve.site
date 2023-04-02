import { objectWithoutNullable } from './filterObject'

export function optionalUrlParams(
  params: Record<string, string | undefined | null>,
): string {
  return new URLSearchParams(objectWithoutNullable(params)).toString()
}

export function urlParamsWithQuestionMark(params: string): string {
  return params.length > 0 ? `?${params}` : ''
}
