import { motion, useMotionValue, useTransform } from 'motion/react'
import { Icon } from '../ui/Icon.jsx'

export function CompareSlider({ before, after, beforeAlt, afterAlt }) {
  const progress = useMotionValue(50)
  const clipPath = useTransform(progress, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(progress, (v) => `${v}%`)

  const handleInput = (event) => {
    progress.set(Number(event.target.value))
  }

  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-surface-muted dark:bg-surface-muted-dark">
      <img
        src={before}
        alt={beforeAlt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <motion.img
        src={after}
        alt={afterAlt}
        loading="lazy"
        draggable={false}
        style={{ clipPath }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <motion.div
        aria-hidden="true"
        style={{ left: handleLeft }}
        className="pointer-events-none absolute top-0 h-full w-0.5 -translate-x-1/2 bg-white"
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lifted">
          <Icon name="ArrowsLeftRight" weight="bold" className="h-4 w-4 text-primary-600" />
        </span>
      </motion.div>

      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        onInput={handleInput}
        aria-label={`Сравнить фото: ${beforeAlt} и ${afterAlt}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold text-white">
        До
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold text-white">
        После
      </span>
    </div>
  )
}
