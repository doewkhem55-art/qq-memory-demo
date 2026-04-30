export default function GlassCard({ children, className = '', as: Component = 'div' }) {
  return (
    <Component className={`border border-white/[0.085] bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-2xl ${className}`}>
      {children}
    </Component>
  )
}
