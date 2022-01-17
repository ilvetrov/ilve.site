import { randomNumber } from "./random";

export default class ABTesting {
  static instance = null
  static selectedOrdersNew = {}
  static selectedLabels = {}
  static selectedWithLocale = {}

  constructor(context) {
    if (ABTesting.instance) return ABTesting.instance

    this.context = context

    ABTesting.instance = this
  }

  getValue(name, data) {
    const selectedOrder = this.getStored()[name] ?? ABTesting.selectedOrdersNew[name] ?? randomNumber(0, data.length - 1)
    const selectedData = data[selectedOrder]
    if (this.getStored()[name] === undefined) {
      ABTesting.selectedOrdersNew[name] = selectedOrder
    }
    ABTesting.selectedLabels[name] = selectedData.label
    ABTesting.selectedWithLocale[name] = this.context.$i18n.locale
    return selectedData.value
  }

  getStored() {
    return this.context.$cookies.get('ab') ?? {}
  }

  static getLabels() {
    let output = {}
    for (const key in this.selectedLabels) {
      if (Object.hasOwnProperty.call(this.selectedLabels, key)) {
        const label = this.selectedLabels[key];
        if (ABTesting.selectedWithLocale[key] !== ABTesting.instance.context.$i18n.locale) continue
        output[key] = label
      }
    }
    return output
  }

  static save() {
    if (Object.keys(ABTesting.selectedOrdersNew).length === 0) return

    const old = this.instance.getStored()
    this.instance.context.$cookies.set('ab', {
      ...old,
      ...ABTesting.selectedOrdersNew
    }, {
      path: '/',
      maxAge: 60 * 60 * 24 * 31,
      sameSite: true
    })
  }
}