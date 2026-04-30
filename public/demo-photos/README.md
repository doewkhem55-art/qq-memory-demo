# Demo Photos

这里预留给「QQ 时光回廊」Demo 使用的本地图片素材。

当前版本不联网下载外部图片，也不包含真实个人隐私数据。未来可以把 AI 生成图片、版权安全图片或脱敏后的演示素材放入以下目录：

- graduation/：高中毕业季相关素材
- campus/：大学开学与校园生活素材
- military-training/：军训合影素材
- family-travel/：家人旅行素材
- friends/：好友关系与互动素材
- qq-memory/：QQ 空间、说说、评论等产品语境素材

mockData.js 中的 memoryClusters.photoAssets 已经预留 src 字段。如果对应图片不存在，页面会继续显示渐变占位；如果图片存在，页面会直接读取 /demo-photos 下的本地路径。
