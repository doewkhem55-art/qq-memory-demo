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
    <div className="fixed inset-0 z-[65] flex justify-end bg-black/66 backdrop-blur-md">
      <aside className="memory-panel-strong memory-scrollbar h-full w-full max-w-2xl overflow-y-auto border-l p-6 text-white sm:p-7">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-sky-100">管理记忆包</p>
            <h2 className="max-w-xl text-2xl font-semibold leading-tight">调整这段记忆的封面、标题与可见范围。</h2>
            <div className="aurora-divider mt-4 w-full max-w-md" />
            <div className="mt-3 h-6">
              {saveMessage ? (
                <span className="memory-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
                  <CheckCircle2 size={14} />
                  {saveMessage}
                </span>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:bg-white/[0.12]"
            aria-label="关闭管理面板"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <p className="mb-3 text-sm font-semibold text-sky-100">当前封面</p>
            <div className="memory-cover-stage h-64 rounded-[1.5rem]">
              <PhotoCard
                title={coverPhoto?.title || cluster.title}
                src={coverPhoto?.src}
                fallbackSrc={coverPhoto?.fallbackSrc}
                fallbackSources={coverPhoto?.fallbackSources}
                source={coverPhoto?.source}
                isPlaceholder={coverPhoto?.isPlaceholder}
                showMeta={false}
                showDescription={false}
                className="h-full rounded-[1.5rem] shadow-none"
                aspect=""
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              可在照片墙中选择其他照片设为封面。
            </p>
          </section>

          <label className="block">
            <span className="text-sm font-semibold text-sky-100">记忆包标题</span>
            <input
              value={titleDraft}
              onChange={(event) => syncUpdate({ title: event.target.value })}
              className="memory-input mt-3 rounded-2xl px-4 py-3 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-sky-100">记忆包描述</span>
            <textarea
              value={summaryDraft}
              onChange={(event) => syncUpdate({ summary: event.target.value })}
              className="memory-input mt-3 min-h-32 resize-none rounded-2xl px-4 py-3 text-sm leading-7"
            />
          </label>

          <section className="memory-panel rounded-[1.5rem] p-4">
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
                    className={`focus-ring min-h-24 rounded-2xl p-3 text-left text-sm ${
                      selected
                        ? 'memory-option memory-option-active text-sky-50'
                        : 'memory-option text-slate-300'
                    }`}
                  >
                    <Icon size={16} className="mb-2 text-sky-100" />
                    <span className="font-semibold">{option.label}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="memory-panel rounded-[1.5rem] p-4">
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
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/66 px-5 backdrop-blur-md">
          <div className="memory-panel-strong w-full max-w-md rounded-[1.5rem] p-6 text-white">
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
