import { forwardRef } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary:
    'bg-accent text-surface hover:bg-accent-strong shadow-[0_1px_2px_rgba(34,34,30,0.12)] hover:shadow-[0_10px_24px_-10px_rgba(47,111,94,0.5)]',
  secondary:
    'border border-accent/40 text-accent hover:border-accent hover:bg-accent/[0.06]',
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
        // shape rule: interactive controls are full-pill; cards, inputs and
        // images stay near-sharp (2px).
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[0.01em]',
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
