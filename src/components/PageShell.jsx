import { ArrowLeft, Clock3 } from 'lucide-react'
import DisplayTitle from './DisplayTitle.jsx'

export default function PageShell({ title, eyebrow, children, onBack, actions }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030915] px-5 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,144,255,0.2),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(151,91,255,0.16),transparent_26%),linear-gradient(180deg,#030915_0%,#071226_48%,#02050b_100%)]" />
        <div className="memory-grid absolute inset-0 opacity-25" />
        <div className="memory-noise absolute inset-0 opacity-[0.05]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            {onBack ? (
              <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-slate-200 backdrop-blur-xl transition hover:bg-white/[0.12]" aria-label="返回">
                <ArrowLeft size={18} />
              </button>
            ) : null}
            <div className="max-w-4xl">
              <p className="mb-3 flex items-center gap-2 text-sm text-sky-100/90">
                <Clock3 size={15} />
                {eyebrow}
              </p>
              <DisplayTitle className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {title}
              </DisplayTitle>
            </div>
          </div>
          {actions}
        </header>
        {children}
      </div>
    </main>
  )
}
