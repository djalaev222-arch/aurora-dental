import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { whyUs } from '../../data/content.js'

export function WhyUs() {
  const reduce = useReducedMotion()

  return (
    <section className="bg-bg dark:bg-bg-dark py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          title="Почему пациенты выбирают Аврора Дентал"
          description="Мы убрали из визита к стоматологу всё, что вызывает тревогу, и оставили только результат."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <motion.div
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 shadow-soft transition-shadow hover:shadow-lifted"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-800/40 text-primary-600 dark:text-primary-300">
                  <Icon name={card.icon} weight="duotone" className="h-6 w-6" pop />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink dark:text-ink-dark">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-ink-soft-dark">
                  {card.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
