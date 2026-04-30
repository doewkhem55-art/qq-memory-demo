# 第三阶段：AI 分类可信度增强 + 相册内容真实感补齐 + 相册管理产品化

## 1. AI 分类可信度增强

- 增强 customPrompt 对结果的影响
- 不同分类方式返回更明显不同的 memoryClusters
- 每个记忆包增加具体分类依据
- 增加“查看 AI 分类依据”面板
- UI 中弱化 Mock AI 工程感表达
- 保留 aiMemoryService.js 中真实多模态 AI 接口预留

## 2. 相册内容真实感补齐

- 每个默认记忆包至少准备 3 张 photoAssets
- public/demo-photos 下建立素材目录
- 后续接入 AI 生成或版权安全图片
- 有真实图片时直接显示图片，不再显示厚重占位框
- MemoryClusters、MemoryDetail、MemoryPage 统一读取 photoAssets 和 uploadedPhotoPreviews

## 3. 相册管理产品化

- 所有自动分类相册支持重命名
- 支持编辑描述
- 支持设置可见范围
- 支持隐藏 / 从本次整理结果中移除
- 新归档相册支持删除
- 所有管理操作必须同步到 MemoryClusters、MemoryDetail 和 MemoryPage

## 4. 后续交付准备

- 稳定 npm run build
- 部署到公网
- 准备演示路径
- 准备答辩讲解稿
- 准备 AI 接口预留说明
- 录制演示视频
