import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { animate } from 'motion'
import clsx from 'clsx'

export function Counter({ value, suffix = '', prefix = '', duration = 1.8, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!isInView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value, duration, reduce])

  return (
    <span ref={ref} className={clsx('tabular-nums', className)}>
      {prefix}
      {display.toLocaleString('ru-RU')}
      {suffix}
    </span>
  )
}
