import { getPhotoAssetsForCluster, getThemePhotoAssets } from './photoAssets.js'

export const sourceLabels = {
  qq_album: 'QQ 空间旧相册',
  qq_zone: '说说评论',
  friends: '好友互动',
  local_album: '本地相册',
}

export const classificationModeLabels = {
  life_stage: '按人生阶段整理',
  relation: '按人物关系整理',
  scene: '按场景主题整理',
  custom: '自定义 AI 分类指令',
}

export const photos = [
  {
    id: 'photo-001',
    title: '操场毕业合影',
    date: '2018-06-09',
    location: '一中操场',
    people: ['林夏', '周扬', '陈可', '许然'],
    tags: ['毕业', '操场', '合影'],
    source: 'qq_album',
    clusterId: 'graduation-2018',
    description: '高考结束后的第一张大合影，很多人还穿着校服。',
  },
  {
    id: 'photo-002',
    title: '毕业聚餐',
    date: '2018-06-18',
    location: '南街火锅店',
    people: ['林夏', '周扬', '陈可'],
    tags: ['聚餐', '告别', '同学'],
    source: 'qq_album',
    clusterId: 'graduation-2018',
    description: '班级最后一次聚餐，评论区留下了很多约定。',
  },
  {
    id: 'photo-003',
    title: '第一次毕业旅行',
    date: '2018-07-12',
    location: '青岛海边',
    people: ['林夏', '许然'],
    tags: ['旅行', '夏天', '海边'],
    source: 'local_album',
    clusterId: 'graduation-2018',
    description: '本地相册识别到的同一阶段照片，可用于补全毕业季回忆。',
  },
  {
    id: 'photo-004',
    title: '大学校门口',
    date: '2018-09-03',
    location: '大学南门',
    people: ['林夏', '妈妈'],
    tags: ['开学', '大学', '家人'],
    source: 'qq_album',
    clusterId: 'college-start',
    description: '第一次到大学报到，空间相册中保存了校门口留影。',
  },
  {
    id: 'photo-005',
    title: '军训排面',
    date: '2018-09-21',
    location: '训练场',
    people: ['林夏', '室友'],
    tags: ['军训', '合影', '大学'],
    source: 'qq_album',
    clusterId: 'military-training',
    description: '军训结束时的集体照，互动评论集中在同一周。',
  },
  {
    id: 'photo-006',
    title: '班级聚餐留影',
    date: '2019-01-10',
    location: '校外餐厅',
    people: ['林夏', '室友', '同班同学'],
    tags: ['聚餐', '班级', '冬天'],
    source: 'qq_album',
    clusterId: 'class-dinner',
    description: '大学第一个学期末的班级聚餐。',
  },
  {
    id: 'photo-007',
    title: '家人旅行',
    date: '2019-05-02',
    location: '杭州西湖',
    people: ['林夏', '爸爸', '妈妈'],
    tags: ['家人', '旅行', '五一'],
    source: 'local_album',
    clusterId: 'family-trip',
    description: '本地相册里的家庭旅行照片，可与 QQ 空间动态关联。',
  },
  {
    id: 'photo-008',
    title: '老友截图',
    date: '2018-08-25',
    location: 'QQ 空间',
    people: ['周扬', '陈可'],
    tags: ['好友', '互动', '留言'],
    source: 'qq_album',
    clusterId: 'close-friends',
    description: '空间留言截图，反映毕业后仍然频繁联系的朋友。',
  },
]

export const posts = [
  {
    id: 'post-001',
    content: '高考结束啦，突然不知道明天该几点起床。',
    date: '2018-06-09',
    relatedPhotoIds: ['photo-001'],
    commentIds: ['comment-001', 'comment-002'],
    visibility: 'friends',
    source: 'qq_zone',
  },
  {
    id: 'post-002',
    content: '最后一次班级聚餐，大家以后都要闪闪发光。',
    date: '2018-06-18',
    relatedPhotoIds: ['photo-002'],
    commentIds: ['comment-003', 'comment-004'],
    visibility: 'friends',
    source: 'qq_zone',
  },
  {
    id: 'post-003',
    content: '海风很大，但夏天好像真的开始了。',
    date: '2018-07-12',
    relatedPhotoIds: ['photo-003'],
    commentIds: ['comment-005'],
    visibility: 'private',
    source: 'qq_zone',
  },
  {
    id: 'post-004',
    content: '大学第一天，新的地图打开了。',
    date: '2018-09-03',
    relatedPhotoIds: ['photo-004'],
    commentIds: ['comment-006'],
    visibility: 'friends',
    source: 'qq_zone',
  },
]

export const comments = [
  { id: 'comment-001', author: '周扬', content: '明天睡到自然醒！', date: '2018-06-09', relatedPostId: 'post-001' },
  { id: 'comment-002', author: '陈可', content: '终于毕业了，但还有点舍不得。', date: '2018-06-09', relatedPostId: 'post-001' },
  { id: 'comment-003', author: '许然', content: '这张一定要保存，十年后再看。', date: '2018-06-18', relatedPostId: 'post-002' },
  { id: 'comment-004', author: '周扬', content: '说好了寒假还要再聚。', date: '2018-06-18', relatedPostId: 'post-002' },
  { id: 'comment-005', author: '陈可', content: '海边那张背影太有夏天了。', date: '2018-07-12', relatedPostId: 'post-003' },
  { id: 'comment-006', author: '妈妈', content: '照顾好自己，记得吃早饭。', date: '2018-09-03', relatedPostId: 'post-004' },
]

export const friends = [
  { id: 'friend-001', name: '周扬', avatarGradient: 'from-sky-300 to-blue-600', relation: '高中同桌', interactionCount: 128, coAppearCount: 22 },
  { id: 'friend-002', name: '陈可', avatarGradient: 'from-violet-300 to-fuchsia-600', relation: '高中好友', interactionCount: 96, coAppearCount: 18 },
  { id: 'friend-003', name: '许然', avatarGradient: 'from-cyan-200 to-teal-600', relation: '旅行搭子', interactionCount: 74, coAppearCount: 12 },
  { id: 'friend-004', name: '妈妈', avatarGradient: 'from-rose-200 to-orange-500', relation: '家人', interactionCount: 42, coAppearCount: 9 },
  { id: 'friend-005', name: '室友', avatarGradient: 'from-indigo-300 to-slate-700', relation: '大学室友', interactionCount: 58, coAppearCount: 16 },
]

const photoAsset = (id, title, folder, file, description) => {
  const themeMap = {
    graduation: 'graduation',
    campus: 'campus',
    'military-training': 'military-training',
    'family-travel': 'family-travel',
    friends: 'friends',
    'qq-memory': 'friends',
  }
  const theme = themeMap[folder] || folder
  const fallbackIndex = id.endsWith('-2') ? 1 : 0
  const asset = getThemePhotoAssets(theme)[fallbackIndex]
  return {
    ...asset,
    id,
  }
}

const baseMemoryClusters = [
  {
    id: 'graduation-2018',
    title: '高中毕业季',
    timeRange: '2018.05 - 2018.08',
    photoCount: 28,
    postCount: 12,
    commentCount: 18,
    friendCount: 4,
    summary: '这个夏天，你和高中同学完成了毕业、聚餐、旅行和告别。系统从旧相册、说说评论和互动记录中，为你整理出这段记忆。',
    highlight: '重点记忆包',
    tags: ['毕业', '夏天', '同学', '告别'],
    coverGradient: 'from-sky-300/70 via-blue-500/50 to-violet-700/70',
    classificationBasis: ['时间相近', '共同人物重复出现', '说说关键词匹配', '本地照片补全'],
    aiConfidence: 92,
    dataSources: ['qq_album', 'qq_zone', 'friends', 'local_album'],
    photoAssets: [
      photoAsset('asset-graduation-1', '毕业操场合影', 'graduation'),
      photoAsset('asset-graduation-2', '最后一次班级聚餐', 'graduation'),
    ],
    relatedPhotoIds: ['photo-001', 'photo-002', 'photo-003'],
    relatedPostIds: ['post-001', 'post-002', 'post-003'],
    relatedFriendIds: ['friend-001', 'friend-002', 'friend-003', 'friend-004'],
  },
  {
    id: 'college-start',
    title: '大学开学',
    timeRange: '2018.09 - 2018.10',
    photoCount: 16,
    postCount: 5,
    commentCount: 9,
    friendCount: 3,
    summary: '从报到到认识新朋友，AI 将开学照片、家人留言和第一批大学动态归为新的生活起点。',
    highlight: '人生阶段切换',
    tags: ['开学', '大学', '家人'],
    coverGradient: 'from-cyan-300/60 via-slate-500/40 to-indigo-700/70',
    classificationBasis: ['时间相近', '地点变化', '说说关键词匹配'],
    aiConfidence: 88,
    dataSources: ['qq_album', 'qq_zone', 'friends'],
    photoAssets: [photoAsset('asset-campus-1', '开学报到', 'campus')],
    relatedPhotoIds: ['photo-004'],
    relatedPostIds: ['post-004'],
    relatedFriendIds: ['friend-004', 'friend-005'],
  },
  {
    id: 'military-training',
    title: '军训合影',
    timeRange: '2018.09',
    photoCount: 21,
    postCount: 4,
    commentCount: 11,
    friendCount: 5,
    summary: '军训期间的合照、说说吐槽和新同学互动被整理成一段高密度校园记忆。',
    highlight: '共同经历',
    tags: ['军训', '室友', '合照'],
    coverGradient: 'from-emerald-300/60 via-cyan-600/40 to-slate-800/80',
    classificationBasis: ['场景主题一致', '共同人物重复出现', '时间相近'],
    aiConfidence: 86,
    dataSources: ['qq_album', 'qq_zone', 'friends'],
    photoAssets: [photoAsset('asset-military-1', '军训集体合影', 'military-training')],
    relatedPhotoIds: ['photo-005'],
    relatedPostIds: [],
    relatedFriendIds: ['friend-005'],
  },
  {
    id: 'class-dinner',
    title: '班级聚餐',
    timeRange: '2019.01',
    photoCount: 12,
    postCount: 3,
    commentCount: 8,
    friendCount: 6,
    summary: '学期末聚餐照片与评论形成轻量记忆包，适合补充到大学第一年时间线。',
    highlight: '生活片段',
    tags: ['聚餐', '班级', '冬天'],
    coverGradient: 'from-amber-200/60 via-rose-400/40 to-slate-800/70',
    classificationBasis: ['场景主题一致', '说说关键词匹配', '共同人物重复出现'],
    aiConfidence: 84,
    dataSources: ['qq_album', 'qq_zone', 'friends'],
    photoAssets: [photoAsset('asset-dinner-1', '班级聚餐', 'qq-memory')],
    relatedPhotoIds: ['photo-006'],
    relatedPostIds: [],
    relatedFriendIds: ['friend-005'],
  },
  {
    id: 'family-trip',
    title: '家人旅行',
    timeRange: '2019.05',
    photoCount: 19,
    postCount: 2,
    commentCount: 6,
    friendCount: 2,
    summary: '系统从本地相册中识别到家庭旅行照片，并准备与空间动态做时间与地点关联。',
    highlight: '本地补全',
    tags: ['家人', '旅行', '五一'],
    coverGradient: 'from-teal-200/60 via-sky-500/40 to-blue-900/80',
    classificationBasis: ['人物关系匹配', '地点相近', '本地照片补全'],
    aiConfidence: 90,
    dataSources: ['local_album', 'qq_zone', 'friends'],
    photoAssets: [photoAsset('asset-family-1', '家庭出游', 'family-travel')],
    relatedPhotoIds: ['photo-007'],
    relatedPostIds: [],
    relatedFriendIds: ['friend-004'],
  },
  {
    id: 'close-friends',
    title: '那些年常联系的人',
    timeRange: '2017.12 - 2019.02',
    photoCount: 9,
    postCount: 18,
    commentCount: 64,
    friendCount: 5,
    summary: 'AI 从评论频率、共同出现和留言内容中提取出长期高频互动关系，帮助你重新看见当年的亲密网络。',
    highlight: '关系链洞察',
    tags: ['好友', '互动', '留言'],
    coverGradient: 'from-violet-300/60 via-fuchsia-500/40 to-slate-900/80',
    classificationBasis: ['好友互动频率', '共同人物重复出现', '评论关系匹配'],
    aiConfidence: 94,
    dataSources: ['qq_zone', 'friends', 'qq_album'],
    photoAssets: [photoAsset('asset-friends-1', '朋友合影', 'friends')],
    relatedPhotoIds: ['photo-008'],
    relatedPostIds: ['post-001', 'post-002'],
    relatedFriendIds: ['friend-001', 'friend-002', 'friend-003', 'friend-005'],
  },
]

export const memoryClusters = baseMemoryClusters.map((cluster) => ({
  ...cluster,
  photoAssets: getPhotoAssetsForCluster(cluster, 3),
}))

export const repairSuggestions = [
  {
    clusterId: 'graduation-2018',
    missingPeriod: '2018.07 - 2018.08',
    detectedLocalPhotoCount: 8,
    reason: '本地相册中发现同一时间段、同一地点和相似人物的照片，可能属于毕业旅行与暑假告别。',
    suggestedAction: '补充到「高中毕业季」记忆包',
  },
  {
    clusterId: 'family-trip',
    missingPeriod: '2019.05',
    detectedLocalPhotoCount: 5,
    reason: '本地照片位置与 QQ 空间动态时间接近，可补全家庭旅行记录。',
    suggestedAction: '补充家庭旅行精选照片',
  },
]

export const timelineEvents = {
  'graduation-2018': [
    { id: 'event-1', date: '2018.06.09', title: '高考结束', description: '说说评论里第一次出现“终于毕业了”的集体情绪。' },
    { id: 'event-2', date: '2018.06.18', title: '毕业聚餐', description: '班级合影、聚餐照片和 18 条评论被关联到同一天。' },
    { id: 'event-3', date: '2018.06.25', title: '操场合影', description: '系统识别出 4 位高频共同出现的高中好友。' },
    { id: 'event-4', date: '2018.07.12', title: '第一次毕业旅行', description: '本地相册发现可补充照片，填上了空间相册缺失的一段。' },
  ],
  'college-start': [
    { id: 'college-1', date: '2018.09.03', title: '大学报到', description: '校门口照片、家人留言和第一条大学动态被关联起来。' },
    { id: 'college-2', date: '2018.09.12', title: '认识新朋友', description: '系统识别到室友开始高频出现在相册和评论里。' },
  ],
  'military-training': [
    { id: 'military-1', date: '2018.09.21', title: '军训结束合影', description: '训练场、合照、军训关键词构成稳定场景主题。' },
  ],
  'class-dinner': [
    { id: 'dinner-1', date: '2019.01.10', title: '班级聚餐', description: '聚餐照片与同班互动被整理为学期末生活片段。' },
  ],
  'family-trip': [
    { id: 'family-1', date: '2019.05.02', title: '家人旅行', description: '本地相册里的家庭合影与节假日时间线匹配。' },
  ],
  'close-friends': [
    { id: 'friends-1', date: '2018.08.25', title: '常联系的人', description: '评论频率和共同出现关系让好友网络重新浮现。' },
  ],
}

export const interactionSummary = {
  topFriendName: '周扬',
  topInteractionCount: 128,
  coAppearPeople: ['周扬', '陈可', '许然', '妈妈'],
  insight: '毕业季期间，你和周扬、陈可、许然的互动频率显著升高，评论内容集中在聚餐、旅行和暑假见面。',
}

export const mockAnalysisResult = {
  memoryClusters,
  uploadClassificationResults: [],
  featuredClusterId: 'graduation-2018',
  selectedClassificationMode: 'life_stage',
  customPrompt: '',
  detectedPeople: friends,
  relatedPosts: posts,
  relatedComments: comments,
  interactionSummary,
  repairSuggestions,
}
