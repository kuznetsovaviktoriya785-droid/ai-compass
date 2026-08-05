function CrystalSvg() {
  return (
    <svg
      width="168"
      height="214"
      viewBox="0 0 80 100"
      aria-hidden="true"
      className="relative"
    >
      <defs>
        {/* Body: luminous glass — cooler, more refractive */}
        <linearGradient
          id="heroCrystalGradient"
          x1="18%"
          y1="0%"
          x2="82%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#F0E3C0" stopOpacity="0.45" />
          <stop offset="18%" stopColor="#E6D2A2" stopOpacity="0.28" />
          <stop offset="45%" stopColor="#B09868" stopOpacity="0.32" />
          <stop offset="72%" stopColor="#2A2418" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#02060C" stopOpacity="0.62" />
        </linearGradient>

        <linearGradient
          id="heroCrystalFacetLight"
          x1="8%"
          y1="0%"
          x2="70%"
          y2="85%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="10%" stopColor="#F0E3C0" stopOpacity="0.92" />
          <stop offset="36%" stopColor="#E6D2A2" stopOpacity="0.48" />
          <stop offset="100%" stopColor="#D9BE7A" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="heroCrystalFacetDeep"
          x1="20%"
          y1="20%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#1A1610" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#020A12" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#010508" stopOpacity="0.78" />
        </linearGradient>

        <linearGradient
          id="heroCrystalFacetSide"
          x1="100%"
          y1="15%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#B09868" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#01080E" stopOpacity="0.55" />
        </linearGradient>

        <linearGradient
          id="heroCrystalEdge"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#F0E3C0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.22" />
        </linearGradient>

        <radialGradient id="heroCrystalCoreWarm" cx="44%" cy="34%" r="32%">
          <stop offset="0%" stopColor="#F0E3C0" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#F0E3C0" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#D9BE7A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#D9BE7A" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="heroCrystalCoreBlue" cx="48%" cy="36%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="10%" stopColor="#F0E3C0" stopOpacity="0.88" />
          <stop offset="30%" stopColor="#E6D2A2" stopOpacity="0.5" />
          <stop offset="58%" stopColor="#D9BE7A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6B5938" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id="heroCrystalIridescence"
          x1="10%"
          y1="20%"
          x2="90%"
          y2="80%"
        >
          <stop offset="0%" stopColor="#E6D2A2" stopOpacity="0" />
          <stop offset="35%" stopColor="#E6D2A2" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#E8D4B8" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#D9BE7A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#E6D2A2" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="heroCrystalRefraction"
          x1="28%"
          y1="18%"
          x2="72%"
          y2="82%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="24%" stopColor="#FFFFFF" stopOpacity="0.72" />
          <stop offset="38%" stopColor="#F0E3C0" stopOpacity="0.52" />
          <stop offset="54%" stopColor="#E6D2A2" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id="heroCrystalSoft" x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="0.35" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glass body */}
      <polygon
        points="40,2 60,33 49,86 40,99 30,86 20,33"
        fill="url(#heroCrystalGradient)"
        filter="url(#heroCrystalSoft)"
        opacity="0.82"
        stroke="url(#heroCrystalEdge)"
        strokeWidth="0.7"
      />

      {/* Upper bright facets — glass light, not solid paint */}
      <polygon
        points="40,2 60,33 40,52 20,33"
        fill="url(#heroCrystalFacetLight)"
        opacity="0.55"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="40,2 50,27 40,50 30,27"
        fill="#FFFFFF"
        opacity="0.22"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="40,2 54,28 41,42"
        fill="#FFFFFF"
        opacity="0.48"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="41,5 49,24 40,34"
        fill="#F0E3C0"
        opacity="0.36"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="36,18 44,22 40,36"
        fill="#FFFFFF"
        opacity="0.28"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="42,6 48,16 43,22"
        fill="#FFFFFF"
        opacity="0.58"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="39,10 43,14 41,22"
        fill="#FFFFFF"
        opacity="0.45"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Specular tip — glass catch light */}
      <polygon
        points="40,2 46,14 40,18 34,14"
        fill="#FFFFFF"
        opacity="0.72"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Side facet */}
      <polygon
        points="28,30 40,52 22,38"
        fill="url(#heroCrystalFacetSide)"
        opacity="0.58"
      />

      {/* Darker lower facets — depth / mystery, still glassy */}
      <polygon
        points="40,52 60,33 49,86 40,99"
        fill="url(#heroCrystalFacetDeep)"
        opacity="0.55"
      />
      <polygon
        points="40,52 20,33 30,86 40,99"
        fill="#01060C"
        opacity="0.28"
      />
      <polygon
        points="40,52 49,86 40,99 30,86"
        fill="#020B14"
        opacity="0.22"
      />

      {/* Mid-body glass transmission */}
      <polygon
        points="28,36 40,52 52,36 49,70 40,82 30,70"
        fill="#E6D2A2"
        opacity="0.24"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="34,42 40,48 46,42 43,62 40,70 36,62"
        fill="#E6D2A2"
        opacity="0.3"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="36,30 44,34 42,48 38,46"
        fill="#FFFFFF"
        opacity="0.2"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Iridescence wash */}
      <polygon
        points="40,2 60,33 49,86 40,99 30,86 20,33"
        fill="url(#heroCrystalIridescence)"
        opacity="1"
        style={{ mixBlendMode: 'soft-light' }}
      />

      {/* Internal light — bright center + blue emissive */}
      <ellipse
        cx="40"
        cy="36"
        rx="20"
        ry="27"
        fill="url(#heroCrystalCoreBlue)"
        style={{ mixBlendMode: 'screen' }}
      />
      <ellipse
        cx="40"
        cy="33"
        rx="9"
        ry="13"
        fill="#FFFFFF"
        opacity="0.62"
        style={{ mixBlendMode: 'screen' }}
      />
      <ellipse
        cx="40"
        cy="38"
        rx="12"
        ry="18"
        fill="url(#heroCrystalCoreWarm)"
      />

      {/* Internal reflections */}
      <polygon
        points="33,28 47,32 43,60 35,55"
        fill="url(#heroCrystalRefraction)"
        opacity="1"
      />
      <polygon
        points="38,12 46,18 42,34 36,28"
        fill="#FFFFFF"
        opacity="0.62"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="42,8 52,22 46,30 40,18"
        fill="#F0E3C0"
        opacity="0.5"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="34,40 40,44 37,58 32,52"
        fill="#E6D2A2"
        opacity="0.38"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="44,48 50,42 48,62 44,58"
        fill="#E6D2A2"
        opacity="0.28"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Glass edge caustics */}
      <polyline
        points="40,2 60,33 49,86 40,99"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.9"
        strokeWidth="0.65"
      />
      <polyline
        points="40,2 20,33 30,86 40,99"
        fill="none"
        stroke="#02060A"
        strokeOpacity="0.42"
        strokeWidth="0.35"
      />
      <polyline
        points="20,33 40,52 60,33"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.62"
        strokeWidth="0.52"
      />
      <line
        x1="40"
        y1="2"
        x2="40"
        y2="99"
        stroke="#FFFFFF"
        strokeOpacity="0.34"
        strokeWidth="0.32"
      />
      <line
        x1="40"
        y1="52"
        x2="30"
        y2="86"
        stroke="#010508"
        strokeOpacity="0.28"
        strokeWidth="0.26"
      />
      <line
        x1="40"
        y1="52"
        x2="49"
        y2="86"
        stroke="#FFFFFF"
        strokeOpacity="0.45"
        strokeWidth="0.38"
      />
    </svg>
  )
}

export default CrystalSvg
