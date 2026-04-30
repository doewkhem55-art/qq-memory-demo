import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  ImagePlus,
  LockKeyhole,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WandSparkles,
} from 'lucide-react'
import './styles/index.css'

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
    desc: '按时间、人物、地点和内容语义整理旧照片',
  },
  {
    icon: UsersRound,
    title: '关系链联想',
    desc: '关联说说、评论、共同出现的人和高频互动好友',
  },
  {
    icon: WandSparkles,
    title: '缺失记忆修复',
    desc: '从本地相册中发现可补充的旧照片，重建完整回忆',
  },
]

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030915] text-white">
      <ImmersiveHero />
      <FeatureSection />
    </main>
  )
}

function ImmersiveHero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-5 pb-12 pt-6 sm:px-6 lg:px-8">
      <Atmosphere />
      <FloatingNav />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-104px)] max-w-6xl flex-col items-center justify-center pb-24 pt-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-white/[0.08] px-4 py-2 text-sm text-sky-100 shadow-2xl shadow-sky-500/10 backdrop-blur-2xl">
          <Sparkles size={15} className="text-sky-200" />
          腾讯生态里的 AI 记忆整理工具
        </div>

        <h1 className="hero-title max-w-5xl text-5xl font-semibold leading-[1.08] tracking-normal text-white sm:text-6xl lg:text-7xl">
          让青春记忆，
          <span className="block bg-gradient-to-r from-white via-sky-100 to-violet-200 bg-clip-text text-transparent">
            重新回到你身边
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          从 QQ 空间旧相册、说说评论与好友互动中，AI 自动整理出可回看的个人时光档案。
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 shadow-2xl shadow-sky-400/20 transition hover:-translate-y-0.5 hover:bg-sky-50">
            开始整理我的记忆
            <ArrowRight size={18} />
          </button>
          <button className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 text-sm font-semibold text-slate-100 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-200/40 hover:bg-white/[0.1]">
            <Play size={17} />
            查看示例回忆
          </button>
        </div>

        <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {anchors.map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-slate-300 shadow-xl shadow-black/20 backdrop-blur-2xl">
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

function FloatingNav() {
  return (
    <header className="relative z-30 mx-auto flex max-w-3xl justify-center">
      <nav className="flex h-14 w-full items-center justify-between gap-4 rounded-full border border-white/12 bg-slate-950/45 px-3 text-sm shadow-2xl shadow-black/35 backdrop-blur-2xl sm:px-4">
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
          <a className="transition hover:text-white" href="#top">
            体验流程
          </a>
          <a className="transition hover:text-white" href="#privacy">
            隐私保护
          </a>
        </div>

        <button className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/[0.09] px-4 font-medium text-white transition hover:bg-white/[0.14]">
          开始体验
        </button>
      </nav>
    </header>
  )
}

function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(55,144,255,0.22),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(144,92,255,0.18),transparent_28%),linear-gradient(180deg,#020713_0%,#061225_45%,#030711_100%)]" />
      <div className="memory-grid absolute inset-0 opacity-40" />
      <div className="memory-noise absolute inset-0 opacity-[0.07]" />
      <div className="time-dome absolute left-1/2 top-[18%] h-[72vw] max-h-[720px] min-h-[420px] w-[132vw] max-w-[1320px] -translate-x-1/2 rounded-[50%] border border-sky-200/20" />
      <div className="time-dome-soft absolute left-1/2 top-[21%] h-[62vw] max-h-[620px] min-h-[360px] w-[116vw] max-w-[1160px] -translate-x-1/2 rounded-[50%]" />
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
            className="absolute flex items-center gap-3 rounded-2xl border border-white/12 bg-slate-950/35 px-4 py-3 text-sm text-slate-200 shadow-2xl shadow-black/35 backdrop-blur-2xl"
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
  return (
    <section id="features" className="relative border-t border-white/8 bg-[#030915] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(64,148,255,0.2),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-sky-100 backdrop-blur-2xl">
              <ShieldCheck size={16} />
              产品亮点
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-normal text-white md:text-4xl">
              把散落的旧资料，重建成可回看的个人时光档案
            </h2>
          </div>

          <div id="privacy" className="flex max-w-md items-start gap-3 rounded-3xl border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-slate-300 shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <LockKeyhole size={18} className="mt-1 shrink-0 text-sky-200" />
            仅在授权后读取 QQ 空间、相册与互动数据，用户可随时管理导入范围。
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="group rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/25 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-sky-200/25 hover:bg-white/[0.08]">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200/20 bg-sky-200/10 text-sky-100 shadow-xl shadow-sky-400/10">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-semibold tracking-normal text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{desc}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-sky-100">
                查看能力
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
