import { Reveal } from '../ui/Reveal.jsx'
import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { clinic } from '../../data/content.js'

const CONTACT_ROWS = [
  { label: 'Адрес', value: clinic.address },
  { label: 'Как добраться', value: clinic.metro },
  { label: 'Будни', value: clinic.hoursWeekday },
  { label: 'Суббота и воскресенье', value: clinic.hoursWeekend },
  { label: 'Телефон', value: clinic.phone, href: clinic.phoneHref },
]

export function ContactMap() {
  return (
    <section id="contacts" className="bg-bg py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            title={
              <>
                Клиника в центре, <em>рядом с метро</em>
              </>
            }
            description="Отдельный вход с улицы, парковка для пациентов на время приёма."
          />

          <dl className="mt-10 border-t border-line-strong">
            {CONTACT_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
              >
                <dt className="text-[0.85rem] text-ink-faint">{row.label}</dt>
                {row.href ? (
                  <dd>
                    <a href={row.href} className="link-underline text-[0.95rem] font-semibold text-ink">
                      {row.value}
                    </a>
                  </dd>
                ) : (
                  <dd className="text-[0.95rem] font-medium text-ink">{row.value}</dd>
                )}
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href={clinic.whatsapp} target="_blank" rel="noreferrer" variant="secondary" size="md">
              <Icon name="WhatsappLogo" weight="fill" className="h-4 w-4 text-accent" />
              WhatsApp
            </Button>
            <Button as="a" href={clinic.telegram} target="_blank" rel="noreferrer" variant="secondary" size="md">
              <Icon name="TelegramLogo" weight="fill" className="h-4 w-4 text-accent" />
              Telegram
            </Button>
          </div>
        </div>

        <Reveal delay={0.1} className="h-[340px] overflow-hidden border border-line-strong lg:h-full lg:min-h-[440px]">
          <iframe
            title={`Карта: ${clinic.name}, ${clinic.address}`}
            src={clinic.mapEmbedUrl}
            loading="lazy"
            className="h-full w-full grayscale-[35%] contrast-[1.05]"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  )
}
