import { useState } from 'react'
import JourneyStarfield from './JourneyStarfield'
import ScrollReveal from './ScrollReveal'

const stages = [
  {
    id: 1,
    title: 'Долина Первого Света',
    description:
      'Откройте для себя мир искусственного интеллекта. Узнайте, как работают современные AI-технологии и с чего начать своё путешествие.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Лес Промптов',
    description:
      'Научитесь общаться с искусственным интеллектом. Освойте создание точных промптов и получайте результаты, которые действительно работают.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Океан Данных',
    description:
      'Используйте возможности AI для анализа информации, поиска закономерностей и принятия более уверенных решений.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Горы Инноваторов',
    description:
      'Автоматизируйте повседневные задачи, экспериментируйте с новыми инструментами и открывайте возможности для роста.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Вершина Создателя AI',
    description:
      'Создавайте собственные AI-проекты, воплощайте идеи в жизнь и открывайте новые горизонты вместе с искусственным интеллектом.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

type StationStatus = 'completed' | 'active' | 'future'

function stationStatus(index: number, activeStage: number): StationStatus {
  if (index < activeStage) return 'completed'
  if (index === activeStage) return 'active'
  return 'future'
}

function StagePoint({
  stage,
  status,
  isFinale,
  onActivate,
}: {
  stage: (typeof stages)[0]
  status: StationStatus
  isFinale: boolean
  onActivate: () => void
}) {
  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        className={`journey-beacon group relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D2A2]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914] journey-beacon-${status}${
          isFinale ? ' journey-beacon-finale' : ''
        }`}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        aria-label={stage.title}
        aria-current={status === 'active' ? 'step' : undefined}
      >
        {stage.icon}
        <span className="journey-beacon-num absolute -top-3 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center text-[9px] tracking-widest">
          {stage.id}
        </span>
      </button>

      <div
        className={`journey-stage-caption mt-4 w-full max-w-[220px] rounded-2xl p-4 text-center transition-all duration-500 ${
          status === 'active'
            ? 'opacity-100'
            : 'opacity-0 lg:pointer-events-none lg:absolute lg:mt-0 lg:top-14 lg:opacity-0'
        }`}
      >
        <h3 className="text-sm font-semibold text-text-primary">{stage.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">{stage.description}</p>
      </div>
    </div>
  )
}

export default function JourneyMap() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <section id="journey" className="journey-section relative scroll-mt-20 overflow-hidden pb-20 sm:pb-28">
      <div className="journey-atmosphere pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="journey-haze journey-haze-far" />
        <div className="journey-haze journey-haze-near" />
        <JourneyStarfield />
        <div className="journey-dust" />
        <div className="journey-core-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="journey-title text-3xl font-bold tracking-tight sm:text-4xl">
              Ваш маршрут по миру{' '}
              <span className="text-gradient">искусственного интеллекта</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Каждый этап открывает новые возможности. Двигайтесь в своём темпе — от первых открытий до уверенного создания собственных AI-проектов.
            </p>

            <div className="journey-progress mt-8" aria-live="polite">
              <p className="journey-progress-label">Ваш путь</p>
              <p className="journey-progress-stage">
                Этап {activeStage + 1} из {stages.length}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Desktop horizontal map */}
        <ScrollReveal delay={200}>
          <div className="journey-route relative mt-16 hidden lg:block">
            <svg
              className="absolute -top-10 left-[-2%] right-[-2%] h-32 w-[104%]"
              viewBox="0 0 1000 128"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F0E3C0" stopOpacity="0" />
                  <stop offset="12%" stopColor="#F0E3C0" stopOpacity="0.22" />
                  <stop offset="38%" stopColor="#E6D2A2" stopOpacity="0.55" />
                  <stop offset="68%" stopColor="#E6D2A2" stopOpacity="0.48" />
                  <stop offset="88%" stopColor="#D9BE7A" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#D9BE7A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="routeGradSoft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F0E3C0" stopOpacity="0" />
                  <stop offset="16%" stopColor="#E6D2A2" stopOpacity="0.1" />
                  <stop offset="45%" stopColor="#E6D2A2" stopOpacity="0.18" />
                  <stop offset="78%" stopColor="#D9BE7A" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#D9BE7A" stopOpacity="0" />
                </linearGradient>
                <filter id="routeGlow" x="-40%" y="-400%" width="180%" height="900%">
                  <feGaussianBlur stdDeviation="3.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="routeBloom" x="-90%" y="-900%" width="280%" height="1800%">
                  <feGaussianBlur stdDeviation="18" result="bloom" />
                  <feMerge>
                    <feMergeNode in="bloom" />
                  </feMerge>
                </filter>
              </defs>
              {/* Continuous cosmic energy stream — soft orbital flow, stages unmoved */}
              <path
                className="journey-route-bloom"
                d="M -50 70 C 180 46, 340 46, 520 64 C 700 82, 860 82, 1050 58"
                fill="none"
                stroke="url(#routeGradSoft)"
                strokeWidth="22"
                strokeLinecap="round"
                filter="url(#routeBloom)"
                opacity="0.9"
                pathLength={1102}
              />
              <path
                className="journey-route-line"
                d="M -50 70 C 180 46, 340 46, 520 64 C 700 82, 860 82, 1050 58"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="1.85"
                strokeLinecap="round"
                filter="url(#routeGlow)"
                opacity="0.82"
                pathLength={1102}
              />
              {/* Light pulse + soft trail — same Bezier d, travels via stroke-dashoffset */}
              <path
                className="journey-route-spark-trail"
                d="M -50 70 C 180 46, 340 46, 520 64 C 700 82, 860 82, 1050 58"
                fill="none"
                stroke="#E6D2A2"
                strokeWidth="2.2"
                strokeLinecap="round"
                pathLength={1102}
              />
              <path
                className="journey-route-spark"
                d="M -50 70 C 180 46, 340 46, 520 64 C 700 82, 860 82, 1050 58"
                fill="none"
                stroke="#F0E3C0"
                strokeWidth="2.8"
                strokeLinecap="round"
                pathLength={1102}
              />
            </svg>

            <div className="relative grid grid-cols-5 gap-4 sm:gap-5">
              {stages.map((stage, i) => (
                <StagePoint
                  key={stage.id}
                  stage={stage}
                  status={stationStatus(i, activeStage)}
                  isFinale={i === stages.length - 1}
                  onActivate={() => setActiveStage(i)}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile vertical route */}
        <ScrollReveal delay={200}>
          <div className="relative mt-12 lg:hidden">
            <div className="journey-route-mobile absolute left-6 top-0 bottom-0 w-px" />

            <div className="space-y-8">
              {stages.map((stage, i) => {
                const status = stationStatus(i, activeStage)
                const isFinale = i === stages.length - 1
                return (
                  <div key={stage.id} className="relative flex gap-6 pl-2">
                    <button
                      type="button"
                      className={`journey-beacon relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D2A2]/30 journey-beacon-${status}${
                        isFinale ? ' journey-beacon-finale' : ''
                      }`}
                      onClick={() => setActiveStage(i)}
                      aria-label={stage.title}
                      aria-current={status === 'active' ? 'step' : undefined}
                    >
                      {stage.icon}
                    </button>
                    <div
                      className={`journey-stage-caption flex-1 rounded-2xl p-4 transition-all duration-500 ${
                        status === 'active' ? 'opacity-100' : 'opacity-65'
                      }`}
                      onClick={() => setActiveStage(i)}
                      onKeyDown={(e) => e.key === 'Enter' && setActiveStage(i)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-2">
                        <span className="journey-beacon-num flex h-4 w-4 items-center justify-center text-[9px]">
                          {stage.id}
                        </span>
                        <h3 className="font-semibold text-text-primary">{stage.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        <p className="mt-12 text-center text-sm text-text-secondary sm:mt-14">
          Ваше путешествие только начинается.
        </p>
      </div>
    </section>
  )
}
