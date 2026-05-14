import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-md py-1 px-4 text-base font-semibold tracking-tight shadow-sm',
  outline:
    'inline-flex justify-center rounded-md border py-[calc(--spacing(1)-1px)] px-[calc(--spacing(4)-1px)] text-base font-semibold tracking-tight',
}

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-slate-900',
    blue: 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-blue-600',
    berry:
      'bg-[#8f2f62] text-white hover:bg-[#773052] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f2f62] active:bg-[#642745] active:text-white/80 disabled:opacity-30 disabled:hover:bg-[#8f2f62]',
    coral:
      'bg-[#f6754f] text-[#21181d] hover:bg-[#ee6841] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6754f] active:bg-[#dd5832] active:text-[#21181d]/80 disabled:opacity-30 disabled:hover:bg-[#f6754f]',
    white:
      'bg-white text-blue-600 hover:text-blue-700 focus-visible:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-blue-50 active:text-blue-900/80 disabled:opacity-40 disabled:hover:text-blue-600',
  },
  outline: {
    slate:
      'border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 active:border-slate-200 active:bg-slate-50 active:text-slate-900/70 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent',
    blue: 'border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:text-blue-600/70 disabled:opacity-40 disabled:hover:border-blue-300 disabled:hover:bg-transparent',
    berry:
      'border-[#8f2f62]/30 text-[#8f2f62] hover:border-[#8f2f62]/50 hover:bg-[#fff8f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f2f62] active:text-[#8f2f62]/70 disabled:opacity-40 disabled:hover:border-[#8f2f62]/30 disabled:hover:bg-transparent',
    coral:
      'border-[#f6754f]/40 text-[#21181d] hover:border-[#f6754f]/70 hover:bg-[#fff8f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6754f] active:text-[#21181d]/70 disabled:opacity-40 disabled:hover:border-[#f6754f]/40 disabled:hover:bg-transparent',
  },
}

export function Button({ className, ...props }) {
  props.variant ??= 'solid'
  props.color ??= 'slate'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
