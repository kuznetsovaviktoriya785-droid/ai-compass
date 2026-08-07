import { useEffect, useRef } from 'react'
import HeroCompass from './HeroCompass'
import HeroStarfield from './HeroStarfield'

type Particle = {
  id: number
  left: number
  top: number
  size: number
  opacity: number
  duration: number
  delay: number
}

/** Soft golden dust — elegant, low noise */
const PARTICLES: Particle[] = [
  { id: 0, left: 7, top: 18, size: 1, opacity: 0.14, duration: 32, delay: 0 },
  { id: 1, left: 14, top: 42, size: 1.5, opacity: 0.18, duration: 38, delay: 3.2 },
  { id: 2, left: 19, top: 8, size: 1, opacity: 0.12, duration: 34, delay: 1.1 },
  { id: 3, left: 24, top: 67, size: 1, opacity: 0.16, duration: 40, delay: 5.4 },
  { id: 4, left: 31, top: 29, size: 1.5, opacity: 0.2, duration: 33, delay: 2.0 },
  { id: 5, left: 36, top: 81, size: 1, opacity: 0.12, duration: 42, delay: 7.1 },
  { id: 6, left: 41, top: 14, size: 1, opacity: 0.15, duration: 36, delay: 0.8 },
  { id: 7, left: 46, top: 53, size: 1.5, opacity: 0.18, duration: 39, delay: 4.3 },
  { id: 8, left: 52, top: 36, size: 1, opacity: 0.14, duration: 34, delay: 1.7 },
  { id: 9, left: 57, top: 74, size: 1, opacity: 0.2, duration: 41, delay: 6.2 },
  { id: 10, left: 62, top: 11, size: 1.5, opacity: 0.13, duration: 37, delay: 2.8 },
  { id: 11, left: 67, top: 48, size: 1, opacity: 0.17, duration: 35, delay: 0.4 },
  { id: 12, left: 72, top: 88, size: 1, opacity: 0.12, duration: 43, delay: 8.0 },
  { id: 13, left: 77, top: 23, size: 1.5, opacity: 0.16, duration: 32, delay: 3.6 },
  { id: 14, left: 82, top: 61, size: 1, opacity: 0.19, duration: 38, delay: 5.0 },
  { id: 15, left: 87, top: 39, size: 1, opacity: 0.14, duration: 36, delay: 1.4 },
  { id: 16, left: 91, top: 6, size: 1.5, opacity: 0.12, duration: 40, delay: 4.8 },
  { id: 17, left: 95, top: 70, size: 1, opacity: 0.18, duration: 34, delay: 2.5 },
  { id: 18, left: 4, top: 56, size: 1, opacity: 0.15, duration: 39, delay: 6.8 },
  { id: 19, left: 11, top: 91, size: 1.5, opacity: 0.13, duration: 44, delay: 9.2 },
  { id: 20, left: 28, top: 4, size: 1, opacity: 0.2, duration: 33, delay: 0.2 },
  { id: 21, left: 49, top: 92, size: 1, opacity: 0.12, duration: 41, delay: 7.6 },
  { id: 22, left: 68, top: 33, size: 1.5, opacity: 0.17, duration: 37, delay: 3.9 },
  { id: 23, left: 84, top: 84, size: 1, opacity: 0.14, duration: 42, delay: 5.8 },
  { id: 24, left: 43, top: 62, size: 1, opacity: 0.2, duration: 35, delay: 2.2 },
]

type TwinkleStar = {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
  sparkle?: boolean
  tone: 'ivory' | 'champagne' | 'white'
}

/**
 * Rare living twinkles — clear of title/CTA (left mid) and compass (right mid).
 * Placed along edges, upper band, and lower margins only.
 */
const TWINKLES: TwinkleStar[] = [
  { id: 0, left: 6, top: 12, size: 2.2, duration: 7.2, delay: 0.4, tone: 'ivory', sparkle: true },
  { id: 1, left: 18, top: 6, size: 1.6, duration: 9.1, delay: 2.1, tone: 'white' },
  { id: 2, left: 32, top: 9, size: 1.4, duration: 8.4, delay: 4.8, tone: 'champagne' },
  { id: 3, left: 48, top: 5, size: 2, duration: 10.2, delay: 1.2, tone: 'ivory', sparkle: true },
  { id: 4, left: 63, top: 8, size: 1.5, duration: 7.8, delay: 5.6, tone: 'white' },
  { id: 5, left: 78, top: 7, size: 1.8, duration: 9.6, delay: 0.9, tone: 'champagne' },
  { id: 6, left: 93, top: 14, size: 2.4, duration: 8.8, delay: 3.3, tone: 'ivory', sparkle: true },
  { id: 7, left: 3, top: 28, size: 1.5, duration: 11, delay: 6.2, tone: 'white' },
  { id: 8, left: 97, top: 32, size: 1.7, duration: 8.1, delay: 1.8, tone: 'champagne' },
  { id: 9, left: 8, top: 72, size: 1.6, duration: 9.4, delay: 4.1, tone: 'ivory' },
  { id: 10, left: 22, top: 86, size: 2.1, duration: 10.8, delay: 2.7, tone: 'white', sparkle: true },
  { id: 11, left: 38, top: 90, size: 1.4, duration: 7.5, delay: 7.4, tone: 'champagne' },
  { id: 12, left: 55, top: 88, size: 1.9, duration: 9.9, delay: 0.2, tone: 'ivory' },
  { id: 13, left: 74, top: 82, size: 1.5, duration: 8.6, delay: 5.1, tone: 'white' },
  { id: 14, left: 91, top: 78, size: 2.3, duration: 11.4, delay: 3.9, tone: 'champagne', sparkle: true },
  { id: 15, left: 96, top: 54, size: 1.4, duration: 7.9, delay: 8.2, tone: 'ivory' },
  { id: 16, left: 2, top: 48, size: 1.3, duration: 10.5, delay: 4.6, tone: 'white' },
  { id: 17, left: 44, top: 16, size: 1.5, duration: 8.9, delay: 6.8, tone: 'champagne' },
]

function HeroCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    const points: { x: number; y: number; born: number }[] = []
    const TRAIL_LIFE = 800

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (event: MouseEvent) => {
      points.push({
        x: event.clientX,
        y: event.clientY,
        born: performance.now(),
      })
      if (points.length > 40) points.shift()
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)

      while (points.length && now - points[0].born > TRAIL_LIFE) {
        points.shift()
      }

      if (points.length > 1) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineWidth = 1

        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1]
          const curr = points[i]
          const age = (now - curr.born) / TRAIL_LIFE
          const alpha = Math.max(0, (1 - age) * 0.18)

          ctx.strokeStyle = `rgba(232, 197, 106, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(curr.x, curr.y)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-scene-cursor pointer-events-none absolute inset-0 z-[5]"
      aria-hidden="true"
    />
  )
}

export default function Hero() {
  return (
    <section className="hero-scene hero-scene--awaken relative">
      <div
        className="hero-scene-curtain pointer-events-none fixed inset-0 z-[100]"
        aria-hidden="true"
      />
      <HeroCursorTrail />

      <div
        className="hero-scene-vignette pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div
        className="hero-scene-nebula pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <HeroStarfield />

      <div
        className="hero-scene-twinkles pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      >
        {TWINKLES.map((star) => (
          <span
            key={star.id}
            className={`hero-scene-twinkle hero-scene-twinkle--${star.tone}${
              star.sparkle ? ' hero-scene-twinkle--sparkle' : ''
            }`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div
        className="hero-scene-starfield-parallax pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div
        className="hero-scene-particles pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="hero-scene-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div
        className="hero-scene-haze pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
        aria-hidden="true"
      />

      <div
        className="hero-scene-fade pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
        aria-hidden="true"
      />

      <div className="hero-scene-stage relative z-10">
        <div className="hero-scene-content">
          <h1 className="hero-scene-title">AI Compass</h1>

          <p className="hero-scene-subtitle">
            Ваш проводник в мире{' '}
            <span className="hero-scene-accent">искусственного интеллекта</span>.
            <br />
            От первого вопроса — до собственных ИИ-проектов.
          </p>

          <a href="#start" className="hero-scene-button">
            Начать путешествие
          </a>
        </div>

        <div className="hero-scene-compass" aria-hidden="true">
          <HeroCompass />
        </div>
      </div>
    </section>
  )
}
