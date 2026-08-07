interface CompassLogoProps {
  className?: string
  iconClassName?: string
}

export default function CompassLogo({ className = 'h-9 w-9', iconClassName = 'h-5 w-5' }: CompassLogoProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl shadow-[0_0_16px_rgba(230,210,162,0.14)] ${className}`}
      style={{
        background: 'linear-gradient(145deg, #E6D2A2 0%, #DCC38A 55%, #B8944F 100%)',
      }}
    >
      <svg
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#050914"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L13 12 L12 22 L11 12 Z" fill="#050914" stroke="none" />
        <path d="M2 12 L12 11 L22 12 L12 13 Z" fill="#050914" stroke="none" opacity="0.72" />
      </svg>
    </div>
  )
}
