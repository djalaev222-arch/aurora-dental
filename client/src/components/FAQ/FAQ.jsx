import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { faq } from '../../data/content.js'

function FaqItem({ item, isOpen, onToggle }) {
  const panelId = useId()

  return (
    <div className="border-b border-border dark:border-border-dark py-2">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="text-base font-semibold text-ink dark:text-ink-dark sm:text-lg">
            {item.question}
          </span>
          <span
            className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border dark:border-border-dark transition-transform duration-300 ${
              isOpen ? 'rotate-45 bg-primary-500 border-primary-500 text-white' : 'text-ink-soft dark:text-ink-soft-dark'
            }`}
          >
            <Icon name="X" weight="bold" className="h-3.5 w-3.5" />
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-sm leading-relaxed text-ink-soft dark:text-ink-soft-dark sm:text-base">
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
    <section id="faq" className="bg-bg dark:bg-bg-dark py-20 sm:py-28">
      <div className="container-page max-w-3xl">
        <SectionHeading
          eyebrow="Вопросы"
          title="Отвечаем на частые вопросы"
          align="left"
        />

        <div className="mt-10">
          {faq.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.04}>
              <FaqItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
