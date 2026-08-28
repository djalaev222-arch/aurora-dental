import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Icon } from '../ui/Icon.jsx'
import { CompareSlider } from './CompareSlider.jsx'
import { beforeAfter } from '../../data/content.js'

export function BeforeAfter() {
  const trackRef = useRef(null)
  const reduce = useReducedMotion()

  const scrollByCard = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-card]')
    const amount = card ? card.clientWidth + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section id="before-after" className="overflow-hidden bg-bg-alt py-24 sm:py-32">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          title={
            <>
              Результаты, которые <em>видно</em> на фотографии
            </>
          }
          description="Реальные работы наших врачей. Потяните ползунок внутри фото и пролистайте примеры вбок."
        />
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Предыдущий пример"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-surface"
          >
            <Icon name="ArrowRight" weight="bold" className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Следующий пример"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-surface"
          >
            <Icon name="ArrowRight" weight="bold" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="container-page mt-12 flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:scroll-pl-10 lg:scroll-pl-14 [&::-webkit-scrollbar]:hidden"
      >
        {beforeAfter.map((pair, i) => (
          <motion.div
            key={pair.id}
            data-card
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-[80vw] flex-none snap-start sm:w-[22rem] lg:w-[25rem]"
          >
            <CompareSlider
              before={pair.before}
              after={pair.after}
              beforeAlt={`До: ${pair.title}`}
              afterAlt={`После: ${pair.title}`}
            />
            <div className="mt-4 border-t border-line pt-3">
              <h3 className="text-[1.1rem] leading-tight text-ink">{pair.title}</h3>
              <p className="mt-1.5 text-[0.83rem] leading-relaxed text-ink-soft">{pair.detail}</p>
            </div>
          </motion.div>
        ))}
        <div className="w-2 flex-none sm:hidden" aria-hidden="true" />
      </div>
    </section>
  )
}
