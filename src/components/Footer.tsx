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
      </div>
    </footer>
  )
}
