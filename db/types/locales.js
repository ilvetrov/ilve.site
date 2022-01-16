import Processor from "./processor"

export default class LocalesProcessor extends Processor {
  constructor(context) {
    super()
    this.locale = context.$i18n.locale
    this.localizer = (key) => context.$i18n.t(key)
  }
  block(key, data) {
    return data.locales[this.locale]
  }
  text(data) {
    const insertions = data.match(/\(\((.+?)\)\)/g)
    if (!insertions) return data
    for (let i = 0; i < insertions.length; i++) {
      const insertion = insertions[i];
      const key = insertion.split('(').join('').split(')').join('')
      data = data.replace(insertion, this.localizer(key))
    }
    return data
  }
}