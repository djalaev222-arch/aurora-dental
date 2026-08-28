import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Icon } from '../ui/Icon.jsx'
import { doctors } from '../../data/content.js'

export function Doctors() {
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
    <section id="doctors" className="overflow-hidden bg-bg py-24 sm:py-32">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          title={
            <>
              Врачи, которые <em>объясняют</em>, а не пугают
            </>
          }
          description="Каждый специалист ведёт пациента сам, от первого снимка до контрольного визита. Повышение квалификации проходят ежегодно."
        />
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Предыдущие врачи"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-surface"
          >
            <Icon name="ArrowRight" weight="bold" className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Следующие врачи"
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
        {doctors.map((doctor, i) => (
          <motion.article
            key={doctor.id}
            data-card
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group w-[78vw] flex-none snap-start sm:w-[20rem] lg:w-[22rem]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-bg-alt">
              <img
                src={doctor.photo}
                alt={`${doctor.name}, ${doctor.role.toLowerCase()}`}
                loading="lazy"
                width={720}
                height={900}
                className="photo-warm h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.3rem] leading-tight text-ink">{doctor.name}</h3>
                <span className="font-mono text-[0.72rem] text-ink-faint">{doctor.experience} лет</span>
              </div>
              <p className="mt-1 text-[0.85rem] text-accent">{doctor.role}</p>
              <p className="mt-3 text-pretty text-[0.9rem] leading-relaxed text-ink-soft">
                {doctor.bio}
              </p>
            </div>
          </motion.article>
        ))}
        <div className="w-2 flex-none sm:hidden" aria-hidden="true" />
      </div>
    </section>
  )
}
