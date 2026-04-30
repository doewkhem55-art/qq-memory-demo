import { useEffect, useState } from 'react'

export default function PhotoCard({
  title,
  src,
  badge,
  description,
  source,
  isPlaceholder = false,
  compact = false,
  showMeta = true,
  showDescription = true,
  className = '',
  imageClassName = '',
  aspect = 'aspect-[4/3]',
}) {
  const [failed, setFailed] = useState(false)
  const imageSrc = typeof src === 'string' ? src.trim() : src
  useEffect(() => {
    setFailed(false)
  }, [imageSrc])

  const showImage = imageSrc && !failed
  const sourceLabel =
    badge ||
    (source === 'uploaded'
      ? '本地照片'
      : source === 'demo'
        ? '记忆素材'
        : isPlaceholder
          ? '相册片段'
          : '')

  const captionPadding = compact ? 'p-2' : 'p-3'
  const titleClass = compact
    ? 'truncate text-[11px] font-medium leading-4 text-white/90'
    : 'line-clamp-2 text-xs font-medium leading-5 text-white/90'
  const descriptionClass = compact
    ? 'hidden'
    : 'mt-1 line-clamp-1 text-[11px] leading-4 text-white/58'

  return (
    <figure className={`photo-card ${aspect} ${className}`}>
      {showImage ? (
        <img
          key={imageSrc}
          src={imageSrc}
          alt={title}
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
          onLoad={() => setFailed(false)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo-card-placeholder absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_34%,rgba(0,0,0,0.28)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/16 to-transparent" />
      <figcaption className={`absolute inset-x-0 bottom-0 min-w-0 ${captionPadding}`}>
        {showMeta && sourceLabel ? (
          <span className="mb-2 inline-flex max-w-full rounded-full bg-black/28 px-2.5 py-1 text-[11px] font-medium text-sky-50 backdrop-blur-md">
            <span className="min-w-0 truncate">{sourceLabel}</span>
          </span>
        ) : null}
        <div className={titleClass}>{title}</div>
        {showDescription && description ? (
          <div className={descriptionClass}>{description}</div>
        ) : null}
      </figcaption>
    </figure>
  )
}
