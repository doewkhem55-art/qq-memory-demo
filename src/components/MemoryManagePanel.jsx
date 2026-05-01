import { useEffect, useState } from 'react'
import { CheckCircle2, Eye, Send, ShieldCheck, Trash2, X } from 'lucide-react'
import Button from './Button.jsx'
import PhotoCard from './PhotoCard.jsx'

export const visibilityOptions = [
  {
    value: 'private',
    label: '仅自己可见',
    description: '当前仅自己可见，确认后可选择分享或同步到 QQ 空间。',
    icon: ShieldCheck,
  },
  {
    value: 'friends',
    label: '可分享给好友',
    description: '适合先发给熟悉的好友一起回看。',
    icon: Eye,
  },
  {
    value: 'qzone',
    label: '可同步到 QQ 空间',
    description: '确认内容后，可以同步到 QQ 空间作为新的时光记录。',
    icon: Send,
  },
]

export function getVisibilityCopy(visibility = 'private') {
  return visibilityOptions.find((item) => item.value === visibility) || visibilityOptions[0]
}

export default function MemoryManagePanel({
  cluster,
  coverPhoto,
  open,
  onClose,
  onUpdateCluster,
  onUpdateVisibility,
  onDeleteCluster,
}) {
  const [saveMessage, setSaveMessage] = useState('')
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  useEffect(() => {
    if (!saveMessage) return undefined
    const timer = window.setTimeout(() => setSaveMessage(''), 1800)
    return () => window.clearTimeout(timer)
  }, [saveMessage])

  if (!open || !cluster) return null

  const activeVisibility = getVisibilityCopy(cluster.visibility)
  const ActiveVisibilityIcon = activeVisibility.icon
  const titleDraft = cluster.title || ''
  const summaryDraft = cluster.summary || ''

  const syncUpdate = (updates) => {
    onUpdateCluster?.(cluster.id, updates)
    setSaveMessage('修改已同步')
  }

  const syncVisibility = (visibility) => {
    onUpdateVisibility?.(cluster.id, visibility)
    setSaveMessage('修改已同步')
  }

  const handleDelete = () => {
    onDeleteCluster?.(cluster.id)
    setDeleteConfirmOpen(false)
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-[65] flex justify-end bg-black/58 backdrop-blur-sm">
      <aside className="h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-slate-950/92 p-6 text-white shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-sky-100">管理记忆包</p>
            <h2 className="text-2xl font-semibold">AI 已为你整理完成，你可以继续调整这段记忆。</h2>
            <div className="mt-3 h-6">
              {saveMessage ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/15 bg-sky-200/[0.08] px-3 py-1 text-xs text-sky-100">
                  <CheckCircle2 size={14} />
                  {saveMessage}
                </span>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:bg-white/[0.12]"
            aria-label="关闭管理面板"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <section className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="mb-3 text-sm font-semibold text-sky-100">当前封面</p>
            <div className="h-48 overflow-hidden rounded-[1.15rem]">
              <PhotoCard
                title={coverPhoto?.title || cluster.title}
                src={coverPhoto?.src}
                fallbackSrc={coverPhoto?.fallbackSrc}
                fallbackSources={coverPhoto?.fallbackSources}
                source={coverPhoto?.source}
                isPlaceholder={coverPhoto?.isPlaceholder}
                showMeta={false}
                showDescription={false}
                className="h-full rounded-[1.15rem] shadow-none"
                aspect=""
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              可在照片墙中选择其他照片设为封面。
            </p>
          </section>

          <label className="block rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4">
            <span className="text-sm font-semibold text-sky-100">记忆包标题</span>
            <input
              value={titleDraft}
              onChange={(event) => syncUpdate({ title: event.target.value })}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none focus:border-sky-200/40"
            />
          </label>

          <label className="block rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4">
            <span className="text-sm font-semibold text-sky-100">记忆包描述</span>
            <textarea
              value={summaryDraft}
              onChange={(event) => syncUpdate({ summary: event.target.value })}
              className="mt-3 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none focus:border-sky-200/40"
            />
          </label>

          <section className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-sky-100">
              <ActiveVisibilityIcon size={16} />
              可见性设置
            </div>
            <p className="mb-4 text-sm leading-6 text-slate-300">{activeVisibility.description}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {visibilityOptions.map((option) => {
                const Icon = option.icon
                const selected = (cluster.visibility || 'private') === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => syncVisibility(option.value)}
                    className={`min-h-24 rounded-2xl border p-3 text-left text-sm transition ${
                      selected
                        ? 'border-sky-200/[0.42] bg-sky-200/[0.13] text-sky-50'
                        : 'border-white/10 bg-white/[0.045] text-slate-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <Icon size={16} className="mb-2 text-sky-100" />
                    <span className="font-semibold">{option.label}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.035] p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-100">删除 / 隐藏记忆包</h3>
            <p className="text-sm leading-6 text-slate-300">
              从当前整理结果中移除这段记忆，不会删除原始照片或本地素材。
            </p>
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirmOpen(true)}
              className="mt-4 border-white/10 bg-white/[0.055] text-slate-100 hover:border-rose-200/25 hover:bg-rose-300/[0.1]"
            >
              <Trash2 size={16} />
              删除记忆包
            </Button>
          </section>
        </div>
      </aside>

      {deleteConfirmOpen ? (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/62 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl shadow-black/45">
            <h3 className="text-xl font-semibold">确认删除这个记忆包吗？</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              这只会从当前整理结果中移除，不会删除原始照片或本地素材。删除后你可以重新整理生成新的记忆包。
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setDeleteConfirmOpen(false)}>
                取消
              </Button>
              <Button
                variant="secondary"
                onClick={handleDelete}
                className="border-rose-200/20 bg-rose-300/[0.1] text-rose-50 hover:bg-rose-300/[0.16]"
              >
                删除记忆包
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
