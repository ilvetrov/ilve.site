import { randomNumber } from "./random";

export default class ABTesting {
  static instance = null
  static selectedOrdersNew = {}
  static selectedLabels = {}

  constructor(context) {
    if (ABTesting.instance) return ABTesting.instance

    this.context = context

    ABTesting.instance = this
  }
  getValue(name, data) {
    if (this.getStored()[name] !== undefined) {
      const selectedData = data[this.getStored()[name]]
      ABTesting.selectedLabels[name] = selectedData.label
      return selectedData.value
    }
    
    const selectedOrder = randomNumber(0, data.length - 1)
    const selectedData = data[selectedOrder]
    ABTesting.selectedOrdersNew[name] = selectedOrder
    ABTesting.selectedLabels[name] = selectedData.label
    return selectedData.value
  }

  getStored() {
    return this.context.$cookies.get('ab') ?? {}
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