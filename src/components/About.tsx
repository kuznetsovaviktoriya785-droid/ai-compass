import type { CSSProperties, ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import JourneyStarfield from './JourneyStarfield'

const capabilities: {
  id: string
  title: string
  description: string
  icon: ReactNode
}[] = [
  {
    id: 'explore',
    title: 'Исследовать',
    description:
      'Находить подходящие AI-инструменты и понимать, чем они отличаются.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M16.5 16.5L21 21" />
      </svg>
    ),
  },
  {
    id: 'create',
    title: 'Создавать',
    description:
      'Работать с текстом, изображениями, музыкой, видео и кодом.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v14M5 12h14" />
        <circle cx="12" cy="12" r="8.5" strokeWidth={1.25} opacity="0.45" />
      </svg>
    ),
  },
  {
    id: 'automate',
    title: 'Автоматизировать',
    description:
      'Превращать повторяющиеся задачи в умные рабочие процессы.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 8h4l2-3h4l2 3h4M6 8v8a2 2 0 002 2h8a2 2 0 002-2V8"
        />
        <path strokeLinecap="round" strokeWidth={1.5} d="M9.5 13.5h5M12 11v5" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'develop',
    title: 'Развивать идеи',
    description:
      'Собирать отдельные AI-инструменты в собственные проекты.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"
        />
        <path
          strokeLinecap="round"
          strokeWidth={1.25}
          d="M18.5 15.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1z"
          opacity="0.55"
        />
      </svg>
    ),
  },
]

export default function About() {
  const { ref, visible } = useScrollReveal<HTMLElement>(0.18)

  return (
    <section
      id="about"
      ref={ref}
      className={`about-section relative scroll-mt-20${visible ? ' about-awake' : ''}`}
    >
      <div className="about-atmosphere pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="about-haze about-haze-far" />
        <div className="about-haze about-haze-near" />
        <JourneyStarfield />
        <div className="about-dust" />
        <div className="about-vignette" />
      </div>

      <div className="about-stage relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="about-layout grid items-start gap-12 lg:grid-cols-[1.12fr_0.94fr] lg:gap-14 xl:gap-16">
          <div className="about-copy">
            <p className="about-eyebrow">Ваш AI-компас</p>

            <h2 className="about-title">
              Не просто узнать об ИИ.
              <br />
              Научиться использовать
              <br />
              его <span className="about-title-accent">для своих идей.</span>
            </h2>

            <div className="about-body">
              <p>
                Мир искусственного интеллекта меняется каждый день. Новые модели,
                сервисы и возможности появляются быстрее, чем успеваешь
                разобраться в предыдущих.
              </p>
              <p>
                AI Compass помогает не потеряться в этом потоке. Здесь технологии
                превращаются в понятный маршрут: от первого знакомства с ИИ — до
                собственных проектов, контента и автоматизаций.
              </p>
            </div>

            <p className="about-accent-line">
              Выбирайте задачу. Находите подходящий инструмент.
              <br />
              Создавайте.
            </p>
          </div>

          <div className="about-panel-wrap">
            <div className="about-panel">
              <div className="about-panel-glow" aria-hidden="true" />

              <header className="about-panel-header">
                <span className="about-panel-brand">AI Compass</span>
                <span className="about-panel-label">Центр возможностей</span>
              </header>

              <div className="about-cards">
                {capabilities.map((card, index) => (
                  <article
                    key={card.id}
                    className="about-card"
                    style={{ '--about-card-i': index } as CSSProperties}
                  >
                    <div className="about-card-icon">{card.icon}</div>
                    <h3 className="about-card-title">{card.title}</h3>
                    <p className="about-card-text">{card.description}</p>
                  </article>
                ))}
              </div>

              <blockquote className="about-quote">
                «ИИ становится по-настоящему полезным, когда превращается из
                инструмента в часть вашей идеи.»
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
