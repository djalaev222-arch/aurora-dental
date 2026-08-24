import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Button } from '../ui/Button.jsx'
import { pricing } from '../../data/content.js'
import { formatPrice } from '../../lib/format.js'

export function Pricing({ onBookClick }) {
  const [active, setActive] = useState(0)
  const category = pricing[active]

  return (
    <section id="pricing" className="bg-surface-muted dark:bg-surface-muted-dark py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Цены"
          title="Прозрачное ценообразование без скрытых доплат"
          description="Итоговую стоимость подтверждаем на диагностике и фиксируем в договоре до начала лечения."
        />

        <Reveal delay={0.1} className="mt-10">
          <div
            role="tablist"
            aria-label="Категории цен"
            className="flex flex-wrap gap-2 rounded-full border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-1.5 w-fit"
          >
            {pricing.map((cat, i) => (
              <button
                key={cat.category}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  active === i
                    ? 'bg-primary-500 text-white'
                    : 'text-ink-soft dark:text-ink-soft-dark hover:text-ink dark:hover:text-ink-dark',
                )}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 max-w-2xl overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="divide-y divide-border dark:divide-border-dark"
            >
              {category.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4 px-6 py-4">
                  <p className="text-sm font-medium text-ink dark:text-ink-dark sm:text-base">{item.name}</p>
                  <p className="whitespace-nowrap font-mono text-sm font-semibold text-primary-700 dark:text-primary-300 sm:text-base">
                    от {formatPrice(item.price)}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between gap-4 bg-primary-50 dark:bg-primary-800/30 px-6 py-4">
            <p className="text-sm text-ink-soft dark:text-ink-soft-dark">Точная цена — после диагностики</p>
            <Button variant="primary" size="md" onClick={onBookClick}>
              Записаться на приём
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
