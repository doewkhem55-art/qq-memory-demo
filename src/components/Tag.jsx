export default function Tag({ children }) {
  return (
    <span className="inline-flex max-w-full rounded-full border border-sky-200/15 bg-sky-200/10 px-3 py-1 text-xs font-medium leading-5 text-sky-100">
      {children}
    </span>
  )
}
