import CompassLogo from './CompassLogo'
import ScrollReveal from './ScrollReveal'

const values = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Фокус',
    desc: 'Только проверенные решения',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Скорость',
    desc: 'Быстрый поиск инструментов',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Знания',
    desc: 'Обучение без перегруза',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Сообщество',
    desc: 'Обмен опытом и идеями',
  },
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-night-light/50 to-night" />
        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-sky">
                О проекте
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Ваш надёжный проводник в экосистеме ИИ
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-text-secondary">
                AI Compass — это платформа, которая упрощает навигацию в быстро
                меняющемся мире искусственного интеллекта. Мы собираем, структурируем
                и объясняем лучшие инструменты, подходы и практики.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                Независимо от того, новичок вы или опытный специалист, AI Compass
                поможет найти нужное решение, сэкономить время и принять
                обоснованные решения.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'Актуальная база знаний об ИИ-инструментах',
                  'Персонализированные рекомендации',
                  'Практические гайды и сценарии использования',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/20 text-brand-sky">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-blue/20 to-brand-gold/10 opacity-60 blur-2xl" />
              <div className="glass-card relative overflow-hidden p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                  <CompassLogo />
                  <div>
                    <div className="font-semibold text-text-primary">AI Compass</div>
                    <div className="text-sm text-text-secondary">Миссия проекта</div>
                  </div>
                </div>

                <blockquote className="mt-6 text-lg italic leading-relaxed text-text-secondary">
                  «Сделать искусственный интеллект понятным и доступным для каждого —
                  помочь людям находить свой курс в цифровом будущем.»
                </blockquote>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {values.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-xl border border-white/10 bg-night/40 p-4 transition-all duration-300 hover:border-brand-blue/30 hover:bg-brand-blue/5"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-sky">
                        {card.icon}
                      </div>
                      <div className="mt-2 font-semibold text-text-primary">{card.title}</div>
                      <div className="mt-0.5 text-sm text-text-secondary">{card.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
