import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { CompareSlider } from './CompareSlider.jsx'
import { beforeAfter } from '../../data/content.js'

export function BeforeAfter() {
  return (
    <section id="before-after" className="bg-bg dark:bg-bg-dark py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          title="Результаты, а не обещания"
          description="Потяните за ползунок, чтобы увидеть разницу до и после лечения."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {beforeAfter.map((pair, i) => (
            <Reveal key={pair.id} delay={i * 0.1}>
              <CompareSlider
                before={pair.before}
                after={pair.after}
                beforeAlt={`До: ${pair.title}`}
                afterAlt={`После: ${pair.title}`}
              />
              <p className="mt-3 text-sm font-semibold text-ink dark:text-ink-dark">{pair.title}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
