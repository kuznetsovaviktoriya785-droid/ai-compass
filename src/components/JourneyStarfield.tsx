import { useLayoutEffect, useRef } from 'react'

/**
 * Deep-space starfield for the journey section — same star language as the
 * hero, with a calm corridor around the title and the route so the light
 * path stays readable.
 */
export default function JourneyStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    let s = 41
    const next = () => {
      s = (s * 16807) % 2147483647
      return (s - 1) / 2147483646
    }

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return

      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Quiet distant nebulae, kept away from the centre
      const washes = [
        { x: 0.1, y: 0.3, rx: 0.3, ry: 0.34, c: 'rgba(48,44,74,0.05)' },
        { x: 0.9, y: 0.36, rx: 0.28, ry: 0.32, c: 'rgba(38,46,72,0.045)' },
        { x: 0.24, y: 0.86, rx: 0.3, ry: 0.28, c: 'rgba(34,42,68,0.04)' },
        { x: 0.78, y: 0.9, rx: 0.26, ry: 0.24, c: 'rgba(56,48,44,0.028)' },
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
        ctx.ellipse(wash.x * w, wash.y * h, wash.rx * w, wash.ry * h, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      // Sparse corridor across the middle where the title and route live
      const densityAt = (x: number, y: number) => {
        const nx = x / w
        const ny = y / h
        const corridor = ny > 0.18 && ny < 0.62 ? 1 - (nx > 0.12 && nx < 0.88 ? 0.72 : 0.3) : 1
        const edgeLift = ny < 0.12 || ny > 0.86 ? 1 : 0.86
        return corridor * edgeLift
      }

      const layers = [
        { n: 2400, size: [0.22, 0.5], a: [0.05, 0.14] },
        { n: 1200, size: [0.32, 0.8], a: [0.08, 0.22] },
        { n: 460, size: [0.45, 1.1], a: [0.12, 0.32] },
        { n: 80, size: [0.8, 1.6], a: [0.24, 0.48] },
      ]

      s = 41
      for (const layer of layers) {
        for (let i = 0; i < layer.n; i++) {
          const x = next() * w
          const y = next() * h
          const dens = densityAt(x, y)
          if (next() > dens) continue

          const r = layer.size[0] + next() * (layer.size[1] - layer.size[0])
          let a = layer.a[0] + next() * (layer.a[1] - layer.a[0])
          a *= 0.6 + dens * 0.4

          const roll = next()
          const fill =
            roll < 0.1
              ? `rgba(255,232,196,${a})`
              : roll > 0.9
                ? `rgba(198,212,242,${a})`
                : `rgba(246,247,250,${a})`

          if (r > 1.1) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(210,232,255,${a * 0.1})`
            ctx.arc(x, y, r * 2.6, 0, Math.PI * 2)
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

    const observer = new ResizeObserver(draw)
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="journey-starfield pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  )
}
