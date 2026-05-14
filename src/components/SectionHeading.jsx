import clsx from 'clsx'

export function SectionHeading({ number, children, className, dark = false, ...props }) {
  return (
    <h2
      className={clsx(
        className,
        'inline-flex items-center rounded-full px-4 py-1 ring-1 ring-inset',
        dark
          ? 'text-[#ffd8cd] ring-white/25'
          : 'text-[#8f2f62] ring-[#8f2f62]/35',
      )}
      {...props}
    >
      <span className="font-mono text-sm" aria-hidden="true">
        {number.padStart(2, '0')}
      </span>
      <span
        className={clsx(
          'ml-3 h-3.5 w-px',
          dark ? 'bg-white/20' : 'bg-[#8f2f62]/20',
        )}
      />
      <span className="ml-3 text-base font-medium tracking-tight">
        {children}
      </span>
    </h2>
  )
}
