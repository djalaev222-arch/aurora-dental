import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { TextReveal } from '../ui/TextReveal.jsx'
import { hero, heroPhoto } from '../../data/content.js'

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const PERKS = [
  { icon: 'ShieldCheck', label: 'Лечение без боли', position: 'left-0 top-6 sm:-left-8', always: true },
  { icon: 'Cube', label: '3D-диагностика', position: 'right-0 top-20 sm:-right-4', always: false },
  { icon: 'Certificate', label: 'Гарантия в договоре', position: 'left-0 bottom-24 sm:-left-8', always: false },
  { icon: 'CreditCard', label: 'Рассрочка 0%', position: 'right-0 bottom-8 sm:-right-4', always: true },
]

const IMAGE_MASK =
  'radial-gradient(105% 100% at 50% 44%, #000 26%, rgba(0,0,0,0.62) 58%, transparent 88%)'

function PerkChip({ icon, label, position, always, index, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.9 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 ${position} ${always ? 'flex' : 'hidden sm:flex'} items-center gap-2 rounded-full border border-line bg-surface/90 py-2 pl-2.5 pr-4 shadow-soft backdrop-blur-md`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-tint text-accent">
        <Icon name={icon} weight="regular" className="h-4 w-4" />
      </span>
      <span className="whitespace-nowrap text-[0.8rem] font-semibold text-ink">{label}</span>
    </motion.div>
  )
}

export function Hero({ onBookClick }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40])

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden bg-bg">
      <div className="container-wide grid min-h-[100dvh] grid-cols-1 items-center gap-12 pt-24 pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <div className="max-w-xl lg:max-w-none">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="eyebrow"
          >
            {hero.eyebrow}
          </motion.p>

          <TextReveal
            as="h1"
            delay={0.28}
            className="mt-6 text-[3rem] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[4.1rem] lg:text-[5rem]"
            lines={[hero.titleLead, <em key="e">{hero.titleEmphasis}</em>]}
          />

          <motion.p
            custom={0}
            variants={fade}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-7 max-w-md text-pretty text-[1.05rem] leading-relaxed text-ink-soft"
          >
            {hero.description}
          </motion.p>

          <motion.div
            custom={1}
            variants={fade}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button variant="primary" size="lg" onClick={onBookClick}>
              {hero.primaryCta}
              <Icon name="ArrowRight" weight="bold" className="h-4 w-4" />
            </Button>
            <Button as="a" href="#before-after" variant="secondary" size="lg">
              {hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.div
            custom={2}
            variants={fade}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-12 flex items-center gap-4 border-t border-line pt-6"
          >
            <span className="font-display text-[2rem] leading-none text-ink">{hero.rating}</span>
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="Star" weight="fill" className="h-3.5 w-3.5" />
              ))}
            </span>
            <p className="max-w-[15rem] text-[0.82rem] leading-snug text-ink-soft">
              {hero.ratingLabel}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[24rem] sm:max-w-[30rem] lg:mr-0 lg:max-w-[40rem]"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[999px] bg-[radial-gradient(closest-side,var(--color-accent-tint),transparent)] opacity-70 blur-2xl"
          />

          <motion.div
            initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5]"
          >
            <motion.img
              style={{
                y: imageY,
                scale: 1.02,
                maskImage: IMAGE_MASK,
                WebkitMaskImage: IMAGE_MASK,
              }}
              src={heroPhoto}
              alt="Врач Аврора Дентал на консультации с пациентом"
              className="photo-warm h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={1000}
              height={1250}
            />
          </motion.div>

          {PERKS.map((perk, i) => (
            <PerkChip key={perk.label} {...perk} index={i} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
