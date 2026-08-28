import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { clinicInteriorPhoto, philosophy } from '../../data/content.js'

export function Technology() {
  return (
    <section className="bg-deep py-24 text-deep-ink sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={philosophy.eyebrow}
            title={philosophy.title}
            description={philosophy.description}
            tone="deep"
          />

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {philosophy.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.07} className="border-t border-deep-line pt-5">
                <Icon name={point.icon} weight="regular" className="h-6 w-6 text-accent" pop />
                <h3 className="mt-4 font-body text-[1.05rem] font-semibold tracking-normal text-deep-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-deep-ink-soft">
                  {point.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-deep-soft lg:ml-auto lg:max-w-[26rem]">
            <img
              src={clinicInteriorPhoto}
              alt="Операционная и оборудование клиники Аврора Дентал"
              loading="lazy"
              width={1100}
              height={1300}
              className="h-full w-full object-cover opacity-95"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
