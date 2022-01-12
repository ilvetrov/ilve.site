import PureHandlers from "./pure-handlers"

export class VideoTip {
  static initAllOnPage() {
    const elements = document.querySelectorAll('[data-video-tip]')
    elements.forEach(element => new VideoTip(element))
  }
  static instances = []
  static events = []

  static destroy() {
    VideoTip.instances.forEach(instance => instance.destroy())
    VideoTip.instances = []
  }

  constructor(videoElement, name = undefined, props = {}) {
    this.videoElement = videoElement
    this.active = false
    this.name = name ?? videoElement.getAttribute('data-video-tip')
    this.playControls = this.getControls('play')
    this.animationElement = props.animationElement ?? this.videoElement
    
    this.backdrop = new Backdrop()
    
    this.pureHandlers = new PureHandlers()

    this.initForTurnOff()
    this.pureHandlers.addEventListener(this.videoElement, 'click', () => this.clickHandler())
    this.pureHandlers.addEventListener(this.videoElement, 'ended', () => {
      if (this.active) {
        this.endActiveHandler()
      }
    })
    Array.from(this.playControls).forEach(playControl => this.pureHandlers.addEventListener(playControl, 'click', () => this.clickHandler()))
    this.pureHandlers.addEventListener(this.backdrop.element, 'click', () => this.turnOff())

    VideoTip.instances.push(this)
  }

  destroy() {
    this.pureHandlers.destroy()
    this.backdrop.destroy()
  }

  getControls(type = 'play') {
    if (this.name) {
      return document.querySelectorAll(`[data-video-tip-${type}="${this.name}"]`)
    } else {
      return this.videoElement.querySelectorAll(`[data-video-tip-${type}]`)
    }
  }

  clickHandler() {
    if (!this.active) {
      this.play()
    } else {
      this.turnOff()
    }
  }

  endActiveHandler() {
    this.toStart()
    this.turnOff()
  }

  play() {
    if (this.active) return
    this.active = true

    this.backdrop.show()

    this.toStart()
    this.videoElement.muted = false
    this.videoElement.loop = false

    this.animationElement.classList.add('active')
  }

  toStart() {
    this.videoElement.currentTime = 0
  }
  
  turnOff() {
    if (!this.active) return
    this.active = false
    this.animationElement.classList.add('active-out')

    this.videoElement.muted = true
    this.videoElement.loop = true

    this.backdrop.hide()

    this.animationElement.classList.remove('active')
  }

  initForTurnOff() {
    this.pureHandlers.addEventListener(this.animationElement, 'transitionend', () => {
      if (this.active) return
      this.animationElement.classList.remove('active-out')
    })
  }
}

class Backdrop {
  constructor() {
    this.pureHandlers = new PureHandlers();
    this.element = document.getElementsByClassName('js-video-tip-backdrop')[0]
    this.initForHide()
  }

  destroy() {
    this.pureHandlers.destroy()
  }

  show() {
    this.element.classList.remove('disabled')
    setTimeout(() => {
      this.element.classList.remove('hidden')
    }, 20);
  }

  hide() {
    this.element.classList.add('hidden')
  }

  initForHide() {
    this.pureHandlers.addEventListener(this.element, 'transitionend', () => {
      if (!this.element.classList.contains('hidden')) return
      this.element.classList.add('disabled')
    })
  }
}