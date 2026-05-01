# DEV_NOTES

## 3B-1 阶段性保存记录

当前已完成：
- 照片资产结构初步建立，`photoAssets` 已作为默认记忆包照片资产入口。
- 上传图片可以参与相册展示，分类结果中的上传图会优先显示在对应相册。
- 默认相册已有照片资产或照片感占位素材。
- `PhotoCard` / `PhotoGrid` 已用于统一照片展示。
- `npm run build` 已通过。

当前未解决或待检查：
- 上传图片是否在所有链路中稳定显示，包括分类结果页、详情页、回忆页和持续归档新相册。
- 不同分类方式下所有相册是否都有图。
- 是否仍有文字重叠、标签重叠、时间重叠或遮罩错位。
- 当前部分图片素材不符合最终演示气质，需要在 3B-2 替换。
- 后续需要进入 3B-2 真实感素材替换，但暂时不要进入相册管理统一阶段。

## 3B 完成保存记录

当前第三阶段 3B 已完成，可作为进入 3C 前的稳定 checkpoint。

已完成：
- curated 真实感照片素材已接入，主展示优先级为：用户上传图片 > curated 真实照片 > Demo 图片 > SVG fallback > 渐变兜底。
- `MemoryClusters` 相册首页主封面已能显示真实照片，封面选择已做语义匹配和错峰展示。
- `MemoryDetail` / `MemoryPage` 照片墙和精选照片正常显示。
- `PhotoLightbox` 可点击放大，支持 demo 图片、curated 图片和用户上传图片。
- 用户上传图片仍然优先显示。
- 二次上传追加、多图分配、照片数量自洽逻辑保持正常。
- `recent` 保持为用户后续持续归档入口，不作为默认 curated 素材展示主题。
- 封面统计文案已改为稳定格式，避免窄宽度下出现不完整省略。

准备进入：
- 第三阶段 3C：相册管理产品化。

3C 注意：
- 不要破坏当前 3B 照片系统和 Lightbox。
- 不要破坏 customPrompt 分类、AI 分类依据面板、持续归档和主链路。
- 不要接真实 API，不要重做首页。
## 3C 完成保存记录

当前第三阶段 3C：相册管理产品化已完成。

实现要点：
- 新增 `src/components/MemoryManagePanel.jsx`，统一承载记忆包标题、描述、可见性、封面预览和删除 / 隐藏操作。
- `App.jsx` 新增统一状态操作：`updateMemoryCluster`、`deleteMemoryCluster`、`setClusterCoverPhoto`、`removePhotoFromCluster`、`updateClusterVisibility`。
- `photoAssets.js` 的 `resolveClusterPhotoMeta` 支持 `coverPhotoId` 置顶和 `removedPhotoIds` 过滤，继续保持上传图片优先于 curated / demo / fallback。
- `MemoryClusters`、`MemoryDetail`、`MemoryPage` 已接入统一管理入口，标题、描述、封面、数量、可见性同步更新。
- `PhotoGrid` 新增照片级操作：设为封面、从记忆包中移除；仍保留点击打开 `PhotoLightbox`。
- 删除相册或移除照片都只影响当前 Demo state，不删除 public 素材和本地原始文件。

验证：
- `npm run build` 已通过。

后续注意：
- 不要把默认相册管理能力重新限制为 `isUserArchive`。
- 不要破坏 `coverPhotoId`、`removedPhotoIds`、上传图优先级和 `PhotoLightbox`。
- 后续视觉精修时应保留管理入口和照片 hover 操作。
