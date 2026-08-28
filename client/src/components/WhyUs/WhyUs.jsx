import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { principles } from '../../data/content.js'

const AUTO_MS = 6500

export function WhyUs() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const total = principles.length
  const item = principles[active]

  const advance = useCallback(() => setActive((i) => (i + 1) % total), [total])

  useEffect(() => {
    if (reduce || paused) return undefined
    const id = setInterval(advance, AUTO_MS)
    return () => clearInterval(id)
  }, [advance, reduce, paused])

  const pad = (n) => String(n + 1).padStart(2, '0')

  return (
    <section className="bg-bg py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Как мы <em>работаем</em> и почему пациенты остаются
            </>
          }
          description="Четыре правила, которые не меняются от приёма к приёму и от врача к врачу."
        />

        <div
          className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ul className="flex flex-col self-start border-t border-line">
            {principles.map((p, i) => {
              const on = i === active
              return (
                <li key={p.title} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={clsx(
                      'relative grid w-full grid-cols-[auto_1fr] items-baseline gap-4 py-5 pl-5 pr-2 text-left transition-colors',
                      on ? '' : 'hover:bg-bg-alt/40',
                    )}
                  >
                    <span
                      className={clsx(
                        'absolute left-0 top-0 h-full w-0.5 origin-top transition-transform duration-300',
                        on ? 'scale-y-100 bg-accent' : 'scale-y-0 bg-accent',
                      )}
                    />
                    <span
                      className={clsx(
                        'font-mono text-[0.78rem] tabular-nums transition-colors',
                        on ? 'text-accent' : 'text-ink-faint',
                      )}
                    >
                      {pad(i)}
                    </span>
                    <span
                      className={clsx(
                        'font-display text-[1.2rem] leading-snug transition-colors sm:text-[1.35rem]',
                        on ? 'text-ink' : 'text-ink-soft',
                      )}
                    >
                      {p.title}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="relative flex items-center overflow-hidden bg-bg-alt px-7 py-12 sm:px-14 lg:min-h-[23rem]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-3 select-none font-display text-[9rem] leading-none text-line-strong/65 sm:text-[12rem]"
            >
              {pad(active)}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-md"
              >
                <p className="font-mono text-[0.72rem] tracking-[0.1em] text-accent">
                  Принцип {pad(active)} из {pad(total - 1)}
                </p>
                <h3 className="mt-4 text-[1.55rem] leading-tight text-ink sm:text-[1.9rem]">
                  {item.title}
                </h3>
                <p className="mt-5 text-pretty text-[1rem] leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {!reduce ? (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-line">
                <motion.span
                  key={active + (paused ? '-p' : '')}
                  className="block h-full origin-left bg-accent/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: paused ? 0.3 : AUTO_MS / 1000, ease: 'linear' }}
                />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
