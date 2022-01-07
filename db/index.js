import sDB from "../s-db.json"

export class DB {
  static instances = {}

  constructor(locale, localizer) {
    if (DB.instances.hasOwnProperty(locale)) return DB.instances[locale]

    this.locale = locale
    this.localizer = localizer
    this.storage = this.localize(sDB)

    DB.instances[locale] = this
  }

  localizeBlock(value) {
    return this.localize(value.locales[this.locale])
  }

  localizeText(value) {
    const insertions = value.match(/\(\((.+?)\)\)/g)
    if (!insertions) return value
    for (let i = 0; i < insertions.length; i++) {
      const insertion = insertions[i];
      const key = insertion.split('(').join('').split(')').join('')
      value = value.replace(insertion, this.localizer(key))
    }
    return value
  }

  localize(data) {
    if (typeof data !== 'object') return this.localizeText(data)

    if (this.getType(data) === 'array') {
      return data.map(value => this.localize(value))
    }

    const output = {}
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const value = data[key]
        if (
          this.getType(value) === 'object'
          && value._type === 'locales'
        ) {
          output[key] = this.localizeBlock(value)
        } else {
          output[key] = this.localize(value)
        }
      }
    }
    return output
  }

  getType(value) {
    const jsType = typeof value
    if (
      jsType === 'object'
      && Array.isArray(value)
    ) {
      return 'array'
    } else

    {
      return jsType
    }
  }

  getContacts() {
    return this.storage.contacts
  }
}