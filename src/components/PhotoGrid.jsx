import { ImageMinus, Star } from 'lucide-react'
import PhotoCard from './PhotoCard.jsx'

export default function PhotoGrid({
  photos = [],
  className = '',
  limit = 6,
  onPhotoPreview,
  onSetCover,
  onRemovePhoto,
}) {
  const visiblePhotos = photos.slice(0, limit)
  const hasActions = Boolean(onSetCover || onRemovePhoto)

  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:auto-rows-[9.5rem] ${className}`}>
      {visiblePhotos.map((photo, index) => {
        const layoutClass = index === 0 ? 'col-span-2 sm:row-span-2' : index === 3 ? 'sm:col-span-2' : ''
        const aspect =
          index === 0
            ? 'aspect-[16/11] sm:aspect-auto'
            : index === 3
              ? 'aspect-[16/9] sm:aspect-auto'
              : 'aspect-[4/3] sm:aspect-auto'

        return (
          <div key={photo.id || `${photo.src}-${index}`} className={`group/photo-actions relative ${layoutClass}`}>
            <PhotoCard
              title={photo.title}
              src={photo.src}
              fallbackSrc={photo.fallbackSrc}
              fallbackSources={photo.fallbackSources}
              badge={photo.isUploaded ? '本地上传' : undefined}
              description={photo.description}
              source={photo.source}
              isPlaceholder={photo.isPlaceholder}
              compact={index !== 0}
              showMeta={index === 0 || photo.isUploaded}
              showDescription={index === 0}
              onPreview={onPhotoPreview ? () => onPhotoPreview(index) : undefined}
              className="h-full rounded-[1.45rem]"
              aspect={aspect}
            />
            {hasActions ? (
              <div className="absolute right-2 top-2 z-10 flex gap-1.5 opacity-0 transition group-hover/photo-actions:opacity-100 group-focus-within/photo-actions:opacity-100">
                {onSetCover ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      onSetCover(photo)
                    }}
                    className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/38 text-sky-50 shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-sky-200/18"
                    aria-label="设为封面"
                    title="设为封面"
                  >
                    <Star size={14} />
                  </button>
                ) : null}
                {onRemovePhoto ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      onRemovePhoto(photo)
                    }}
                    className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-rose-100/15 bg-black/38 text-rose-50 shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-rose-300/18"
                    aria-label="从记忆包中移除"
                    title="从记忆包中移除"
                  >
                    <ImageMinus size={14} />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
