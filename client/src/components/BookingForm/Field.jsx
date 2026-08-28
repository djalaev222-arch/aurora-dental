export function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.82rem] font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="text-[0.78rem] text-ink-soft">{hint}</p> : null}
      {error ? <p className="text-[0.78rem] font-medium text-accent-strong">{error}</p> : null}
    </div>
  )
}

export const inputClasses =
  'w-full rounded-[2px] border border-line-strong bg-surface px-3.5 py-2.5 text-[0.92rem] text-ink placeholder:text-ink-soft outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60'

export const inputErrorClasses = 'border-accent focus:border-accent focus:ring-accent/25'
