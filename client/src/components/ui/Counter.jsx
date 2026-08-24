import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { animate } from 'motion'

export function Counter({ value, suffix = '', duration = 1.6 }) {
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
    <span ref={ref} className="font-mono tabular-nums">
      {display.toLocaleString('ru-RU')}
      {suffix}
    </span>
  )
}
