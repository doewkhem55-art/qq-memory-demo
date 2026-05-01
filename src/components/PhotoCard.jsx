import { useEffect, useState } from 'react'
import { ZoomIn } from 'lucide-react'

export default function PhotoCard({
  title,
  src,
  badge,
  description,
  source,
  isPlaceholder = false,
  fallbackSrc,
  fallbackSources = [],
  compact = false,
  showMeta = true,
  showDescription = true,
  className = '',
  imageClassName = '',
  aspect = 'aspect-[4/3]',
  onPreview,
}) {
  const [failed, setFailed] = useState(false)
  const [fallbackIndex, setFallbackIndex] = useState(-1)
  const imageSrc = typeof src === 'string' ? src.trim() : src
  const fallbackImageSrc = typeof fallbackSrc === 'string' ? fallbackSrc.trim() : fallbackSrc
  const fallbackQueue = [
    fallbackImageSrc,
    ...fallbackSources.map((item) => (typeof item === 'string' ? item.trim() : item)),
  ].filter(Boolean)
  const uniqueFallbackQueue = Array.from(new Set(fallbackQueue))
  const activeImageSrc = fallbackIndex >= 0 ? uniqueFallbackQueue[fallbackIndex] : imageSrc
  useEffect(() => {
    setFailed(false)
    setFallbackIndex(-1)
  }, [imageSrc, fallbackImageSrc, fallbackSources])

  const showImage = activeImageSrc && !failed
  const interactive = Boolean(onPreview)
  const sourceLabel =
    badge ||
    (source === 'uploaded'
      ? '本地照片'
      : source === 'curated'
        ? '精选相册'
      : source === 'demo'
        ? '相册片段'
        : isPlaceholder
          ? '相册片段'
          : '')

  const captionPadding = compact ? 'p-2' : 'p-4'
  const titleClass = compact
    ? 'truncate text-[11px] font-medium leading-4 text-white/90'
    : 'line-clamp-2 text-sm font-semibold leading-5 text-white/92'
  const descriptionClass = compact
    ? 'hidden'
    : 'mt-1 line-clamp-1 text-[11px] leading-4 text-white/58'

  return (
    <figure
      className={`photo-card group/photo ${aspect} ${interactive ? 'cursor-zoom-in' : ''} ${className}`}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `查看大图：${title}` : undefined}
      onClick={onPreview}
      onKeyDown={(event) => {
        if (!interactive) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onPreview?.()
        }
      }}
    >
      {showImage ? (
        <img
          key={activeImageSrc}
          src={activeImageSrc}
          alt={title}
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${interactive ? 'group-hover/photo:scale-[1.035]' : ''} ${imageClassName}`}
          onLoad={() => setFailed(false)}
          onError={() => {
            const nextFallbackIndex = fallbackIndex + 1
            if (uniqueFallbackQueue[nextFallbackIndex]) {
              setFallbackIndex(nextFallbackIndex)
              return
            }
            setFailed(true)
          }}
        />
      ) : (
        <div className="photo-card-placeholder absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_48%,rgba(0,0,0,0.16)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/5 to-transparent" />
      {interactive ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover/photo:bg-black/14 group-hover/photo:opacity-100 group-focus-visible/photo:bg-black/14 group-focus-visible/photo:opacity-100">
          <span className="memory-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-black/20 backdrop-blur-md">
            <ZoomIn size={14} />
            查看大图
          </span>
        </div>
      ) : null}
      <figcaption className={`absolute inset-x-0 bottom-0 min-w-0 ${captionPadding}`}>
        {showMeta && sourceLabel ? (
          <span className="memory-chip mb-2 inline-flex max-w-full rounded-full px-2.5 py-1 text-[11px] font-medium">
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
