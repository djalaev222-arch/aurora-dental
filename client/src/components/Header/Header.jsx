import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { clinic, navLinks } from '../../data/content.js'

function Wordmark({ className }) {
  return (
    <a
      href="#top"
      className={`group flex items-baseline gap-2 ${className ?? ''}`}
      aria-label={`${clinic.name}, на главную`}
    >
      <span className="font-display text-[1.55rem] leading-none tracking-[-0.01em] text-ink">
        {clinic.wordmark}
      </span>
      <span className="eyebrow mb-px text-ink-faint">дентал</span>
    </a>
  )
}

export function Header({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 32)
  })

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-bg/85 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div
        className={`container-wide flex h-[68px] items-center justify-between transition-colors duration-500 sm:h-[76px] ${
          scrolled ? 'border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <Wordmark />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9rem] text-ink-soft">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline pb-1 transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={clinic.phoneHref}
            className="text-[0.9rem] font-semibold text-ink transition-colors hover:text-accent"
          >
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
          className="flex h-10 w-10 items-center justify-center border border-line-strong text-ink lg:hidden"
        >
          <Icon name={menuOpen ? 'X' : 'List'} className="h-5 w-5" weight="regular" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-line/70 last:border-0">
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="block py-3.5 text-[1.05rem] text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center justify-between pt-5">
                <a href={clinic.phoneHref} className="text-sm font-semibold text-ink">
                  {clinic.phone}
                </a>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    handleNavClick()
                    onBookClick()
                  }}
                >
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
