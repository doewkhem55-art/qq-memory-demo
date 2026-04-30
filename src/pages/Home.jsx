import { useState } from 'react'
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  ImagePlus,
  LockKeyhole,
  MessageCircle,
  Play,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WandSparkles,
  X,
} from 'lucide-react'
import Button from '../components/Button.jsx'
import DisplayTitle from '../components/DisplayTitle.jsx'

const anchors = [
  { icon: Camera, label: 'QQ 空间旧相册' },
  { icon: MessageCircle, label: '说说评论关联' },
  { icon: UsersRound, label: '好友关系链联想' },
  { icon: ImagePlus, label: '本地相册补全' },
]

const insightLayers = [
  'AI 正在关联 2018 年毕业季照片、说说与评论',
  '发现 4 位高频互动好友',
  '检测到 8 张可补充旧照片',
]

const featureCards = [
  {
    icon: Sparkles,
    title: 'AI 自动归档',
    desc: '按时间、人物、地点和内容语义整理旧照片，让散落资料重新形成阶段记忆。',
    input: '帮我按小学、初中、高中、大学整理这些回忆。',
    output: '高中毕业季 / 大学开学 / 校园日常。',
    future: '多模态图片识别、EXIF 时间解析、文本语义聚类。',
  },
  {
    icon: MessageCircle,
    title: '说说评论关联',
    desc: '把同一时期的说说、评论和照片串联起来，让旧动态成为记忆上下文。',
    input: '找出这张照片对应的说说、评论和当时发生的事。',
    output: '这张毕业合影关联到 2018 年 6 月的一条说说和 18 条评论。',
    future: '文本语义匹配、评论情绪摘要、动态时间对齐。',
  },
  {
    icon: UsersRound,
    title: '关系链联想',
    desc: '关联说说、评论、共同出现的人和高频互动好友，找回照片背后的关系温度。',
    input: '帮我看看这些照片里和谁出现最多。',
    output: '识别出高频互动好友、共同出现人物和评论关系。',
    future: '关系图谱分析、共同出现识别、互动摘要生成。',
    note: '仅分析互动频率、共同出现和评论关系，不展示私聊内容。',
  },
  {
    icon: WandSparkles,
    title: '缺失记忆修复',
    desc: '从本地相册中发现可补充的旧照片，帮助你重建更完整的回忆片段。',
    input: '从本地相册里找找有没有属于高中毕业季的照片。',
    output: '检测到 8 张照片可能属于“高中毕业季”。',
    future: '图片时间地点识别、人物匹配、相似场景检索。',
  },
]

export default function Home({ onStart, onViewExample }) {
  return (
  <main className="min-h-screen overflow-hidden bg-[#030915] text-white">
      <ImmersiveHero onStart={onStart} onViewExample={onViewExample} />
      <FeatureSection />
      <ExperienceSection />
      <PrivacySection />
    </main>
  )
}

function ImmersiveHero({ onStart, onViewExample }) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-5 pb-12 pt-6 sm:px-6 lg:px-8">
      <Atmosphere />
      <FloatingNav onStart={onStart} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-104px)] max-w-6xl flex-col items-center justify-center pb-24 pt-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-white/[0.08] px-4 py-2 text-sm text-sky-100 shadow-2xl shadow-sky-500/10 backdrop-blur-2xl">
          <Sparkles size={15} className="text-sky-200" />
          腾讯生态里的 AI 记忆整理工具
        </div>

        <DisplayTitle as="h1" align="center" className="max-w-5xl text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
          让青春记忆，
          <span className="block">
            重新回到你身边
          </span>
        </DisplayTitle>

        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          从 QQ 空间旧相册、说说评论与好友互动中，AI 自动整理出可回看的个人时光档案。
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button onClick={onStart}>
            开始整理我的记忆
            <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" onClick={onViewExample}>
            <Play size={17} />
            查看示例回忆
          </Button>
        </div>

        <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {anchors.map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-slate-300 shadow-xl shadow-black/10 backdrop-blur-2xl">
              <div className="flex items-center justify-center gap-2">
                <Icon size={16} className="text-sky-200" />
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InsightFloaters />
    </section>
  )
}

function FloatingNav({ onStart }) {
  return (
    <header className="relative z-30 mx-auto flex max-w-3xl justify-center">
      <nav className="flex h-14 w-full items-center justify-between gap-4 rounded-full border border-white/[0.12] bg-slate-950/[0.45] px-3 text-sm shadow-2xl shadow-black/[0.35] backdrop-blur-2xl sm:px-4">
        <a href="#top" className="flex min-w-max items-center gap-2 rounded-full px-2 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sky-200">
            <Clock3 size={16} />
          </span>
          <span className="hidden font-semibold sm:inline">QQ 时光回廊</span>
        </a>

        <div className="hidden items-center gap-5 text-slate-300 md:flex">
          <a className="transition hover:text-white" href="#features">
            产品亮点
          </a>
          <a className="transition hover:text-white" href="#experience">
            体验流程
          </a>
          <a className="transition hover:text-white" href="#privacy">
            隐私保护
          </a>
        </div>

        <button onClick={onStart} className="inline-flex h-10 items-center rounded-full border border-white/[0.15] bg-white/[0.09] px-4 font-medium text-white transition hover:bg-white/[0.14]">
          开始体验
        </button>
      </nav>
    </header>
  )
}

function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(70,162,255,0.18),transparent_30%),radial-gradient(circle_at_50%_86%,rgba(255,176,128,0.1),transparent_23%),radial-gradient(circle_at_50%_88%,rgba(144,92,255,0.13),transparent_30%),linear-gradient(180deg,#020713_0%,#061225_45%,#030711_100%)]" />
      <div className="memory-grid absolute inset-0 opacity-40" />
      <div className="memory-noise absolute inset-0 opacity-[0.07]" />
      <div className="time-dome absolute left-1/2 top-[18%] h-[72vw] max-h-[720px] min-h-[420px] w-[132vw] max-w-[1320px] -translate-x-1/2 rounded-[50%] border border-sky-200/20" />
      <div className="time-dome-soft absolute left-1/2 top-[21%] h-[62vw] max-h-[620px] min-h-[360px] w-[116vw] max-w-[1160px] -translate-x-1/2 rounded-[50%]" />
      <div className="absolute left-1/2 top-[23%] h-[48vw] max-h-[520px] min-h-[300px] w-[100vw] max-w-[1040px] -translate-x-1/2 rounded-[50%] border border-sky-100/[0.08] shadow-[0_-24px_90px_rgba(106,183,255,0.14)]" />
      <div className="horizon-glow absolute bottom-[18%] left-1/2 h-20 w-[74vw] -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-[38vh] bg-gradient-to-t from-[#02050b] via-[#07111e]/92 to-transparent" />
      <div className="mountain-range mountain-back absolute bottom-[11%] left-1/2 h-40 w-[120vw] -translate-x-1/2 bg-[#07111d]/90" />
      <div className="mountain-range mountain-front absolute bottom-[7%] left-1/2 h-44 w-[120vw] -translate-x-1/2 bg-[#03070d]" />
      <div className="absolute bottom-[16%] left-1/2 h-px w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-200/55 to-transparent" />
      <div className="memory-figure absolute bottom-[12%] left-1/2 h-28 w-12 -translate-x-1/2" />
    </div>
  )
}

function InsightFloaters() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[16%] z-20 mx-auto hidden max-w-6xl px-6 lg:block">
      <div className="relative h-36">
        {insightLayers.map((text, index) => (
          <div
            key={text}
            className="absolute flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-slate-950/[0.35] px-4 py-3 text-sm text-slate-200 shadow-2xl shadow-black/[0.35] backdrop-blur-2xl"
            style={{
              left: index === 0 ? '2%' : index === 1 ? '68%' : '55%',
              top: index === 0 ? '10px' : index === 1 ? '34px' : '104px',
            }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-300/15 text-sky-100">
              {index === 0 ? <Sparkles size={14} /> : <CheckCircle2 size={14} />}
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState(null)

  return (
    <section id="features" className="relative border-t border-white/[0.08] bg-[#030915] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(64,148,255,0.2),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm text-sky-100 backdrop-blur-2xl">
              <ShieldCheck size={16} />
              产品亮点
            </p>
            <DisplayTitle as="h2" className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
              把散落的旧资料，重建成可回看的个人时光档案
            </DisplayTitle>
          </div>

          <div className="flex max-w-md items-start gap-3 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4 text-sm leading-6 text-slate-300 shadow-2xl shadow-black/15 backdrop-blur-2xl">
            <LockKeyhole size={18} className="mt-1 shrink-0 text-sky-200" />
            仅在授权后读取 QQ 空间、相册与互动数据，用户可随时管理导入范围。
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {featureCards.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="group rounded-[1.6rem] border border-white/[0.08] bg-white/[0.042] p-6 shadow-2xl shadow-black/18 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-sky-200/22 hover:bg-white/[0.07]">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200/18 bg-sky-200/[0.08] text-sky-100 shadow-xl shadow-sky-400/10">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-semibold tracking-normal text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{desc}</p>
              <button onClick={() => setActiveFeature(featureCards.find((item) => item.title === title))} className="mt-8 flex items-center gap-2 text-sm font-semibold text-sky-100">
                查看能力
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>
      </div>
      {activeFeature ? <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} /> : null}
    </section>
  )
}

function FeatureModal({ feature, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/[0.12] bg-slate-950/80 p-6 text-white shadow-2xl shadow-black/50 backdrop-blur-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-sky-200/20 bg-sky-200/10 px-3 py-1 text-xs font-semibold text-sky-100">
              能力详情
            </p>
            <h3 className="text-2xl font-semibold">{feature.title}</h3>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:bg-white/[0.12]" aria-label="关闭能力详情">
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-4 text-sm leading-7 text-slate-300">
          <InfoRow label="能力说明" value={feature.desc} />
          <InfoRow label="示例输入" value={feature.input} />
          <InfoRow label="示例输出" value={feature.output} />
          <InfoRow label="未来 AI 能力" value={feature.future} />
          {feature.note ? <InfoRow label="隐私边界" value={feature.note} /> : null}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-1 text-xs font-semibold text-sky-100">{label}</div>
      <div>{value}</div>
    </div>
  )
}

function ExperienceSection() {
  const steps = [
    '导入记忆来源',
    '选择整理方式',
    'AI 分析',
    '生成记忆包',
    '查看详情',
    '生成回忆页',
  ]

  return (
    <section id="experience" className="experience-flow relative overflow-hidden border-t border-white/[0.08] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(116,199,255,0.18),transparent_54%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm text-sky-100 backdrop-blur-2xl">
          <Route size={16} />
          体验流程
        </p>
        <DisplayTitle as="h2" className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
          从旧资料到回忆页，每一步都为真实 AI 接入预留
        </DisplayTitle>
        <div className="relative mt-12">
          <div className="flow-track hidden md:block" />
          <div className="grid gap-4 md:grid-cols-6">
            {[
              [ImagePlus, '导入记忆来源', '连接旧相册与说说'],
              [Route, '选择整理方式', '按阶段、关系或主题'],
              [Sparkles, 'AI 分析', '识别时间、人物与语义'],
              [Camera, '生成记忆包', '把碎片聚成档案'],
              [MessageCircle, '查看详情', '展开照片与互动上下文'],
              [WandSparkles, '生成回忆页', '形成可展示的纪念页'],
            ].map(([Icon, title, desc], index) => (
              <div key={title} className="relative rounded-[1.35rem] border border-white/[0.09] bg-slate-900/[0.38] p-4 shadow-2xl shadow-black/18 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-sky-200/25 hover:bg-white/[0.06]">
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-sky-100/45 to-transparent" />
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-100/18 bg-sky-200/[0.09] text-sm font-semibold text-sky-50 shadow-[0_0_22px_rgba(125,211,252,0.14)]">
                    {index + 1}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.055] text-sky-100">
                    <Icon size={16} />
                  </span>
                </div>
                <p className="text-sm font-semibold leading-6 text-white">{title}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PrivacySection() {
  const items = [
    '仅在用户授权范围内读取 QQ 空间、相册与互动数据',
    '本地图片仅用于浏览器本地预览，不上传服务器',
    '好友互动仅分析频率、共同出现和评论关系，不展示私聊内容',
    '用户可随时隐藏、删除或取消关联',
  ]

  return (
    <section id="privacy" className="relative overflow-hidden border-t border-white/[0.08] bg-[#020711] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(92,181,255,0.12),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(149,111,255,0.1),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm text-sky-100 backdrop-blur-2xl">
          <LockKeyhole size={16} />
          隐私保护
        </p>
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <DisplayTitle as="h2" className="text-3xl font-semibold leading-tight md:text-4xl">
            记忆可以被整理，但控制权始终在你手里
          </DisplayTitle>
          <div className="grid gap-3 rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-3 shadow-2xl shadow-black/18 backdrop-blur-2xl">
            {items.map((item, index) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.2rem] border border-white/[0.07] bg-slate-900/[0.34] p-4 text-sm leading-6 text-slate-300 shadow-xl shadow-black/10">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-200/[0.08] text-sky-100 shadow-[0_0_18px_rgba(125,211,252,0.12)]">
                  {index + 1}
                </span>
                <ShieldCheck size={17} className="mt-1 shrink-0 text-sky-200" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
