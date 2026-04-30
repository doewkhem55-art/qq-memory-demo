export default function Timeline({ events }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="relative grid gap-3 pl-7">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-sky-200 shadow-[0_0_18px_rgba(125,211,252,0.6)]" />
          <span className="absolute bottom-[-18px] left-[5px] top-5 w-px bg-white/12 last:hidden" />
          <div className="text-xs font-medium text-sky-100">{event.date}</div>
          <div>
            <h3 className="font-semibold text-white">{event.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
