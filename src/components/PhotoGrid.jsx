import PhotoCard from './PhotoCard.jsx'

export default function PhotoGrid({ photos = [], className = '', limit = 6 }) {
  const visiblePhotos = photos.slice(0, limit)

  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className}`}>
      {visiblePhotos.map((photo, index) => (
        <PhotoCard
          key={photo.id || `${photo.src}-${index}`}
          title={photo.title}
          src={photo.src}
          badge={photo.isUploaded ? '本地上传' : undefined}
          description={photo.description}
          source={photo.source}
          isPlaceholder={photo.isPlaceholder}
          compact={index !== 0}
          showMeta={index === 0 || photo.isUploaded}
          showDescription={index === 0}
          className={index === 0 ? 'col-span-2 sm:row-span-2' : ''}
          aspect={index === 0 ? 'aspect-[16/10] sm:aspect-auto sm:min-h-64' : 'aspect-[4/3]'}
        />
      ))}
    </div>
  )
}
