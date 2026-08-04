export type HeroOrbitNode = {
  id: string
  label: string
  angle: number
}

export type HeroOrbit = {
  id: string
  rx: number
  ry: number
  tilt: number
  duration: number
  reverse?: boolean
  depth: 'near' | 'mid' | 'far'
  nodes: HeroOrbitNode[]
}

export const heroOrbits: HeroOrbit[] = [
  {
    id: 'inner',
    rx: 123,
    ry: 97,
    tilt: -12,
    duration: 180,
    depth: 'near',
    nodes: [
      { id: 'chatgpt', label: 'ChatGPT', angle: 210 },
      { id: 'claude', label: 'Claude', angle: 30 },
    ],
  },
  {
    id: 'mid',
    rx: 154,
    ry: 123,
    tilt: 16,
    duration: 240,
    reverse: true,
    depth: 'mid',
    nodes: [
      { id: 'gemini', label: 'Gemini', angle: 300 },
      { id: 'cursor', label: 'Cursor', angle: 120 },
    ],
  },
  {
    id: 'outer',
    rx: 179,
    ry: 143,
    tilt: -6,
    duration: 300,
    depth: 'far',
    nodes: [
      { id: 'midjourney', label: 'Midjourney', angle: 250 },
      { id: 'runway', label: 'Runway', angle: 70 },
    ],
  },
]

export const heroParticles = [
  { x: '8%', y: '18%', delay: 0, size: 3 },
  { x: '88%', y: '22%', delay: 1.2, size: 2 },
  { x: '14%', y: '72%', delay: 2.1, size: 3 },
  { x: '78%', y: '68%', delay: 0.6, size: 2 },
  { x: '92%', y: '48%', delay: 1.8, size: 3 },
  { x: '6%', y: '44%', delay: 2.8, size: 2 },
  { x: '52%', y: '8%', delay: 0.9, size: 2 },
  { x: '44%', y: '92%', delay: 1.5, size: 2 },
  { x: '28%', y: '12%', delay: 2.4, size: 2 },
  { x: '68%', y: '86%', delay: 3.2, size: 3 },
]
