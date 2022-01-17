export default class ScriptLoader {
  constructor(src) {
    this.src = src
    this.callbacks = []
  }

  startLoading() {
    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.onload = (event) => {
      this.callbacks.forEach(callback => callback(event))
    }
    script.src = this.src
    
    document.body.appendChild(script)
  }

  addCallback(callback) {
    this.callbacks.push(callback)
  }
}