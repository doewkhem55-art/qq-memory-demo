const photo = (folder, index, title, description) => ({
  id: `${folder}-${index}`,
  title,
  src: `/demo-photos/${folder}/${String(index).padStart(2, '0')}.svg`,
  type: 'image',
  source: 'demo',
  description,
  isPlaceholder: true,
})

export const demoPhotoAssets = {
  graduation: [
    photo('graduation', 1, '毕业合影', '高中毕业季的合影素材位'),
    photo('graduation', 2, '操场告别', '夏天操场与毕业告别的素材位'),
    photo('graduation', 3, '最后一次聚餐', '毕业聚餐与同学告别的素材位'),
  ],
  campus: [
    photo('campus', 1, '大学校门', '大学开学报到的校园素材位'),
    photo('campus', 2, '宿舍走廊', '校园日常与新生活开始的素材位'),
    photo('campus', 3, '夜色操场', '大学校园晚间记忆的素材位'),
  ],
  'military-training': [
    photo('military-training', 1, '军训队列', '军训合影与训练场景素材位'),
    photo('military-training', 2, '训练场黄昏', '军训黄昏与集体记忆素材位'),
    photo('military-training', 3, '迷彩合影', '军训结束合影素材位'),
  ],
  'family-travel': [
    photo('family-travel', 1, '湖边旅行', '家人旅行与节假日素材位'),
    photo('family-travel', 2, '车窗风景', '家庭出行途中的素材位'),
    photo('family-travel', 3, '晚餐留影', '家人旅行晚餐记忆素材位'),
  ],
  friends: [
    photo('friends', 1, '好友留言', '好友互动与常联系的人素材位'),
    photo('friends', 2, '一起出发', '朋友出行与合影素材位'),
    photo('friends', 3, '聊天截图感', 'QQ 空间互动记忆素材位'),
  ],
  self: [
    photo('self', 1, '一个人的窗边', '关于我自己的成长片段素材位'),
    photo('self', 2, '书桌微光', '个人日常与独处记忆素材位'),
    photo('self', 3, '路灯下的影子', '自我变化与阶段感素材位'),
  ],
  recent: [
    photo('recent', 1, '近期日常', '持续归档新照片素材位'),
    photo('recent', 2, '周末片段', '近期生活整理素材位'),
    photo('recent', 3, '新的相册', '新归档相册素材位'),
  ],
  emotion: [
    photo('emotion', 1, '开心时刻', '轻松快乐情绪记忆素材位'),
    photo('emotion', 2, '告别黄昏', '告别与不舍情绪素材位'),
    photo('emotion', 3, '成长光影', '成长变化与情绪转折素材位'),
  ],
  appearance: [
    photo('appearance', 1, '黑发时期', '发色与形象变化素材位'),
    photo('appearance', 2, '浅色光线', '浅色发色与强光变化素材位'),
    photo('appearance', 3, '帽檐遮挡', '戴帽子或难以识别发色素材位'),
  ],
  relationship: [
    photo('relationship', 1, '家人相关回忆', '家人关系分类素材位'),
    photo('relationship', 2, '和朋友的回忆', '朋友关系分类素材位'),
    photo('relationship', 3, '和同学的回忆', '同学关系分类素材位'),
  ],
}

const themeByClusterId = {
  'graduation-2018': 'graduation',
  'college-start': 'campus',
  'military-training': 'military-training',
  'class-dinner': 'friends',
  'family-trip': 'family-travel',
  'close-friends': 'friends',
  'relation-family': 'relationship',
  'relation-highschool': 'relationship',
  'relation-college': 'relationship',
  'relation-close-friends': 'relationship',
  'relation-travel-partners': 'family-travel',
  'relation-most-seen': 'relationship',
  'scene-graduation': 'graduation',
  'scene-travel': 'family-travel',
  'scene-dinner': 'friends',
  'scene-military': 'military-training',
  'scene-birthday': 'emotion',
  'scene-campus': 'campus',
  'custom-self': 'self',
  'custom-others': 'relationship',
  'custom-friends': 'friends',
  'custom-family': 'family-travel',
  'custom-classmates': 'relationship',
  'custom-campus-self': 'self',
  'custom-hair-black': 'appearance',
  'custom-hair-light': 'appearance',
  'custom-hair-unclear': 'appearance',
  'custom-appearance-change': 'appearance',
  'custom-hair-group': 'appearance',
  'custom-happy-moments': 'emotion',
  'custom-farewell': 'emotion',
  'custom-lively-party': 'emotion',
  'custom-alone-daily': 'self',
  'custom-emotion-growth': 'emotion',
  'custom-growth-change': 'emotion',
  'custom-look-change': 'appearance',
  'custom-frequent-contacts': 'relationship',
  'custom-primary-school': 'campus',
  'custom-uniform': 'appearance',
  'custom-ai-open': 'graduation',
}

function inferTheme(cluster = {}) {
  if (themeByClusterId[cluster.id]) return themeByClusterId[cluster.id]

  const text = `${cluster.id || ''} ${cluster.title || ''} ${(cluster.tags || []).join(' ')}`
  if (/发色|头发|形象|外观|appearance|outfit|hair/.test(text)) return 'appearance'
  if (/开心|告别|不舍|热闹|独处|情绪|emotion|growth/.test(text)) return 'emotion'
  if (/自己|自我|个人|self/.test(text)) return 'self'
  if (/家人|亲人|family/.test(text)) return 'family-travel'
  if (/朋友|同学|关系|好友|friend|relation/.test(text)) return 'relationship'
  if (/旅行|travel/.test(text)) return 'family-travel'
  if (/军训|military/.test(text)) return 'military-training'
  if (/大学|校园|开学|campus|college/.test(text)) return 'campus'
  if (/毕业|高中|graduation/.test(text)) return 'graduation'
  if (/近期|归档|recent/.test(text)) return 'recent'
  return 'graduation'
}

export function getThemePhotoAssets(theme = 'graduation') {
  return demoPhotoAssets[theme] || demoPhotoAssets.graduation
}

export function getPhotoAssetsForCluster(cluster = {}, minimum = 3) {
  const assets = cluster.photoAssets?.length ? cluster.photoAssets : getThemePhotoAssets(inferTheme(cluster))
  const fallback = getThemePhotoAssets(inferTheme(cluster))
  const normalized = [...assets]

  while (normalized.length < minimum) {
    normalized.push(fallback[normalized.length % fallback.length])
  }

  return normalized.slice(0, Math.max(minimum, normalized.length))
}

export function normalizeUploadedPhotos(uploadedPhotos = []) {
  return uploadedPhotos.map((photo, index) => {
    const src = photo.src || photo.previewUrl || photo.dataUrl || photo.objectUrl || photo.url || ''
    const title = photo.title || photo.fileName || photo.name || '本地照片'

    return {
      id: photo.id || `uploaded-${index}`,
      title,
      fileName: photo.fileName || photo.name || title,
      src,
      previewUrl: photo.previewUrl || src,
      dataUrl: photo.dataUrl,
      objectUrl: photo.objectUrl,
      type: 'image',
      source: 'uploaded',
      description:
        photo.description ||
        photo.reason ||
        '当前本地上传图片仅用于浏览器会话内预览，真实上线后需接入用户授权后的相册存储或云端资源地址。',
      isUploaded: true,
      isPlaceholder: false,
      assignedClusterId: photo.assignedClusterId,
    }
  })
}

export function mergeUploadedPhotoPreviews(uploadResults = [], uploadedPreviews = []) {
  const byName = new Map(
    uploadedPreviews.map((photo) => [photo.fileName || photo.name || photo.title, photo]),
  )
  const byId = new Map(uploadedPreviews.map((photo) => [photo.id, photo]))
  const byIndex = new Map(
    uploadedPreviews.map((photo, index) => [photo.uploadIndex ?? index, photo]),
  )

  return uploadResults.map((item, index) => {
    const preview =
      byId.get(item.originalUploadId || item.id) ||
      byIndex.get(item.uploadIndex ?? index) ||
      byName.get(item.fileName || item.name || item.title) ||
      {}

    const src =
      item.src ||
      item.previewUrl ||
      item.dataUrl ||
      preview.src ||
      preview.previewUrl ||
      preview.dataUrl ||
      preview.objectUrl ||
      item.objectUrl

    return {
      ...preview,
      ...item,
      originalUploadId: item.originalUploadId || preview.id,
      uploadIndex: item.uploadIndex ?? preview.uploadIndex ?? index,
      title: item.title || item.fileName || preview.title || preview.fileName || preview.name,
      fileName: item.fileName || preview.fileName || preview.name,
      src,
      previewUrl: item.previewUrl || item.src || item.dataUrl || preview.previewUrl || preview.src || preview.dataUrl || src,
      dataUrl: item.dataUrl || preview.dataUrl,
      objectUrl: item.objectUrl || preview.objectUrl,
      source: 'uploaded',
      isUploaded: true,
      isPlaceholder: false,
    }
  })
}

export function resolveClusterPhotos({
  cluster = {},
  uploadedPhotos = [],
  minCount = 3,
  maxCount = 6,
} = {}) {
  return resolveClusterPhotoMeta({ cluster, uploadedPhotos, minCount, maxCount }).photos
}

export function resolveClusterPhotoMeta({
  cluster = {},
  uploadedPhotos = [],
  minCount = 3,
  maxCount = 6,
} = {}) {
  const uploadItems = normalizeUploadedPhotos(uploadedPhotos).filter((item) => item.src)
  const assetItems = getPhotoAssetsForCluster(cluster, minCount)
  const previewItems = (cluster.previewPhotos || [])
    .filter((item) => item.src)
    .map((item) => ({
      ...item,
      type: item.type || 'image',
      source: item.source || 'preview',
    }))

  const demoItems = [...assetItems, ...previewItems].filter((item) => item.src)
  const merged = [...uploadItems, ...demoItems]

  const seen = new Set()
  const unique = merged.filter((item) => {
    const key = item.src || item.id
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })

  while (unique.length < minCount) {
    const fallback = getThemePhotoAssets(inferTheme(cluster))[unique.length % 3]
    unique.push({ ...fallback, id: `${cluster.id || 'cluster'}-fallback-${unique.length}` })
  }

  const photos = unique.slice(0, maxCount)
  const displayedPhotoCount = unique.length
  const sourcePhotoCount = cluster.sourcePhotoCount || cluster.rawPhotoCount || cluster.photoCount || 0
  const countLabel =
    displayedPhotoCount > 0 && sourcePhotoCount > displayedPhotoCount
      ? `已检索 ${sourcePhotoCount} 张，预览 ${displayedPhotoCount} 张`
      : displayedPhotoCount > 0
        ? `${displayedPhotoCount} 张照片`
        : '暂无可预览照片'

  return {
    photos,
    uploadedPhotos: uploadItems,
    demoPhotos: demoItems,
    displayedPhotoCount,
    sourcePhotoCount,
    hasUploadedPhotos: uploadItems.length > 0,
    hasDisplayablePhotos: displayedPhotoCount > 0,
    countLabel,
  }
}
