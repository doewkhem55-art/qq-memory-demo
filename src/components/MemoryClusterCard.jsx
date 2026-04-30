import { useState } from 'react'
import {
  ArrowRight,
  Camera,
  Check,
  MessageCircle,
  Pencil,
  ShieldCheck,
  Trash2,
  UsersRound,
  X,
} from 'lucide-react'
import { sourceLabels } from '../data/mockData.js'
import GlassCard from './GlassCard.jsx'
import PhotoCard from './PhotoCard.jsx'
import Tag from './Tag.jsx'

export default function MemoryClusterCard({
  cluster,
  featured = false,
  uploadedPhotos = [],
  onOpen,
  onRename,
  onDelete,
}) {
  const [editing, setEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(cluster.title)
  const canManage = cluster.isUserArchive && onRename && onDelete
  const previews = [
    ...uploadedPhotos.map((photo) => ({
      id: photo.id,
      title: photo.fileName,
      src: photo.previewUrl,
      badge: '本地',
    })),
    ...(cluster.previewPhotos || []),
    ...(cluster.photoAssets || []),
  ].slice(0, 4)

  const handleRename = () => {
    const nextTitle = draftTitle.trim()
    if (!nextTitle) return
    onRename(cluster.id, nextTitle)
    setEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('删除这个新归档相册？本地图片不会被删除，只会移除当前 Demo 状态。')) {
      onDelete(cluster.id)
    }
  }

  return (
    <GlassCard className={`group rounded-[1.6rem] p-5 transition hover:-translate-y-1 hover:border-sky-200/25 hover:bg-white/[0.068] ${featured ? 'md:col-span-2' : ''}`} as="article">
      <div className={`relative mb-5 h-48 overflow-hidden rounded-[1.35rem] bg-gradient-to-br ${cluster.coverGradient} shadow-2xl shadow-sky-950/24`}>
        <CoverTile item={previews[0]} title={cluster.title} large />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-white/5" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="max-w-full truncate rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-xl">
              {previews[0]?.badge || cluster.highlight || '记忆相册'}
            </div>
          </div>
          {previews.length > 1 ? (
            <div className="grid grid-cols-3 gap-2">
              {previews.slice(1, 4).map((item, index) => (
                <CoverTile key={item.id || `${cluster.id}-cover-${index}`} item={item} title={cluster.tags?.[index] || cluster.title} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="-mt-14 mb-5 flex items-end justify-between px-4">
        <span className="relative rounded-full border border-white/15 bg-black/26 px-3 py-1 text-xs text-white backdrop-blur-xl">
          {featured ? '重点记忆包' : cluster.highlight}
        </span>
        <span className="relative rounded-full bg-black/18 px-3 py-1 text-xs text-white/[0.82] backdrop-blur-xl">
          {cluster.timeRange}
        </span>
      </div>

      <div>
        <div className="flex items-start justify-between gap-3">
          {editing ? (
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <input
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                className="min-w-0 flex-1 rounded-2xl border border-sky-200/30 bg-slate-950/50 px-3 py-2 text-lg font-semibold text-white outline-none focus:border-sky-100/60"
                autoFocus
              />
              <button onClick={handleRename} className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-200/15 text-sky-100 transition hover:bg-sky-200/25" aria-label="保存相册名称">
                <Check size={16} />
              </button>
              <button onClick={() => { setDraftTitle(cluster.title); setEditing(false) }} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-slate-200 transition hover:bg-white/[0.12]" aria-label="取消重命名">
                <X size={16} />
              </button>
            </div>
          ) : (
            <h2 className="min-w-0 text-2xl font-semibold tracking-normal text-white">{cluster.title}</h2>
          )}
          {canManage && !editing ? (
            <div className="flex shrink-0 items-center gap-2">
              <button onClick={() => { setDraftTitle(cluster.title); setEditing(true) }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-slate-200 transition hover:bg-white/[0.12]" aria-label="重命名相册">
                <Pencil size={15} />
              </button>
              <button onClick={handleDelete} className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-200/15 bg-rose-300/[0.08] text-rose-100 transition hover:bg-rose-300/[0.16]" aria-label="删除相册">
                <Trash2 size={15} />
              </button>
            </div>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-300">{cluster.summary}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300 sm:grid-cols-4">
        <Metric icon={Camera} label={`${cluster.photoCount} 张照片`} />
        <Metric icon={MessageCircle} label={`${cluster.postCount} 条说说`} />
        <Metric icon={MessageCircle} label={`${cluster.commentCount} 条评论`} />
        <Metric icon={UsersRound} label={`${cluster.friendCount} 位好友`} />
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-white/[0.075] bg-white/[0.035] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-100">
            <ShieldCheck size={15} />
            AI 置信度 {cluster.aiConfidence}%
          </span>
          {cluster.localUploadCount ? (
            <span className="rounded-full bg-sky-200/10 px-3 py-1 text-xs text-sky-100">
              含 {cluster.localUploadCount} 张本地补全照片
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
              <li key={reason}>· {reason}</li>
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
    </GlassCard>
  )
}

function CoverTile({ item, title, large = false }) {
  const label = item?.title || title
  const src = item?.src

  if (large) {
    return <PhotoCard title={label} src={src} className="absolute inset-0 rounded-[1.35rem] shadow-none" aspect="" />
  }

  return <PhotoCard title={label} src={src} className="h-14 w-16 rounded-2xl shadow-lg shadow-black/24" aspect="" />
}

function Metric({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.045] px-3 py-2">
      <Icon size={15} className="text-sky-200" />
      <span>{label}</span>
    </div>
  )
}
