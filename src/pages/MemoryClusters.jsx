import { useState } from 'react'
import { ArrowRight, Brain, Database, ShieldCheck, X } from 'lucide-react'
import Button from '../components/Button.jsx'
import MemoryManagePanel from '../components/MemoryManagePanel.jsx'
import MemoryClusterCard from '../components/MemoryClusterCard.jsx'
import PageShell from '../components/PageShell.jsx'
import { classificationModeLabels, sourceLabels } from '../data/mockData.js'
import { mergeUploadedPhotoPreviews, resolveClusterPhotoMeta } from '../data/photoAssets.js'

export default function MemoryClusters({
  analysisResult,
  uploadedPhotoPreviews = [],
  featuredClusterId,
  onBack,
  onOpenCluster,
  onRenameCluster,
  onUpdateCluster,
  onDeleteCluster,
  onUpdateVisibility,
}) {
  const [basisPanelOpen, setBasisPanelOpen] = useState(false)
  const [managedClusterId, setManagedClusterId] = useState(null)
  const clusters = analysisResult.memoryClusters
  const normalizedUploads = mergeUploadedPhotoPreviews(
    analysisResult.uploadClassificationResults || [],
    uploadedPhotoPreviews,
  )
  const firstClusterId = featuredClusterId || analysisResult.featuredClusterId || clusters[0]?.id || 'graduation-2018'
  const modeLabel = classificationModeLabels[analysisResult.selectedClassificationMode] || '按人生阶段整理'
  const pageCopy = {
    life_stage: {
      title: '按人生阶段整理出的记忆档案',
      subtitle: 'AI 已按高中、大学、校园生活和家庭旅行等阶段，把散落内容整理成连续的个人时光线。',
    },
    relation: {
      title: '按人物关系整理出的记忆档案',
      subtitle: 'AI 已从 QQ 空间旧相册、说说评论和互动记录中，识别出你与家人、同学、朋友之间的高频记忆片段。',
    },
    scene: {
      title: '按场景主题整理出的记忆档案',
      subtitle: 'AI 已按毕业、旅行、聚餐、军训、生日和校园日常等主题重新组织照片与互动内容。',
    },
    custom: {
      title: '按你的 AI 指令整理出的记忆档案',
      subtitle: /我自己|自己|我的|个人|自我/.test(analysisResult.customPrompt || '') && /别人|他人|朋友|同学|家人|和别人|和他人/.test(analysisResult.customPrompt || '')
        ? 'AI 已根据你的整理偏好，将记忆拆分为“关于我自己的片段”和“与他人共同出现的关系记忆”，并结合 QQ 空间旧相册、说说评论与好友互动记录生成记忆包。'
        : analysisResult.customPrompt
        ? `AI 正在优先响应你的整理偏好：${analysisResult.customPrompt}`
        : 'AI 已根据默认规则整理记忆，你也可以回到导入页输入更具体的分类指令。',
    },
  }
  const copy = pageCopy[analysisResult.selectedClassificationMode] || pageCopy.life_stage
  const dataSources = ['qq_album', 'qq_zone', 'friends', 'local_album']
  const generatedDimensions = clusters.map((cluster) => cluster.title)
  const managedCluster = clusters.find((cluster) => cluster.id === managedClusterId)
  const managedUploads = normalizedUploads.filter(
    (item) => item.assignedClusterId === managedCluster?.id,
  )
  const managedPhotoMeta = managedCluster
    ? resolveClusterPhotoMeta({ cluster: managedCluster, uploadedPhotos: managedUploads, minCount: 3, maxCount: 4 })
    : { photos: [] }

  return (
    <PageShell
      title={copy.title}
      eyebrow="记忆分类结果"
      onBack={onBack}
      actions={
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setBasisPanelOpen(true)}>
            <Brain size={17} />
            查看 AI 分类依据
          </Button>
          <Button onClick={() => onOpenCluster(firstClusterId)}>
            进入这段记忆
            <ArrowRight size={17} />
          </Button>
        </div>
      }
    >
      <div className="mb-4 max-w-3xl text-sm leading-7 text-slate-300">
        {copy.subtitle} 当前整理方式：{modeLabel}。
        {analysisResult.uploadClassificationResults?.length
          ? ` 已有 ${analysisResult.uploadClassificationResults.length} 张本地图片参与本次整理。`
          : ' 当前未导入本地图片。'}
      </div>
      <div className="memory-panel mb-6 flex max-w-4xl items-start gap-3 rounded-[1.5rem] px-5 py-4 text-sm leading-6 text-slate-300">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-sky-100" />
        <p>
          这些记忆包已结合照片时间、说说评论、共同出现人物和好友互动生成。你可以查看分类依据，也可以进入记忆包继续确认内容。
        </p>
      </div>
      {analysisResult.customPrompt ? (
        <div className="memory-panel mb-6 max-w-3xl rounded-[1.35rem] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/80">
            AI 分类指令
          </p>
          <p className="mt-2 text-base font-semibold text-white">
            指令：{analysisResult.customPrompt}
          </p>
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        {clusters.map((cluster) => (
          <MemoryClusterCard
            key={cluster.id}
            cluster={cluster}
            featured={cluster.id === firstClusterId}
            uploadedPhotos={normalizedUploads.filter(
              (item) => item.assignedClusterId === cluster.id,
            )}
            onOpen={onOpenCluster}
            onRename={onRenameCluster}
            onDelete={onDeleteCluster}
            onManage={setManagedClusterId}
          />
        ))}
      </div>
      <MemoryManagePanel
        open={Boolean(managedCluster)}
        cluster={managedCluster}
        coverPhoto={managedPhotoMeta.photos[0]}
        onClose={() => setManagedClusterId(null)}
        onUpdateCluster={onUpdateCluster}
        onUpdateVisibility={onUpdateVisibility}
        onDeleteCluster={onDeleteCluster}
      />
      {basisPanelOpen ? (
        <ClassificationBasisPanel
          modeLabel={modeLabel}
          customPrompt={analysisResult.customPrompt}
          dataSources={dataSources}
          generatedDimensions={generatedDimensions}
          clusters={clusters}
          sourceLabels={sourceLabels}
          onClose={() => setBasisPanelOpen(false)}
        />
      ) : null}
    </PageShell>
  )
}

function ClassificationBasisPanel({
  modeLabel,
  customPrompt,
  dataSources,
  generatedDimensions,
  clusters,
  sourceLabels,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/62 backdrop-blur-md">
      <aside className="memory-panel-strong h-full w-full max-w-2xl overflow-y-auto border-l p-6 text-white">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm text-sky-100">
              <Brain size={16} />
              AI 分类依据
            </p>
            <h2 className="text-2xl font-semibold">本次记忆包生成说明</h2>
            <div className="aurora-divider mt-4 w-full max-w-md" />
          </div>
          <button onClick={onClose} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:bg-white/[0.12]" aria-label="关闭分类依据面板">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <section className="memory-panel rounded-[1.35rem] p-5">
            <h3 className="mb-3 text-sm font-semibold text-sky-100">本次整理方式</h3>
            <p className="text-sm leading-7 text-slate-300">{modeLabel}</p>
            {customPrompt ? (
              <p className="memory-chip mt-3 rounded-2xl px-4 py-3 text-sm leading-6">
                用户输入的 AI 分类指令：{customPrompt}
              </p>
            ) : null}
          </section>

          <section className="memory-panel rounded-[1.35rem] p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sky-100">
              <Database size={15} />
              本次读取的数据源
            </h3>
            <div className="flex flex-wrap gap-2">
              {dataSources.map((source) => (
                <span key={source} className="memory-chip rounded-full px-3 py-1 text-xs">
                  {sourceLabels[source] || source}
                </span>
              ))}
            </div>
          </section>

          <section className="memory-panel rounded-[1.35rem] p-5">
            <h3 className="mb-3 text-sm font-semibold text-sky-100">本次生成的分类维度</h3>
            <div className="flex flex-wrap gap-2">
              {generatedDimensions.map((dimension) => (
                <span key={dimension} className="memory-chip rounded-full px-3 py-1 text-xs">
                  {dimension}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300">共生成 {clusters.length} 个记忆包。</p>
          </section>

          <section className="memory-panel rounded-[1.35rem] p-5">
            <h3 className="mb-4 text-sm font-semibold text-sky-100">每个记忆包的主要依据</h3>
            <div className="space-y-4">
              {clusters.map((cluster) => (
                <div key={cluster.id} className="memory-panel rounded-2xl p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold text-white">{cluster.title}</h4>
                    <span className="memory-chip rounded-full px-3 py-1 text-xs">
                      置信度 {cluster.aiConfidence}%
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm leading-6 text-slate-300">
                    {(cluster.classificationReasons || cluster.classificationBasis || []).slice(0, 4).map((reason) => (
                      <li key={reason}>· {reason}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="memory-panel rounded-[1.35rem] p-5">
            <h3 className="mb-3 text-sm font-semibold text-sky-100">未来 AI 接口预留说明</h3>
            <p className="text-sm leading-7 text-slate-300">
              当前为演示环境，分类结果用于展示产品体验流程。未来可接入多模态模型，进一步识别照片中的人物、场景、颜色、情绪与时间信息。
            </p>
          </section>
        </div>
      </aside>
    </div>
  )
}
