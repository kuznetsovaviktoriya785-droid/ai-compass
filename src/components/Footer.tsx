import CompassLogo from './CompassLogo'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <CompassLogo className="h-8 w-8" iconClassName="h-4 w-4" />
            <span className="font-semibold text-text-primary">AI Compass</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { href: '#about', label: 'О проекте' },
              { href: '#features', label: 'Возможности' },
              { href: '#start', label: 'Начать' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-brand-sky"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-text-secondary/60">
            © {new Date().getFullYear()} AI Compass
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-medium text-text-primary">Связаться со мной</p>
          <div className="mt-3 flex flex-col items-center justify-center gap-2 text-sm text-text-secondary sm:flex-row sm:gap-6">
            <a
              href="https://t.me/Victoriya_osobennaya"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand-gold focus-visible:text-brand-gold"
            >
              Telegram: @Victoriya_osobennaya
            </a>
            <a
              href="mailto:V_lapochka@mail.ru"
              className="transition-colors hover:text-brand-gold focus-visible:text-brand-gold"
            >
              Email: V_lapochka@mail.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
