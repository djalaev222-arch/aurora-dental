import { Reveal } from '../ui/Reveal.jsx'
import { Counter } from '../ui/Counter.jsx'
import { stats } from '../../data/content.js'

export function Stats() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-wide grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:gap-x-10 lg:grid-cols-4 lg:py-16">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="lg:border-l lg:border-line lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <p className="font-display text-[2.5rem] leading-none text-ink lg:text-[3rem]">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 max-w-[13rem] text-[0.86rem] leading-snug text-ink-soft">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
