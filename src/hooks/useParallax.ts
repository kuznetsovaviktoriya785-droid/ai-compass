import { useEffect, useRef, useState } from 'react'

type ParallaxOffset = {
  x: number
  y: number
  rotateX: number
  rotateY: number
}

export function useParallax<T extends HTMLElement>(strength = 18) {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState<ParallaxOffset>({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateReduced = () => setReducedMotion(motionQuery.matches)
    updateReduced()
    motionQuery.addEventListener('change', updateReduced)

    return () => motionQuery.removeEventListener('change', updateReduced)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const element = ref.current
    if (!element) return

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const normX = (event.clientX - centerX) / (rect.width / 2)
      const normY = (event.clientY - centerY) / (rect.height / 2)

      setOffset({
        x: normX * strength * 0.35,
        y: normY * strength * 0.35,
        rotateX: normY * -2.5,
        rotateY: normX * 2.5,
      })
    }

    const handleLeave = () => {
      setOffset({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
    }

    window.addEventListener('mousemove', handleMove)
    element.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseleave', handleLeave)
    }
  }, [reducedMotion, strength])

  return { ref, offset, reducedMotion }
}
