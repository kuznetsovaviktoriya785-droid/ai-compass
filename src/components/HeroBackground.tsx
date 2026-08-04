type Particle = {
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

const particles: Particle[] = [
  { x: 6, y: 14, size: 1, delay: 0.2, duration: 4.2, opacity: 0.12 },
  { x: 12, y: 38, size: 1.5, delay: 1.1, duration: 5.1, opacity: 0.16 },
  { x: 18, y: 22, size: 1, delay: 0.7, duration: 4.6, opacity: 0.11 },
  { x: 23, y: 64, size: 1, delay: 1.8, duration: 5.4, opacity: 0.14 },
  { x: 29, y: 9, size: 1.5, delay: 0.4, duration: 4.3, opacity: 0.18 },
  { x: 34, y: 51, size: 1, delay: 1.4, duration: 4.9, opacity: 0.13 },
  { x: 39, y: 31, size: 1, delay: 0.9, duration: 4.5, opacity: 0.15 },
  { x: 44, y: 78, size: 1.5, delay: 2.2, duration: 5.6, opacity: 0.1 },
  { x: 49, y: 17, size: 1, delay: 0.3, duration: 4.7, opacity: 0.17 },
  { x: 53, y: 56, size: 1, delay: 1.6, duration: 5.2, opacity: 0.12 },
  { x: 58, y: 41, size: 1.5, delay: 0.8, duration: 4.4, opacity: 0.19 },
  { x: 63, y: 71, size: 1, delay: 1.9, duration: 5.3, opacity: 0.14 },
  { x: 68, y: 12, size: 1, delay: 0.5, duration: 4.8, opacity: 0.11 },
  { x: 72, y: 47, size: 1.5, delay: 1.3, duration: 4.6, opacity: 0.16 },
  { x: 76, y: 83, size: 1, delay: 2.1, duration: 5.5, opacity: 0.13 },
  { x: 80, y: 26, size: 1, delay: 0.6, duration: 4.4, opacity: 0.18 },
  { x: 84, y: 59, size: 1.5, delay: 1.7, duration: 5.1, opacity: 0.12 },
  { x: 88, y: 35, size: 1, delay: 1.0, duration: 4.7, opacity: 0.15 },
  { x: 91, y: 8, size: 1, delay: 0.1, duration: 5.0, opacity: 0.1 },
  { x: 94, y: 68, size: 1.5, delay: 2.0, duration: 5.4, opacity: 0.17 },
  { x: 8, y: 88, size: 1, delay: 1.5, duration: 4.9, opacity: 0.14 },
  { x: 41, y: 4, size: 1, delay: 0.85, duration: 4.5, opacity: 0.11 },
  { x: 55, y: 92, size: 1, delay: 1.25, duration: 5.2, opacity: 0.16 },
  { x: 97, y: 48, size: 1, delay: 0.55, duration: 4.8, opacity: 0.13 },
  { x: 21, y: 45, size: 1.5, delay: 1.85, duration: 5.0, opacity: 0.19 },
]

export default function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ backgroundColor: '#07090D' }}
    >
      {particles.map((particle, index) => (
        <span
          key={`${particle.x}-${particle.y}-${index}`}
          className="hero-star absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: '#E8C56A',
            opacity: particle.opacity,
            boxShadow: 'none',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 50%, rgba(0, 0, 0, 0.28) 100%)',
        }}
      />
    </div>
  )
}
