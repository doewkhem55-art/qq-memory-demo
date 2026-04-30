import { useState } from 'react'
import { Brain, Database, X } from 'lucide-react'
import Button from '../components/Button.jsx'
import MemoryClusterCard from '../components/MemoryClusterCard.jsx'
import PageShell from '../components/PageShell.jsx'
import { classificationModeLabels, sourceLabels } from '../data/mockData.js'

export default function MemoryClusters({
  analysisResult,
  featuredClusterId,
  onBack,
  onOpenCluster,
  onRenameCluster,
  onDeleteCluster,
}) {
  const [basisPanelOpen, setBasisPanelOpen] = useState(false)
  const clusters = analysisResult.memoryClusters
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
          <Button variant="secondary" onClick={() => onOpenCluster(firstClusterId)}>查看首个记忆包</Button>
        </div>
      }
    >
      <div className="mb-4 max-w-3xl text-sm leading-7 text-slate-300">
        {copy.subtitle} 当前整理方式：{modeLabel}。
        {analysisResult.uploadClassificationResults?.length
          ? ` 已有 ${analysisResult.uploadClassificationResults.length} 张本地图片参与本次整理。`
          : ' 当前未导入本地图片。'}
      </div>
      {analysisResult.customPrompt ? (
        <div className="mb-6 max-w-3xl rounded-[1.35rem] border border-sky-200/18 bg-sky-200/[0.08] px-5 py-4">
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
            uploadedPhotos={(analysisResult.uploadClassificationResults || []).filter(
              (item) => item.assignedClusterId === cluster.id,
            )}
            onOpen={onOpenCluster}
            onRename={onRenameCluster}
            onDelete={onDeleteCluster}
          />
        ))}
      </div>
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-sm">
      <aside className="h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-slate-950/92 p-6 text-white shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm text-sky-100">
              <Brain size={16} />
              AI 分类依据
            </p>
            <h2 className="text-2xl font-semibold">本次记忆包生成说明</h2>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:bg-white/[0.12]" aria-label="关闭分类依据面板">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <section className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-5">
            <h3 className="mb-3 text-sm font-semibold text-sky-100">本次整理方式</h3>
            <p className="text-sm leading-7 text-slate-300">{modeLabel}</p>
            {customPrompt ? (
              <p className="mt-3 rounded-2xl bg-sky-200/[0.08] px-4 py-3 text-sm leading-6 text-sky-100">
                用户输入的 AI 分类指令：{customPrompt}
              </p>
            ) : null}
          </section>

          <section className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sky-100">
              <Database size={15} />
              本次读取的数据源
            </h3>
            <div className="flex flex-wrap gap-2">
              {dataSources.map((source) => (
                <span key={source} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-slate-300">
                  {sourceLabels[source] || source}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-5">
            <h3 className="mb-3 text-sm font-semibold text-sky-100">本次生成的分类维度</h3>
            <div className="flex flex-wrap gap-2">
              {generatedDimensions.map((dimension) => (
                <span key={dimension} className="rounded-full bg-sky-200/[0.09] px-3 py-1 text-xs text-sky-100">
                  {dimension}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300">共生成 {clusters.length} 个记忆包。</p>
          </section>

          <section className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-5">
            <h3 className="mb-4 text-sm font-semibold text-sky-100">每个记忆包的主要依据</h3>
            <div className="space-y-4">
              {clusters.map((cluster) => (
                <div key={cluster.id} className="rounded-2xl border border-white/[0.08] bg-slate-950/35 p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold text-white">{cluster.title}</h4>
                    <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
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

          <section className="rounded-[1.35rem] border border-sky-200/15 bg-sky-200/[0.07] p-5">
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
