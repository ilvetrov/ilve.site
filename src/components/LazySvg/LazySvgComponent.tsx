import { SVGProps, useMemo } from 'react'
import lazySvg, { ImportedSvg } from './lazySvg'

export default function LazySvg({
  icon,
  ...props
}: { icon: ImportedSvg } & SVGProps<SVGSVGElement>) {
  const Svg = useMemo(() => lazySvg(icon, props), [])

  return <Svg {...props}></Svg>
}
