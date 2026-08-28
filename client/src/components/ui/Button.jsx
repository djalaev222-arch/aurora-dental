import { forwardRef } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary:
    'bg-accent text-surface hover:bg-accent-strong shadow-[0_1px_2px_rgba(30,42,41,0.12)] hover:shadow-[0_10px_24px_-10px_rgba(157,65,39,0.55)]',
  secondary:
    'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.04]',
  ghost:
    'border border-deep-ink/30 text-deep-ink hover:bg-deep-ink/10',
}

const SIZES = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

export const Button = forwardRef(function Button(
  { as: Tag = 'button', variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-semibold tracking-[0.01em]',
        'transition-[background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'active:translate-y-px',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
})
