import { motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

/**
 * Editorial section header. Eyebrow is optional and should be used sparingly
 * (at most once every few sections). Title renders in the display serif.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'default',
  className,
}) {
  const reduce = useReducedMotion()
  const onDeep = tone === 'deep'

  return (
    <div
      className={clsx(
        'max-w-[46rem]',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className={clsx('eyebrow mb-5', onDeep && 'text-deep-ink-soft')}
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          'text-balance text-[1.9rem] leading-[1.08] sm:text-[2.4rem] lg:text-[2.9rem]',
          onDeep ? 'text-deep-ink' : 'text-ink',
        )}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className={clsx(
            'mt-5 max-w-[40rem] text-pretty text-[1.02rem] leading-relaxed',
            onDeep ? 'text-deep-ink-soft' : 'text-ink-soft',
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}
