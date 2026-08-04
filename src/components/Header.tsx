import { useState } from 'react'
import { useScrollHeader } from '../hooks/useScrollHeader'
import CompassLogo from './CompassLogo'

const navLinks = [
  { href: '#about', label: 'О проекте' },
  { href: '#features', label: 'Возможности' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrollHeader()

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-night/90 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'border-transparent bg-night/40 backdrop-blur-lg'
      }`}
    >
      <div className="site-header-inner mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="site-logo flex items-center gap-2.5">
          <CompassLogo />

          <span className="text-lg font-bold tracking-tight text-text-primary">
            AI Compass
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="site-nav-link text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#start"
            className="site-header-button btn-glow rounded-full bg-gradient-to-r from-brand-blue to-brand-sky px-6 py-2.5 text-sm font-semibold text-white"
          >
            Начать
          </a>
        </nav>

        <button
          type="button"
          className="site-menu-button inline-flex items-center justify-center rounded-lg p-2 text-text-primary md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="site-mobile-menu mx-4 border-t border-white/10 bg-night/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#start"
              onClick={handleNavClick}
              className="site-header-button btn-glow mt-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-sky px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Начать
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}