import { LockKeyhole } from 'lucide-react'
import GlassCard from './GlassCard.jsx'

export default function PrivacyNotice({ children }) {
  return (
    <GlassCard className="flex items-start gap-3 rounded-3xl p-4 text-sm leading-6 text-slate-300">
      <LockKeyhole size={18} className="mt-1 shrink-0 text-sky-200" />
      <p>{children}</p>
    </GlassCard>
  )
}
