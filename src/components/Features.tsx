import type { CSSProperties } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import JourneyStarfield from './JourneyStarfield'

/** Glow overlays aligned to route nodes on creator-horizon (bottom → top). */
const routeGlows = [
  { id: 'text', label: 'Тексты', x: 32.3, y: 83.4 },
  { id: 'image', label: 'Изображения', x: 47.5, y: 74.3 },
  { id: 'music', label: 'Музыка', x: 39.1, y: 65.5 },
  { id: 'video', label: 'Видео', x: 51.8, y: 52.6 },
  { id: 'auto', label: 'Автоматизация', x: 71.9, y: 27.7 },
  { id: 'code', label: 'Код', x: 75.5, y: 15.4 },
] as const

export default function Features() {
  const { ref, visible } = useScrollReveal<HTMLElement>(0.16)

  return (
    <section
      id="features"
      ref={ref}
      className={`creator-section relative scroll-mt-20${visible ? ' creator-awake' : ''}`}
    >
      <div className="creator-atmosphere pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="creator-haze creator-haze-far" />
        <div className="creator-haze creator-haze-near" />
        <JourneyStarfield />
        <div className="creator-dust" />
        <div className="creator-vignette" />
      </div>

      <div className="creator-stage relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="creator-layout grid items-center gap-8 lg:grid-cols-[0.84fr_1.32fr] lg:gap-4 xl:gap-6">
          <div className="creator-copy">
            <p className="creator-eyebrow">Ваш следующий шаг</p>

            <h2 className="creator-title">
              Теперь вы не просто исследователь.
              <br />
              <span className="creator-title-accent">Вы — создатель.</span>
            </h2>

            <div className="creator-body">
              <p>
                Путь в мире искусственного интеллекта начинается с любопытства, но не
                заканчивается знаниями.
              </p>
              <p>
                Используйте AI, чтобы превращать идеи в тексты, изображения, музыку,
                видео, продукты и собственные цифровые проекты. Экспериментируйте,
                соединяйте инструменты и создавайте то, чего ещё не существовало.
              </p>
            </div>

            <p className="creator-closing">
              Ваш маршрут не заканчивается здесь.
              <br />
              Отсюда начинается ваш собственный.
            </p>

            <div className="creator-cta">
              <a href="#start" className="creator-button">
                Начать свой путь
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <p className="creator-caption">Исследуйте. Создавайте. Двигайтесь дальше.</p>
            </div>
          </div>

          <div className="creator-vista">
            <div className="creator-art">
              <img
                src="/creator-horizon.png"
                alt="Световой путь в открытый космос: направления творчества — тексты, изображения, музыка, видео, код, автоматизация"
                className="creator-art-image"
                width={1600}
                height={900}
                decoding="async"
              />
              <div className="creator-route-glows" aria-hidden="true">
                {routeGlows.map((node, index) => (
                  <span
                    key={node.id}
                    className="creator-route-glow"
                    style={
                      {
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        '--glow-i': index,
                      } as CSSProperties
                    }
                  >
                    <span className="creator-route-glow-halo" />
                    <span className="creator-route-glow-bloom" />
                    <span className="creator-route-glow-core" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
