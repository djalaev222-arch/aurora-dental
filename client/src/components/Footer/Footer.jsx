import { Icon } from '../ui/Icon.jsx'
import { clinic, navLinks } from '../../data/content.js'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-ink dark:bg-bg-dark text-white/80">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-extrabold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500">
              <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="M16 8c-2.6 0-4.6 1.1-6 2.6-.6.7-.4 1.9.5 2.2.5.2 1 .1 1.4-.3.9-.9 2.2-1.5 3.5-1.6.2 3.3.6 6.8 1.4 9.6.2.7 1.2.7 1.4 0 .5-1.8.9-4 1.1-6.2.2 2.2.6 4.4 1.1 6.2.2.7 1.2.7 1.4 0 .8-2.8 1.2-6.3 1.4-9.6 1.3.1 2.6.7 3.5 1.6.4.4.9.5 1.4.3.9-.3 1.1-1.5.5-2.2-1.4-1.5-3.4-2.6-6-2.6h-6.6z"
                  fill="white"
                />
              </svg>
            </span>
            {clinic.name}
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Лицензия № ЛО-77-01-023456 от 12 марта 2015 года. Стоматологическая помощь
            взрослым и детям в Москве.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Instagram клиники"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <Icon name="InstagramLogo" weight="regular" className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube клиники"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <Icon name="YoutubeLogo" weight="regular" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Навигация по разделам">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Разделы</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Контакты</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li>{clinic.address}</li>
            <li>
              <a href={clinic.phoneHref} className="hover:text-white">
                {clinic.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${clinic.email}`} className="hover:text-white">
                {clinic.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Часы работы</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li>Пн-Пт: {clinic.hoursWeekday}</li>
            <li>Сб-Вс: {clinic.hoursWeekend}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col gap-2 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} {clinic.name}. Все права защищены.</p>
          <p>Имеются противопоказания. Необходима консультация специалиста.</p>
        </div>
      </div>
    </footer>
  )
}
