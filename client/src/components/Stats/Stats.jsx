import { Reveal } from '../ui/Reveal.jsx'
import { Counter } from '../ui/Counter.jsx'
import { stats } from '../../data/content.js'

export function Stats() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-wide grid grid-cols-2 gap-x-6 gap-y-9 py-10 sm:gap-x-10 lg:grid-cols-4 lg:py-11">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="lg:border-l lg:border-line lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <p className="font-display text-[1.9rem] leading-none text-ink lg:text-[2.15rem]">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 max-w-[13rem] text-[0.8rem] leading-snug text-ink-soft">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
