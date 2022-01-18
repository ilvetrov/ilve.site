import sDB from "../s-db.json"
import LocalesProcessor from "./types/locales"
import ABProcessor from "./types/ab"

export class DB {
  constructor(context) {
    this.types = {
      locales: new LocalesProcessor(context),
      ab: new ABProcessor(context)
    }

    this.storage = this.prepare(sDB)
  }

  prepare(data, key = undefined) {
    if (typeof data !== 'object') return this.prepareText(data)

    if (this.getType(data) === 'array') {
      return data.map(value => this.prepare(value))
    }

    if (data._type !== undefined) {
      return this.prepareBlock(key, data)
    }

    const output = {}
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const value = data[key]
        if (
          this.getType(value) === 'object'
          && Object.keys(this.types).indexOf(value._type) !== -1
        ) {
          output[key] = this.prepareBlock(key, value)
        } else {
          output[key] = this.prepare(value)
        }
      }
    }
    return output
  }

  prepareBlock(key, data) {
    return this.prepare(this.types[data._type].block(key, data), key)
  }

  prepareText(text) {
    for (const typeName in this.types) {
      if (Object.hasOwnProperty.call(this.types, typeName)) {
        const typeProccessor = this.types[typeName];
        text = typeProccessor.text(text)
      }
    }
    return text
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
  getPortfolio() {
    return this.storage.portfolio
  }
  getHelloVideo() {
    return this.storage.hello_video
  }
}