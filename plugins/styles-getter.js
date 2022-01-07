export default class StylesGetter {
  constructor(element) {
    this.element = element
  }

  static getRem() {
    return Number((getComputedStyle(document.documentElement).fontSize.match(/(.+?)px/) ?? [])[1] ?? 16)
  }
  getScale() {
    return Number((this.element.style.transform.match(/scale\((.+?)\)/) ?? [])[1] ?? 1)
  }
  getTranslateY() {
    return Number((this.element.style.transform.match(/translateY\((.+?)px\)/) ?? [])[1] ?? 0)
  }
  getTranslateX() {
    return Number((this.element.style.transform.match(/translateX\((.+?)px\)/) ?? [])[1] ?? 0)
  }
  getTop() {
    return Number((this.element.style.top.match(/(.+?)px/) ?? [])[1] ?? 0)
  }
  getLeft() {
    return Number((this.element.style.left.match(/(.+?)px/) ?? [])[1] ?? 0)
  }
}