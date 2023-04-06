/* eslint-disable prefer-arrow-callback */
import { useCallback } from 'react'
import UpdatableSSRScript from '../UpdatableSSRScript/UpdatableSSRScript'

export default function TrueVW(): JSX.Element {
  return (
    <UpdatableSSRScript
      callback={useCallback(function initTrueVW() {
        function setSizes() {
          document.documentElement.style.setProperty(
            '--true-window-width',
            `${window.outerWidth / 100}`,
          )
        }

        setSizes()

        window.addEventListener('resize', setSizes)

        return function unsubscribe() {
          window.removeEventListener('resize', setSizes)
        }
      }, [])}
    ></UpdatableSSRScript>
  )
}
