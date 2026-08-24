import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { clinic, heroAvatarPhotos, heroPhoto } from '../../data/content.js'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function Hero({ onBookClick }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90])
  const parallaxScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden bg-surface-muted dark:bg-surface-muted-dark"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,var(--color-primary-100),transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_-10%,color-mix(in_srgb,var(--color-primary-800)_35%,transparent),transparent_55%)]" />

      <div className="container-page grid min-h-[100dvh] grid-cols-1 items-center gap-10 pt-24 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-0">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.h1
            variants={item}
            className="text-balance text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            Стоматология, после которой хочется вернуться
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-base leading-relaxed text-ink-soft dark:text-ink-soft-dark sm:text-lg"
          >
            Современное оборудование, лечение без боли и прозрачные цены. Запишитесь на приём
            в удобное время.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" onClick={onBookClick}>
              Записаться на приём
              <Icon name="ArrowRight" weight="bold" className="h-4 w-4" />
            </Button>
            <Button as="a" href={clinic.phoneHref} variant="secondary" size="lg">
              <Icon name="Phone" weight="fill" className="h-4 w-4" />
              Позвонить
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-3">
              {heroAvatarPhotos.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="h-10 w-10 rounded-full border-2 border-bg dark:border-bg-dark object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-ink-soft dark:text-ink-soft-dark">
              <span className="font-semibold text-ink dark:text-ink-dark">4,9 из 5</span> по
              1200+ отзывам пациентов
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            style={{ y: parallaxY, scale: parallaxScale }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-lifted"
          >
            <img
              src={heroPhoto}
              alt="Врач консультирует пациента в клинике Аврора Дентал"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={900}
              height={1120}
            />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl border border-border dark:border-border-dark bg-surface/95 dark:bg-surface-dark/95 p-4 shadow-lifted backdrop-blur sm:-left-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-100 text-accent-600">
              <Icon name="ShieldCheck" weight="fill" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-ink-dark">Гарантия 5 лет</p>
              <p className="text-xs text-ink-soft dark:text-ink-soft-dark">на имплантацию</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
