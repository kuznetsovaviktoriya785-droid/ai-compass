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

      // Quiet distant navy / cosmic haze — kept away from the centre
      const washes = [
        { x: 0.1, y: 0.3, rx: 0.3, ry: 0.34, c: 'rgba(28,48,88,0.055)' },
        { x: 0.9, y: 0.36, rx: 0.28, ry: 0.32, c: 'rgba(22,40,72,0.05)' },
        { x: 0.24, y: 0.86, rx: 0.3, ry: 0.28, c: 'rgba(26,44,78,0.045)' },
        { x: 0.78, y: 0.9, rx: 0.26, ry: 0.24, c: 'rgba(40,36,58,0.03)' },
        { x: 0.5, y: 0.12, rx: 0.42, ry: 0.18, c: 'rgba(18,32,58,0.035)' },
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

      // Far → near depth planes (dim distant, brighter near)
      const layers = [
        { n: 2600, size: [0.18, 0.42], a: [0.03, 0.1], near: false },
        { n: 1300, size: [0.28, 0.7], a: [0.06, 0.18], near: false },
        { n: 480, size: [0.4, 1.05], a: [0.1, 0.28], near: false },
        { n: 70, size: [0.85, 1.7], a: [0.28, 0.52], near: true },
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
          a *= 0.55 + dens * 0.45

          const roll = next()
          const fill = layer.near
            ? roll < 0.35
              ? `rgba(255,248,235,${a})`
              : `rgba(240,227,192,${a})`
            : roll < 0.08
              ? `rgba(255,232,196,${a * 0.85})`
              : roll > 0.92
                ? `rgba(230,210,162,${a * 0.9})`
                : `rgba(230,235,245,${a * 0.75})`

          if (layer.near && r > 1.05) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(240,227,192,${a * 0.12})`
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
