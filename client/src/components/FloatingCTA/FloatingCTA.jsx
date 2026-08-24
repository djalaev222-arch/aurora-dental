import { Icon } from '../ui/Icon.jsx'
import { Button } from '../ui/Button.jsx'
import { clinic } from '../../data/content.js'

export function FloatingCTA({ onBookClick }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border dark:border-border-dark bg-bg/95 dark:bg-bg-dark/95 px-4 py-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={clinic.phoneHref}
        aria-label="Позвонить в клинику"
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-border dark:border-border-dark text-primary-600 dark:text-primary-300"
      >
        <Icon name="Phone" weight="fill" className="h-5 w-5" />
      </a>
      <a
        href={clinic.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Написать в WhatsApp"
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-border dark:border-border-dark text-[#25D366]"
      >
        <Icon name="WhatsappLogo" weight="fill" className="h-5 w-5" />
      </a>
      <Button variant="primary" size="md" onClick={onBookClick} className="flex-1">
        Записаться на приём
      </Button>
    </div>
  )
}
