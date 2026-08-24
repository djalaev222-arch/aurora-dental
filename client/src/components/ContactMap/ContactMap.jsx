import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { clinic } from '../../data/content.js'

const CONTACT_ROWS = [
  { icon: 'MapPin', label: 'Адрес', value: clinic.address },
  { icon: 'Clock', label: 'Будни', value: clinic.hoursWeekday },
  { icon: 'Clock', label: 'Выходные', value: clinic.hoursWeekend },
  { icon: 'Phone', label: 'Телефон', value: clinic.phone, href: clinic.phoneHref },
]

export function ContactMap() {
  return (
    <section id="contacts" className="bg-bg dark:bg-bg-dark py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <SectionHeading title="Как нас найти" description="Клиника в двух минутах ходьбы от метро, есть парковка для пациентов." />

          <dl className="mt-8 flex flex-col gap-4">
            {CONTACT_ROWS.map((row) => (
              <div key={row.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary-50 dark:bg-primary-800/40 text-primary-600 dark:text-primary-300">
                  <Icon name={row.icon} weight="duotone" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-xs text-ink-soft dark:text-ink-soft-dark">{row.label}</dt>
                  {row.href ? (
                    <dd>
                      <a href={row.href} className="text-sm font-semibold text-ink dark:text-ink-dark hover:text-primary-600 dark:hover:text-primary-300">
                        {row.value}
                      </a>
                    </dd>
                  ) : (
                    <dd className="text-sm font-semibold text-ink dark:text-ink-dark">{row.value}</dd>
                  )}
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={clinic.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <Icon name="WhatsappLogo" weight="fill" className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={clinic.telegram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#26A5E4] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <Icon name="TelegramLogo" weight="fill" className="h-4 w-4" />
              Telegram
            </a>
          </div>
        </div>

        <Reveal delay={0.1} className="h-[360px] overflow-hidden rounded-3xl border border-border dark:border-border-dark shadow-soft lg:h-full lg:min-h-[420px]">
          <iframe
            title={`Карта: ${clinic.name}, ${clinic.address}`}
            src={clinic.mapEmbedUrl}
            loading="lazy"
            className="h-full w-full grayscale-[15%]"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  )
}
