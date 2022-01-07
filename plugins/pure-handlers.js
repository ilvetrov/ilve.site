export default class PureHandlers {
  constructor() {
    this.destroyers = []
  }
  destroy() {
    this.destroyers.forEach(destroyer => destroyer())
    this.destroyers = []
  }

  addEventListener(element, type, listener, options = {}) {
    if (
      Array.isArray(element)
      || NodeList.prototype.isPrototypeOf(element)
      || HTMLCollection.prototype.isPrototypeOf(element)
    ) return Array.from(element).forEach(inElement => this.addEventListener(inElement, type, listener, options))

    element.addEventListener(type, listener, options)
    this.destroyers.push(() => {
      element.removeEventListener(type, listener, options)
    })
  }
}