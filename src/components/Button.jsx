export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary:
      'border border-sky-100/30 bg-gradient-to-r from-white via-sky-50 to-violet-100 text-slate-950 shadow-sky-400/25 hover:shadow-sky-300/35',
    secondary:
      'border border-white/[0.14] bg-white/[0.075] text-slate-100 shadow-black/20 backdrop-blur-xl hover:border-sky-200/[0.35] hover:bg-white/[0.12]',
    outline:
      'border border-sky-200/[0.28] bg-sky-200/[0.045] text-sky-50 shadow-black/15 backdrop-blur-xl hover:bg-sky-200/[0.1]',
  }[variant] || ''

  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold shadow-2xl transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
