const demoPhoto = (folder, slug, title, description, fallbackSlug = slug) => ({
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

const curatedPhoto = (folder, slug, title, description, fallbackSlug = slug) => ({
  id: `${folder}-${slug}`,
  title,
  src: `/demo-photos/curated/${folder}/${slug}.jpg`,
  fallbackSrc: `/demo-photos/${folder}/${slug}.jpg`,
  fallbackSources: [`/demo-photos/${folder}/${fallbackSlug}.svg`],
  type: 'image',
  source: 'curated',
  description,
  isPlaceholder: false,
  isDemoPhoto: true,
  isCuratedPhoto: true,
})

const demoPhotoAssets = {
  graduation: [
    demoPhoto('graduation', 'graduation-01', '毕业操场合影', '操场边的毕业合影，保留夏天和同学告别的氛围', 'class-photo'),
    demoPhoto('graduation', 'graduation-02', '毕业前最后一次班会', '教室灯光下的毕业告别场景', 'classroom-last-day'),
    demoPhoto('graduation', 'graduation-03', '最后一次班级聚餐', '餐桌旁的告别和约定', 'playground-group'),
    demoPhoto('graduation', 'graduation-04', '毕业旅行路上', '海边与车站之间的毕业旅行片段', 'summer-trip'),
  ],
  campus: [
    demoPhoto('campus', 'campus-01', '校园日常', '林荫路、教学楼与傍晚操场', 'daily-walk'),
    demoPhoto('campus', 'campus-02', '宿舍夜聊', '宿舍灯串下的夜聊与零食桌', 'dorm-night-talk'),
    demoPhoto('campus', 'campus-03', '图书馆微光', '图书馆窗边的书本和台灯', 'library-light'),
    demoPhoto('campus', 'campus-04', '开学报到', '行李箱、报到牌与新的校园入口', 'first-day'),
  ],
  'military-training': [
    demoPhoto('military-training', 'military-01', '操场训练', '训练场上的队列与口令', 'field-training'),
    demoPhoto('military-training', 'military-02', '军训集体合影', '军训结束时的集体记忆', 'group-silhouette'),
    demoPhoto('military-training', 'military-03', '迷彩色记忆', '迷彩帽、训练场和水壶组成的片段', 'camouflage-memory'),
  ],
  'family-travel': [
    demoPhoto('family-travel', 'family-01', '家庭出游', '节假日一起出门的温暖片段', 'holiday-trip'),
    demoPhoto('family-travel', 'family-02', '海边和山间', '海风、山影与家人的旅行路上', 'seaside-mountain'),
    demoPhoto('family-travel', 'family-03', '车窗旅途', '车窗外掠过的城市灯光', 'train-window'),
    demoPhoto('family-travel', 'family-04', '节假日晚餐', '节日暖光里的家庭晚餐记忆', 'festival-photo'),
  ],
  friends: [
    demoPhoto('friends', 'friends-01', '班级聚餐', '餐桌、饮料和举杯的朋友剪影', 'class-dinner'),
    demoPhoto('friends', 'friends-02', '生日聚会', '蛋糕烛光和祝福卡片', 'birthday-party'),
    demoPhoto('friends', 'friends-03', 'KTV 夜景', '霓虹灯下的聚会和麦克风剪影', 'ktv-night'),
    demoPhoto('friends', 'friends-04', '朋友合影', '夜色街口的朋友合影片段', 'friends-photo'),
  ],
  self: [
    demoPhoto('self', 'self-01', '镜前自拍', '镜面、手机和柔和轮廓', 'mirror-selfie'),
    demoPhoto('self', 'self-02', '形象变化', '衣架、照片墙和阶段变化', 'style-change'),
    demoPhoto('self', 'self-03', '独处日常', '书桌台灯和一个人的晚间日常', 'quiet-desk'),
    demoPhoto('self', 'self-04', '成长记录', '相册页、便签和时间刻度', 'growth-notes'),
  ],
  recent: [
    demoPhoto('recent', 'recent-01', '近期日常', '最近上传的日常片段', 'recent-daily'),
    demoPhoto('recent', 'recent-02', '周末片段', '周末街灯和朋友出门', 'weekend-moment'),
    demoPhoto('recent', 'recent-03', '新的相册', '新归档相册的胶片封面', 'new-album'),
  ],
  emotion: [
    demoPhoto('emotion', 'emotion-01', '开心时刻', '彩带、笑声和暖色灯光', 'happy-moment'),
    demoPhoto('emotion', 'emotion-02', '告别与不舍', '黄昏站台和挥手剪影', 'farewell-sunset'),
    demoPhoto('emotion', 'emotion-03', '热闹聚会', '餐桌与霓虹里的热闹瞬间', 'lively-party'),
    demoPhoto('emotion', 'emotion-04', '安静独处', '窗边月光和一个人的影子', 'quiet-alone'),
    demoPhoto('emotion', 'emotion-05', '成长变化', '时间胶片和逐渐亮起的光', 'growth-light'),
  ],
  appearance: [
    demoPhoto('appearance', 'appearance-01', '黑发时期', '黑发轮廓与校园外套', 'black-hair'),
    demoPhoto('appearance', 'appearance-02', '浅色发色', '浅色发梢与窗边强光', 'light-hair'),
    demoPhoto('appearance', 'appearance-03', '戴帽子', '帽檐下的侧影和街灯', 'cap-shadow'),
    demoPhoto('appearance', 'appearance-04', '合影中的变化', '照片墙中不同阶段的穿搭剪影', 'group-style'),
  ],
  relationship: [
    demoPhoto('relationship', 'relationship-01', '家人', '温暖餐桌旁的家人剪影', 'family'),
    demoPhoto('relationship', 'relationship-02', '同学', '课桌与合照中的同学关系', 'classmates'),
    demoPhoto('relationship', 'relationship-03', '朋友', '常一起出现的朋友合影', 'friends'),
    demoPhoto('relationship', 'relationship-04', '常联系的人', '留言气泡和相册片段', 'frequent-contacts'),
  ],
}

export const curatedPhotoAssets = {
  graduation: [
    curatedPhoto('graduation', 'graduation-01', '毕业前的那些合影', '教室、操场和老同学一起留在夏天里的毕业季', 'class-photo'),
    curatedPhoto('graduation', 'graduation-02', '穿上毕业服的那天', '毕业合影里还带着一点告别和兴奋', 'classroom-last-day'),
    curatedPhoto('graduation', 'graduation-03', '教学楼前的告别', '最后几次经过教学楼时留下的同学合影', 'playground-group'),
  ],
  campus: [
    curatedPhoto('campus', 'campus-01', '校园路上的新朋友', '刚到大学时在校园入口和林荫路上的新鲜感', 'daily-walk'),
    curatedPhoto('campus', 'campus-02', '图书馆里的自习时光', '大学图书馆里安静但热闹的日常', 'library-light'),
    curatedPhoto('campus', 'campus-03', '书架旁的下午', '书架、课本和期末前的校园片段', 'first-day'),
  ],
  'military-training': [
    curatedPhoto('military-training', 'military-01', '军训结束那天的合影', '操场上晒过的队列和迷彩色记忆', 'field-training'),
    curatedPhoto('military-training', 'military-02', '操场上的队列', '军训时反复集合、站队和喊口号的日子', 'group-silhouette'),
    curatedPhoto('military-training', 'military-03', '迷彩色的九月', '训练场上属于新生开学的集体片段', 'camouflage-memory'),
  ],
  'family-travel': [
    curatedPhoto('family-travel', 'family-01', '和家人一起出发的日子', '节假日和家人一起走在城市街道上的出游片段', 'holiday-trip'),
    curatedPhoto('family-travel', 'family-02', '车站里的旅途等待', '高铁站、行李和即将出发的家庭旅行', 'train-window'),
    curatedPhoto('family-travel', 'family-03', '灯笼下的夜游', '景区夜色里一家人慢慢走过的节日记忆', 'festival-photo'),
  ],
  friends: [
    curatedPhoto('friends', 'friends-01', '热闹到很晚的那顿饭', '朋友围在餐桌边聊天、拍照和互相夹菜的夜晚', 'class-dinner'),
    curatedPhoto('friends', 'friends-02', '火锅桌旁的朋友', '一桌热气和笑声里的朋友聚会', 'friends-photo'),
    curatedPhoto('friends', 'friends-03', '夜市里的周末', '晚风、街灯和朋友临时约出的周末片段', 'birthday-party'),
  ],
  self: [
    curatedPhoto('self', 'self-01', '黑板前的自己', '校园里某个阶段留下的个人成长记录', 'growth-notes'),
    curatedPhoto('self', 'self-02', '一个人在图书馆', '独自阅读、自习和慢慢长大的日常', 'quiet-desk'),
    curatedPhoto('self', 'self-03', '书桌前的晚上', '课本、台灯和属于自己的安静片段', 'style-change'),
  ],
  relationship: [
    curatedPhoto('relationship', 'relationship-01', '总会一起出现的人', '旧相册里反复同框的同学和朋友', 'friends'),
    curatedPhoto('relationship', 'relationship-02', '一起走过的那段路', '陪伴、同行和共同经历留下的关系记忆', 'classmates'),
    curatedPhoto('relationship', 'relationship-03', '后来还常联系的人', '聚餐、留言和同框照片里留下的高频朋友', 'frequent-contacts'),
  ],
}

const themeByClusterId = {
  'graduation-2018': 'graduation',
  'college-start': 'campus',
  'military-training': 'military-training',
  'class-dinner': 'friends',
  'family-trip': 'family-travel',
  'close-friends': 'friends',
  'relation-family': 'family-travel',
  'relation-highschool': 'graduation',
  'relation-college': 'campus',
  'relation-close-friends': 'friends',
  'relation-travel-partners': 'family-travel',
  'relation-most-seen': 'relationship',
  'scene-graduation': 'graduation',
  'scene-travel': 'family-travel',
  'scene-dinner': 'friends',
  'scene-military': 'military-training',
  'scene-birthday': 'friends',
  'scene-campus': 'campus',
  'custom-self': 'self',
  'custom-others': 'relationship',
  'custom-friends': 'friends',
  'custom-family': 'family-travel',
  'custom-classmates': 'graduation',
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

const preferredPhotoOrderByClusterId = {
  'graduation-2018': ['graduation-01', 'graduation-02', 'graduation-03'],
  'college-start': ['campus-01', 'campus-02', 'campus-03'],
  'military-training': ['military-01', 'military-02', 'military-03'],
  'class-dinner': ['friends-01', 'friends-02', 'friends-03'],
  'family-trip': ['family-01', 'family-02', 'family-03'],
  'close-friends': ['friends-03', 'friends-02', 'friends-01'],
  'relation-family': ['family-01', 'family-03', 'family-02'],
  'relation-highschool': ['graduation-03', 'graduation-01', 'graduation-02'],
  'relation-college': ['campus-02', 'campus-01', 'campus-03'],
  'relation-close-friends': ['friends-03', 'friends-02', 'friends-01'],
  'relation-travel-partners': ['family-02', 'family-01', 'family-03'],
  'relation-most-seen': ['relationship-03', 'relationship-01', 'relationship-02'],
  'scene-graduation': ['graduation-02', 'graduation-01', 'graduation-03'],
  'scene-travel': ['family-03', 'family-02', 'family-01'],
  'scene-dinner': ['friends-02', 'friends-01', 'friends-03'],
  'scene-military': ['military-02', 'military-01', 'military-03'],
  'scene-birthday': ['friends-03', 'friends-01', 'friends-02'],
  'scene-campus': ['campus-03', 'campus-01', 'campus-02'],
  'custom-self': ['self-01', 'self-02', 'self-03'],
  'custom-others': ['relationship-01', 'relationship-03', 'relationship-02'],
  'custom-friends': ['friends-03', 'friends-01', 'friends-02'],
  'custom-family': ['family-03', 'family-01', 'family-02'],
  'custom-classmates': ['graduation-01', 'graduation-03', 'graduation-02'],
  'custom-campus-self': ['self-02', 'self-03', 'self-01'],
  'custom-happy-moments': ['friends-01', 'friends-03', 'friends-02'],
  'custom-lively-party': ['friends-02', 'friends-01', 'friends-03'],
  'custom-alone-daily': ['self-02', 'self-03', 'self-01'],
  'custom-frequent-contacts': ['relationship-03', 'relationship-01', 'relationship-02'],
  'custom-ai-open': ['graduation-03', 'graduation-01', 'graduation-02'],
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
  const curatedAssets = curatedPhotoAssets[theme] || []
  const fallbackAssets = demoPhotoAssets[theme] || demoPhotoAssets.graduation
  return curatedAssets.length ? curatedAssets : fallbackAssets
}

function getFallbackPhotoAssets(theme = 'graduation') {
  return demoPhotoAssets[theme] || demoPhotoAssets.graduation
}

function orderAssetsForCluster(assets = [], cluster = {}) {
  const preferredOrder = preferredPhotoOrderByClusterId[cluster.id]
  if (!preferredOrder?.length) return assets

  const bySlug = new Map(
    assets.map((asset) => {
      const slug = asset.id?.replace(`${inferTheme(cluster)}-`, '')
      return [slug, asset]
    }),
  )
  const ordered = preferredOrder.map((slug) => bySlug.get(slug)).filter(Boolean)
  const orderedIds = new Set(ordered.map((asset) => asset.id))
  return [...ordered, ...assets.filter((asset) => !orderedIds.has(asset.id))]
}

export function getPhotoAssetsForCluster(cluster = {}, minimum = 3) {
  const theme = inferTheme(cluster)
  const themedAssets = getThemePhotoAssets(theme)
  const assets = themedAssets.length ? themedAssets : cluster.photoAssets || []
  const fallback = getThemePhotoAssets(theme)
  if (theme === 'recent' && !cluster.photoAssets?.length) return []

  const normalized = orderAssetsForCluster([...assets], cluster)

  while (fallback.length && normalized.length < minimum) {
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
  const removedPhotoIds = new Set(cluster.removedPhotoIds || [])
  const keepPhoto = (item = {}) => {
    const keys = [
      item.id,
      item.originalUploadId,
      item.src,
      item.previewUrl,
      item.dataUrl,
      item.objectUrl,
    ].filter(Boolean)
    return !keys.some((key) => removedPhotoIds.has(key))
  }
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
  const merged = [...uploadItems, ...demoItems].filter(keepPhoto)

  const seen = new Set()
  const unique = merged.filter((item) => {
    const key = item.src || item.id
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })

  const theme = inferTheme(cluster)
  const fallbackAssets = theme === 'recent' ? [] : getFallbackPhotoAssets(theme)
  while (fallbackAssets.length && unique.length < minCount) {
    const fallback = fallbackAssets[unique.length % fallbackAssets.length]
      unique.push({ ...fallback, id: `${cluster.id || 'cluster'}-fallback-${unique.length}` })
  }

  const coverIndex = unique.findIndex((item) => {
    const keys = [
      item.id,
      item.originalUploadId,
      item.src,
      item.previewUrl,
      item.dataUrl,
      item.objectUrl,
    ].filter(Boolean)
    return keys.includes(cluster.coverPhotoId)
  })
  const orderedPhotos =
    coverIndex > 0
      ? [unique[coverIndex], ...unique.slice(0, coverIndex), ...unique.slice(coverIndex + 1)]
      : unique
  const photos = orderedPhotos.slice(0, maxCount)
  const displayedPhotoCount = unique.length
  const sourcePhotoCount = cluster.sourcePhotoCount || cluster.rawPhotoCount || cluster.photoCount || 0
  const countLabel =
    displayedPhotoCount > 0 && sourcePhotoCount > displayedPhotoCount
      ? `检索 ${sourcePhotoCount} 张 · 预览 ${displayedPhotoCount} 张`
      : displayedPhotoCount > 0
        ? `预览 ${displayedPhotoCount} 张`
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
