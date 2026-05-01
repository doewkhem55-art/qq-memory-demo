import { useState } from 'react'
import { ArrowRight, Camera, MessageCircle, Sparkles, UsersRound } from 'lucide-react'
import Button from '../components/Button.jsx'
import GlassCard from '../components/GlassCard.jsx'
import PageShell from '../components/PageShell.jsx'
import PhotoCard from '../components/PhotoCard.jsx'
import PhotoGrid from '../components/PhotoGrid.jsx'
import PhotoLightbox from '../components/PhotoLightbox.jsx'
import PrivacyNotice from '../components/PrivacyNotice.jsx'
import Tag from '../components/Tag.jsx'
import Timeline from '../components/Timeline.jsx'
import { comments, photos, posts, repairSuggestions, timelineEvents } from '../data/mockData.js'
import { resolveClusterPhotoMeta } from '../data/photoAssets.js'
import { generateMemoryPage, repairMissingMemories } from '../services/aiMemoryService.js'

export default function MemoryDetail({ cluster, analysisResult, onBack, onGenerated }) {
  const [generating, setGenerating] = useState(false)
  const [repairState, setRepairState] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const currentCluster =
    analysisResult.memoryClusters.find((item) => item.id === cluster.id) || cluster
  const clusterPhotos = photos.filter((photo) => currentCluster.relatedPhotoIds.includes(photo.id))
  const clusterPosts = currentCluster.relatedPostsData?.length
    ? currentCluster.relatedPostsData
    : posts.filter((post) => currentCluster.relatedPostIds.includes(post.id))
  const clusterComments = currentCluster.relatedCommentsData?.length
    ? currentCluster.relatedCommentsData
    : comments.filter((comment) =>
    clusterPosts.some((post) => post.commentIds.includes(comment.id)),
  )
  const clusterFriends = currentCluster.relatedFriendsData?.length
    ? currentCluster.relatedFriendsData
    : analysisResult.detectedPeople.filter((friend) =>
      currentCluster.relatedFriendIds.includes(friend.id),
    )
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
  const repair = repairSuggestions.find((item) => item.clusterId === currentCluster.id)
  const events = timelineEvents[currentCluster.id] || [
    { id: `${currentCluster.id}-event`, date: currentCluster.timeRange, title: currentCluster.title, description: currentCluster.summary },
  ]

  const handleGenerate = async () => {
    setGenerating(true)
    const page = await generateMemoryPage(currentCluster.id, analysisResult)
    setGenerating(false)
    onGenerated(page)
  }

  const handleRepair = async () => {
    const result = await repairMissingMemories(currentCluster.id, uploadedPhotos)
    setRepairState(result)
  }

  return (
    <PageShell
      title={currentCluster.title}
      eyebrow={`记忆详情 · ${currentCluster.timeRange}`}
      onBack={onBack}
      actions={<Button onClick={handleGenerate} disabled={generating}>{generating ? '生成中……' : '生成回忆页'}<ArrowRight size={17} /></Button>}
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <GlassCard className="rounded-[1.6rem] p-6">
            <div className={`mb-6 h-48 overflow-hidden rounded-[1.35rem] bg-gradient-to-br ${currentCluster.coverGradient}`}>
              <PhotoCard
                title={currentCluster.title}
                src={displayPhotos[0]?.src}
                fallbackSrc={displayPhotos[0]?.fallbackSrc}
                fallbackSources={displayPhotos[0]?.fallbackSources}
                description={displayPhotos[0]?.description}
                source={displayPhotos[0]?.source}
                isPlaceholder={displayPhotos[0]?.isPlaceholder}
                badge={currentCluster.highlight}
                className="h-full rounded-[1.35rem] shadow-none"
                aspect=""
                onPreview={() => setLightboxIndex(0)}
              />
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {currentCluster.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <h2 className="text-2xl font-semibold text-white">AI 摘要</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{currentCluster.summary}</p>
            {uploadedPhotos.length ? (
              <p className="mt-4 rounded-2xl bg-sky-200/10 px-4 py-3 text-sm text-sky-100">
                已有 {uploadedPhotos.length} 张你上传的本地照片被归入这个记忆包。
              </p>
            ) : null}
          </GlassCard>

          <GlassCard className="rounded-[1.6rem] p-6">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <Sparkles size={18} className="text-sky-200" />
              缺失记忆修复
            </h2>
            {repair ? (
              <>
                <p className="text-sm leading-7 text-slate-300">
                  系统发现你的本地相册中有 {repair.detectedLocalPhotoCount} 张照片可能属于这段记忆，是否补充？
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{repair.reason}</p>
                <Button variant="secondary" onClick={handleRepair} className="mt-5">
                  {repair.suggestedAction}
                </Button>
                {repairState ? (
                  <p className="mt-4 text-sm text-sky-100">已模拟生成 {repairState.suggestions.length} 条补全建议。</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-slate-300">当前记忆包暂无本地补全建议。</p>
            )}
          </GlassCard>

          <PrivacyNotice>
            详情页展示的照片、说说、评论和好友关系均来自用户授权范围；本地图片只在浏览器中预览，不上传服务器。
          </PrivacyNotice>
        </div>

        <div className="space-y-5">
          <GlassCard className="rounded-[1.6rem] p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">记忆时间线</h2>
            <Timeline events={events} />
          </GlassCard>

          <GlassCard className="rounded-[1.6rem] p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-white">
              <Camera size={19} className="text-sky-200" />
              照片墙
            </h2>
            <p className="mb-4 text-sm text-slate-400">{photoMeta.countLabel}</p>
            <PhotoGrid photos={displayPhotos} onPhotoPreview={setLightboxIndex} />
          </GlassCard>

          <div className="grid gap-5 md:grid-cols-2">
            <GlassCard className="rounded-[1.6rem] p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <MessageCircle size={18} className="text-sky-200" />
                相关说说
              </h2>
              <div className="space-y-4">
                {clusterPosts.length ? clusterPosts.map((post) => (
                  <div key={post.id} className="rounded-2xl bg-white/[0.035] p-4">
                    <p className="text-sm leading-6 text-slate-200">{post.content}</p>
                    <p className="mt-2 text-xs text-slate-500">{post.date} · {post.visibility === 'private' ? '仅自己可见' : '好友可见'}</p>
                  </div>
                )) : <p className="text-sm text-slate-400">暂无直接关联说说，未来可由文本语义分析继续补全。</p>}
              </div>
            </GlassCard>

            <GlassCard className="rounded-[1.6rem] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">热门评论</h2>
              <div className="space-y-3">
                {clusterComments.length ? clusterComments.map((comment) => (
                  <div key={comment.id} className="text-sm leading-6 text-slate-300">
                    <span className="font-semibold text-sky-100">{comment.author}：</span>
                    {comment.content}
                  </div>
                )) : <p className="text-sm text-slate-400">暂无直接关联评论。</p>}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="rounded-[1.6rem] p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-white">
              <UsersRound size={19} className="text-sky-200" />
              高频互动好友与共同出现的人
            </h2>
            {currentCluster.interactionSummary ? (
              <p className="mb-5 rounded-2xl bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-300">
                {currentCluster.interactionSummary.summaryText}
              </p>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {clusterFriends.map((friend) => (
                <div key={friend.id} className="rounded-[1.35rem] border border-white/[0.07] bg-white/[0.035] p-4">
                  <div className={`mb-3 h-12 w-12 rounded-full bg-gradient-to-br ${friend.avatarGradient}`} />
                  <h3 className="font-semibold text-white">{friend.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{friend.relation}</p>
                  <p className="mt-3 text-xs text-sky-100">{friend.interactionCount} 次互动 · {friend.coAppearCount} 次同框</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={displayPhotos}
          initialIndex={lightboxIndex}
          contextTitle={currentCluster.title}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </PageShell>
  )
}

function PhotoTile({ title, src, badge, index = 0 }) {
  return <PhotoCard title={title} src={src} badge={badge} className={index % 2 ? 'bg-violet-300/20' : ''} />
}
