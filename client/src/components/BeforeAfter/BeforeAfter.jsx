import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { CompareSlider } from './CompareSlider.jsx'
import { beforeAfter } from '../../data/content.js'

export function BeforeAfter() {
  const [featured, ...rest] = beforeAfter

  return (
    <section id="before-after" className="bg-bg-alt py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              Результаты, которые <em>видно</em> на фотографии
            </>
          }
          description="Реальные работы наших врачей. Потяните ползунок, чтобы сравнить состояние до и после лечения."
        />

        <Reveal className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-12">
          <CompareSlider
            before={featured.before}
            after={featured.after}
            beforeAlt={`До: ${featured.title}`}
            afterAlt={`После: ${featured.title}`}
          />
          <div className="border-t border-line-strong pt-5">
            <h3 className="text-[1.6rem] leading-tight text-ink">{featured.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{featured.detail}</p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {rest.map((pair, i) => (
            <Reveal key={pair.id} delay={i * 0.08}>
              <CompareSlider
                before={pair.before}
                after={pair.after}
                beforeAlt={`До: ${pair.title}`}
                afterAlt={`После: ${pair.title}`}
              />
              <div className="mt-4 border-t border-line pt-3">
                <h3 className="text-[1.15rem] leading-tight text-ink">{pair.title}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">{pair.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
