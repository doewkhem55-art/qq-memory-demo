/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'from-sky-300/70',
    'via-blue-500/50',
    'to-violet-700/70',
    'from-cyan-300/60',
    'via-slate-500/40',
    'to-indigo-700/70',
    'from-emerald-300/60',
    'via-cyan-600/40',
    'to-slate-800/80',
    'from-amber-200/60',
    'via-rose-400/40',
    'to-slate-800/70',
    'from-teal-200/60',
    'via-sky-500/40',
    'to-blue-900/80',
    'from-violet-300/60',
    'via-fuchsia-500/40',
    'to-slate-900/80',
    'from-violet-300/50',
    'to-sky-700/70',
    'from-sky-200/60',
    'to-blue-800/70',
  ],
  theme: {
    extend: {
      colors: {
        qq: {
          blue: '#12b7f5',
          deep: '#102a43',
          ink: '#162233',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
