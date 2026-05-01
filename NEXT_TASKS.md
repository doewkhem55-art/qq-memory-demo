# 第三阶段 3C：相册管理产品化

当前第三阶段 3B 已完成 checkpoint，可以进入 3C。

## 3B 已完成状态

- curated 真实感照片素材已接入。
- 相册首页主封面已能显示真实照片。
- `MemoryDetail` / `MemoryPage` 照片墙正常显示。
- `PhotoLightbox` 可点击放大，支持用户上传图片和 Demo 图片。
- 用户上传图片仍然优先显示。
- `recent` 仍作为用户后续持续归档入口，不强行填充默认 curated 素材。
- 照片数量、封面、详情页展示逻辑基本稳定。

## 3C 下一阶段重点

1. 默认自动分类相册支持统一管理能力。
2. 持续归档新增相册与默认相册在管理体验上保持一致。
3. 支持相册重命名、编辑描述、设置可见范围、隐藏或删除。
4. 管理操作需要保持 Demo 主链路完整。
5. 管理状态要与 `MemoryClusters`、`MemoryDetail`、`MemoryPage` 展示保持一致。
6. 不接真实后端，继续使用当前 Demo state。

## 保持不变

- 不要重做首页。
- 不要破坏 Home -> ImportMemory -> Analyzing -> MemoryClusters -> MemoryDetail -> MemoryPage 主链路。
- 不要破坏 3B 已完成的照片资产体系。
- 不要破坏真实感照片优先于 SVG fallback 的逻辑。
- 不要破坏 `PhotoLightbox` 大图预览能力。
- 不要破坏上传图片最高优先级。
- 不要破坏二次上传追加、多图分配和照片数量自洽逻辑。
- 不要破坏 customPrompt 分类。
- 不要破坏 AI 分类依据面板。
- 不要破坏持续归档功能。
- 不要删除 `mockData.js`、`aiMemoryService.js`、`photoAssets.js`。
