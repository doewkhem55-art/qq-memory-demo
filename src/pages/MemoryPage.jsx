import { useEffect, useState } from 'react'
import { Camera, Check, Eye, ImagePlus, PencilLine, Send, Settings2, Sparkles, X } from 'lucide-react'
import Button from '../components/Button.jsx'
import DisplayTitle from '../components/DisplayTitle.jsx'
import GlassCard from '../components/GlassCard.jsx'
import MemoryManagePanel, { getVisibilityCopy } from '../components/MemoryManagePanel.jsx'
import PageShell from '../components/PageShell.jsx'
import PhotoCard from '../components/PhotoCard.jsx'
import PhotoGrid from '../components/PhotoGrid.jsx'
import PhotoLightbox from '../components/PhotoLightbox.jsx'
import PrivacyNotice from '../components/PrivacyNotice.jsx'
import { classificationModeLabels, comments, photos, posts } from '../data/mockData.js'
import { resolveClusterPhotoMeta } from '../data/photoAssets.js'
import { generateMemoryEssay } from '../services/aiMemoryService.js'

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = () => resolve('')
    reader.readAsDataURL(file)
  })
}

export default function MemoryPage({
  generatedPage,
  cluster,
  analysisResult,
  onBack,
  onHome,
  onAddArchivedRecentPhotos,
  onRenameCluster,
  onUpdateCluster,
  onDeleteCluster,
  onSetCoverPhoto,
  onRemovePhoto,
  onUpdateVisibility,
  onOpenCluster,
  onViewClusters,
}) {
  const [archivePanelOpen, setArchivePanelOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [recentFiles, setRecentFiles] = useState([])
  const [archiveMode, setArchiveMode] = useState('current')
  const [archivePrompt, setArchivePrompt] = useState('')
  const [archiveAlbumName, setArchiveAlbumName] = useState('')
  const [archiveResult, setArchiveResult] = useState(null)
  const [archiveRenameDraft, setArchiveRenameDraft] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [essayEditing, setEssayEditing] = useState(false)
  const [essayDraft, setEssayDraft] = useState('')
  const currentCluster =
    analysisResult.memoryClusters.find((item) => item.id === cluster.id) || cluster
  const defaultEssay = generateMemoryEssay(currentCluster)
  const page =
    generatedPage?.clusterId === currentCluster.id
      ? {
          ...generatedPage,
          title: `你的「${currentCluster.title}」回忆页已生成`,
          timeRange: currentCluster.timeRange,
          essay: currentCluster.memoryPageText || defaultEssay,
        }
      : {
          id: `page-${currentCluster.id}`,
          clusterId: currentCluster.id,
          title: `你的「${currentCluster.title}」回忆页已生成`,
          timeRange: currentCluster.timeRange,
          essay: defaultEssay,
          selectedPhotoIds: currentCluster.relatedPhotoIds,
          featuredPostId: currentCluster.relatedPostIds[0],
          featuredCommentIds: ['comment-001', 'comment-003', 'comment-004'],
          featuredFriendIds: currentCluster.relatedFriendIds.slice(0, 3),
        }
  const displayEssay = currentCluster.memoryPageText || page.essay || defaultEssay

  useEffect(() => {
    setEssayDraft(displayEssay)
    setEssayEditing(false)
  }, [currentCluster.id, displayEssay])

  const handleSaveEssay = () => {
    const trimmedEssay = essayDraft.trim()
    onUpdateCluster?.(currentCluster.id, {
      memoryPageText: trimmedEssay || undefined,
    })
    setEssayEditing(false)
  }

  const selectedPhotos = photos.filter((photo) => page.selectedPhotoIds.includes(photo.id))
  const uploadedPhotos = (analysisResult.uploadClassificationResults || []).filter(
    (item) => item.assignedClusterId === currentCluster.id,
  )
  const photoMeta = resolveClusterPhotoMeta({
    cluster: currentCluster,
    uploadedPhotos,
    minCount: 3,
    maxCount: 6,
  })
  const displayPhotos = photoMeta.photos
  const visibilityCopy = getVisibilityCopy(currentCluster.visibility || page.visibility)
  const featuredPost =
    currentCluster.relatedPostsData?.[0] ||
    posts.find((post) => post.id === page.featuredPostId)
  const featuredComments =
    currentCluster.relatedCommentsData?.length
      ? currentCluster.relatedCommentsData.slice(0, 3)
      : comments.filter((comment) => page.featuredCommentIds.includes(comment.id))
  const featuredFriends =
    currentCluster.relatedFriendsData?.length
      ? currentCluster.relatedFriendsData.slice(0, 3)
      : analysisResult.detectedPeople.filter((friend) => page.featuredFriendIds.includes(friend.id))

  return (
    <PageShell
      title={page.title}
      eyebrow="回忆页生成结果"
      onBack={onBack}
      actions={
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setManageOpen(true)}>
            <Settings2 size={17} />
            管理
          </Button>
          <Button variant="secondary" onClick={onHome}>回到首页</Button>
        </div>
      }
    >
      <div className="mx-auto max-w-5xl">
        <GlassCard className="overflow-hidden rounded-[2rem]">
          <div className={`memory-cover-stage relative min-h-[25rem] overflow-hidden rounded-[2rem] bg-gradient-to-br ${currentCluster.coverGradient} p-8 sm:p-10`}>
            <PhotoCard
              title={currentCluster.title}
              src={displayPhotos[0]?.src}
              fallbackSrc={displayPhotos[0]?.fallbackSrc}
              fallbackSources={displayPhotos[0]?.fallbackSources}
              description={displayPhotos[0]?.description}
              source={displayPhotos[0]?.source}
              isPlaceholder={displayPhotos[0]?.isPlaceholder}
              className="absolute inset-0 rounded-none opacity-90 shadow-none"
              aspect=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/12 to-transparent" />
            <div className="relative flex h-full min-h-80 flex-col justify-end">
              <p className="memory-float-caption mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
                <Sparkles size={15} />
                AI 生成回忆页
              </p>
              <DisplayTitle as="h2" className="max-w-2xl text-5xl font-semibold leading-tight">
                {currentCluster.title}
              </DisplayTitle>
              <p className="mt-3 text-white/[0.8]">{page.timeRange}</p>
            </div>
          </div>

          <div className="space-y-10 p-6 sm:p-9">
            <section>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">AI 生成短文</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    AI 已生成初稿，你可以继续调整这段记忆的表达。
                  </p>
                </div>
                {essayEditing ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="h-10 px-4 text-xs"
                      onClick={() => {
                        setEssayDraft(displayEssay)
                        setEssayEditing(false)
                      }}
                    >
                      取消
                    </Button>
                    <Button className="h-10 px-4 text-xs" onClick={handleSaveEssay}>
                      <Check size={15} />
                      保存短文
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    className="h-10 px-4 text-xs"
                    onClick={() => setEssayEditing(true)}
                  >
                    <PencilLine size={15} />
                    编辑短文
                  </Button>
                )}
              </div>
              {essayEditing ? (
                <textarea
                  value={essayDraft}
                  onChange={(event) => setEssayDraft(event.target.value)}
                  className="memory-input min-h-36 resize-none rounded-[1.5rem] p-4 text-sm leading-8"
                />
              ) : (
                <p className="text-sm leading-8 text-slate-300">{displayEssay}</p>
              )}
              {currentCluster.memoryPageText ? (
                <p className="mt-3 text-xs text-sky-200/80">修改已同步到回忆页。</p>
              ) : null}
              <p className="memory-panel mt-5 rounded-2xl px-4 py-3 text-sm leading-6 text-sky-100">
                {visibilityCopy.description}
              </p>
            </section>

            <section>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                <Camera size={19} className="text-sky-200" />
                精选照片
              </h3>
              <p className="mb-4 text-sm text-slate-400">{photoMeta.countLabel}</p>
              <PhotoGrid
                photos={displayPhotos}
                onPhotoPreview={setLightboxIndex}
                onSetCover={(photo) => onSetCoverPhoto?.(currentCluster.id, photo)}
                onRemovePhoto={(photo) => {
                  onRemovePhoto?.(currentCluster.id, photo)
                  setLightboxIndex(null)
                }}
              />
            </section>

            <div className="grid gap-5 md:grid-cols-2">
              <section className="memory-panel rounded-[1.5rem] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">代表性说说</h3>
                <p className="text-sm leading-7 text-slate-300">{featuredPost?.content || '暂无直接关联说说，未来可由文本语义分析补全。'}</p>
              </section>

              <section className="memory-panel rounded-[1.5rem] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">朋友评论摘录</h3>
                <div className="space-y-2 text-sm leading-6 text-slate-300">
                  {featuredComments.length ? featuredComments.map((comment) => (
                    <p key={comment.id}>
                      <span className="text-sky-100">{comment.author}：</span>
                      {comment.content}
                    </p>
                  )) : <p>暂无直接关联评论。</p>}
                </div>
              </section>
            </div>

            <section>
              <h3 className="mb-4 text-xl font-semibold text-white">高频互动好友</h3>
              <div className="flex flex-wrap gap-4">
                {featuredFriends.map((friend) => (
                  <div key={friend.id} className="memory-chip flex items-center gap-3 rounded-full py-2 pl-2 pr-4">
                    <span className={`h-10 w-10 rounded-full bg-gradient-to-br ${friend.avatarGradient}`} />
                    <span className="text-sm font-medium text-slate-200">{friend.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </GlassCard>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button>
            <Sparkles size={17} />
            保存到我的时光回廊
          </Button>
          <Button variant="secondary" onClick={() => onUpdateVisibility?.(currentCluster.id, 'private')}>
            <Eye size={17} />
            仅自己可见
          </Button>
          <Button variant="secondary" onClick={() => onUpdateVisibility?.(currentCluster.id, 'qzone')}>
            <Send size={17} />
            分享到 QQ 空间
          </Button>
        </div>

        <div className="mt-6">
          <PrivacyNotice>
            所有回忆内容仅在用户授权范围内生成，用户可随时删除、隐藏或取消关联。
          </PrivacyNotice>
        </div>

        <GlassCard className="mt-8 rounded-[2rem] p-6 sm:p-7">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white">从今天开始，继续整理新的记忆</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                这次你找回了过去的回忆。以后也可以把近期照片交给 QQ 时光回廊，AI 会沿用你的整理偏好，把新照片自动归档进个人时光档案。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setArchivePanelOpen(true)}>
                <ImagePlus size={17} />
                归档最近照片
              </Button>
              <Button variant="secondary" onClick={() => setArchivePanelOpen(true)}>
                <Settings2 size={17} />
                设置自动归档规则
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
      {archivePanelOpen ? (
        <NewArchivePanel
          currentMode={analysisResult.selectedClassificationMode}
          currentPrompt={analysisResult.customPrompt}
          recentFiles={recentFiles}
          archiveMode={archiveMode}
          archivePrompt={archivePrompt}
          archiveAlbumName={archiveAlbumName}
          archiveResult={archiveResult}
          archiveRenameDraft={archiveRenameDraft}
          onFiles={(files) => {
            setRecentFiles((current) => [...current, ...files])
            setArchiveResult(null)
          }}
          onMode={setArchiveMode}
          onPrompt={setArchivePrompt}
          onAlbumName={setArchiveAlbumName}
          onRenameDraft={setArchiveRenameDraft}
          onSimulate={() => {
            const result = onAddArchivedRecentPhotos({
              photos: recentFiles,
              mode: archiveMode,
              customPrompt: archivePrompt,
              albumName: archiveAlbumName,
            })
            setArchiveResult(result)
            setArchiveRenameDraft(result.title)
          }}
          onRenameArchivedCluster={() => {
            if (!archiveResult?.clusterId || !archiveRenameDraft.trim()) return
            onRenameCluster(archiveResult.clusterId, archiveRenameDraft)
            setArchiveResult((current) =>
              current ? { ...current, title: archiveRenameDraft.trim() } : current,
            )
          }}
          onOpenCluster={() => {
            if (archiveResult?.clusterId) {
              setArchivePanelOpen(false)
              onOpenCluster(archiveResult.clusterId)
            }
          }}
          onViewClusters={() => {
            setArchivePanelOpen(false)
            onViewClusters()
          }}
          onClose={() => setArchivePanelOpen(false)}
        />
      ) : null}
      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={displayPhotos}
          initialIndex={lightboxIndex}
          contextTitle={currentCluster.title}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
      <MemoryManagePanel
        open={manageOpen}
        cluster={currentCluster}
        coverPhoto={displayPhotos[0]}
        onClose={() => setManageOpen(false)}
        onUpdateCluster={onUpdateCluster}
        onUpdateVisibility={onUpdateVisibility}
        onDeleteCluster={onDeleteCluster}
      />
    </PageShell>
  )
}

function NewArchivePanel({
  currentMode,
  currentPrompt,
  recentFiles,
  archiveMode,
  archivePrompt,
  archiveAlbumName,
  archiveResult,
  archiveRenameDraft,
  onFiles,
  onMode,
  onPrompt,
  onAlbumName,
  onRenameDraft,
  onSimulate,
  onRenameArchivedCluster,
  onOpenCluster,
  onViewClusters,
  onClose,
}) {
  const inheritedMode =
    currentMode === 'custom'
      ? '按你的 AI 指令整理'
      : classificationModeLabels[currentMode] || '按人生阶段整理'
  const options = [
    ['current', '沿用本次分类方式'],
    ['time', '按时间自动归档'],
    ['relation', '按人物关系归档'],
    ['scene', '按场景主题归档'],
    ['custom', '输入新的 AI 归档指令'],
  ]

  const handleFiles = async (event) => {
    const baseIndex = recentFiles.length
    const files = await Promise.all(Array.from(event.target.files || []).map(async (file, index) => {
      const objectUrl = URL.createObjectURL(file)
      const dataUrl = await readFileAsDataUrl(file)
      const previewUrl = dataUrl || objectUrl
      const uploadIndex = baseIndex + index
      return {
        id: `${file.name}-${file.lastModified}-${file.size}-${uploadIndex}`,
        uploadIndex,
        title: file.name,
        fileName: file.name,
        name: file.name,
        src: previewUrl,
        previewUrl,
        dataUrl,
        objectUrl,
        source: 'uploaded',
        isUploaded: true,
        isPlaceholder: false,
        uploadedAt: new Date().toISOString(),
      }
    }))
    onFiles(files)
    event.target.value = ''
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/68 px-5 py-8 backdrop-blur-md">
      <div className="memory-panel-strong memory-scrollbar max-h-[86vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] p-6 text-white sm:p-7">
        <div className="mb-7 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="mb-3 text-sm text-sky-100">新记忆归档</p>
            <DisplayTitle as="h3" className="text-2xl font-semibold leading-tight">把近期照片继续放进时光回廊</DisplayTitle>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">近期照片会先进入本地预览，再生成一个可管理的新记忆包。</p>
            <div className="aurora-divider mt-4 w-full max-w-md" />
          </div>
          <button onClick={onClose} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:bg-white/[0.12]" aria-label="关闭新记忆归档">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <label className="memory-dropzone block min-h-72 cursor-pointer rounded-[1.75rem] p-8 text-center">
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
              <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-sky-100/20 bg-sky-200/10 text-sky-100 shadow-[0_0_34px_rgba(125,211,252,0.2)]">
                <ImagePlus size={26} />
              </span>
              <p className="text-base font-semibold text-sky-50">投放近期照片</p>
              <p className="mx-auto mt-3 max-w-xs text-xs leading-6 text-slate-400">仅用于浏览器本地预览，不上传服务器。</p>
            </label>

            {recentFiles.length ? (
              <div className="grid grid-cols-3 gap-3">
                {recentFiles.map((file) => (
                  <PhotoCard key={file.id} title={file.fileName} src={file.previewUrl} className="h-28 rounded-[1.25rem]" aspect="" />
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-sky-100">新相册名称</span>
              <input
                value={archiveAlbumName}
                onChange={(event) => onAlbumName(event.target.value)}
                placeholder="例如：这个月的小日常"
                className="memory-input mt-3 rounded-2xl px-4 py-3 text-sm"
              />
            </label>

            <div className="memory-panel rounded-[1.35rem] p-4 text-sm leading-6 text-slate-300">
              沿用本次整理方式：{inheritedMode}
              {currentPrompt ? `；本次 AI 指令：${currentPrompt}` : ''}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {options.map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => onMode(value)}
                  className={`focus-ring rounded-[1.25rem] px-4 py-4 text-left text-sm ${
                    archiveMode === value
                      ? 'memory-option memory-option-active text-sky-100'
                      : 'memory-option text-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {archiveMode === 'custom' ? (
              <textarea
                value={archivePrompt}
                onChange={(event) => onPrompt(event.target.value)}
                placeholder="例如：以后按周末、家人、朋友、自拍来自动归档"
                className="memory-input min-h-24 resize-none rounded-3xl p-4 text-sm leading-7"
              />
            ) : null}

            <PrivacyNotice>
              新照片仅在用户确认后保存到 QQ 空间，默认仅自己可见。
            </PrivacyNotice>

            <Button onClick={onSimulate} disabled={recentFiles.length === 0}>
              模拟归档
            </Button>
          </div>
        </div>

        {archiveResult ? (
          <div className="memory-panel mt-6 rounded-[1.5rem] p-5 text-sm leading-6 text-sky-100">
              <div className="font-semibold">归档完成</div>
              <div className="mt-2">已归档照片数量：{archiveResult.photoCount}</div>
              <div>新生成的记忆包：{archiveResult.title}</div>
              <div>归档方式：{options.find(([value]) => value === archiveResult.mode)?.[1] || '持续归档'}</div>
              <div className="memory-panel mt-4 flex flex-col gap-2 rounded-2xl p-3 sm:flex-row sm:items-center">
                <input
                  value={archiveRenameDraft}
                  onChange={(event) => onRenameDraft(event.target.value)}
                  className="memory-input min-w-0 flex-1 rounded-2xl px-3 py-2 text-sm"
                />
                <Button variant="secondary" onClick={onRenameArchivedCluster} disabled={!archiveRenameDraft.trim()}>
                  重命名
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button onClick={onOpenCluster}>查看新记忆包</Button>
                <Button variant="secondary" onClick={onViewClusters}>返回我的时光回廊</Button>
              </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function PhotoTile({ title, src, badge, index = 0 }) {
  return <PhotoCard title={title} src={src} badge={badge} className={index % 2 ? 'bg-violet-300/20' : ''} />
}
