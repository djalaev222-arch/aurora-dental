import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { sterilityPhoto, sterility } from '../../data/content.js'

export function Sterility() {
  return (
    <section id="sterility" className="bg-bg py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-bg-alt lg:max-w-[24rem]">
            <img
              src={sterilityPhoto}
              alt="Стерильные инструменты клиники Аврора Дентал"
              loading="lazy"
              width={1000}
              height={1250}
              className="photo-warm h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={sterility.eyebrow}
            title={sterility.title}
            description={sterility.description}
          />

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {sterility.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06} className="border-t border-line pt-5">
                <Icon name={point.icon} weight="regular" className="h-6 w-6 text-accent" pop />
                <h3 className="mt-4 font-body text-[1.05rem] font-semibold tracking-normal text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                  {point.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
