/**
 * Fixed, non-interactive film-grain layer. Adds a faint paper tooth to the
 * whole page so flat warm fills do not read as sterile. Fixed + pointer-events
 * none so it never triggers repaint on scroll.
 */
const GRAIN_SVG =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-multiply"
      style={{ backgroundImage: `url("${GRAIN_SVG}")`, backgroundSize: '140px 140px' }}
    />
  )
}
