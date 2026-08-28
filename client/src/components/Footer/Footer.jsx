import { Icon } from '../ui/Icon.jsx'
import { clinic, navLinks } from '../../data/content.js'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-deep text-deep-ink-soft">
      <div className="container-page grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-[1.7rem] leading-none text-deep-ink">{clinic.wordmark}</span>
            <span className="eyebrow text-deep-ink-soft">дентал</span>
          </p>
          <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed text-deep-ink-soft">
            Лицензия № ЛО-77-01-023456 от 12 марта 2015 года. Стоматологическая помощь взрослым
            и детям в центре Москвы.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Instagram клиники"
              className="flex h-10 w-10 items-center justify-center border border-deep-line text-deep-ink-soft transition-colors hover:border-deep-ink hover:text-deep-ink"
            >
              <Icon name="InstagramLogo" weight="regular" className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube клиники"
              className="flex h-10 w-10 items-center justify-center border border-deep-line text-deep-ink-soft transition-colors hover:border-deep-ink hover:text-deep-ink"
            >
              <Icon name="YoutubeLogo" weight="regular" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Навигация по разделам">
          <p className="text-[0.8rem] font-semibold text-deep-ink">Разделы</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-deep-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[0.8rem] font-semibold text-deep-ink">Контакты</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
            <li>{clinic.address}</li>
            <li>
              <a href={clinic.phoneHref} className="hover:text-deep-ink">
                {clinic.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${clinic.email}`} className="hover:text-deep-ink">
                {clinic.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[0.8rem] font-semibold text-deep-ink">Часы работы</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
            <li>Пн-Пт: {clinic.hoursWeekday}</li>
            <li>Сб-Вс: {clinic.hoursWeekend}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-deep-line py-6">
        <div className="container-page flex flex-col gap-2 text-[0.78rem] text-deep-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {clinic.name}. Все права защищены.
          </p>
          <p>Имеются противопоказания. Необходима консультация специалиста.</p>
        </div>
      </div>
    </footer>
  )
}
