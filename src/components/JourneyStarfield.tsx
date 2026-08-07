import { useLayoutEffect, useRef } from 'react'

/**
 * Deep-space starfield for the journey section — layered depth, calm
 * corridor around the title/route, optional slow twinkle on rare stars.
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

    type Star = {
      x: number
      y: number
      r: number
      a: number
      fill: string
      bloom: boolean
      twinkle: number
    }

    let stars: Star[] = []
    let w = 0
    let h = 0
    let raf = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const densityAt = (x: number, y: number, width: number, height: number) => {
      const nx = x / width
      const ny = y / height
      /* Light title clearance only — keep stars dense behind the route band */
      const corridor = ny > 0.2 && ny < 0.38 ? 1 - (nx > 0.18 && nx < 0.82 ? 0.35 : 0.12) : 1
      const edgeLift = ny < 0.12 || ny > 0.86 ? 1 : 0.9
      return corridor * edgeLift
    }

    const rebuild = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = host.clientWidth
      h = host.clientHeight
      if (!w || !h) return

      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const layers = [
        { n: 3200, size: [0.15, 0.38], a: [0.025, 0.08], near: false },
        { n: 1400, size: [0.25, 0.65], a: [0.05, 0.14], near: false },
        { n: 420, size: [0.38, 0.95], a: [0.09, 0.24], near: false },
        { n: 55, size: [0.9, 1.75], a: [0.3, 0.55], near: true },
      ]

      stars = []
      s = 41
      for (const layer of layers) {
        for (let i = 0; i < layer.n; i++) {
          const x = next() * w
          const y = next() * h
          const dens = densityAt(x, y, w, h)
          if (next() > dens) continue

          const r = layer.size[0] + next() * (layer.size[1] - layer.size[0])
          let a = layer.a[0] + next() * (layer.a[1] - layer.a[0])
          a *= 0.55 + dens * 0.45

          const roll = next()
          const fill = layer.near
            ? roll < 0.4
              ? `255,248,235`
              : `247,233,187`
            : roll < 0.07
              ? `247,233,187`
              : roll > 0.93
                ? `230,210,162`
                : `236,232,224`

          stars.push({
            x,
            y,
            r,
            a,
            fill,
            bloom: layer.near && r > 1.05,
            twinkle: layer.near && next() > 0.55 ? 0.35 + next() * 0.65 : 0,
          })
        }
      }
    }

    const paint = (time: number) => {
      const ctx = canvas.getContext('2d')
      if (!ctx || !w || !h) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const washes = [
        { x: 0.08, y: 0.28, rx: 0.34, ry: 0.38, c: 'rgba(20,38,72,0.07)' },
        { x: 0.92, y: 0.34, rx: 0.32, ry: 0.36, c: 'rgba(18,34,64,0.06)' },
        { x: 0.22, y: 0.88, rx: 0.34, ry: 0.3, c: 'rgba(24,42,78,0.05)' },
        { x: 0.8, y: 0.9, rx: 0.28, ry: 0.26, c: 'rgba(36,32,58,0.035)' },
        { x: 0.5, y: 0.1, rx: 0.46, ry: 0.2, c: 'rgba(14,28,52,0.045)' },
        { x: 0.62, y: 0.55, rx: 0.22, ry: 0.18, c: 'rgba(22,36,62,0.025)' },
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

      const t = time * 0.001
      for (const star of stars) {
        let a = star.a
        if (!reduceMotion && star.twinkle > 0) {
          a *= 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(t * (0.22 + star.twinkle * 0.18) + star.x))
        }

        if (star.bloom) {
          ctx.beginPath()
          ctx.fillStyle = `rgba(247,233,187,${a * 0.1})`
          ctx.arc(star.x, star.y, star.r * 2.8, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.fillStyle = `rgba(${star.fill},${a})`
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) {
        raf = requestAnimationFrame(paint)
      }
    }

    const onResize = () => {
      rebuild()
      if (reduceMotion) paint(0)
    }

    rebuild()
    if (reduceMotion) {
      paint(0)
    } else {
      raf = requestAnimationFrame(paint)
    }

    const observer = new ResizeObserver(onResize)
    observer.observe(host)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="journey-starfield pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  )
}
