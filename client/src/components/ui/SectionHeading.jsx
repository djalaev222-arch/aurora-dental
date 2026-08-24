import { motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}) {
  const reduce = useReducedMotion()

  return (
    <div
      className={clsx(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className={clsx(
            'mb-3 text-xs font-semibold uppercase tracking-[0.14em]',
            light ? 'text-primary-200' : 'text-primary-600 dark:text-primary-300',
          )}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          'text-balance text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1]',
          light ? 'text-white' : 'text-ink dark:text-ink-dark',
        )}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className={clsx(
            'mt-4 text-base leading-relaxed sm:text-lg',
            light ? 'text-white/75' : 'text-ink-soft dark:text-ink-soft-dark',
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}
