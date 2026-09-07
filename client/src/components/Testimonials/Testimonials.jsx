import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Icon } from '../ui/Icon.jsx'
import { testimonials } from '../../data/content.js'

const AUTOPLAY_MS = 7000

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function Avatar({ name, photo }) {
  const [failed, setFailed] = useState(false)

  if (!photo || failed) {
    return (
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-accent text-[0.85rem] font-semibold text-surface">
        {initials(name)}
      </span>
    )
  }

  return (
    <img
      src={photo}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-12 w-12 flex-none rounded-full object-cover ring-1 ring-line-strong"
    />
  )
}

export function Testimonials() {
  const [[index, direction], setState] = useState([0, 0])
  const reduce = useReducedMotion()
  const total = testimonials.length

  const go = useCallback(
    (dir) => {
      setState(([current]) => [(current + dir + total) % total, dir])
    },
    [total],
  )

  const goTo = (target) => {
    setState(([current]) => [target, target > current ? 1 : -1])
  }

  useEffect(() => {
    if (reduce) return undefined
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [go, reduce])

  const current = testimonials[index]

  return (
    <section id="reviews" className="bg-bg-alt py-24 sm:py-32">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <p className="eyebrow">Отзывы пациентов</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-surface"
            >
              <Icon name="ArrowRight" weight="bold" className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-surface"
            >
              <Icon name="ArrowRight" weight="bold" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-10 min-h-[20rem] border-t border-line-strong pt-10">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.figure
              key={current.id}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: direction >= 0 ? -40 : 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[52rem]"
            >
              <blockquote className="font-display text-[1.6rem] leading-[1.32] text-ink sm:text-[2.05rem] sm:leading-[1.3]">
                <span className="text-accent">“</span>
                {current.quote}
                <span className="text-accent">”</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Avatar name={current.name} photo={current.photo} />
                <div>
                  <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="text-[0.95rem] font-semibold text-ink">{current.name}</span>
                    {current.date ? (
                      <span className="font-mono text-[0.72rem] text-ink-faint">{current.date}</span>
                    ) : null}
                  </p>
                  <p className="text-[0.83rem] text-ink-soft">{current.context}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Показать отзыв ${i + 1}`}
              aria-current={i === index}
              className={`h-px transition-all duration-500 ${
                i === index ? 'w-12 bg-accent' : 'w-6 bg-line-strong'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
