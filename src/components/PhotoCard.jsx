import { useState } from 'react'

export default function PhotoCard({
  title,
  src,
  badge,
  className = '',
  imageClassName = '',
  aspect = 'aspect-[4/3]',
}) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <div className={`photo-card ${aspect} ${className}`}>
      {showImage ? (
        <img
          src={src}
          alt={title}
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo-card-placeholder absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        {badge ? (
          <span className="mb-2 inline-flex rounded-full bg-black/28 px-2.5 py-1 text-[11px] font-medium text-sky-50 backdrop-blur-md">
            {badge}
          </span>
        ) : null}
        <div className="line-clamp-2 text-xs font-medium leading-5 text-white/90">{title}</div>
      </div>
    </div>
  )
}
