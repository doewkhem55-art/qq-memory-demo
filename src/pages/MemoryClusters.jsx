import Button from '../components/Button.jsx'
import MemoryClusterCard from '../components/MemoryClusterCard.jsx'
import PageShell from '../components/PageShell.jsx'
import { classificationModeLabels } from '../data/mockData.js'

export default function MemoryClusters({
  analysisResult,
  featuredClusterId,
  onBack,
  onOpenCluster,
  onRenameCluster,
  onDeleteCluster,
}) {
  const clusters = analysisResult.memoryClusters
  const firstClusterId = featuredClusterId || analysisResult.featuredClusterId || clusters[0]?.id || 'graduation-2018'
  const modeLabel =
    analysisResult.selectedClassificationMode === 'custom'
      ? `自定义指令：${analysisResult.customPrompt || '按自定义描述整理'}`
      : classificationModeLabels[analysisResult.selectedClassificationMode] || '按人生阶段整理'
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

  return (
    <PageShell
      title={copy.title}
      eyebrow="记忆分类结果"
      onBack={onBack}
      actions={<Button variant="secondary" onClick={() => onOpenCluster(firstClusterId)}>查看首个记忆包</Button>}
    >
      <div className="mb-8 max-w-3xl text-sm leading-7 text-slate-300">
        {copy.subtitle} 当前整理方式：{modeLabel}。
        {analysisResult.selectedClassificationMode === 'custom' && analysisResult.customPrompt
          ? ` 指令：${analysisResult.customPrompt}。`
          : ''}
        {analysisResult.uploadClassificationResults?.length
          ? ` 已有 ${analysisResult.uploadClassificationResults.length} 张本地图片参与 Mock AI 分类。`
          : ' 当前未导入本地图片。'}
      </div>
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
    </PageShell>
  )
}
