import clsx from 'clsx'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import styles from './FlashingImage.module.scss'

export default function FlashingImage({
  flashing,
  ...props
}: { flashing?: boolean } & DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) {
  return (
    <img
      loading="lazy"
      decoding="async"
      {...props}
      alt={props.alt ?? ''}
      className={clsx(
        styles.image,
        flashing !== false && styles.image_flashing,
        props.className,
      )}
    />
  )
}
