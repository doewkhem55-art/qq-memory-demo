import { useState } from 'react'
import {
  ArrowRight,
  Camera,
  MessageCircle,
  Settings2,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import { sourceLabels } from '../data/mockData.js'
import { resolveClusterPhotoMeta } from '../data/photoAssets.js'
import GlassCard from './GlassCard.jsx'
import PhotoCard from './PhotoCard.jsx'
import PhotoLightbox from './PhotoLightbox.jsx'
import Tag from './Tag.jsx'

export default function MemoryClusterCard({
  cluster,
  featured = false,
  uploadedPhotos = [],
  onOpen,
  onManage,
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const photoMeta = resolveClusterPhotoMeta({ cluster, uploadedPhotos, minCount: 3, maxCount: 4 })
  const previews = photoMeta.photos
  const localUploadLabel = cluster.localUploadCount ? `本地 ${cluster.localUploadCount}` : null

  return (
    <GlassCard className={`group rounded-[1.6rem] p-5 transition hover:-translate-y-1 hover:border-sky-200/25 hover:bg-white/[0.068] ${featured ? 'md:col-span-2' : ''}`} as="article">
      <div className="relative mb-4 h-48 overflow-hidden rounded-[1.35rem] shadow-2xl shadow-sky-950/24">
        <CoverTile item={previews[0]} title={cluster.title} large onPreview={() => setLightboxIndex(0)} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/42 via-black/5 to-transparent" />
        <div className="absolute left-3 top-3 flex max-w-[70%] flex-wrap gap-2">
          <span className="max-w-full truncate rounded-full border border-white/12 bg-black/16 px-3 py-1 text-[11px] font-medium text-sky-50 backdrop-blur-md">
            {previews[0]?.isUploaded ? '本地上传' : cluster.highlight || '记忆相册'}
          </span>
          {localUploadLabel ? (
            <span className="rounded-full border border-sky-100/15 bg-sky-200/12 px-3 py-1 text-[11px] font-medium text-sky-50 backdrop-blur-md">
              {localUploadLabel}
            </span>
          ) : null}
        </div>
        <div className="absolute inset-x-3 bottom-3 grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/12 px-3 py-1.5 backdrop-blur-md">
            <div className="truncate text-sm font-semibold text-white">
              {shortPhotoTitle(previews[0], cluster.title)}
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-white/68">
              {photoMeta.countLabel}
            </div>
          </div>
          {previews.length > 1 ? (
            <div className="hidden grid-cols-2 gap-2 sm:grid">
              {previews.slice(1, 3).map((item, index) => (
                <CoverTile
                  key={item.id || `${cluster.id}-cover-${index}`}
                  item={item}
                  title={cluster.tags?.[index] || cluster.title}
                  onPreview={() => setLightboxIndex(index + 1)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <span className="max-w-full rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 text-xs leading-5 text-slate-200">
          {featured ? '重点记忆包' : cluster.highlight}
        </span>
        <span className="shrink-0 rounded-full bg-white/[0.045] px-3 py-1 text-xs text-slate-300">
          {cluster.timeRange}
        </span>
      </div>

      <div>
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 text-2xl font-semibold tracking-normal text-white">{cluster.title}</h2>
          {onManage ? (
            <button
              type="button"
              onClick={() => onManage(cluster.id)}
              title="管理记忆包"
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/14 px-3 text-xs font-medium text-slate-100 opacity-0 backdrop-blur-md transition hover:bg-white/[0.12] group-hover:opacity-100 group-focus-within:opacity-100"
              aria-label="管理记忆包"
            >
              <Settings2 size={15} />
              管理
            </button>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-300">{cluster.summary}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Camera} label={photoMeta.countLabel} />
        <Metric icon={MessageCircle} label={`${cluster.postCount} 条说说`} />
        <Metric icon={MessageCircle} label={`${cluster.commentCount} 条评论`} />
        <Metric icon={UsersRound} label={`${cluster.friendCount} 位好友`} />
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-white/[0.075] bg-white/[0.035] p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-100">
            <ShieldCheck size={15} />
            AI 置信度 {cluster.aiConfidence}%
          </span>
          {cluster.localUploadCount ? (
            <span className="rounded-full bg-sky-200/10 px-3 py-1 text-xs text-sky-100">
              含本地补全
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {cluster.classificationBasis.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {cluster.dataSources.map((source) => (
            <span key={source} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-slate-300">
              {sourceLabels[source] || source}
            </span>
          ))}
        </div>
        {cluster.classificationReasons?.length ? (
          <ul className="mt-3 space-y-1.5 text-xs leading-5 text-slate-400">
            {cluster.classificationReasons.slice(0, 2).map((reason) => (
              <li key={reason}>- {reason}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {cluster.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <button onClick={() => onOpen(cluster.id)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-100">
        进入详情
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </button>
      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={previews}
          initialIndex={lightboxIndex}
          contextTitle={cluster.title}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </GlassCard>
  )
}

function CoverTile({ item, title, large = false, onPreview }) {
  const label = shortPhotoTitle(item, title)
  const src = item?.src || item?.previewUrl || item?.dataUrl || item?.objectUrl

  return (
    <PhotoCard
      title={label}
      src={src}
      fallbackSrc={item?.fallbackSrc}
      fallbackSources={item?.fallbackSources}
      source={item?.source}
      isPlaceholder={item?.isPlaceholder}
      compact={!large}
      showMeta={false}
      showDescription={false}
      className={large ? 'absolute inset-0 rounded-[1.35rem] shadow-none' : 'h-16 w-20 rounded-2xl shadow-lg shadow-black/24'}
      aspect=""
      onPreview={onPreview}
    />
  )
}

function Metric({ icon: Icon, label }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.045] px-3 py-2">
      <Icon size={15} className="shrink-0 text-sky-200" />
      <span className="min-w-0 text-[13px] leading-5">{label}</span>
    </div>
  )
}

function shortPhotoTitle(item, fallback = '记忆相册') {
  const title = item?.isUploaded
    ? item.fileName || item.title || fallback
    : item?.title || fallback
  if (!title) return fallback
  return title.length > 18 ? `${title.slice(0, 16)}...` : title
}
