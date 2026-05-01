import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

function sourceLabel(photo = {}) {
  if (photo.isUploaded || photo.source === 'uploaded') return '本地上传'
  if (photo.source === 'demo') return 'Demo 素材'
  if (photo.source === 'preview') return '相册预览'
  return 'QQ 空间旧相册'
}

export default function PhotoLightbox({
  photos = [],
  initialIndex = 0,
  contextTitle = '',
  onClose,
}) {
  const safePhotos = useMemo(() => photos.filter((photo) => photo?.src || photo?.fallbackSrc), [photos])
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [usingFallback, setUsingFallback] = useState(false)
  const [failed, setFailed] = useState(false)

  const hasMultiple = safePhotos.length > 1
  const activePhoto = safePhotos[activeIndex] || safePhotos[0]
  const primarySrc = activePhoto?.src || activePhoto?.previewUrl || activePhoto?.dataUrl || activePhoto?.objectUrl
  const fallbackSrc = activePhoto?.fallbackSrc
  const activeSrc = usingFallback ? fallbackSrc : primarySrc

  useEffect(() => {
    const nextIndex = Math.min(Math.max(initialIndex, 0), Math.max(safePhotos.length - 1, 0))
    setActiveIndex(nextIndex)
  }, [initialIndex, safePhotos.length])

  useEffect(() => {
    setUsingFallback(false)
    setFailed(false)
  }, [primarySrc, fallbackSrc])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveIndex((current) => (current - 1 + safePhotos.length) % safePhotos.length)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveIndex((current) => (current + 1) % safePhotos.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, safePhotos.length])

  if (!activePhoto) return null

  const showImage = activeSrc && !failed
  const description = activePhoto.description || contextTitle || '记忆相册照片'

  const goPrevious = () => {
    if (!safePhotos.length) return
    setActiveIndex((current) => (current - 1 + safePhotos.length) % safePhotos.length)
  }

  const goNext = () => {
    if (!safePhotos.length) return
    setActiveIndex((current) => (current + 1) % safePhotos.length)
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/82 px-4 py-5 text-white backdrop-blur-xl sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-label="照片大图预览"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.()
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-white shadow-xl shadow-black/30 transition hover:bg-white/[0.16]"
        aria-label="关闭大图预览"
      >
        <X size={19} />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={goPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-white shadow-xl shadow-black/30 transition hover:bg-white/[0.16] sm:left-5"
            aria-label="上一张照片"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-white shadow-xl shadow-black/30 transition hover:bg-white/[0.16] sm:right-5"
            aria-label="下一张照片"
          >
            <ChevronRight size={22} />
          </button>
        </>
      ) : null}

      <div className="flex h-full w-full max-w-6xl flex-col gap-4">
        <div className="flex min-h-0 flex-1 items-center justify-center">
          {showImage ? (
            <img
              src={activeSrc}
              alt={activePhoto.title || contextTitle || '记忆照片'}
              className="max-h-full max-w-full rounded-[1.35rem] object-contain shadow-2xl shadow-black/45"
              onError={() => {
                if (!usingFallback && fallbackSrc) {
                  setUsingFallback(true)
                  return
                }
                setFailed(true)
              }}
            />
          ) : (
            <div className="flex h-full max-h-[72vh] w-full items-center justify-center rounded-[1.35rem] border border-white/10 bg-white/[0.05] text-sm text-slate-300">
              当前照片暂时无法预览
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-4xl rounded-[1.35rem] border border-white/10 bg-slate-950/62 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-white">
                {activePhoto.title || contextTitle || '记忆照片'}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-300">{description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 text-xs text-sky-100">
              <span className="rounded-full border border-sky-100/15 bg-sky-200/10 px-3 py-1">
                {sourceLabel(activePhoto)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
                {activeIndex + 1} / {safePhotos.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
