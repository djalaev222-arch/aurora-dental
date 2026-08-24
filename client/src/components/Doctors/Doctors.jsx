import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { doctors } from '../../data/content.js'

export function Doctors() {
  const reduce = useReducedMotion()

  return (
    <section id="doctors" className="bg-bg dark:bg-bg-dark py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          title="Команда врачей, которой доверяют"
          description="Каждый специалист проходит ежегодное повышение квалификации и ведёт пациентов на всех этапах лечения."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark shadow-soft"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={doctor.photo}
                  alt={`${doctor.name}, ${doctor.role.toLowerCase()}`}
                  loading="lazy"
                  width={480}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                  {doctor.experience} лет опыта
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-ink dark:text-ink-dark">{doctor.name}</h3>
                <p className="text-sm text-ink-soft dark:text-ink-soft-dark">{doctor.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-ink-soft-dark">
                  {doctor.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
