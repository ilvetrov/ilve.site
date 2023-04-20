import dynamic from 'next/dynamic'
import { ComponentType, SVGProps, useEffect } from 'react'
import { afterPageLoad } from '~/core/afterPageLoad'
import mapObject from '~/core/mapObject'
import { nonNullable } from '~/core/nonNullable'

export type ImportedSvg = () => Promise<typeof import('*.svg')>

function lazySvg(
  dynamics: ImportedSvg,
  commonProps?: SVGProps<SVGSVGElement>,
  preload?: boolean,
): ComponentType<SVGProps<SVGSVGElement>>

// @ts-expect-error Variant is required here
function lazySvg<Variant extends string>(
  dynamics: Record<Variant, ImportedSvg>,
  commonProps?: SVGProps<SVGSVGElement>,
  preload?: boolean,
): ComponentType<
  SVGProps<SVGSVGElement> & { variant: Variant; defaultVariant?: Variant }
>

function lazySvg<Variant extends string>(
  dynamics: ImportedSvg | Record<Variant, ImportedSvg>,
  commonProps?: SVGProps<SVGSVGElement>,
  preload?: boolean,
): ComponentType<
  SVGProps<SVGSVGElement> & { variant?: Variant; defaultVariant?: Variant }
> {
  const hasOneDynamic = typeof dynamics === 'function'

  const imports = hasOneDynamic
    ? ({ default: dynamics } as Record<Variant, ImportedSvg>)
    : dynamics

  const variants = mapObject(imports, (value) =>
    dynamic(value, {
      loading: () => (
        <svg xmlns="http://www.w3.org/2000/svg" {...(commonProps ?? {})}></svg>
      ),
      ssr: false,
    }),
  )

  const firstVariantName = nonNullable(Object.keys(variants)[0]) as Variant

  function startPreload() {
    if (typeof dynamics !== 'function' && typeof window !== 'undefined') {
      Object.values<ImportedSvg>(dynamics).forEach((dynamicSvg) => dynamicSvg())
    }
  }

  let preloadStarted = false

  return ({ variant, defaultVariant, ...props }) => {
    const Variant = (variants[
      hasOneDynamic ? ('default' as Variant) : nonNullable(variant)
    ] ??
      variants[defaultVariant ?? firstVariantName]) as unknown as ComponentType<
      SVGProps<SVGSVGElement>
    >

    useEffect(() => {
      if (!preload || preloadStarted) return undefined

      return afterPageLoad(() => {
        const id = setTimeout(() => {
          if (preloadStarted) return

          preloadStarted = true

          startPreload()
        }, 2000)

        return () => clearTimeout(id)
      })
    }, [])

    return <Variant {...commonProps} {...props}></Variant>
  }
}

export default lazySvg
