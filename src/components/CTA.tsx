import ScrollReveal from './ScrollReveal'

export default function CTA() {
  return (
    <section id="start" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/20 via-night-light to-brand-gold/10 px-6 py-16 text-center shadow-glow sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(22,139,255,0.15)_0%,transparent_50%)]" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-blue/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-brand-gold/10 blur-2xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Готовы начать путешествие в{' '}
                <span className="text-gradient">мир ИИ</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                Присоединяйтесь к AI Compass и откройте для себя лучшие инструменты
                и практики искусственного интеллекта уже сегодня.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-sky px-8 py-4 text-base font-semibold text-white transition-all hover:brightness-110 sm:w-auto"
                >
                  Начать
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <a
                  href="#features"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-night-light/40 px-8 py-4 text-base font-semibold text-text-primary backdrop-blur-sm transition-all hover:border-brand-blue/40 hover:bg-night-light/60 sm:w-auto"
                >
                  Посмотреть возможности
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
