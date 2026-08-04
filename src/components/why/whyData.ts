export const whySectionContent = {
  heading: 'Каждый исследователь однажды был новичком.',
  lines: [
    'Все великие открытия объединяет одна простая вещь.',
    'Когда-то они были всего лишь вопросом.',
    'Любопытство стало первым шагом.',
    'Первый шаг превратился в путь.',
    'А путь — в новые возможности.',
  ],
  closing: 'AI Compass начинается именно с этого момента.',
}

const CX = 200
const CY = 200

export const GALAXY_CENTER = { x: CX, y: CY }

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** Point along a slightly irregular logarithmic spiral */
function spiralPoint(
  startAngle: number,
  turns: number,
  a: number,
  b: number,
  u: number,
  jitter: number,
  next: () => number,
) {
  const t = startAngle + u * turns * Math.PI * 2
  const r = a * Math.exp(b * t) + (next() - 0.5) * jitter
  return {
    x: CX + r * Math.cos(t),
    y: CY + r * Math.sin(t),
    t,
    r,
    u,
  }
}

export type ClusterStar = {
  x: number
  y: number
  r: number
  o: number
  /** 1 = warm gold near core, 0 = cool violet outer */
  warm: number
}

/** Fine luminous dust + tiny stars along a continuous arm ridge */
function armCluster(
  startAngle: number,
  turns: number,
  a: number,
  b: number,
  count: number,
  seed: number,
  jitter = 4.5,
  opacityScale = 1,
): ClusterStar[] {
  const next = rng(seed)
  const out: ClusterStar[] = []

  for (let i = 0; i < count; i++) {
    const u = i / count + (next() - 0.5) * 0.006
    const p = spiralPoint(
      startAngle,
      turns,
      a,
      b,
      Math.min(0.998, Math.max(0, u)),
      jitter,
      next,
    )
    const warm = Math.max(0, 1 - p.u * 1.18)
    const nearCore = p.u < 0.16
    const midArm = p.u >= 0.16 && p.u < 0.55
    const roll = next()
    /* ~2% medium highlights; rest are tiny stars / dust */
    const medium = roll > 0.98
    const dust = roll < 0.55

    out.push({
      x: p.x,
      y: p.y,
      r: medium
        ? 0.35 + next() * 0.35
        : dust
          ? 0.04 + next() * 0.1
          : nearCore
            ? 0.08 + next() * 0.22
            : midArm
              ? 0.06 + next() * 0.18
              : 0.045 + next() * 0.14,
      o:
        (medium
          ? 0.45 + next() * 0.35
          : dust
            ? 0.1 + next() * 0.22
            : nearCore
              ? 0.28 + next() * 0.38
              : midArm
                ? 0.22 + next() * 0.36
                : 0.12 + next() * 0.28) * opacityScale,
      warm,
    })
  }
  return out
}

/** Sparse medium highlights clustered along arms */
function armStarClusters(
  startAngle: number,
  turns: number,
  a: number,
  b: number,
  count: number,
  seed: number,
): ClusterStar[] {
  const next = rng(seed)
  const out: ClusterStar[] = []
  for (let i = 0; i < count; i++) {
    const u = 0.14 + (i / count) * 0.72 + (next() - 0.5) * 0.02
    const p = spiralPoint(startAngle, turns, a, b, u, 2.2, next)
    const warm = Math.max(0, 1 - u * 1.1)
    const members = 4 + Math.floor(next() * 8)
    for (let m = 0; m < members; m++) {
      const ang = next() * Math.PI * 2
      const dist = next() * (1.2 + next() * 2.2)
      out.push({
        x: p.x + Math.cos(ang) * dist,
        y: p.y + Math.sin(ang) * dist * 0.72,
        r: 0.12 + next() * 0.28,
        o: 0.32 + next() * 0.4,
        warm: Math.min(1, warm + 0.1),
      })
    }
  }
  return out
}

/** Soft continuous arm gas — violet / indigo depth */
export type NebulaPatch = {
  x: number
  y: number
  rx: number
  ry: number
  rot: number
  warm: number
  o: number
}

function armNebulae(
  startAngle: number,
  turns: number,
  a: number,
  b: number,
  count: number,
  seed: number,
): NebulaPatch[] {
  const next = rng(seed)
  const out: NebulaPatch[] = []
  for (let i = 0; i < count; i++) {
    const u = 0.06 + (i / count) * 0.86 + (next() - 0.5) * 0.02
    const p = spiralPoint(startAngle, turns, a, b, u, 2.5, next)
    out.push({
      x: p.x,
      y: p.y,
      rx: 8 + next() * 16,
      ry: 2.2 + next() * 5.5,
      rot: (p.t * 180) / Math.PI + (next() - 0.5) * 12,
      warm: Math.max(0, 1 - u * 1.25),
      o: 0.035 + next() * 0.05,
    })
  }
  return out
}

/** Classic two-arm + secondary spiral — distant galaxy */
const ARMS = [
  { angle: -0.35, turns: 2.65, a: 15.2, b: 0.168, seed: 11 },
  { angle: Math.PI - 0.38, turns: 2.55, a: 15.8, b: 0.166, seed: 29 },
  { angle: Math.PI * 0.5, turns: 2.35, a: 14.4, b: 0.164, seed: 47 },
  { angle: Math.PI * 1.5, turns: 2.4, a: 14.7, b: 0.165, seed: 61 },
  { angle: 0.65, turns: 2.05, a: 19.5, b: 0.152, seed: 83 },
  { angle: Math.PI + 0.6, turns: 2.0, a: 19.0, b: 0.153, seed: 97 },
]

export const galaxyClusters: ClusterStar[] = [
  /* Dense fine dust — continuous arm body */
  ...ARMS.flatMap((arm, i) =>
    armCluster(
      arm.angle,
      arm.turns,
      arm.a,
      arm.b,
      i < 2 ? 2400 : i < 4 ? 1900 : 1300,
      arm.seed,
      i < 2 ? 4.2 : 3.6,
    ),
  ),
  /* Smooth ridge — tighter jitter for continuous spiral */
  ...ARMS.flatMap((arm, i) =>
    armCluster(
      arm.angle + 0.012,
      arm.turns * 0.96,
      arm.a * 1.005,
      arm.b,
      i < 4 ? 900 : 560,
      arm.seed + 17,
      2.2,
      0.85,
    ),
  ),
  /* Far outer arms — faint */
  ...ARMS.flatMap((arm, i) =>
    armCluster(
      arm.angle - 0.025,
      arm.turns * 1.22,
      arm.a * 1.18,
      arm.b * 0.97,
      i < 4 ? 700 : 420,
      arm.seed + 71,
      6,
      0.32,
    ),
  ),
  /* Sparse medium highlights */
  ...ARMS.flatMap((arm, i) =>
    armStarClusters(arm.angle, arm.turns, arm.a, arm.b, i < 4 ? 5 : 3, arm.seed + 41),
  ),
]

export const galaxyNebulae: NebulaPatch[] = [
  ...ARMS.flatMap((arm) =>
    armNebulae(arm.angle, arm.turns, arm.a, arm.b, 14, arm.seed + 3),
  ),
  /* Extra indigo depth lanes */
  ...ARMS.flatMap((arm) =>
    armNebulae(arm.angle + 0.04, arm.turns * 0.9, arm.a * 1.02, arm.b, 6, arm.seed + 19),
  ),
]

export type GalaxyStar = {
  id: string
  label: string
  x: number
  y: number
  size: number
  duration: number
  reverse?: boolean
  delay: number
  /** orbit radius for slow drift */
  radius: number
  angle: number
}

/** Place each tool as a star sitting naturally on a spiral arm */
function placeOnArm(
  armIndex: number,
  u: number,
  seed: number,
) {
  const arm = ARMS[armIndex]
  const next = rng(seed)
  const p = spiralPoint(arm.angle, arm.turns, arm.a, arm.b, u, 4.5, next)
  const dx = p.x - CX
  const dy = p.y - CY
  return {
    x: p.x,
    y: p.y,
    radius: Math.hypot(dx, dy),
    angle: (Math.atan2(dy, dx) * 180) / Math.PI,
  }
}

export const galaxyStars: GalaxyStar[] = [
  { id: 'chatgpt', label: 'ChatGPT', ...placeOnArm(0, 0.18, 201), size: 1.85, duration: 95, delay: 1.4 },
  { id: 'claude', label: 'Claude', ...placeOnArm(1, 0.22, 202), size: 1.55, duration: 110, reverse: true, delay: 1.7 },
  { id: 'gemini', label: 'Gemini', ...placeOnArm(2, 0.28, 203), size: 1.7, duration: 118, delay: 2.0 },
  { id: 'cursor', label: 'Cursor', ...placeOnArm(3, 0.32, 204), size: 1.5, duration: 128, reverse: true, delay: 2.25 },
  { id: 'midjourney', label: 'Midjourney', ...placeOnArm(0, 0.42, 205), size: 1.8, duration: 138, delay: 2.5 },
  { id: 'runway', label: 'Runway', ...placeOnArm(1, 0.48, 206), size: 1.45, duration: 150, reverse: true, delay: 2.7 },
  { id: 'perplexity', label: 'Perplexity', ...placeOnArm(2, 0.55, 207), size: 1.4, duration: 162, delay: 2.9 },
  { id: 'flux', label: 'Flux', ...placeOnArm(3, 0.58, 208), size: 1.35, duration: 172, reverse: true, delay: 3.1 },
  { id: 'elevenlabs', label: 'ElevenLabs', ...placeOnArm(4, 0.52, 209), size: 1.45, duration: 184, delay: 3.3 },
  { id: 'suno', label: 'Suno', ...placeOnArm(5, 0.56, 210), size: 1.3, duration: 196, reverse: true, delay: 3.5 },
  { id: 'veo', label: 'Veo', ...placeOnArm(0, 0.72, 211), size: 1.3, duration: 210, delay: 3.7 },
  { id: 'kling', label: 'Kling', ...placeOnArm(1, 0.76, 212), size: 1.35, duration: 224, reverse: true, delay: 3.9 },
]

export type GalaxyLink = {
  from: string
  to: string
  delay: number
  duration: number
  /** Soft navigational pulse — rare, calm */
  pulse?: boolean
}

/** Sparse outer constellation — almost invisible champagne arcs */
export const galaxyLinks: GalaxyLink[] = [
  { from: 'midjourney', to: 'runway', delay: 6.0, duration: 36 },
  { from: 'runway', to: 'perplexity', delay: 8.5, duration: 40 },
  { from: 'flux', to: 'elevenlabs', delay: 11.0, duration: 38 },
  { from: 'suno', to: 'veo', delay: 14.0, duration: 42, pulse: true },
  { from: 'veo', to: 'kling', delay: 17.0, duration: 44 },
]

/** Soft quadratic arc through two points, bulging toward center */
export function constellationArc(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const cx = mx + (CX - mx) * 0.18
  const cy = my + (CY - my) * 0.18
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}
