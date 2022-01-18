export class ServerOrBrowserClassFabric {
  constructor(name, setter) {
    this.name = name
    this.contextName = name + 'ServerOrBrowserClass'
    this.setter = setter
    if (process.browser) {
      this.browserInstance = this.setter()
    }
  }
  setterWrap(context = undefined) {
    if (context && context[this.contextName]) return context[this.contextName]
    const classData = this.setter()
    if (context) context[this.contextName] = classData
    return classData
  }
  getter(context = undefined) {
    if (process.browser) {
      return this.browserInstance
    } else {
      return this.setterWrap(context)
    }
  }
}