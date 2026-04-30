export default function ProgressBar({ value, completed = false }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full bg-gradient-to-r from-sky-200 via-cyan-300 to-violet-300 ${completed ? '' : 'transition-all duration-500'}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
