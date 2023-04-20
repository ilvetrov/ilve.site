import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import isSvgPath from '~/core/isSvgPath'
import LazySvgFromSrc from '../LazySvg/LazySvgFromSrc'

export default function LazyImg(
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > &
    Parameters<typeof LazySvgFromSrc>[0],
) {
  return isSvgPath(props.src) ? (
    <LazySvgFromSrc {...props}></LazySvgFromSrc>
  ) : (
    <img loading="lazy" decoding="async" alt={props.alt ?? ''} {...props}></img>
  )
}
