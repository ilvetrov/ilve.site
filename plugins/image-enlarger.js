import OptimizedEvent from "./partials/optimized-event"
import PureHandlers from "./pure-handlers"
import StylesGetter from "./styles-getter"

export default class ImageEnlarger {
  constructor(element) {
    this.element = element
    this.name = this.element.getAttribute('data-image-enlarger')
    this.toggleButtons = document.querySelectorAll(`[data-image-enlarger-toggle="${this.name}"]`)
    this.backdropName = this.element.getAttribute('data-image-enlarger-backdrop-on')
    this.backdrop = document.querySelector(`[data-image-enlarger-backdrop="${this.backdropName}"]`)
    this.active = false
    this.inProcess = false

    this.element.style.willChange = 'transform'
    this.stylesGetter = new StylesGetter(this.element)

    this.pureHandlers = new PureHandlers()

    this.leftOffset = 14

    this.resizeEventName = (new OptimizedEvent({
      name: 'resize',
      element: window
    })).dynamicName(100)

    this.pureHandlers.addEventListener(this.toggleButtons, 'click', () => this.clickHandler())
    this.pureHandlers.addEventListener(this.backdrop, 'click', () => this.reduce())
    this.pureHandlers.addEventListener(this.element, 'transitionend', () => this.endTransitionHandler())
    this.pureHandlers.addEventListener(window, this.resizeEventName, () => this.windowResizeHandler())

    this.pureHandlers.addEventListener(this.backdrop, 'transitionend', () => this.backdropEndTransitionHandler())
  }

  destroy() {
    this.pureHandlers.destroy()
  }

  clickHandler() {
    if (this.inProcess) return
    this.inProcess = true

    if (this.active) {
      this.reduce()
    } else {
      this.enlarge()
    }
  }

  windowResizeHandler() {
    if (this.active) {
      this.setLargeStyles()
    }
  }

  endTransitionHandler() {
    this.element.style.transition = ``
    if (!this.active) {
      this.afterReducing()
    }
  }

  backdropEndTransitionHandler() {
    if (!this.active) {
      this.backdrop.style.zIndex = ''
      this.element.style.zIndex = ''
      this.backdrop.classList.add('disabled')
    }
  }

  getMaxWidth() {
    return Math.floor((
      this.element.hasAttribute('data-image-enlarger-max-width')
        ? Math.min(Number(this.element.getAttribute('data-image-enlarger-max-width')), window.innerWidth)
        : window.innerWidth
    ) - this.leftOffset * 2)
  }
  getMaxHeight() {
    return Math.floor((
      this.element.hasAttribute('data-image-enlarger-max-height')
        ? Math.min(Number(this.element.getAttribute('data-image-enlarger-max-height')), window.innerHeight)
        : window.innerHeight
    ) - this.leftOffset * 2)
  }

  enlarge() {
    this.active = true

    this.element.style.zIndex = 100
    this.backdrop.style.zIndex = 99
    this.backdrop.classList.remove('disabled')
    setTimeout(() => this.backdrop.classList.remove('hidden'), 50)

    const initPosition = this.element.getBoundingClientRect()
    this.element.style.top = `${
      Math.round(initPosition.top)
    }px`
    this.element.style.left = `${
      Math.round(initPosition.left)
    }px`
    this.element.style.position = 'fixed'

    this.setLargeStyles()

    setTimeout(() => this.inProcess = false, 50)
  }

  setLargeStyles() {
    this.element.style.transition = `transform .2s ease-in-out`

    this.element.style.transform = ``
    const scale = Math.min(
      this.getMaxWidth() / this.element.clientWidth,
      this.getMaxHeight() / this.element.clientHeight,
    )
    this.element.style.transform = `scale(${
      scale
    })`
    const heightWithoutImage = window.innerHeight - this.element.clientHeight
    const widthWithoutImage = window.innerWidth - this.element.clientWidth
    this.element.style.transform += `translateY(${
      Math.round((heightWithoutImage / 2 - this.stylesGetter.getTop()) / scale)
    }px) translateX(${
      Math.round((widthWithoutImage / 2 - this.stylesGetter.getLeft()) / scale)
    }px)`
  }

  reduce() {
    this.active = false

    this.element.style.transition = `transform .2s ease-in-out`
    this.element.style.transform = ``

    this.backdrop.classList.add('hidden')
  }

  afterReducing() {
    this.element.style.top = ``
    this.element.style.left = ``
    this.element.style.position = ''
    
    this.inProcess = false
  }
}