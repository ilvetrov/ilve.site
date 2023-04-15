/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
import { memo, useCallback, useEffect, useId, useMemo, useRef } from 'react'
import { nonNullable } from '~/core/nonNullable'

export type ScriptContextData = {
  place: 'react' | 'page'
  element: HTMLElement
}

type Destroy = () => void

export type UpdatableCallback<D> = (
  data: ScriptContextData,
  advancedData: D,
) => Destroy | void

// Just random string
const destroyersKey = 'destroyersrevmdkgurmvdwvgoeivme'

type Destroyers = {
  [key: string]: Destroy
}

type WindowWithDestroyers = Window & {
  [destroyersKey]?: Destroyers
}

function initDestroyers(key: string) {
  if ((window as any)[key] === undefined) {
    ;(window as any)[key] = {}
  }
}

function UpdatableSSRScript<D>({
  callback,
  advancedData,
}: {
  callback: UpdatableCallback<D | undefined>
  advancedData?: D
}) {
  const id = useId()
  const scriptRef = useRef<HTMLScriptElement>(null)

  const dataInReact: () => ScriptContextData = useCallback(
    () =>
      ({
        place: 'react',
        element: nonNullable(scriptRef.current),
      } satisfies ScriptContextData),
    [],
  )

  const wasFirstDestroy = useRef(false)

  useEffect(() => {
    if (!wasFirstDestroy.current) {
      wasFirstDestroy.current = true

      return (window as WindowWithDestroyers)[destroyersKey]?.[id]
    }

    return callback(dataInReact(), advancedData)
  }, [callback, advancedData])

  function dataOnPage(): ScriptContextData {
    return {
      place: 'page',
      element: document.currentScript as HTMLElement,
    }
  }

  const inserted = useMemo(
    () => ({
      data: `var __data = (${dataOnPage.toString()})();`,
      initDestroyers: `(${initDestroyers.toString()})("${destroyersKey}");`,
      callback: `window["${destroyersKey}"]["${id}"] = (${callback.toString()})(__data, undefined);`,
    }),
    [],
  )

  return (
    <script
      ref={scriptRef}
      dangerouslySetInnerHTML={useMemo(
        () => ({
          __html: `(function() { ${Object.values(inserted)
            .join('')
            .replace(/(\s+)|(\n)/gi, ' ')} })();`,
        }),
        [],
      )}
      suppressHydrationWarning
    ></script>
  )
}

const typedMemo: <T>(c: T) => T = memo

export default typedMemo(UpdatableSSRScript)
