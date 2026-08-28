import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Icon } from '../ui/Icon.jsx'
import { clinic, faq } from '../../data/content.js'

function FaqItem({ item, isOpen, onToggle }) {
  const panelId = useId()

  return (
    <div className="border-b border-line">
      <h3 className="font-body tracking-normal">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-[1.15rem] leading-snug text-ink sm:text-[1.3rem]">
            {item.question}
          </span>
          <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center border border-line-strong text-ink">
            <Icon name={isOpen ? 'Minus' : 'Plus'} weight="bold" className="h-3.5 w-3.5" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[42rem] pb-7 pr-10 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-bg py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            title={
              <>
                Вопросы, которые задают <em>чаще всего</em>
              </>
            }
          />
          <p className="mt-6 text-[0.92rem] leading-relaxed text-ink-soft">
            Не нашли свой вопрос? Позвоните по{' '}
            <a href={clinic.phoneHref} className="link-underline font-semibold text-ink">
              {clinic.phone}
            </a>{' '}
            или напишите в мессенджер, администратор ответит в течение дня.
          </p>
        </div>

        <div className="border-t border-line">
          {faq.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
