import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { clinic, navLinks } from '../../data/content.js'

export function Header({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/85 dark:bg-bg-dark/85 shadow-soft backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-[72px]">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink dark:text-ink-dark">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white">
            <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M16 8c-2.6 0-4.6 1.1-6 2.6-.6.7-.4 1.9.5 2.2.5.2 1 .1 1.4-.3.9-.9 2.2-1.5 3.5-1.6.2 3.3.6 6.8 1.4 9.6.2.7 1.2.7 1.4 0 .5-1.8.9-4 1.1-6.2.2 2.2.6 4.4 1.1 6.2.2.7 1.2.7 1.4 0 .8-2.8 1.2-6.3 1.4-9.6 1.3.1 2.6.7 3.5 1.6.4.4.9.5 1.4.3.9-.3 1.1-1.5.5-2.2-1.4-1.5-3.4-2.6-6-2.6h-6.6z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>{clinic.name}</span>
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink-soft dark:text-ink-soft-dark">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-primary-600 dark:hover:text-primary-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={clinic.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-ink-dark"
          >
            <Icon name="Phone" weight="fill" className="h-4 w-4 text-primary-600 dark:text-primary-300" />
            {clinic.phone}
          </a>
          <Button variant="primary" size="md" onClick={onBookClick}>
            Записаться
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border dark:border-border-dark text-ink dark:text-ink-dark lg:hidden"
        >
          <Icon name={menuOpen ? 'X' : 'List'} className="h-5 w-5" weight="bold" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border dark:border-border-dark bg-bg dark:bg-bg-dark lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink dark:text-ink-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-3 px-3">
                <a href={clinic.phoneHref} className="flex items-center gap-2 text-sm font-semibold">
                  <Icon name="Phone" weight="fill" className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                  {clinic.phone}
                </a>
              </li>
              <li className="px-3 pt-3">
                <Button variant="primary" className="w-full" onClick={() => { handleNavClick(); onBookClick(); }}>
                  Записаться
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
