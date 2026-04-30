export default function DisplayTitle({
  as: Component = 'h1',
  children,
  className = '',
  align = 'left',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <Component className={`matrix-title relative ${alignment} ${className}`} data-text={typeof children === 'string' ? children : undefined}>
      {children}
    </Component>
  )
}
