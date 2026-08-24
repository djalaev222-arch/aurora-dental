import { Reveal } from '../ui/Reveal.jsx'
import { Counter } from '../ui/Counter.jsx'
import { stats } from '../../data/content.js'

export function Stats() {
  return (
    <section className="border-y border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
      <div className="container-page grid grid-cols-2 gap-8 py-10 sm:py-12 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <p className="text-3xl font-extrabold text-primary-700 dark:text-primary-300 sm:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
