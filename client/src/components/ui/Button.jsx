import { forwardRef } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary:
    'bg-[linear-gradient(135deg,var(--color-accent-400),var(--color-accent-500)_55%,var(--color-accent-600))] text-white shadow-soft hover:shadow-lifted hover:brightness-[1.06] focus-visible:outline-accent-600',
  secondary:
    'bg-transparent text-primary-700 dark:text-primary-300 border border-primary-500/40 hover:bg-primary-50 dark:hover:bg-primary-800/30',
  ghost: 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm',
}

const SIZES = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}

export const Button = forwardRef(function Button(
  { as: Tag = 'button', variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-out',
        'active:scale-[0.97] active:translate-y-px',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
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
