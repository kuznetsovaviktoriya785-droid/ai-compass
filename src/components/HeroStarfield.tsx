import { useLayoutEffect, useRef } from 'react'

/**
 * Deep-space starfield with a calm clearing around the crystal
 * (center of the hero stage) — density rises toward the edges.
 */
export default function HeroStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let s = 19
    const next = () => {
      s = (s * 16807) % 2147483647
      return (s - 1) / 2147483646
    }

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Quiet distant nebulae — keep away from center clearing
      const washes = [
        { x: 0.14, y: 0.22, rx: 0.32, ry: 0.22, c: 'rgba(55,50,80,0.045)' },
        { x: 0.86, y: 0.28, rx: 0.3, ry: 0.22, c: 'rgba(70,60,50,0.03)' },
        { x: 0.18, y: 0.78, rx: 0.34, ry: 0.24, c: 'rgba(40,48,70,0.035)' },
        { x: 0.82, y: 0.76, rx: 0.28, ry: 0.2, c: 'rgba(50,45,70,0.028)' },
      ]
      for (const wash of washes) {
        const g = ctx.createRadialGradient(
          wash.x * w,
          wash.y * h,
          0,
          wash.x * w,
          wash.y * h,
          wash.rx * w,
        )
        g.addColorStop(0, wash.c)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.ellipse(
          wash.x * w,
          wash.y * h,
          wash.rx * w,
          wash.ry * h,
          0,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      }

      // Crystal sits in upper-middle of the hero stage
      const cx = w * 0.5
      const cy = h * 0.38
      const calmRx = Math.min(w, h) * 0.22
      const calmRy = Math.min(w, h) * 0.26

      const densityAt = (x: number, y: number) => {
        const dx = (x - cx) / calmRx
        const dy = (y - cy) / calmRy
        const d = Math.sqrt(dx * dx + dy * dy)
        // Near crystal: sparse. Beyond ~1.0: full density.
        if (d < 0.55) return 0.08
        if (d < 0.85) return 0.22
        if (d < 1.15) return 0.48
        if (d < 1.5) return 0.72
        return 1
      }

      const layers = [
        { n: 3400, size: [0.22, 0.5], a: [0.05, 0.14] },
        { n: 1700, size: [0.32, 0.8], a: [0.09, 0.24] },
        { n: 680, size: [0.45, 1.15], a: [0.14, 0.36] },
        { n: 120, size: [0.85, 1.7], a: [0.28, 0.55] },
      ]

      s = 19
      for (const layer of layers) {
        for (let i = 0; i < layer.n; i++) {
          const x = next() * w
          const y = next() * h
          const dens = densityAt(x, y)
          if (next() > dens) continue

          const r = layer.size[0] + next() * (layer.size[1] - layer.size[0])
          let a = layer.a[0] + next() * (layer.a[1] - layer.a[0])
          a *= 0.55 + dens * 0.45

          const roll = next()
          const fill =
            roll < 0.1
              ? `rgba(255,230,190,${a})`
              : roll > 0.9
                ? `rgba(230, 210, 162,${a})`
                : `rgba(248,247,244,${a})`

          if (r > 1.2 && dens > 0.5) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(255,236,200,${a * 0.12})`
            ctx.arc(x, y, r * 2.8, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.beginPath()
          ctx.fillStyle = fill
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-scene-starfield-canvas pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  )
}
