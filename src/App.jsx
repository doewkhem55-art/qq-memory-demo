import { useMemo, useState } from 'react'
import Home from './pages/Home.jsx'
import ImportMemory from './pages/ImportMemory.jsx'
import Analyzing from './pages/Analyzing.jsx'
import MemoryClusters from './pages/MemoryClusters.jsx'
import MemoryDetail from './pages/MemoryDetail.jsx'
import MemoryPage from './pages/MemoryPage.jsx'
import { mockAnalysisResult } from './data/mockData.js'

const initialDemoState = {
  selectedSources: ['qq_album', 'qq_zone', 'friends', 'local_album'],
  uploadedFiles: [],
  uploadedPhotoPreviews: [],
  classificationMode: 'life_stage',
  customPrompt: '',
  userId: 'demo-user',
  analysisResult: null,
  activeClusterId: 'graduation-2018',
  generatedPage: null,
}

export default function App() {
  const [route, setRoute] = useState('home')
  const [demoState, setDemoState] = useState(initialDemoState)

  const currentAnalysis = demoState.analysisResult || mockAnalysisResult
  const activeCluster = useMemo(
    () =>
      currentAnalysis.memoryClusters.find((cluster) => cluster.id === demoState.activeClusterId) ||
      currentAnalysis.memoryClusters[0],
    [demoState.activeClusterId, currentAnalysis.memoryClusters],
  )

  const navigate = (nextRoute) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setRoute(nextRoute)
  }

  const updateAnalysisResult = (updater) => {
    setDemoState((current) => {
      const baseResult = current.analysisResult || mockAnalysisResult
      const updatedResult = typeof updater === 'function' ? updater(baseResult) : updater
      return {
        ...current,
        analysisResult: updatedResult,
      }
    })
  }

  const addMemoryCluster = (newCluster, uploadResults = []) => {
    setDemoState((current) => {
      const baseResult = current.analysisResult || mockAnalysisResult
      const updatedResult = {
        ...baseResult,
        memoryClusters: [newCluster, ...baseResult.memoryClusters],
        uploadClassificationResults: [
          ...uploadResults,
          ...(baseResult.uploadClassificationResults || []),
        ],
        featuredClusterId: newCluster.id,
      }
      return {
        ...current,
        analysisResult: updatedResult,
        generatedPage: null,
      }
    })
  }

  const addArchivedRecentPhotos = ({ photos, mode, customPrompt, albumName }) => {
    const labelByMode = {
      current: '最近自动归档',
      time: '我的近期日常',
      relation: '和朋友的周末',
      scene: '最近场景相册',
      custom: customPrompt ? `新记忆：${customPrompt}` : '新记忆：按你的 AI 指令归档',
    }
    const clusterId = `recent-${Date.now()}`
    const requestedTitle = albumName?.trim()
    const title = requestedTitle || labelByMode[mode] || '最近自动归档'
    const uploadResults = photos.map((photo, index) => ({
      id: `recent-upload-${clusterId}-${index}`,
      fileName: photo.fileName,
      previewUrl: photo.previewUrl,
      uploadedAt: photo.uploadedAt,
      assignedClusterId: clusterId,
      assignedClusterTitle: title,
      reason: `根据持续归档规则归入「${title}」。`,
      confidence: 86,
      tags: ['近期照片', '持续归档', mode === 'custom' ? 'AI 指令' : '自动归档'],
    }))
    const newCluster = {
      id: clusterId,
      isUserArchive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title,
      timeRange: '最近 30 天',
      photoCount: photos.length,
      postCount: 1,
      commentCount: 2,
      friendCount: mode === 'relation' ? 3 : 2,
      summary: `这是本次持续归档生成的新记忆包，包含 ${photos.length} 张近期照片。当前结果保存在浏览器会话中，用于展示持续归档体验。`,
      highlight: '新归档',
      tags: ['近期', '自动归档', 'QQ 空间'],
      coverGradient: 'from-sky-300/70 via-cyan-500/40 to-violet-700/70',
      classificationBasis: ['近期上传照片', mode === 'custom' ? '新的 AI 归档指令' : '持续归档规则', '本地照片补全'],
      aiConfidence: 86,
      dataSources: ['local_album', 'qq_album'],
      localUploadCount: photos.length,
      photoAssets: [],
      previewPhotos: photos.map((photo, index) => ({
        id: `recent-preview-${clusterId}-${index}`,
        title: photo.fileName,
        src: photo.previewUrl,
        badge: '本地',
      })),
      relatedPhotoIds: [],
      relatedPostIds: [],
      relatedFriendIds: [],
      relatedPostsData: [
        {
          id: `${clusterId}-post-1`,
          content: '最近的照片也开始进入时光回廊，日常正在慢慢变成可回看的记忆。',
          date: new Date().toISOString().slice(0, 10),
          visibility: 'private',
          source: 'qq_zone',
          relatedClusterId: clusterId,
        },
      ],
      relatedCommentsData: [
        {
          id: `${clusterId}-comment-1`,
          author: '系统助手',
          content: '这组近期照片已默认设为仅自己可见。',
          date: new Date().toISOString().slice(0, 10),
          relatedPostId: `${clusterId}-post-1`,
          relatedClusterId: clusterId,
        },
        {
          id: `${clusterId}-comment-2`,
          author: '好友',
          content: '等你确认后，也可以选择分享到 QQ 空间。',
          date: new Date().toISOString().slice(0, 10),
          relatedPostId: `${clusterId}-post-1`,
          relatedClusterId: clusterId,
        },
      ],
      relatedFriendsData: [
        { id: `${clusterId}-friend-1`, name: '好友', relation: '近期互动', interactionCount: 12, coAppearCount: 4, avatarGradient: 'from-sky-300 to-blue-600' },
        { id: `${clusterId}-friend-2`, name: '家人', relation: '最近相册', interactionCount: 8, coAppearCount: 3, avatarGradient: 'from-rose-200 to-orange-500' },
      ],
      interactionSummary: {
        mostFrequentFriend: '好友',
        coAppearCount: 7,
        commentCount: 2,
        summaryText: '近期照片已形成新的时光档案，可继续补充说说、评论和好友互动。',
      },
    }

    addMemoryCluster(newCluster, uploadResults)
    return { clusterId, title, photoCount: photos.length, mode }
  }

  const renameMemoryCluster = (clusterId, nextTitle) => {
    const trimmedTitle = nextTitle?.trim()
    if (!trimmedTitle) return

    updateAnalysisResult((baseResult) => ({
      ...baseResult,
      memoryClusters: baseResult.memoryClusters.map((cluster) =>
        cluster.id === clusterId && cluster.isUserArchive
          ? { ...cluster, title: trimmedTitle, updatedAt: new Date().toISOString() }
          : cluster,
      ),
      uploadClassificationResults: (baseResult.uploadClassificationResults || []).map((item) =>
        item.assignedClusterId === clusterId
          ? { ...item, assignedClusterTitle: trimmedTitle }
          : item,
      ),
    }))
  }

  const deleteMemoryCluster = (clusterId) => {
    setDemoState((current) => {
      const baseResult = current.analysisResult || mockAnalysisResult
      const target = baseResult.memoryClusters.find((cluster) => cluster.id === clusterId)
      if (!target?.isUserArchive) return current

      const memoryClusters = baseResult.memoryClusters.filter((cluster) => cluster.id !== clusterId)
      const nextActiveClusterId =
        current.activeClusterId === clusterId
          ? memoryClusters[0]?.id || 'graduation-2018'
          : current.activeClusterId

      return {
        ...current,
        activeClusterId: nextActiveClusterId,
        generatedPage:
          current.generatedPage?.clusterId === clusterId ? null : current.generatedPage,
        analysisResult: {
          ...baseResult,
          memoryClusters,
          uploadClassificationResults: (baseResult.uploadClassificationResults || []).filter(
            (item) => item.assignedClusterId !== clusterId,
          ),
          featuredClusterId:
            baseResult.featuredClusterId === clusterId
              ? memoryClusters[0]?.id
              : baseResult.featuredClusterId,
        },
      }
    })
  }

  if (route === 'import') {
    return (
      <ImportMemory
        initialState={demoState}
        onBack={() => navigate('home')}
        onStart={(payload) => {
          setDemoState((current) => ({
            ...current,
            ...payload,
            uploadedPhotoPreviews: payload.uploadedFiles,
            analysisResult: null,
            generatedPage: null,
          }))
          navigate('analyzing')
        }}
      />
    )
  }

  if (route === 'analyzing') {
    return (
      <Analyzing
        importState={demoState}
        onComplete={(result) =>
          setDemoState((current) => ({
            ...current,
            analysisResult: result,
            activeClusterId: result.featuredClusterId || result.memoryClusters[0]?.id || 'graduation-2018',
          }))
        }
        onViewResult={() => navigate('clusters')}
      />
    )
  }

  if (route === 'clusters') {
    return (
      <MemoryClusters
        analysisResult={currentAnalysis}
        featuredClusterId={currentAnalysis.featuredClusterId || currentAnalysis.memoryClusters[0]?.id}
        onBack={() => navigate('home')}
        onOpenCluster={(clusterId) => {
          setDemoState((current) => ({
            ...current,
            activeClusterId: clusterId,
            generatedPage: null,
          }))
          navigate('detail')
        }}
        onRenameCluster={renameMemoryCluster}
        onDeleteCluster={deleteMemoryCluster}
      />
    )
  }

  if (route === 'detail') {
    return (
      <MemoryDetail
        cluster={activeCluster}
        analysisResult={currentAnalysis}
        onBack={() => navigate('clusters')}
        onGenerated={(page) => {
          setDemoState((current) => ({
            ...current,
            generatedPage: page,
            activeClusterId: page.clusterId || current.activeClusterId,
          }))
          navigate('memoryPage')
        }}
      />
    )
  }

  if (route === 'memoryPage') {
    return (
      <MemoryPage
        generatedPage={demoState.generatedPage}
        cluster={activeCluster}
        analysisResult={currentAnalysis}
        onBack={() => navigate('detail')}
        onHome={() => navigate('home')}
        onAddArchivedRecentPhotos={addArchivedRecentPhotos}
        onRenameCluster={renameMemoryCluster}
        onOpenCluster={(clusterId) => {
          setDemoState((current) => ({
            ...current,
            activeClusterId: clusterId,
            generatedPage: null,
          }))
          navigate('detail')
        }}
        onViewClusters={() => navigate('clusters')}
      />
    )
  }

  return (
    <Home
      onStart={() => navigate('import')}
      onViewExample={() => {
        setDemoState((current) => ({
          ...current,
          activeClusterId: 'graduation-2018',
        }))
        navigate('clusters')
      }}
    />
  )
}
