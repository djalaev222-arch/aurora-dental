import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { clinic } from '../../data/content.js'

export function FloatingCTA({ onBookClick }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={clinic.phoneHref}
        aria-label="Позвонить в клинику"
        className="flex h-11 w-11 flex-none items-center justify-center border border-line-strong text-accent"
      >
        <Icon name="Phone" weight="fill" className="h-4 w-4" />
      </a>
      <a
        href={clinic.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Написать в WhatsApp"
        className="flex h-11 w-11 flex-none items-center justify-center border border-line-strong text-accent"
      >
        <Icon name="WhatsappLogo" weight="fill" className="h-4 w-4" />
      </a>
      <Button variant="primary" size="md" onClick={onBookClick} className="flex-1">
        Записаться на приём
      </Button>
    </div>
  )
}
