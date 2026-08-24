import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { services } from '../../data/content.js'
import { formatPrice } from '../../lib/format.js'

export function Services({ onSelectService }) {
  const reduce = useReducedMotion()

  return (
    <section id="services" className="bg-surface-muted dark:bg-surface-muted-dark py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Услуги"
          title="Полный цикл стоматологической помощи"
          description="От профилактики до сложной реабилитации — на одной площадке, с одной картой пациента."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.08}>
              <motion.article
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group flex h-full flex-col rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-7 shadow-soft transition-all hover:border-primary-300 dark:hover:border-primary-500/50 hover:shadow-lifted"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-800/40 text-primary-600 dark:text-primary-300 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  <Icon name={service.icon} weight="duotone" className="h-6 w-6" pop />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink dark:text-ink-dark">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft dark:text-ink-soft-dark">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border dark:border-border-dark pt-4">
                  <p className="text-sm text-ink-soft dark:text-ink-soft-dark">
                    от <span className="font-mono font-semibold text-ink dark:text-ink-dark">{formatPrice(service.priceFrom)}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-400"
                  >
                    Записаться
                    <Icon name="ArrowRight" weight="bold" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
