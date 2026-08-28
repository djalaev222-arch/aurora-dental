import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { principles } from '../../data/content.js'

export function WhyUs() {
  const reduce = useReducedMotion()

  return (
    <section className="bg-bg py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            title={
              <>
                Как мы <em>работаем</em> и почему пациенты остаются
              </>
            }
            description="Четыре правила, которые не меняются от приёма к приёму и от врача к врачу."
          />
        </div>

        <ol className="border-t border-line">
          {principles.map((item, i) => (
            <motion.li
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-line py-8 sm:gap-x-10 sm:py-10"
            >
              <span className="font-display text-[1.4rem] leading-none text-ink-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[1.35rem] leading-tight text-ink sm:text-[1.55rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[38rem] text-pretty text-[0.98rem] leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
