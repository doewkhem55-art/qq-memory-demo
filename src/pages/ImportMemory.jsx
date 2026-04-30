import { useState } from 'react'
import {
  BookOpenText,
  Camera,
  Check,
  ImagePlus,
  MessageCircle,
  Route,
  ShieldCheck,
  Tags,
  UsersRound,
} from 'lucide-react'
import Button from '../components/Button.jsx'
import GlassCard from '../components/GlassCard.jsx'
import PageShell from '../components/PageShell.jsx'
import PrivacyNotice from '../components/PrivacyNotice.jsx'

const sourceOptions = [
  {
    id: 'qq_album',
    icon: Camera,
    name: 'QQ 空间旧相册',
    desc: '读取相册时间、地点、标题与照片分组，作为记忆整理的主线。',
  },
  {
    id: 'qq_zone',
    icon: MessageCircle,
    name: '说说与评论',
    desc: '关联同期动态、评论和可见范围，理解照片背后的故事。',
  },
  {
    id: 'friends',
    icon: UsersRound,
    name: '好友互动关系',
    desc: '仅分析互动频率、共同出现和评论关系，不展示具体私聊内容。',
  },
  {
    id: 'local_album',
    icon: ImagePlus,
    name: '本地相册补全',
    desc: '当前 Demo 中图片仅用于浏览器本地预览，不会上传服务器。',
  },
]

const classificationOptions = [
  {
    id: 'life_stage',
    icon: Route,
    title: '按人生阶段整理',
    example: '小学、初中、高中、大学、工作以后',
  },
  {
    id: 'relation',
    icon: UsersRound,
    title: '按人物关系整理',
    example: '家人、朋友、同学、爱人',
  },
  {
    id: 'scene',
    icon: Tags,
    title: '按场景主题整理',
    example: '毕业、旅行、聚餐、生日、军训',
  },
  {
    id: 'custom',
    icon: BookOpenText,
    title: '自定义 AI 分类指令',
    example: '让 AI 按你的描述理解整理方式',
  },
]

export default function ImportMemory({ initialState, onBack, onStart }) {
  const [selectedSources, setSelectedSources] = useState(initialState.selectedSources)
  const [uploadedFiles, setUploadedFiles] = useState(initialState.uploadedFiles)
  const [classificationMode, setClassificationMode] = useState(
    initialState.classificationMode || 'life_stage',
  )
  const [customPrompt, setCustomPrompt] = useState(initialState.customPrompt || '')

  const toggleSource = (sourceId) => {
    setSelectedSources((current) =>
      current.includes(sourceId)
        ? current.filter((item) => item !== sourceId)
        : [...current, sourceId],
    )
  }

  const handleFiles = (event) => {
    uploadedFiles.forEach((file) => {
      if (file.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(file.previewUrl)
    })

    const files = Array.from(event.target.files || []).map((file) => ({
      id: `${file.name}-${file.lastModified}-${file.size}`,
      fileName: file.name,
      name: file.name,
      file,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      previewUrl: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    }))
    setUploadedFiles(files)
  }

  return (
    <PageShell title="选择要整理的记忆来源" eyebrow="记忆导入" onBack={onBack}>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2">
            {sourceOptions.map(({ id, icon: Icon, name, desc }) => {
              const checked = selectedSources.includes(id)
              return (
                <button
                  key={id}
                  onClick={() => toggleSource(id)}
                  className={`rounded-[1.75rem] border p-5 text-left shadow-2xl shadow-black/25 backdrop-blur-2xl transition hover:-translate-y-0.5 ${
                    checked
                      ? 'border-sky-200/[0.35] bg-sky-200/[0.12]'
                      : 'border-white/10 bg-white/[0.055] hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200/20 bg-sky-200/10 text-sky-100">
                      <Icon size={22} />
                    </span>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${checked ? 'border-sky-100 bg-sky-100 text-slate-950' : 'border-white/[0.15] text-transparent'}`}>
                      <Check size={15} />
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">{name}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
                </button>
              )
            })}
          </section>

          <GlassCard className="rounded-[1.75rem] p-6">
            <h2 className="text-xl font-semibold text-white">你想如何整理这批记忆？</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {classificationOptions.map(({ id, icon: Icon, title, example }) => {
                const active = classificationMode === id
                return (
                  <button
                    key={id}
                    onClick={() => setClassificationMode(id)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      active
                        ? 'border-sky-200/[0.35] bg-sky-200/[0.12]'
                        : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.075]'
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                        <Icon size={18} />
                      </span>
                      <span className="font-semibold text-white">{title}</span>
                    </div>
                    <p className="text-xs leading-5 text-slate-400">示例：{example}</p>
                  </button>
                )
              })}
            </div>
            <div className="mt-5">
              <label htmlFor="customPrompt" className="mb-3 block text-sm font-semibold text-sky-100">
                告诉 AI 你的整理偏好（可选）
              </label>
              <textarea
                id="customPrompt"
                value={customPrompt}
                onChange={(event) => setCustomPrompt(event.target.value)}
                placeholder="例如：帮我按小学、初中、高中、大学来整理；或者帮我找出和家人、朋友、同学有关的回忆"
                className="min-h-28 w-full resize-none rounded-3xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-7 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-200/40"
              />
              <p className="mt-2 text-xs leading-5 text-slate-400">
                选择“自定义 AI 分类指令”时，这段文字会作为主要分类依据；选择其他方式时，它会作为补充偏好。
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-5">
          <GlassCard className="rounded-[1.75rem] p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                <ImagePlus size={21} />
              </span>
              <div>
                <h2 className="font-semibold text-white">本地图片预留入口</h2>
                <p className="text-sm text-slate-400">图片仅用于浏览器本地预览，不会上传服务器。</p>
              </div>
            </div>
            <label className="block cursor-pointer rounded-3xl border border-dashed border-sky-200/25 bg-sky-200/[0.06] p-6 text-center transition hover:bg-sky-200/[0.1]">
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
              <p className="text-sm font-semibold text-sky-100">选择本地照片用于模拟识别</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">未来可将 uploadedFiles 传给真实图片识别 API。</p>
            </label>
            {uploadedFiles.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055]">
                    <img src={file.previewUrl} alt={file.fileName} className="h-24 w-full object-cover" />
                    <div className="truncate px-3 py-2 text-xs text-slate-300">{file.fileName}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </GlassCard>

          <PrivacyNotice>
            仅在用户授权范围内读取 QQ 空间、相册与互动数据，支持随时管理、隐藏和删除。
          </PrivacyNotice>

          <Button
            onClick={() =>
              onStart({
                selectedSources,
                uploadedFiles,
                classificationMode,
                customPrompt,
                userId: 'demo-user',
              })
            }
            disabled={selectedSources.length === 0}
            className="w-full"
          >
            <ShieldCheck size={18} />
            开始 AI 整理
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
