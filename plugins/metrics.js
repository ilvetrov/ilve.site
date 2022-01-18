import { doOnce } from "./do-once"
import { removeFromArray } from "./partials/remove-from-array";
import ABTesting from "./ab-testing"

class Client {
  constructor() {
    this.bank = []

    if (process.browser) {
      setInterval(() => {
        this.bank.forEach(action => {
          if (this.activeChecker()) {
            removeFromArray(this.bank, action)
            action()
          }
        })
      }, 200)
    }
  }
  load() {
    throw 'Specify load method!'
  }
  reachGoal(name, props = {}) {
    throw 'Specify reachGoal method!'
  }
  toBank(action) {
    this.bank.push(action)
  }
  activeChecker() {
    return true
  }
  abLabels(abKeys) {
    if (!Array.isArray(abKeys)) return {}

    const labels = (ABTesting.getter()).getLabels()

    let output = {}
    for (let i = 0; i < abKeys.length; i++) {
      const abKey = abKeys[i];
      if (labels[abKey] === undefined) continue
      output[abKey] = labels[abKey]
    }
    return output
  }
}

class YandexMetrikaClient extends Client {
  constructor(id, props = {}) {
    super()
    this.id = id
    this.props = props
  }
  load() {
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", "ym");

    ym(this.id, "init", this.props);
  }
  activeChecker() {
    return typeof ym !== 'undefined'
  }
  reachGoal(name, props = {}) {
    ym(this.id, 'reachGoal', name, {
      ...this.abLabels(props.ab),
      lang: document.documentElement.lang
    })
  }
}

class Metrics {
  constructor(clients) {
    this.clients = clients
  }
  reachGoal(name, props = {}) {
    if (props.once) {
      return doOnce(`reach_goal_${name}`, () => this.#reachGoalToMetrics(name, props))
    }
    this.#reachGoalToMetrics(name, props)
  }
  load() {
    this.clients.forEach(client => client.load())
  }
  #reachGoalToMetrics(name, props = {}) {
    this.clients.forEach(client => {
      if (client.activeChecker()) {
        client.reachGoal(name, props)
      } else {
        client.toBank(() => client.reachGoal(name, props))
      }
    })
  }
}

export const metrics = new Metrics([

  new YandexMetrikaClient(87171112, {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true,
    trackHash:true
  })

])

if (process.browser) {
  window.addEventListener('load', function() {
    metrics.load()
  })
}