import { removeFromArray } from "./partials/remove-from-array"
import PureHandlers from "./pure-handlers"

export default class TransitionHandler {
  constructor(element, handler, props = {}) {
    this.element = element
    this.handler = handler

    this.chain = props.chain ?? []
    this.chainResetTime = props.chainResetTime ?? 0
    this.currentChain = [...this.chain]

    this.pureHandlers = new PureHandlers()
    this.pureHandlers.addEventListener(this.element, 'transitionend', (event) => this.topHandler(event))
  }
  destroy() {
    this.pureHandlers.destroy()
  }
  topHandler(event) {
    if (this.paused) return
    if (this.chain && this.chain.indexOf(event.propertyName) !== -1) {
      removeFromArray(this.currentChain, event.propertyName)
    }
    if (this.currentChain.length === 0) {
      this.handler(event, this)
      this.resetChain()
    } else if (this.chainResetTime) {
      setTimeout(() => {
        this.resetChain()
      }, this.chainResetTime)
    }
  }
  resetChain() {
    this.currentChain = [...this.chain]
  }
  pause() {
    this.paused = true
  }
  unpause() {
    this.paused = false
  }
}