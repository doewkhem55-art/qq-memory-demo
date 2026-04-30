import {
  classificationModeLabels,
  memoryClusters,
  mockAnalysisResult,
  repairSuggestions,
} from '../data/mockData.js'

const baseAnalysisStages = [
  '正在读取你的分类偏好……',
  '正在扫描 QQ 空间旧相册……',
  '正在识别照片中的时间、地点与人物……',
  '正在识别本地上传照片……',
  '正在关联同期说说与评论……',
  '正在分析高频互动好友……',
  '正在检测本地相册中的可补充旧照片……',
  '正在根据分类方式生成记忆包……',
  '正在生成你的阶段性记忆档案……',
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const clusterById = (clusterId) =>
  memoryClusters.find((cluster) => cluster.id === clusterId) || memoryClusters[0]

const cloneCluster = (sourceId, overrides) => {
  const base = clusterById(sourceId)
  return {
    ...base,
    ...overrides,
    photoAssets: overrides.photoAssets || base.photoAssets,
    relatedPhotoIds: overrides.relatedPhotoIds || base.relatedPhotoIds,
    relatedPostIds: overrides.relatedPostIds || base.relatedPostIds,
    relatedFriendIds: overrides.relatedFriendIds || base.relatedFriendIds,
  }
}

const contentTemplates = {
  family: {
    posts: ['和家人一起出门的周末，天气刚刚好。', '翻到这组照片，才想起那天大家都笑得很开心。'],
    comments: ['这张一定要保存，过几年再看会很珍贵。', '下次还要一起出门。'],
    friends: [
      { id: 'family-mom', name: '妈妈', relation: '家人', interactionCount: 42, coAppearCount: 12, avatarGradient: 'from-rose-200 to-orange-500' },
      { id: 'family-cousin', name: '表姐', relation: '亲人', interactionCount: 27, coAppearCount: 8, avatarGradient: 'from-teal-200 to-cyan-600' },
    ],
    summary: '家人共同出现频率较高，评论内容集中在出行、合影和节假日陪伴。',
  },
  friend: {
    posts: ['临时决定出门，结果变成最开心的一天。', '有些朋友，隔很久再见也还是熟悉。'],
    comments: ['下次还要一起去。', '这张太像当年的我们了。'],
    friends: [
      { id: 'friend-zhou', name: '周扬', relation: '高中好友', interactionCount: 128, coAppearCount: 22, avatarGradient: 'from-sky-300 to-blue-600' },
      { id: 'friend-chen', name: '陈可', relation: '常评论好友', interactionCount: 96, coAppearCount: 18, avatarGradient: 'from-violet-300 to-fuchsia-600' },
    ],
    summary: '好友互动集中在评论、共同出现和旅行聚会，关系链较稳定。',
  },
  appearance: {
    posts: ['翻到以前的照片，才发现那时候的自己变化好大。', '这个发型和穿搭，现在看真的很有年代感。'],
    comments: ['这个发型太有年代感了。', '那时候的你真的很不一样。'],
    friends: [
      { id: 'appearance-friend', name: '许然', relation: '常评论外貌变化的好友', interactionCount: 74, coAppearCount: 12, avatarGradient: 'from-cyan-200 to-teal-600' },
      { id: 'appearance-classmate', name: '陈可', relation: '同学', interactionCount: 64, coAppearCount: 10, avatarGradient: 'from-violet-300 to-fuchsia-600' },
    ],
    summary: '该记忆包主要模拟分析发色、服饰和形象变化，当前为 Demo Mock 分类。',
  },
  school: {
    posts: ['最后一次班级聚餐，大家以后都要闪闪发光。', '高考结束啦，突然不知道明天该几点起床。'],
    comments: ['十年后再看还是会想起那个夏天。', '说好了以后还要再聚。'],
    friends: [
      { id: 'school-zhou', name: '周扬', relation: '高中同学', interactionCount: 128, coAppearCount: 22, avatarGradient: 'from-sky-300 to-blue-600' },
      { id: 'school-xu', name: '许然', relation: '同学', interactionCount: 74, coAppearCount: 12, avatarGradient: 'from-cyan-200 to-teal-600' },
    ],
    summary: '同学关系、毕业关键词和共同出现人物共同构成这个校园记忆包。',
  },
  default: {
    posts: ['这一天后来变成了很值得回看的片段。', '旧照片重新整理后，很多细节又回来了。'],
    comments: ['现在看还是很有感觉。', '这段记忆应该好好保存。'],
    friends: [
      { id: 'default-friend', name: '老友', relation: '高频互动好友', interactionCount: 58, coAppearCount: 9, avatarGradient: 'from-indigo-300 to-slate-700' },
    ],
    summary: 'AI 根据照片、说说、评论和互动关系生成了阶段性记忆摘要。',
  },
}

function templateForCluster(cluster) {
  const text = `${cluster.id} ${cluster.title} ${cluster.tags?.join(' ') || ''}`
  if (/家人|亲人|family/.test(text)) return contentTemplates.family
  if (/朋友|同学|联系|他人|好友|friend|relation/.test(text)) return contentTemplates.friend
  if (/发色|形象|穿搭|外观|头发|hair|appearance|outfit/.test(text)) return contentTemplates.appearance
  if (/毕业|校园|大学|高中|军训|school|college|campus/.test(text)) return contentTemplates.school
  return contentTemplates.default
}

function enrichCluster(cluster) {
  const template = templateForCluster(cluster)
  const relatedPostsData = template.posts.map((content, index) => ({
    id: `${cluster.id}-post-${index + 1}`,
    content,
    date: index === 0 ? '2018-06-18' : '2019-05-02',
    visibility: 'friends',
    source: 'qq_zone',
    relatedClusterId: cluster.id,
  }))
  const relatedCommentsData = template.comments.map((content, index) => ({
    id: `${cluster.id}-comment-${index + 1}`,
    author: template.friends[index % template.friends.length]?.name || '好友',
    content,
    date: index === 0 ? '2018-06-18' : '2019-05-03',
    relatedPostId: relatedPostsData[index % relatedPostsData.length].id,
    relatedClusterId: cluster.id,
  }))
  const previewTitles = cluster.previewPhotos?.length
    ? cluster.previewPhotos
    : [
        `${cluster.title}精选`,
        cluster.tags?.[0] || '旧照片',
        cluster.tags?.[1] || '回忆片段',
      ].map((title, index) => ({ id: `${cluster.id}-preview-${index + 1}`, title }))

  return {
    ...cluster,
    relatedPostsData,
    relatedCommentsData,
    relatedFriendsData: template.friends,
    interactionSummary: {
      mostFrequentFriend: template.friends[0]?.name || '好友',
      coAppearCount: template.friends.reduce((sum, friend) => sum + friend.coAppearCount, 0),
      commentCount: relatedCommentsData.length,
      summaryText: template.summary,
    },
    previewPhotos: previewTitles,
  }
}

function enrichClusters(clusters) {
  return clusters.map(enrichCluster)
}

const relationClusters = [
  cloneCluster('family-trip', {
    id: 'relation-family',
    title: '家人相关回忆',
    highlight: '亲人关系',
    summary: 'AI 从照片人物、节假日时间和留言关系中，整理出你和家人共同出现的温暖片段。',
    tags: ['家人', '亲人', '旅行'],
    classificationBasis: ['人物关系匹配', '共同出现频率', '本地照片补全'],
    aiConfidence: 93,
    dataSources: ['local_album', 'qq_zone', 'friends'],
  }),
  cloneCluster('graduation-2018', {
    id: 'relation-highschool',
    title: '高中同学',
    highlight: '同学关系',
    summary: '毕业合影、聚餐评论和高频共同出现的人，被整理为高中同学关系记忆。',
    tags: ['同学', '毕业', '留言'],
    classificationBasis: ['同学关系', '共同人物重复出现', '说说评论互动'],
    aiConfidence: 91,
  }),
  cloneCluster('college-start', {
    id: 'relation-college',
    title: '大学朋友',
    highlight: '新朋友',
    summary: '大学开学后的室友、同班同学和校园互动，被归为大学朋友关系包。',
    tags: ['大学', '朋友', '室友'],
    classificationBasis: ['好友互动频率', '校园场景', '共同出现频率'],
    aiConfidence: 87,
  }),
  cloneCluster('close-friends', {
    id: 'relation-close-friends',
    title: '那些年常联系的人',
    highlight: '高频互动',
    summary: 'AI 从评论频率、共同出现和留言内容中提取出长期高频互动关系。',
    tags: ['好友', '互动', '联系'],
    classificationBasis: ['好友互动频率', '评论关系匹配', '共同人物重复出现'],
    aiConfidence: 94,
  }),
  cloneCluster('graduation-2018', {
    id: 'relation-travel-partners',
    title: '一起旅行的人',
    highlight: '同行关系',
    summary: '系统把旅行照片、地点线索和同行人物整理为一起出发过的人。',
    tags: ['旅行', '朋友', '同伴'],
    classificationBasis: ['地点相近', '同行人物', '时间相近'],
    aiConfidence: 86,
  }),
  cloneCluster('close-friends', {
    id: 'relation-most-seen',
    title: '共同出现最多的人',
    highlight: '同框分析',
    summary: '根据照片同框次数和评论互动，AI 提取出与你共同出现最多的人。',
    tags: ['同框', '好友', '关系链'],
    classificationBasis: ['共同人物重复出现', '好友互动频率', '相册分组'],
    aiConfidence: 89,
  }),
]

const sceneClusters = [
  cloneCluster('graduation-2018', {
    id: 'scene-graduation',
    title: '毕业',
    highlight: '场景主题',
    tags: ['毕业', '合影', '告别'],
    classificationBasis: ['场景主题一致', '说说关键词匹配', '时间相近'],
    aiConfidence: 92,
  }),
  cloneCluster('family-trip', {
    id: 'scene-travel',
    title: '旅行',
    highlight: '场景主题',
    summary: 'AI 将海边、城市出行和家人旅行照片整理为旅行主题记忆。',
    tags: ['旅行', '地点', '同行'],
    classificationBasis: ['地点相近', '场景主题一致', '本地照片补全'],
    aiConfidence: 90,
  }),
  cloneCluster('class-dinner', {
    id: 'scene-dinner',
    title: '聚餐',
    highlight: '场景主题',
    tags: ['聚餐', '班级', '朋友'],
    classificationBasis: ['场景主题一致', '说说关键词匹配', '共同人物重复出现'],
    aiConfidence: 87,
  }),
  cloneCluster('military-training', {
    id: 'scene-military',
    title: '军训',
    highlight: '场景主题',
    tags: ['军训', '校园', '合影'],
    classificationBasis: ['场景主题一致', '时间相近', '校园地点'],
    aiConfidence: 88,
  }),
  cloneCluster('class-dinner', {
    id: 'scene-birthday',
    title: '生日',
    highlight: '待补全主题',
    summary: '系统预留生日主题记忆包，未来可由真实图片识别蛋糕、祝福评论和日期线索补全。',
    tags: ['生日', '祝福', '朋友'],
    classificationBasis: ['祝福关键词', '日期线索', '好友互动'],
    aiConfidence: 78,
    relatedPhotoIds: [],
    relatedPostIds: [],
  }),
  cloneCluster('college-start', {
    id: 'scene-campus',
    title: '校园日常',
    highlight: '场景主题',
    summary: '课堂、宿舍、操场和校园说说被整理为更日常的校园生活片段。',
    tags: ['校园', '日常', '朋友'],
    classificationBasis: ['校园地点', '时间相近', '好友互动'],
    aiConfidence: 84,
  }),
]

const selfOtherClusters = [
  cloneCluster('college-start', {
    id: 'custom-self',
    title: '关于我自己的回忆',
    highlight: '自我记忆',
    summary: 'AI 将独照、个人动态和成长阶段线索整理为关于你自己的记忆片段。',
    tags: ['自我', '成长', '个人'],
    classificationBasis: ['自我相关照片', '个人动态关键词', '时间阶段变化'],
    aiConfidence: 91,
    dataSources: ['qq_album', 'qq_zone', 'local_album'],
  }),
  cloneCluster('close-friends', {
    id: 'custom-others',
    title: '和他人的回忆',
    highlight: '关系记忆',
    summary: 'AI 将共同出现的人、评论互动和好友关系整理为你与他人共同经历的片段。',
    tags: ['他人', '关系', '共同出现'],
    classificationBasis: ['共同出现人物', '好友互动关系', '评论语义匹配'],
    aiConfidence: 92,
  }),
  cloneCluster('close-friends', {
    id: 'custom-friends',
    title: '和朋友的回忆',
    highlight: '朋友关系',
    summary: '系统优先整理与朋友相关的照片、留言和互动频率。',
    tags: ['朋友', '互动', '留言'],
    classificationBasis: ['好友互动关系', '评论语义匹配', '共同出现人物'],
    aiConfidence: 89,
  }),
  cloneCluster('family-trip', {
    id: 'custom-family',
    title: '和家人的回忆',
    highlight: '家人关系',
    summary: '系统把家人共同出现、旅行地点和亲人留言归为家人回忆。',
    tags: ['家人', '亲人', '旅行'],
    classificationBasis: ['共同出现人物', '亲人关系', '本地照片补全'],
    aiConfidence: 90,
  }),
  cloneCluster('graduation-2018', {
    id: 'custom-classmates',
    title: '和同学的回忆',
    highlight: '同学关系',
    summary: '毕业合影、聚餐和校园评论被整理为同学相关记忆。',
    tags: ['同学', '校园', '毕业'],
    classificationBasis: ['共同出现人物', '校园场景', '评论语义匹配'],
    aiConfidence: 88,
  }),
  cloneCluster('college-start', {
    id: 'custom-campus-self',
    title: '我的校园日常',
    highlight: '个人日常',
    summary: '系统把校园地点、个人动态和阶段变化整理为你的校园日常。',
    tags: ['校园', '日常', '自我'],
    classificationBasis: ['个人动态关键词', '校园地点', '时间阶段变化'],
    aiConfidence: 85,
  }),
]

const customDimensionClusters = {
  color: [
    cloneCluster('close-friends', {
      id: 'custom-hair-black',
      title: '黑发记忆',
      highlight: '发色模拟分类',
      summary: '当前为 Demo 模拟分类。未来可通过多模态视觉识别分析照片中的黑发、服饰颜色和人物特征。',
      tags: ['黑色', '发色', '人物'],
      classificationBasis: ['发色关键词', '人物视觉特征', 'Demo 模拟分类'],
      aiConfidence: 82,
    }),
    cloneCluster('graduation-2018', {
      id: 'custom-hair-light',
      title: '浅色发色记忆',
      highlight: '发色模拟分类',
      summary: '当前为 Demo 模拟分类。未来可识别金色、黄色、白色、棕色等浅色发色与光照变化。',
      tags: ['浅色', '金色', '棕色'],
      classificationBasis: ['颜色语义', '发色视觉特征', 'Demo 模拟分类'],
      aiConfidence: 79,
    }),
    cloneCluster('college-start', {
      id: 'custom-hair-unclear',
      title: '戴帽子或难以识别发色',
      highlight: '待识别照片',
      summary: '当前为 Demo 模拟分类。未来可标记帽子、背光、遮挡等导致发色难以识别的照片。',
      tags: ['帽子', '遮挡', '待识别'],
      classificationBasis: ['遮挡判断', '低置信度标记', 'Demo 模拟分类'],
      aiConfidence: 74,
    }),
    cloneCluster('class-dinner', {
      id: 'custom-hair-group',
      title: '合影中的发色变化',
      highlight: '合影分析',
      summary: '当前为 Demo 模拟分类。未来可在合影中识别多个人物的发色变化和形象差异。',
      tags: ['合影', '发色变化', '多人'],
      classificationBasis: ['共同出现人物', '发色变化', 'Demo 模拟分类'],
      aiConfidence: 80,
    }),
    cloneCluster('college-start', {
      id: 'custom-appearance-change',
      title: '我的形象变化',
      highlight: '形象变化',
      summary: '当前为 Demo 模拟分类。未来可结合发色、服饰、时间线分析个人形象变化。',
      tags: ['形象', '成长', '变化'],
      classificationBasis: ['个人动态关键词', '视觉变化', 'Demo 模拟分类'],
      aiConfidence: 83,
    }),
  ],
  outfit: [
    cloneCluster('graduation-2018', { id: 'custom-uniform', title: '校服记忆', highlight: '服饰模拟分类', tags: ['校服', '校园'], classificationBasis: ['服饰关键词', '校园场景', 'Demo 模拟分类'], aiConfidence: 84 }),
    cloneCluster('college-start', { id: 'custom-daily-outfit', title: '日常穿搭', highlight: '服饰模拟分类', tags: ['穿搭', '日常'], classificationBasis: ['外观关键词', '日常场景', 'Demo 模拟分类'], aiConfidence: 81 }),
    cloneCluster('family-trip', { id: 'custom-travel-outfit', title: '旅行穿搭', highlight: '服饰模拟分类', tags: ['旅行', '穿搭'], classificationBasis: ['地点线索', '服饰颜色', 'Demo 模拟分类'], aiConfidence: 80 }),
    cloneCluster('graduation-2018', { id: 'custom-graduation-dress', title: '毕业礼服', highlight: '服饰模拟分类', tags: ['毕业', '礼服'], classificationBasis: ['毕业关键词', '服饰识别预留', 'Demo 模拟分类'], aiConfidence: 78 }),
    cloneCluster('college-start', { id: 'custom-look-change', title: '形象变化', highlight: '外观变化', tags: ['形象', '变化'], classificationBasis: ['外观关键词', '时间变化', 'Demo 模拟分类'], aiConfidence: 82 }),
  ],
  life: [
    cloneCluster('graduation-2018', { id: 'custom-primary-school', title: '小学时光', highlight: '人生阶段', tags: ['小学', '成长'], classificationBasis: ['阶段关键词', '时间线推断', 'Demo 模拟分类'], aiConfidence: 76 }),
    cloneCluster('graduation-2018', { id: 'custom-middle-school', title: '初中片段', highlight: '人生阶段', tags: ['初中', '同学'], classificationBasis: ['阶段关键词', '同学关系', 'Demo 模拟分类'], aiConfidence: 77 }),
    cloneCluster('graduation-2018', { id: 'custom-high-school', title: '高中毕业季', highlight: '人生阶段', tags: ['高中', '毕业'], classificationBasis: ['阶段关键词', '毕业语义', 'Demo 模拟分类'], aiConfidence: 90 }),
    cloneCluster('college-start', { id: 'custom-college-start', title: '大学开学', highlight: '人生阶段', tags: ['大学', '开学'], classificationBasis: ['阶段关键词', '校园地点', 'Demo 模拟分类'], aiConfidence: 88 }),
    cloneCluster('college-start', { id: 'custom-growth-change', title: '成长变化', highlight: '人生阶段', tags: ['成长', '变化'], classificationBasis: ['时间线变化', '个人动态关键词', 'Demo 模拟分类'], aiConfidence: 82 }),
  ],
  open: [
    cloneCluster('graduation-2018', {
      id: 'custom-ai-open',
      title: 'AI 自定义分类结果',
      highlight: '开放指令',
      summary: 'AI 已根据你的输入尝试生成分类维度。当前 Demo 使用 Mock 语义解析，未来可接入真实多模态模型进一步识别照片内容。',
      tags: ['自定义', 'Mock', '待识别'],
      classificationBasis: ['自然语言指令', 'Mock 语义解析', '未来多模态识别'],
      aiConfidence: 72,
    }),
    ...memoryClusters.slice(0, 5),
  ],
}

const assignmentByMode = {
  life_stage: ['graduation-2018', 'college-start'],
  relation: ['relation-family', 'relation-highschool', 'relation-college', 'relation-close-friends'],
  scene: ['scene-graduation', 'scene-travel', 'scene-dinner', 'scene-military'],
}

function hasSelfIntent(prompt = '') {
  return /我自己|自己|我的|个人|自我/.test(prompt)
}

function hasOtherIntent(prompt = '') {
  return /别人|他人|朋友|同学|家人|和别人|和他人/.test(prompt)
}

function getCustomPromptDimension(prompt = '') {
  if (/头发颜色|发色|颜色|红色|黄色|白色|黑色|棕色|金色/.test(prompt)) return 'color'
  if (/衣服|穿搭|校服|颜色搭配|外观|形象/.test(prompt)) return 'outfit'
  if (/我自己|自己|我的|个人|别人|他人|朋友|同学|家人|和别人/.test(prompt)) return 'relation'
  if (/小学|初中|高中|大学|工作|成长/.test(prompt)) return 'life'
  if (/毕业|旅行|聚餐|生日|军训|校园|日常/.test(prompt)) return 'scene'
  return 'open'
}

function inferClusterIdFromPrompt(prompt = '') {
  const dimension = getCustomPromptDimension(prompt)
  if (dimension === 'color') return 'custom-hair-black'
  if (dimension === 'outfit') return 'custom-uniform'
  if (dimension === 'life') return 'custom-primary-school'
  if (dimension === 'open') return 'custom-ai-open'
  if (hasSelfIntent(prompt) && hasOtherIntent(prompt)) return 'custom-self'
  if (hasSelfIntent(prompt)) return 'custom-self'
  if (hasOtherIntent(prompt)) return 'custom-others'
  if (/家人|亲人/.test(prompt)) return 'relation-family'
  if (/朋友|同学|联系/.test(prompt)) return 'relation-close-friends'
  if (/旅行/.test(prompt)) return 'scene-travel'
  if (/高中|毕业/.test(prompt)) return 'graduation-2018'
  if (/大学|开学/.test(prompt)) return 'college-start'
  if (/聚餐/.test(prompt)) return 'scene-dinner'
  if (/军训/.test(prompt)) return 'scene-military'
  return 'graduation-2018'
}

function clustersForMode(classificationMode = 'life_stage', customPrompt = '') {
  if (classificationMode === 'custom' && customPrompt.trim()) {
    return classifyByCustomPrompt({ customPrompt, uploadedFiles: [], existingAssets: memoryClusters })
  }
  if (customPrompt.trim() && hasSelfIntent(customPrompt) && hasOtherIntent(customPrompt)) {
    return selfOtherClusters
  }
  if (classificationMode === 'custom' && customPrompt.trim() && hasSelfIntent(customPrompt)) {
    return [selfOtherClusters[0], selfOtherClusters[5], ...memoryClusters].slice(0, 6)
  }
  if (classificationMode === 'custom' && customPrompt.trim() && hasOtherIntent(customPrompt)) {
    return [selfOtherClusters[1], selfOtherClusters[2], selfOtherClusters[3], selfOtherClusters[4], ...relationClusters].slice(0, 6)
  }
  if (classificationMode === 'relation') return prioritizeByPrompt(relationClusters, customPrompt)
  if (classificationMode === 'scene') return prioritizeByPrompt(sceneClusters, customPrompt)
  return prioritizeByPrompt(memoryClusters, customPrompt)
}

function findClusterIn(clusters, clusterId) {
  return clusters.find((cluster) => cluster.id === clusterId) || clusters[0]
}

function prioritizeByPrompt(clusters, customPrompt = '') {
  if (!customPrompt.trim()) return clusters
  const matchedId = inferClusterIdFromPrompt(customPrompt)
  const matched = clusters.find((cluster) => cluster.id === matchedId)
  if (!matched) return clusters
  return [matched, ...clusters.filter((cluster) => cluster.id !== matched.id)]
}

function classifyUploadedFiles(uploadedFiles = [], classificationMode = 'life_stage', customPrompt = '', clusters = memoryClusters) {
  const basePreferredIds = (
    customPrompt.trim() && hasSelfIntent(customPrompt) && hasOtherIntent(customPrompt)
      ? ['custom-self', 'custom-others']
      : customPrompt.trim() && hasSelfIntent(customPrompt)
        ? ['custom-self', 'custom-campus-self']
        : customPrompt.trim() && hasOtherIntent(customPrompt)
          ? ['custom-others', 'custom-friends', 'custom-family', 'custom-classmates']
          : classificationMode === 'custom'
            ? [inferClusterIdFromPrompt(customPrompt)]
            : assignmentByMode[classificationMode] || assignmentByMode.life_stage
  )
  const promptMatchedId = customPrompt.trim() ? inferClusterIdFromPrompt(customPrompt) : null
  const preferredClusterIds =
    promptMatchedId && clusters.some((cluster) => cluster.id === promptMatchedId)
      ? [promptMatchedId, ...basePreferredIds.filter((id) => id !== promptMatchedId)]
      : basePreferredIds

  // TODO: replace mock file classification with real multimodal AI image recognition API.
  // The future API should receive browser-selected file metadata or uploaded asset ids,
  // then return cluster assignment, confidence, tags, and explainable classification reasons.
  return uploadedFiles.map((file, index) => {
    const assignedClusterId = preferredClusterIds[index % preferredClusterIds.length]
    const cluster = findClusterIn(clusters, assignedClusterId)
    return {
      id: `upload-result-${file.id || index}`,
      fileName: file.fileName || file.name,
      previewUrl: file.previewUrl,
      uploadedAt: file.uploadedAt,
      assignedClusterId,
      assignedClusterTitle: cluster.title,
      reason:
        classificationMode === 'custom'
          ? `根据自定义指令中的关键词，将这张照片归入「${cluster.title}」。`
          : `根据「${classificationModeLabels[classificationMode]}」策略，将这张照片归入「${cluster.title}」。`,
      confidence: Math.max(78, 93 - index * 3),
      tags: cluster.tags.slice(0, 3),
    }
  })
}

function withUploadedCounts(clusters, uploadClassificationResults) {
  return clusters.map((cluster) => {
    const uploadCount = uploadClassificationResults.filter(
      (item) => item.assignedClusterId === cluster.id,
    ).length

    return {
      ...cluster,
      localUploadCount: uploadCount,
      photoCount: cluster.photoCount + uploadCount,
      classificationBasis: uploadCount
        ? Array.from(new Set([...cluster.classificationBasis, '本地照片补全']))
        : cluster.classificationBasis,
      dataSources: uploadCount
        ? Array.from(new Set([...cluster.dataSources, 'local_album']))
        : cluster.dataSources,
    }
  })
}

// 当前为 Demo Mock 实现。
// TODO:
// 未来这里可以替换为真实多模态 AI 分类接口：
// 1. 读取用户自然语言分类指令；
// 2. 识别上传图片中的人物、场景、颜色、服饰、发色、物体和时间信息；
// 3. 结合 QQ 空间说说、评论和好友互动；
// 4. 返回动态生成的分类维度和记忆包。
export function classifyByCustomPrompt({ customPrompt = '', uploadedFiles = [], existingAssets = [] } = {}) {
  const dimension = getCustomPromptDimension(customPrompt)
  if (dimension === 'color') return customDimensionClusters.color
  if (dimension === 'outfit') return customDimensionClusters.outfit
  if (dimension === 'life') return customDimensionClusters.life
  if (dimension === 'scene') return sceneClusters
  if (dimension === 'relation' && hasSelfIntent(customPrompt) && hasOtherIntent(customPrompt)) return selfOtherClusters
  if (dimension === 'relation') return [selfOtherClusters[1], selfOtherClusters[2], selfOtherClusters[3], selfOtherClusters[4], selfOtherClusters[0]]
  return customDimensionClusters.open.slice(0, Math.max(1, Math.min(6, existingAssets.length || 6)))
}

// 当前为 Demo Mock 实现，未来可以替换为真实后端 API 或大模型服务调用。
// TODO: replace this mock implementation with real AI classification API,
// image recognition API, text semantic analysis API, friend graph analysis API,
// and generative memory page API.
export async function analyzeMemorySources(params, callbacks = {}) {
  const {
    selectedSources = [],
    uploadedFiles = [],
    classificationMode = 'life_stage',
    customPrompt = '',
    userId = 'demo-user',
  } = params || {}

  const modeLabel = classificationModeLabels[classificationMode] || classificationModeLabels.life_stage
  const analysisStages = baseAnalysisStages.map((stage) =>
    stage === '正在根据分类方式生成记忆包……'
      ? `正在根据“${modeLabel}”生成记忆包……`
      : stage,
  )

  for (let index = 0; index < analysisStages.length; index += 1) {
    callbacks.onStageChange?.(analysisStages[index])
    callbacks.onProgress?.(Math.round(((index + 1) / baseAnalysisStages.length) * 100))
    await delay(520)
  }

  const selectedClusters = enrichClusters(clustersForMode(classificationMode, customPrompt))
  const uploadClassificationResults = classifyUploadedFiles(
    uploadedFiles,
    classificationMode,
    customPrompt,
    selectedClusters,
  )

  return {
    ...mockAnalysisResult,
    memoryClusters: withUploadedCounts(selectedClusters, uploadClassificationResults),
    uploadClassificationResults,
    featuredClusterId: selectedClusters[0]?.id || 'graduation-2018',
    selectedClassificationMode: classificationMode,
    customPrompt,
    requestContext: {
      userId,
      selectedSources,
      uploadedFileCount: uploadedFiles.length,
      classificationMode,
      customPrompt,
      analyzedAt: new Date().toISOString(),
    },
  }
}

// 当前为 Demo Mock 实现，未来可替换为真实多模态资产分类接口。
// TODO: replace with a backend endpoint that accepts normalized assets and returns stable memory cluster objects.
export async function classifyMemoryAssets(assets = []) {
  await delay(360)
  return {
    memoryClusters,
    assetCount: assets.length,
  }
}

// 当前为 Demo Mock 实现，未来可替换为真实生成式 AI 回忆页接口。
// TODO: replace with a generative AI service that composes page copy, photo selections, comments, and privacy metadata.
export async function generateMemoryPage(clusterId, analysisResult) {
  await delay(520)
  const cluster =
    analysisResult?.memoryClusters?.find((item) => item.id === clusterId) ||
    clusterById(clusterId)

  return {
    id: `page-${cluster.id}`,
    clusterId: cluster.id,
    title: `你的「${cluster.title}」回忆页已生成`,
    timeRange: cluster.timeRange,
    essay: `AI 已经把「${cluster.title}」中的照片、说说、评论和好友关系整理成一页可回看的记忆。你可以先设为仅自己可见，确认内容后再选择是否分享到 QQ 空间。`,
    selectedPhotoIds: cluster.relatedPhotoIds,
    featuredPostId: cluster.relatedPostIds[0],
    featuredCommentIds: ['comment-001', 'comment-003', 'comment-004'],
    featuredFriendIds: cluster.relatedFriendIds.slice(0, 3),
    visibility: 'private',
  }
}

// 当前为 Demo Mock 实现，未来可接入真实图片时间、地点、人物识别与相似度检索。
// TODO: replace with image metadata extraction and face/place matching against the selected cluster.
export async function repairMissingMemories(clusterId, localPhotos = []) {
  await delay(420)
  return {
    suggestions: repairSuggestions.filter((item) => item.clusterId === clusterId),
    localPhotoCount: localPhotos.length,
  }
}
