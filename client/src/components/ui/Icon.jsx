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
  ArrowUpRight,
  Plus,
  Minus,
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
  ArrowUpRight,
  Plus,
  Minus,
  List,
  X,
  CaretDown,
  Clock,
  ArrowsLeftRight,
  InstagramLogo,
  YoutubeLogo,
}

const MOTION_REGISTRY = Object.fromEntries(
  Object.entries(REGISTRY).map(([key, Component]) => [key, motion.create(Component)]),
)

// Restrained motion to match the editorial tone: a small settle, no spin.
const HOVER = { scale: 1.08, transition: { type: 'spring', stiffness: 320, damping: 18 } }
const TAP = { scale: 0.92, transition: { type: 'spring', stiffness: 460, damping: 24 } }
const POP_HIDDEN = { scale: 0.72, opacity: 0 }
const POP_SHOWN = { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 20 } }

/**
 * Animated SVG icon. Hover/tap give a subtle settle on interactive elements.
 * Pass `pop` to spring the icon in on scroll for feature-grid focal points.
 */
export function Icon({ name, weight = 'regular', className, pop = false, ...rest }) {
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
