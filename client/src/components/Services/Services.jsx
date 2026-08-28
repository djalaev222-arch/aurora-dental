import { motion } from 'motion/react'
import clsx from 'clsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { services, clinicInteriorPhoto, smilePhoto } from '../../data/content.js'
import { formatPrice } from '../../lib/format.js'

const FEATURE_IMAGES = {
  aesthetics: smilePhoto,
  implants: clinicInteriorPhoto,
}

const SPAN = {
  aesthetics: 'lg:col-span-7',
  implants: 'lg:col-span-5',
  orthodontics: 'lg:col-span-4',
  therapy: 'lg:col-span-4',
  children: 'lg:col-span-4',
  surgery: 'lg:col-span-12',
}

function FeatureCard({ service, onSelectService }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden bg-ink text-surface"
    >
      <img
        src={FEATURE_IMAGES[service.id]}
        alt=""
        loading="lazy"
        className="photo-warm absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/40 to-ink/5" />
      <div className="relative p-7 sm:p-9">
        <h3 className="max-w-[20rem] text-[1.7rem] leading-tight text-surface">{service.title}</h3>
        <p className="mt-3 max-w-[26rem] text-[0.95rem] leading-relaxed text-surface/80">
          {service.description}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-surface/20 pt-4">
          <p className="font-mono text-[0.85rem] text-surface/85">от {formatPrice(service.priceFrom)}</p>
          <button
            type="button"
            onClick={() => onSelectService(service.id)}
            className="flex items-center gap-1.5 text-[0.9rem] font-semibold text-surface"
          >
            Записаться
            <Icon name="ArrowUpRight" weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

function PlainCard({ service, onSelectService, wide }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'group h-full border border-line p-7 transition-colors',
        wide
          ? 'flex flex-col gap-6 bg-accent-tint/50 hover:border-accent/50 lg:flex-row lg:items-center lg:gap-12'
          : 'flex flex-col bg-surface hover:border-line-strong',
      )}
    >
      <div className={clsx(wide && 'lg:w-[30%] lg:flex-none')}>
        <Icon name={service.icon} weight="regular" className="h-7 w-7 text-accent" pop />
        <h3 className="mt-6 text-[1.3rem] leading-tight text-ink">{service.title}</h3>
      </div>
      <p
        className={clsx(
          'text-pretty text-[0.92rem] leading-relaxed text-ink-soft',
          wide ? 'lg:flex-1' : 'mt-2 flex-1',
        )}
      >
        {service.description}
      </p>
      <div
        className={clsx(
          'flex items-center justify-between',
          wide
            ? 'border-t border-line pt-4 lg:w-[24%] lg:flex-none lg:flex-col lg:items-start lg:gap-3 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8'
            : 'mt-6 border-t border-line pt-4',
        )}
      >
        <p className="font-mono text-[0.82rem] text-ink-soft">от {formatPrice(service.priceFrom)}</p>
        <button
          type="button"
          onClick={() => onSelectService(service.id)}
          className="flex items-center gap-1.5 text-[0.88rem] font-semibold text-accent"
        >
          Записаться
          <Icon name="ArrowUpRight" weight="bold" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.article>
  )
}

export function Services({ onSelectService }) {
  return (
    <section id="services" className="bg-bg-alt py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Услуги"
          title={
            <>
              Полный цикл лечения <em>под одной крышей</em>
            </>
          }
          description="От гигиены и лечения кариеса до имплантации и дизайна улыбки. Одна карта пациента, один врач, который ведёт вас от начала до конца."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={(i % 3) * 0.06}
              className={clsx('min-w-0', SPAN[service.id], service.id === 'surgery' && 'sm:col-span-2')}
            >
              {service.featured ? (
                <FeatureCard service={service} onSelectService={onSelectService} />
              ) : (
                <PlainCard
                  service={service}
                  onSelectService={onSelectService}
                  wide={service.id === 'surgery'}
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
