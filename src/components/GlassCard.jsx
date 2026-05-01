export default function GlassCard({ children, className = '', as: Component = 'div' }) {
  return (
    <Component className={`glass-surface ${className}`}>
      {children}
    </Component>
  )
}
