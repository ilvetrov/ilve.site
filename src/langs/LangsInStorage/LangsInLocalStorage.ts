import { nonNullable } from '~/core/nonNullable'
import { ILangsInStorage } from './LangsInStorage'

export function LangsInLocalStorage(
  key = '__HASHED_LANGUAGES_STORAGE__',
): ILangsInStorage {
  return {
    content() {
      try {
        return JSON.parse(nonNullable(localStorage.getItem(key)))
      } catch (_error) {
        return undefined
      }
    },
    write(langs) {
      localStorage.setItem(key, JSON.stringify(langs))
    },
    clear() {
      localStorage.removeItem(key)
    },
  }
}
