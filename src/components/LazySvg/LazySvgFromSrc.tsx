/* eslint-disable react/no-danger */
import { forwardRef, SVGProps, useEffect, useState } from 'react'
import { nonNullable } from '~/core/nonNullable'
import { ObjectFromArrayByKeys } from '~/core/objectFromArray'
import useCombinedRef from '~/hooks/useCombinedRef'
import useOnlyIfInViewport from '../OnlyIfInViewport/useOnlyIfInViewport'

interface SvgContent {
  ownProps: Record<string, unknown>
  content: { __html: string }
}

function svgContentFromString(source: string): SvgContent {
  const div = document.createElement('div')

  div.innerHTML = source

  const svgElement = nonNullable(div.children[0])
  const svgElementContent = { __html: svgElement.innerHTML }

  const ownProps = ObjectFromArrayByKeys(
    'name',
    'value',
    Array.from(svgElement.attributes),
  )

  return { ownProps, content: svgElementContent }
}

type SvgFromSrcProps = { src: string } & Omit<
  SVGProps<SVGSVGElement>,
  'src' | 'ref'
>

const LazySvgFromSrc = forwardRef<SVGSVGElement | null, SvgFromSrcProps>(
  ({ src, ...props }, userRef) => {
    const [svgContent, setStringSvg] = useState<SvgContent>()

    const ref = useCombinedRef(userRef)

    const isInViewport = useOnlyIfInViewport(ref, undefined, undefined, true)

    useEffect(() => {
      if (!isInViewport) return undefined

      const abortController = new AbortController()

      fetch(src, { signal: abortController.signal })
        .then((value) => value.text())
        .then((svgString) => {
          if (abortController.signal.aborted) return

          setStringSvg(svgContentFromString(svgString))
        })
        .catch(() => {})

      return () => abortController.abort()
    }, [src, isInViewport])

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        {...(svgContent?.ownProps ?? {})}
        {...props}
        dangerouslySetInnerHTML={svgContent?.content}
      ></svg>
    )
  },
)

export default LazySvgFromSrc
