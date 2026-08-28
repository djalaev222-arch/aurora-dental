import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Button } from '../ui/Button.jsx'
import { pricing } from '../../data/content.js'
import { formatPrice } from '../../lib/format.js'

export function Pricing({ onBookClick }) {
  const [active, setActive] = useState(0)
  const category = pricing[active]

  return (
    <section id="pricing" className="bg-bg py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            title={
              <>
                Цены, которые <em>не меняются</em> после подписания
              </>
            }
            description="Ниже ориентир по частым процедурам. Точную смету врач составит после диагностики и зафиксирует в договоре."
          />
          <p className="mt-8 border-l-2 border-accent pl-4 text-[0.9rem] leading-relaxed text-ink-soft">
            Первичная консультация с планом лечения бесплатна, если вы записываетесь на лечение.
          </p>
        </div>

        <div>
          <div role="tablist" aria-label="Категории цен" className="flex flex-wrap gap-x-7 gap-y-2 border-b border-line">
            {pricing.map((cat, i) => (
              <button
                key={cat.category}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={clsx(
                  'relative -mb-px border-b-2 pb-3 text-[0.95rem] transition-colors',
                  active === i
                    ? 'border-accent font-semibold text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink',
                )}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={category.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2"
            >
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-5"
                >
                  <div className="min-w-0">
                    <p className="text-[1rem] text-ink">{item.name}</p>
                    {item.note ? (
                      <p className="mt-0.5 text-[0.8rem] text-ink-faint">{item.note}</p>
                    ) : null}
                  </div>
                  <p className="whitespace-nowrap font-mono text-[0.95rem] font-medium text-ink">
                    {item.price === 0 ? '0 ₽' : `от ${formatPrice(item.price)}`}
                  </p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.88rem] text-ink-soft">Полный прайс отправим в мессенджер по запросу.</p>
            <Button variant="primary" size="md" onClick={onBookClick}>
              Записаться на диагностику
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
