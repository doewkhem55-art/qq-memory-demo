import { Eye, Send, ShieldCheck, Trash2, X } from 'lucide-react'
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
  if (!open || !cluster) return null

  const activeVisibility = getVisibilityCopy(cluster.visibility)
  const ActiveVisibilityIcon = activeVisibility.icon
  const titleDraft = cluster.title || ''
  const summaryDraft = cluster.summary || ''

  const handleDelete = () => {
    const confirmed = window.confirm('确认隐藏这个记忆包？只会从当前 Demo 状态中移除，不会删除原始照片。')
    if (!confirmed) return
    onDeleteCluster?.(cluster.id)
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-[65] flex justify-end bg-black/58 backdrop-blur-sm">
      <aside className="h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-slate-950/92 p-6 text-white shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-sky-100">管理记忆包</p>
            <h2 className="text-2xl font-semibold">AI 已为你整理完成，你可以继续调整这段记忆。</h2>
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
              设为封面后，所有回忆页将同步使用这张照片。照片可在详情页照片墙中设为封面或移除。
            </p>
          </section>

          <label className="block rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4">
            <span className="text-sm font-semibold text-sky-100">记忆包标题</span>
            <input
              value={titleDraft}
              onChange={(event) => onUpdateCluster?.(cluster.id, { title: event.target.value })}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-200/40"
            />
          </label>

          <label className="block rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4">
            <span className="text-sm font-semibold text-sky-100">记忆包描述</span>
            <textarea
              value={summaryDraft}
              onChange={(event) => onUpdateCluster?.(cluster.id, { summary: event.target.value })}
              className="mt-3 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-sky-200/40"
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
                    onClick={() => onUpdateVisibility?.(cluster.id, option.value)}
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

          <section className="rounded-[1.35rem] border border-rose-200/15 bg-rose-300/[0.055] p-4">
            <h3 className="mb-2 text-sm font-semibold text-rose-100">隐藏记忆包</h3>
            <p className="text-sm leading-6 text-slate-300">
              从列表中移除这段记忆，不会删除 public/demo-photos 中的素材，也不会删除你的原始照片。
            </p>
            <Button variant="secondary" onClick={handleDelete} className="mt-4 border-rose-200/20 bg-rose-300/[0.1] text-rose-50">
              <Trash2 size={16} />
              删除 / 隐藏记忆包
            </Button>
          </section>
        </div>
      </aside>
    </div>
  )
}
