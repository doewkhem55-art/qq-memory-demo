const photo = (folder, slug, title, description, fallbackSlug = slug) => ({
  id: `${folder}-${slug}`,
  title,
  src: `/demo-photos/${folder}/${slug}.jpg`,
  fallbackSrc: `/demo-photos/${folder}/${fallbackSlug}.svg`,
  type: 'image',
  source: 'demo',
  description,
  isPlaceholder: false,
  isDemoPhoto: true,
})

export const demoPhotoAssets = {
  graduation: [
    photo('graduation', 'graduation-01', '毕业操场合影', '操场边的毕业合影，保留夏天和同学告别的氛围', 'class-photo'),
    photo('graduation', 'graduation-02', '毕业前最后一次班会', '教室灯光下的毕业告别场景', 'classroom-last-day'),
    photo('graduation', 'graduation-03', '最后一次班级聚餐', '餐桌旁的告别和约定', 'playground-group'),
    photo('graduation', 'graduation-04', '毕业旅行路上', '海边与车站之间的毕业旅行片段', 'summer-trip'),
  ],
  campus: [
    photo('campus', 'campus-01', '校园日常', '林荫路、教学楼与傍晚操场', 'daily-walk'),
    photo('campus', 'campus-02', '宿舍夜聊', '宿舍灯串下的夜聊与零食桌', 'dorm-night-talk'),
    photo('campus', 'campus-03', '图书馆微光', '图书馆窗边的书本和台灯', 'library-light'),
    photo('campus', 'campus-04', '开学报到', '行李箱、报到牌与新的校园入口', 'first-day'),
  ],
  'military-training': [
    photo('military-training', 'military-01', '操场训练', '训练场上的队列与口令', 'field-training'),
    photo('military-training', 'military-02', '军训集体合影', '军训结束时的集体记忆', 'group-silhouette'),
    photo('military-training', 'military-03', '迷彩色记忆', '迷彩帽、训练场和水壶组成的片段', 'camouflage-memory'),
  ],
  'family-travel': [
    photo('family-travel', 'family-01', '家庭出游', '节假日一起出门的温暖片段', 'holiday-trip'),
    photo('family-travel', 'family-02', '海边和山间', '海风、山影与家人的旅行路上', 'seaside-mountain'),
    photo('family-travel', 'family-03', '车窗旅途', '车窗外掠过的城市灯光', 'train-window'),
    photo('family-travel', 'family-04', '节假日晚餐', '节日暖光里的家庭晚餐记忆', 'festival-photo'),
  ],
  friends: [
    photo('friends', 'friends-01', '班级聚餐', '餐桌、饮料和举杯的朋友剪影', 'class-dinner'),
    photo('friends', 'friends-02', '生日聚会', '蛋糕烛光和祝福卡片', 'birthday-party'),
    photo('friends', 'friends-03', 'KTV 夜景', '霓虹灯下的聚会和麦克风剪影', 'ktv-night'),
    photo('friends', 'friends-04', '朋友合影', '夜色街口的朋友合影片段', 'friends-photo'),
  ],
  self: [
    photo('self', 'self-01', '镜前自拍', '镜面、手机和柔和轮廓', 'mirror-selfie'),
    photo('self', 'self-02', '形象变化', '衣架、照片墙和阶段变化', 'style-change'),
    photo('self', 'self-03', '独处日常', '书桌台灯和一个人的晚间日常', 'quiet-desk'),
    photo('self', 'self-04', '成长记录', '相册页、便签和时间刻度', 'growth-notes'),
  ],
  recent: [
    photo('recent', 'recent-01', '近期日常', '最近上传的日常片段', 'recent-daily'),
    photo('recent', 'recent-02', '周末片段', '周末街灯和朋友出门', 'weekend-moment'),
    photo('recent', 'recent-03', '新的相册', '新归档相册的胶片封面', 'new-album'),
  ],
  emotion: [
    photo('emotion', 'emotion-01', '开心时刻', '彩带、笑声和暖色灯光', 'happy-moment'),
    photo('emotion', 'emotion-02', '告别与不舍', '黄昏站台和挥手剪影', 'farewell-sunset'),
    photo('emotion', 'emotion-03', '热闹聚会', '餐桌与霓虹里的热闹瞬间', 'lively-party'),
    photo('emotion', 'emotion-04', '安静独处', '窗边月光和一个人的影子', 'quiet-alone'),
    photo('emotion', 'emotion-05', '成长变化', '时间胶片和逐渐亮起的光', 'growth-light'),
  ],
  appearance: [
    photo('appearance', 'appearance-01', '黑发时期', '黑发轮廓与校园外套', 'black-hair'),
    photo('appearance', 'appearance-02', '浅色发色', '浅色发梢与窗边强光', 'light-hair'),
    photo('appearance', 'appearance-03', '戴帽子', '帽檐下的侧影和街灯', 'cap-shadow'),
    photo('appearance', 'appearance-04', '合影中的变化', '照片墙中不同阶段的穿搭剪影', 'group-style'),
  ],
  relationship: [
    photo('relationship', 'relationship-01', '家人', '温暖餐桌旁的家人剪影', 'family'),
    photo('relationship', 'relationship-02', '同学', '课桌与合照中的同学关系', 'classmates'),
    photo('relationship', 'relationship-03', '朋友', '常一起出现的朋友合影', 'friends'),
    photo('relationship', 'relationship-04', '常联系的人', '留言气泡和相册片段', 'frequent-contacts'),
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
      fallbackSrc: photo.fallbackSrc,
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
      fallbackSrc: item.fallbackSrc || preview.fallbackSrc,
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
      ? `检索 ${sourcePhotoCount} / ${displayedPhotoCount} 预览`
      : displayedPhotoCount > 0
        ? `预览 ${displayedPhotoCount}`
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
