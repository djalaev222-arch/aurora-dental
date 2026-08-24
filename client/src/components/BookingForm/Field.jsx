export function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink dark:text-ink-dark">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-ink-soft dark:text-ink-soft-dark">{hint}</p>
      ) : null}
      {error ? <p className="text-xs font-medium text-accent-600 dark:text-accent-400">{error}</p> : null}
    </div>
  )
}

export const inputClasses =
  'w-full rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-3 text-sm text-ink dark:text-ink-dark placeholder:text-ink-soft/60 dark:placeholder:text-ink-soft-dark/60 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-60'

export const inputErrorClasses = 'border-accent-500 focus:border-accent-500 focus:ring-accent-500/20'
