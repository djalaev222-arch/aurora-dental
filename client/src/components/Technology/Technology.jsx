import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { clinicInteriorPhoto, technologies } from '../../data/content.js'

export function Technology() {
  return (
    <section className="relative overflow-hidden bg-primary-800 py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,color-mix(in_srgb,var(--color-primary-500)_45%,transparent),transparent_60%)]" />

      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            title="Технологии, которые снижают тревогу перед приёмом"
            description="Диагностика и лечение проходят на оборудовании, которое сокращает время в кресле и делает процедуры предсказуемыми."
            light
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {technologies.map((tech, i) => (
              <Reveal key={tech.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-primary-100">
                    <Icon name={tech.icon} weight="duotone" className="h-5 w-5" pop />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">{tech.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{tech.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-lifted lg:ml-auto lg:max-w-none">
            <img
              src={clinicInteriorPhoto}
              alt="Кабинет клиники Аврора Дентал с современным оборудованием"
              loading="lazy"
              width={900}
              height={1120}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
