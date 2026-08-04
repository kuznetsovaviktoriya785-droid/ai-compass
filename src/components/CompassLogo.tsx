interface CompassLogoProps {
  className?: string
  iconClassName?: string
}

export default function CompassLogo({ className = 'h-9 w-9', iconClassName = 'h-5 w-5' }: CompassLogoProps) {
  return (
    <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-sky shadow-glow-sm ${className}`}>
      <svg
        className={`text-white ${iconClassName}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L13 12 L12 22 L11 12 Z" fill="currentColor" stroke="none" />
        <path d="M2 12 L12 11 L22 12 L12 13 Z" fill="currentColor" stroke="none" opacity="0.7" />
      </svg>
    </div>
  )
}
