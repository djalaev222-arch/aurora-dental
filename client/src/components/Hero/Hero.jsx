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

export function Hero({ onBookClick }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 70])
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 28])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden bg-bg"
    >
      <div className="container-wide grid min-h-[100dvh] grid-cols-1 items-center gap-14 pt-24 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
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
            lines={[
              hero.titleLead,
              <em key="e">{hero.titleEmphasis}</em>,
            ]}
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
          className="relative mx-auto w-full max-w-[26rem] lg:mr-0 lg:max-w-[30rem]"
        >
          <motion.div
            style={{ y: frameY }}
            aria-hidden="true"
            className="absolute -right-4 -top-4 h-full w-full border border-accent/40 sm:-right-6 sm:-top-6"
          />
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden bg-bg-alt shadow-lifted"
          >
            <motion.img
              style={{ y: imageY, scale: 1.06 }}
              src={heroPhoto}
              alt="Врач Аврора Дентал на консультации с пациентом"
              className="photo-warm h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={1000}
              height={1250}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
