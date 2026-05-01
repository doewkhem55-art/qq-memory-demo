# Curated Demo Photos

`curated` 目录用于放置 QQ 时光回廊 Demo 的真实感安全素材，让默认相册封面、照片墙和精选照片更像真实青春回忆相册。

## Source Rules

- 素材来源优先使用 Unsplash、Pexels、Pixabay 等明确允许免费使用的公开图库。
- 不使用百度图片、小红书、微博、QQ 空间、朋友圈、新闻站随机图片、明星/网红/公众人物照片、影视剧截图或品牌广告图。
- 不使用真实陌生人清晰正脸特写、学校 logo、商业商标、水印图片、隐私感很强的照片或明显 AI 瑕疵图片。
- 人物照片优先选择背影、侧脸、远景、群体氛围、校园场景、旅行场景和餐桌场景。

## Directory Notes

- `graduation/`：毕业季、校园告别、操场与同学氛围。
- `campus/`：大学校园、图书馆、林荫路、日常生活。
- `military-training/`：军训、操场训练、迷彩与集体队列。
- `family-travel/`：家人旅行、车窗、景点、餐桌和亲情陪伴。
- `friends/`：朋友聚会、生日、聚餐、夜晚与周末出游。
- `self/`：个人背影、独处、学习生活和成长记录。
- `relationship/`：家人、同学、朋友、共同出现和一起旅行/吃饭。
- `recent/`：保留为空，用于用户上传近期照片后的持续归档，不作为默认 Demo 素材目录。

## Read Priority

页面读取优先级为：用户上传图片 > curated 真实图片 > demo 图片 > SVG fallback > 渐变兜底。

如果后续手动替换图片，只需保持文件名一致；如果文件名或主题目录变化，请同步更新 `src/data/photoAssets.js` 中的映射。

所有下载图片的来源记录请见 `SOURCES.md`。
