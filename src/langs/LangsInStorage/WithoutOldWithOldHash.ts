import { ILangsInStorage } from './LangsInStorage'

export function LangsWithoutOldWithOldHash(
  origin: ILangsInStorage,
): ILangsInStorage {
  return {
    write(langs) {
      const oldLangs = origin.content()

      const oldDicts =
        langs.hash && langs.hash === oldLangs?.hash ? oldLangs.dicts : {}

      origin.write({
        ...langs,
        dicts: { ...oldDicts, ...langs.dicts },
      })
    },
    content: origin.content,
    clear: origin.clear,
  }
}
