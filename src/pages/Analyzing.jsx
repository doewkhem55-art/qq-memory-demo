import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'
import Button from '../components/Button.jsx'
import GlassCard from '../components/GlassCard.jsx'
import PageShell from '../components/PageShell.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { classificationModeLabels } from '../data/mockData.js'
import { analyzeMemorySources } from '../services/aiMemoryService.js'

export default function Analyzing({ importState, onComplete, onViewResult }) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('准备分析授权范围……')
  const [done, setDone] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const onCompleteRef = useRef(onComplete)
  const importStateRef = useRef(importState)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let active = true
    async function runAnalysis() {
      const result = await analyzeMemorySources(importStateRef.current, {
        onProgress: (value) => active && setProgress(value),
        onStageChange: (text) => active && setStage(text),
      })
      if (!active) return
      setProgress(100)
      onCompleteRef.current(result)
      setAnalysisResult(result)
      setDone(true)
      setStage('你的记忆档案已整理完成')
    }
    runAnalysis()
    return () => {
      active = false
    }
  }, [])

  const localAssignedCount = analysisResult?.uploadClassificationResults?.length || 0
  const currentModeText = useMemo(
    () => `当前整理方式：${classificationModeLabels[importState.classificationMode] || '按人生阶段整理'}`,
    [importState.classificationMode],
  )

  const floatingFindings = [
    '发现 2018 年毕业季照片',
    '关联 18 条说说评论',
    '识别 4 位高频互动好友',
    `已识别 ${importState.uploadedFiles.length} 张本地照片`,
    `已将 ${localAssignedCount || importState.uploadedFiles.length} 张照片归入相关记忆包`,
  ]
  const isCustomColorPrompt =
    importState.classificationMode === 'custom' &&
    /头发颜色|发色|颜色|红色|黄色|白色|黑色|棕色|金色/.test(importState.customPrompt || '')

  return (
    <PageShell title="AI 正在整理你的记忆" eyebrow="智能分析中">
      <div className="mx-auto max-w-3xl">
        <GlassCard className="relative overflow-hidden rounded-[2rem] p-8 text-center">
          <div className="absolute inset-x-10 top-0 h-32 bg-sky-300/15 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-sky-200/25 bg-sky-200/10 text-sky-100 shadow-2xl shadow-sky-500/20">
              {done ? <CheckCircle2 size={28} /> : <Sparkles size={28} />}
            </div>
            <p className="text-sm text-sky-100">{currentModeText}</p>
            {importState.customPrompt ? (
              <p className="mt-2 rounded-2xl bg-white/[0.055] px-4 py-3 text-sm leading-6 text-slate-300">
                AI 正在理解你的自定义分类指令：{importState.customPrompt}
              </p>
            ) : null}
            {isCustomColorPrompt ? (
              <p className="mt-2 rounded-2xl bg-sky-200/10 px-4 py-3 text-sm leading-6 text-sky-100">
                正在模拟识别照片中的发色与人物特征……当前 Demo 使用 Mock 分类，未来可接入多模态视觉识别。
              </p>
            ) : null}
            <p className="mt-2 text-sm text-slate-400">
              已选择 {importState.selectedSources.length} 类来源，已读取 {importState.uploadedFiles.length} 张本地图片，仅用于浏览器本地预览
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{stage}</h2>
            <div className="mt-8">
              <ProgressBar value={progress} completed={done && progress === 100} />
              <div className="mt-3 text-right text-sm font-semibold text-sky-100">{progress}%</div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {floatingFindings.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
            {done && progress === 100 && analysisResult ? (
              <Button onClick={onViewResult} className="mt-9">
                查看我的记忆档案
              </Button>
            ) : (
              <p className="mt-9 text-sm text-slate-400">
                正在用 Mock AI 服务模拟真实分类、图片识别、关系关联和回忆页生成流程。
              </p>
            )}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}
