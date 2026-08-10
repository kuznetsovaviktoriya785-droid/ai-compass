interface AsterButtonProps {
  open?: boolean
  onClick?: () => void
}

export default function AsterButton({ open = false, onClick }: AsterButtonProps) {
  return (
    <button
      type="button"
      className="aster-fab"
      aria-label="Aster"
      aria-expanded={open}
      aria-controls="aster-assistant-panel"
      onClick={onClick}
    >
      <svg
        className="aster-fab-emblem"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="asterFace" cx="36%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#243044" />
            <stop offset="42%" stopColor="#0c1422" />
            <stop offset="100%" stopColor="#05070f" />
          </radialGradient>
          <radialGradient id="asterStarFill" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#fff8ea" />
            <stop offset="72%" stopColor="#f0e0b8" />
            <stop offset="100%" stopColor="#dcc48a" />
          </radialGradient>
          <radialGradient id="asterCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#fff4d8" />
            <stop offset="100%" stopColor="#e6d2a2" stopOpacity="0" />
          </radialGradient>
          <filter
            id="asterStarGlow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dark glossy face */}
        <circle cx="32" cy="32" r="29.2" fill="url(#asterFace)" />

        {/* Soft glass highlight */}
        <ellipse
          cx="23"
          cy="18"
          rx="13"
          ry="7.5"
          fill="#ffffff"
          opacity="0.07"
        />

        {/* Compass rings */}
        <circle
          cx="32"
          cy="32"
          r="23.5"
          stroke="#E6D2A2"
          strokeWidth="0.55"
          opacity="0.22"
        />
        <circle
          cx="32"
          cy="32"
          r="17.5"
          stroke="#E6D2A2"
          strokeWidth="0.4"
          opacity="0.12"
        />

        {/* Cardinal markers */}
        <path d="M32 6.6 L32.7 8.6 L32 9.5 L31.3 8.6 Z" fill="#E6D2A2" opacity="0.55" />
        <path d="M32 57.4 L31.3 55.4 L32 54.5 L32.7 55.4 Z" fill="#E6D2A2" opacity="0.45" />
        <path d="M57.4 32 L55.4 32.7 L54.5 32 L55.4 31.3 Z" fill="#E6D2A2" opacity="0.45" />
        <path d="M6.6 32 L8.6 31.3 L9.5 32 L8.6 32.7 Z" fill="#E6D2A2" opacity="0.45" />

        {/* Large 4-point celestial star — slim, sharp, tapered near center */}
        <g filter="url(#asterStarGlow)">
          {/* Soft bloom behind the star */}
          <path
            d="M32 7.1 L35.1 29.2 L50.8 32 L35.1 34.8 L32 56.9 L28.9 34.8 L13.2 32 L28.9 29.2 Z"
            fill="#F6E7C8"
            opacity="0.28"
          />
          <path
            d="M32 7.5 L34.5 29.75 L49.8 32 L34.5 34.25 L32 56.5 L29.5 34.25 L14.2 32 L29.5 29.75 Z"
            fill="url(#asterStarFill)"
          />
          <circle cx="32" cy="32" r="6" fill="url(#asterCore)" />
          <circle cx="32" cy="32" r="2" fill="#ffffff" />
        </g>

        {/* Thin golden rim */}
        <circle
          cx="32"
          cy="32"
          r="29.6"
          stroke="#E6D2A2"
          strokeWidth="1.15"
          opacity="0.72"
        />
        <circle
          cx="32"
          cy="32"
          r="30.35"
          stroke="#F6E7C8"
          strokeWidth="0.55"
          opacity="0.28"
        />
      </svg>
      <span className="aster-fab-sheen" aria-hidden="true" />
    </button>
  )
}
