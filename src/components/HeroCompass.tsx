import type { CSSProperties, ReactNode } from 'react'
import { heroOrbits, heroParticles } from '../data/heroCompassData'
import { useParallax } from '../hooks/useParallax'
import HeroCrystal from './HeroCrystal'

function ParallaxLayer({
  children,
  shift = 1,
  offset,
}: {
  children: ReactNode
  shift?: number
  offset: { x: number; y: number }
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(calc(-50% + ${offset.x * shift}px), calc(-50% + ${offset.y * shift}px))`,
      }}
    >
      {children}
    </div>
  )
}

function OrbitRing({
  orbit,
  offset,
}: {
  orbit: (typeof heroOrbits)[number]
  offset: { x: number; y: number }
}) {
  const depthShift =
    orbit.depth === 'far' ? 0.35 : orbit.depth === 'mid' ? 0.55 : 0.75

  return (
    <div
      className={`hero-ai-orbit hero-ai-orbit-${orbit.depth} absolute left-1/2 top-1/2`}
      style={{
        width: orbit.rx * 2,
        height: orbit.ry * 2,
        marginLeft: -orbit.rx,
        marginTop: -orbit.ry,
        transform: `translate(${offset.x * depthShift}px, ${offset.y * depthShift}px) rotate(${orbit.tilt}deg)`,
      }}
    >
      <svg
        className="hero-ai-orbit-path absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${orbit.rx * 2} ${orbit.ry * 2}`}
        aria-hidden="true"
      >
        <ellipse
          cx={orbit.rx}
          cy={orbit.ry}
          rx={orbit.rx - 1}
          ry={orbit.ry - 1}
          className="hero-ai-orbit-stroke"
        />
      </svg>

      <div
        className={`hero-ai-orbit-spinner ${orbit.reverse ? 'hero-ai-orbit-spinner-reverse' : ''}`}
        style={{ animationDuration: `${orbit.duration}s` }}
      >
        <div
          className="hero-ai-orbit-spinner-inner"
          style={
            { '--orbit-scale-y': orbit.ry / orbit.rx } as CSSProperties
          }
        >
          {orbit.nodes.map((node) => (
            <div
              key={node.id}
              className="hero-ai-node"
              style={{
                transform: `rotate(${node.angle}deg) translateX(${orbit.rx}px) rotate(-${node.angle}deg)`,
              }}
            >
              <span className="hero-ai-node-dot" />
              <span className="hero-ai-node-label">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HeroCompass() {
  const { ref, offset, reducedMotion } = useParallax<HTMLDivElement>(14)

  const sceneStyle: CSSProperties | undefined = reducedMotion
    ? undefined
    : {
        transform: `perspective(980px) rotateX(${offset.rotateX}deg) rotateY(${offset.rotateY}deg)`,
      }

  return (
    <div
      ref={ref}
      className="hero-compass-scene relative mx-auto flex h-[340px] w-full max-w-[510px] items-center justify-center sm:h-[388px] lg:h-[460px] lg:max-w-[100%]"
      aria-hidden="true"
    >
      <div className="hero-compass-scene-inner absolute inset-0" style={sceneStyle}>
        <ParallaxLayer shift={0.15} offset={offset}>
          <div className="hero-compass-glow h-[304px] w-[304px] rounded-full sm:h-[352px] sm:w-[352px] lg:h-[400px] lg:w-[400px]" />
        </ParallaxLayer>

        <ParallaxLayer shift={0.08} offset={offset}>
          <div className="hero-orbit hero-orbit-one hero-orbit-dotted h-[304px] w-[304px] sm:h-[352px] sm:w-[352px] lg:h-[400px] lg:w-[400px]" />
        </ParallaxLayer>

        <ParallaxLayer shift={0.12} offset={offset}>
          <div className="hero-orbit hero-orbit-two hero-orbit-gold-ring h-[240px] w-[240px] sm:h-[278px] sm:w-[278px] lg:h-[318px] lg:w-[318px]" />
        </ParallaxLayer>

        <ParallaxLayer shift={0.18} offset={offset}>
          <div className="hero-orbit hero-orbit-three h-[184px] w-[184px] sm:h-[212px] sm:w-[212px] lg:h-[240px] lg:w-[240px]" />
        </ParallaxLayer>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {heroOrbits.map((orbit) => (
            <OrbitRing key={orbit.id} orbit={orbit} offset={offset} />
          ))}
        </div>

        <ParallaxLayer shift={0.22} offset={offset}>
          <div className="hero-compass relative flex h-[242px] w-[242px] items-center justify-center sm:h-[278px] sm:w-[278px] lg:h-[314px] lg:w-[314px]">
            <div className="hero-compass-disc absolute inset-0 rounded-full" />

            <div className="hero-compass-cross hero-compass-cross-v absolute h-[76%] w-px bg-gradient-to-b from-transparent via-[#E0C894]/42 to-transparent" />
            <div className="hero-compass-cross hero-compass-cross-h absolute h-px w-[76%] bg-gradient-to-r from-transparent via-[#E0C894]/36 to-transparent" />

            <div className="hero-compass-mark hero-compass-mark-n">N</div>
            <div className="hero-compass-mark hero-compass-mark-s">S</div>
            <div className="hero-compass-mark hero-compass-mark-e">E</div>
            <div className="hero-compass-mark hero-compass-mark-w">W</div>

            <div className="hero-crystal-wrap relative z-10">
              <div className="hero-crystal-float">
                <div className="hero-crystal">
                  <HeroCrystal />
                </div>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {heroParticles.map((particle, index) => (
          <span
            key={index}
            className="hero-compass-particle absolute"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
              transform: `translate(${offset.x * (0.15 + index * 0.04)}px, ${offset.y * (0.15 + index * 0.04)}px)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
