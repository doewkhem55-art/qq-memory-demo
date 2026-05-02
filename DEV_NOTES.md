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
## 3C polish 保存记录

本次只做 3C 收尾优化与稳定性验证。

实现要点：
- `MemoryClusterCard` 卡片管理入口收敛为一个 hover 出现的“管理”按钮，编辑和删除入口统一进入 `MemoryManagePanel`。
- `MemoryManagePanel` 增加产品化删除确认弹窗，替代浏览器 `window.confirm`。
- 管理面板输入和可见性切换仍为自动同步，并增加“修改已同步”轻反馈。
- `resolveClusterPhotoMeta` 的数量文案改为稳定的“X 张照片”，减少卡片统计区域截断风险。
- `removePhotoFromCluster` 调整上传图移除计数逻辑，避免新归档相册上传图数量重复叠加。

验证：
- `npm run build` 已通过。
- 3B curated 图片、上传图片优先级、PhotoLightbox 和 recent 持续归档入口未改动核心逻辑。

## 4A 保存记录

本次完成第四阶段 4A 的首页动态主视觉、持续记录表达和回忆页文案体验收口。

实现要点：
- Home 首页 Hero 已完成动态主视觉升级，使用 CSS/SVG/渐变与轻量交互构建深蓝黑时光场、蓝紫光环、光流、星点和空间纵深，不引入重依赖。
- Home 文案已补充“未来持续记录 / QQ 空间成为个人生活记录器”的产品闭环：旧回忆整理 -> 产生记录欲望 -> 继续记录当下 -> 形成长期生活档案。
- `aiMemoryService.js` 新增 `generateMemoryEssay(cluster)`，根据相册标题、摘要、标签、分类依据、说说评论、好友互动和 recent 状态生成差异化回忆页短文。
- `MemoryPage` 的“AI 生成短文”支持编辑，保存后写入 `memoryPageText`，并优先显示用户修改后的文案。
- 未接入真实后端或真实大模型接口，仍基于当前 mockData / demo state 运行。

验证：
- 已检查高中毕业季、大学开学、班级聚餐、家人旅行等相册短文互不相同。
- 已检查用户编辑覆盖字段会优先显示在回忆页短文中。
- 首页动态 Hero 和“未来持续记录”文案保留。
- MemoryClusters、MemoryDetail、MemoryPage 主链路保持可渲染。
- 相册管理、封面设置、移除照片、可见性、删除入口、PhotoLightbox、curated 图片、用户上传优先级和 recent 持续归档链路保持稳定。
- `npm run build` 已通过。

后续注意：
- 不要再大改首页 Hero。
- 不要破坏 `generateMemoryEssay` 和 `memoryPageText` 的编辑覆盖逻辑。
- 继续保持 3B/3C 图片与管理链路稳定。

## 4B 保存记录

本次完成第四阶段 4B 第一轮：全链路演示体验检查与回忆页最终动作区收口。

实现要点：
- `MemoryPage` 底部新增“这段记忆已整理完成”完成操作面板，替代原先分散的保存 / 分享 / 继续整理入口。
- 保存到我的时光回廊会更新为仅自己可见，并显示“已保存到我的时光回廊，当前仅自己可见。”
- 分享到 QQ 空间会更新为可同步到 QQ 空间，并显示“已生成 QQ 空间分享草稿，发布前你仍可继续编辑。”
- 继续归档近期照片复用已有 recent 持续归档弹窗，不新增复杂业务逻辑。
- 若用户已编辑 AI 生成短文，完成区会提示“修改已同步，保存后将使用当前版本。”
- 文案强化“不只是找回过去，也让今天成为未来可回看的记忆”，保持用户侧表达，不暴露开发侧接口说明。

验证：
- 4B 全链路体验检查已完成。
- 首页 -> 导入 -> AI 分析 -> 分类结果 -> 详情页 -> 回忆页 -> 保存 / 分享 / 继续归档的核心演示路径已跑通。
- 导入页二次上传追加逻辑保持正常，recent 持续归档仍会生成新记忆包。
- 1366 / 1440 / 1920 宽度下抽查首页和回忆页完成区无横向溢出，保存 / 分享反馈可见。
- 临时测试素材目录已清理，不纳入提交。
- `npm run build` 已通过。

后续注意：
- 当前版本可作为后续演示与部署基础版本。
- 不要破坏 4B 回忆页完成动作区和保存 / 分享 / 继续归档反馈。
- 后续优先进入部署、演示脚本、讲解材料和公网预览准备。

## 4C 保存记录

本次完成第四阶段 4C：评委演示路径与讲述链路打磨。

实现要点：
- `ImportMemory` 增加产品化智能提示，说明 AI 会结合相册、说说、评论和好友互动整理记忆，本地照片补全为可选补充；自定义 AI 指令说明调整为更自然的偏好提示。
- `MemoryClusters` 强化分类结果页的可信依据表达，保留“查看 AI 分类依据”和“进入这段记忆”的主路径层级。
- `MemoryDetail` 增加产品化状态说明：AI 已将照片、时间线、说说评论和好友互动串联为这段记忆；同时补充“点击照片查看大图”提示。
- `MemoryPage` 微调最终动作区文案，保持当前仅自己可见、保存到我的时光回廊、分享到 QQ 空间、继续归档近期照片的闭环顺序。
- 4C 提示文案已避免明显“演示建议”“这一页展示……”等讲解稿式表达，保持真实产品内状态提示语气。

验证：
- 已复查正式演示路径：首页 -> 导入 -> AI 分析 -> 分类结果 -> 查看 AI 分类依据 -> 详情页 -> 回忆页 -> 编辑短文 -> 保存 -> 分享 -> 继续归档。
- 首页动态 Hero、首页未来持续记录表达、ImportMemory 上传、AI 分析、MemoryClusters、AI 分类依据面板、MemoryDetail、MemoryPage、AI 短文编辑、最终动作区、相册管理、PhotoLightbox、curated 图片、用户上传图片和 recent 持续归档均保持可用。
- `npm run build` 已通过。

后续注意：
- 当前版本可以进入 5A：部署与线上发布。
- 后续优先准备公网预览、演示脚本和录制材料，不要继续新增复杂功能或大改页面。

## 5A 保存记录

本次完成第五阶段 5A：部署与线上发布。

部署信息：
- 项目已推送到 GitHub。
- GitHub 仓库地址：https://github.com/doewkhem55-art/qq-memory-demo.git
- Netlify 已从 GitHub `main` 分支成功部署。
- 线上 Demo 链接：https://mellifluous-chaja-2ca41e.netlify.app
- 部署方式：Branch 为 `main`，Build command 为 `npm run build`，Publish directory 为 `dist`。

线上检查：
- 首页正常。
- 动态 Hero 正常。
- 开始整理链路正常。
- 相册封面正常。
- 详情页照片墙正常。
- 图片放大正常。
- 回忆页生成正常。
- 保存 / 分享 / 继续归档反馈正常。

部署注意事项：
- 内置 curated Demo 图片在线上可正常访问。
- 用户本地上传图片仍然是浏览器本地预览，不是云端持久化。
- 比赛演示时应优先使用内置 Demo 路径，不依赖刷新后保留本地上传图片。

验证：
- `npm run build` 已通过。

后续注意：
- 当前版本可以进入 5B：最终演示材料准备。
- 不要在最终材料准备前新增复杂功能、改页面视觉或重构主链路。
