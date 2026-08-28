import { motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

/**
 * Line-by-line masked reveal for editorial headlines. Each line sits in an
 * overflow-hidden track and rises into place. Motivated: it stages the
 * headline as the first thing the eye follows on load.
 *
 * @param {{ lines: import('react').ReactNode[], className?: string, as?: any, delay?: number }} props
 */
export function TextReveal({ lines, className, as: Tag = 'h1', delay = 0 }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[Tag]

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <MotionTag className={className} initial="hidden" animate="show">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={clsx('block')}
            variants={{
              hidden: { y: '112%' },
              show: {
                y: 0,
                transition: {
                  duration: 0.9,
                  delay: delay + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
