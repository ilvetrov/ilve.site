type Destroyer = () => void

const isServer = typeof window === 'undefined'

export function isPageLoaded() {
  return !isServer && document.readyState === 'complete'
}

export function afterPageLoad(action: () => Destroyer | void): Destroyer {
  return () => {
    if (isServer) {
      return () => {}
    }

    if (isPageLoaded()) {
      const maybeDestroyer = action()

      return () => {
        maybeDestroyer?.()
      }
    }

    let destroyer: Destroyer | undefined

    function actionAfterLoad() {
      const maybeDestroyer = action()

      if (maybeDestroyer) {
        destroyer = maybeDestroyer
      }
    }

    window.addEventListener('load', actionAfterLoad)

    return () => {
      window.removeEventListener('load', actionAfterLoad)

      destroyer?.()
      destroyer = undefined
    }
  }
}
