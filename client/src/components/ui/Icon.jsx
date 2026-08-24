import { motion, useReducedMotion } from 'motion/react'
import {
  FirstAidKit,
  Anchor,
  Smiley,
  Sparkle,
  Baby,
  Syringe,
  Scan,
  ShieldCheck,
  Certificate,
  CreditCard,
  Cube,
  Lightning,
  Drop,
  Aperture,
  MapPin,
  Phone,
  WhatsappLogo,
  TelegramLogo,
  Star,
  Quotes,
  CalendarBlank,
  UserCircle,
  CheckCircle,
  ArrowRight,
  List,
  X,
  CaretDown,
  Clock,
  ArrowsLeftRight,
  InstagramLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'

const REGISTRY = {
  FirstAidKit,
  Anchor,
  Smiley,
  Sparkle,
  Baby,
  Syringe,
  Scan,
  ShieldCheck,
  Certificate,
  CreditCard,
  Cube,
  Lightning,
  Drop,
  Aperture,
  MapPin,
  Phone,
  WhatsappLogo,
  TelegramLogo,
  Star,
  Quotes,
  CalendarBlank,
  UserCircle,
  CheckCircle,
  ArrowRight,
  List,
  X,
  CaretDown,
  Clock,
  ArrowsLeftRight,
  InstagramLogo,
  YoutubeLogo,
}

// Wrapped once at module scope so every <Icon> reuses the same motion-enhanced
// component instead of re-wrapping (and remounting) on every render.
const MOTION_REGISTRY = Object.fromEntries(
  Object.entries(REGISTRY).map(([key, Component]) => [key, motion.create(Component)]),
)

const HOVER = { scale: 1.16, rotate: 6, transition: { type: 'spring', stiffness: 420, damping: 14 } }
const TAP = { scale: 0.86, rotate: -3, transition: { type: 'spring', stiffness: 500, damping: 22 } }
const POP_HIDDEN = { scale: 0.4, opacity: 0, rotate: -14 }
const POP_SHOWN = { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 16 } }

/**
 * Animated SVG icon. Hover/tap always spring the glyph a little (motivated
 * feedback on interactive rows/buttons). Pass `pop` to also spring the icon
 * in on scroll, for feature-grid icons that are the visual focal point.
 */
export function Icon({ name, weight = 'duotone', className, pop = false, ...rest }) {
  const reduce = useReducedMotion()
  const StaticComponent = REGISTRY[name] ?? CheckCircle

  if (reduce) {
    return <StaticComponent className={className} weight={weight} {...rest} />
  }

  const MotionComponent = MOTION_REGISTRY[name] ?? MOTION_REGISTRY.CheckCircle

  return (
    <MotionComponent
      className={className}
      weight={weight}
      initial={pop ? POP_HIDDEN : false}
      whileInView={pop ? POP_SHOWN : undefined}
      viewport={pop ? { once: true, amount: 0.6 } : undefined}
      whileHover={HOVER}
      whileTap={TAP}
      {...rest}
    />
  )
}
