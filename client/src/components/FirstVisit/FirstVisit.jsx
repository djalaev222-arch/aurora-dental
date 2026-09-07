import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { firstVisit } from '../../data/content.js'

export function FirstVisit({ onBookClick }) {
  const { primary, urgent } = firstVisit

  return (
    <section className="bg-bg py-14 sm:py-16">
      <div className="container-page">
        <Reveal className="grid grid-cols-1 overflow-hidden border border-secondary/25 md:grid-cols-[1.35fr_1fr]">
          <div className="flex flex-col gap-4 bg-secondary/[0.12] p-8 sm:p-10">
            <span className="flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-secondary">
              <Icon name={primary.icon} weight="regular" className="h-4 w-4" />
              {primary.label}
            </span>
            <h2 className="max-w-[24rem] text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]">
              {primary.title}
            </h2>
            <p className="max-w-[30rem] text-[0.92rem] leading-relaxed text-ink-soft">
              {primary.description}
            </p>
            <div className="mt-2">
              <Button variant="primary" size="md" onClick={onBookClick}>
                {primary.cta}
                <Icon name="ArrowRight" weight="bold" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-secondary/25 bg-surface p-8 sm:p-10 md:border-l md:border-t-0">
            <span className="flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-secondary">
              <Icon name={urgent.icon} weight="regular" className="h-4 w-4" />
              {urgent.label}
            </span>
            <h3 className="text-[1.15rem] leading-tight text-ink sm:text-[1.3rem]">
              {urgent.title}
            </h3>
            <p className="text-[0.9rem] leading-relaxed text-ink-soft">{urgent.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
