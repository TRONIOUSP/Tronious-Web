import Image, { type StaticImageData } from 'next/image'
import { cx } from '@/lib/cx'

export default function MediaPanel({
  src,
  alt,
  eyebrow,
  caption,
  priority = false,
  className,
}: {
  src: StaticImageData
  alt: string
  eyebrow: string
  caption: string
  priority?: boolean
  className?: string
}) {
  return (
    <figure data-media-panel="" className={cx(className)}>
      <Image
        src={src}
        alt={alt}
        fill
        preload={priority}
        sizes="(max-width: 900px) 100vw, 52vw"
      />
      <figcaption>
        <span>{eyebrow}</span>
        <strong>{caption}</strong>
      </figcaption>
      <i aria-hidden="true">Illustrative concept</i>
    </figure>
  )
}
