import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { testimonials } from '../../data/content.js'

const AUTOPLAY_MS = 6500

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
    <section id="reviews" className="bg-surface-muted dark:bg-surface-muted-dark py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Отзывы"
            title="Что говорят наши пациенты"
            description="Реальные истории людей, которые перестали бояться стоматолога."
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border dark:border-border-dark text-ink dark:text-ink-dark transition-colors hover:bg-surface dark:hover:bg-surface-dark"
            >
              <Icon name="ArrowRight" weight="bold" className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border dark:border-border-dark text-ink dark:text-ink-dark transition-colors hover:bg-surface dark:hover:bg-surface-dark"
            >
              <Icon name="ArrowRight" weight="bold" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Reveal delay={0.1} className="relative mt-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.article
              key={current.id}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction >= 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: direction >= 0 ? -48 : 48 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-6 py-10 text-center shadow-soft sm:px-12"
            >
              <Icon name="Quotes" weight="fill" className="h-8 w-8 text-primary-300 dark:text-primary-600" />
              <p className="text-lg leading-relaxed text-ink dark:text-ink-dark sm:text-xl">
                {current.quote}
              </p>
              <div className="flex items-center gap-1 text-accent-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    weight={i < Math.round(current.rating) ? 'fill' : 'regular'}
                    className="h-4 w-4"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={current.photo}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <p className="text-sm font-semibold text-ink dark:text-ink-dark">{current.name}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </Reveal>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Показать отзыв ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-primary-500' : 'w-2 bg-border dark:bg-border-dark'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
