import { Outlet, useLocation } from 'react-router-dom';
import { logo, socialLinks } from '../data/siteData';
import { useTheme } from '../context/ThemeContext';
import DrawingsNav from './DrawingsNav';
import Nav from './Nav';

export default function Layout() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const showDrawingNav = location.pathname.startsWith('/drawings');

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-8">
      <header className="mb-8">
        <div className="flex flex-col items-center justify-between mb-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="self-end rounded-lg border border-[color:var(--ui-surface-border)] bg-[var(--ui-surface-bg)] p-2 text-[color:var(--ui-page-text)] hover:border-[color:var(--ui-accent-hover)]"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414l-.707-.707zM5 8a1 1 0 100-2H4a1 1 0 100 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 border-b border-[color:var(--ui-divider)] pb-6">
          <img src={logo} alt="Elliot Langston" width={191} height={160} className="h-[160px] w-[191px] object-contain" />
          <Nav />
          {showDrawingNav && <DrawingsNav />}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer id="contact" className="mt-12 border-t border-[color:var(--ui-divider)] pt-6">
        <div className="flex flex-wrap items-center justify-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="rounded-lg border border-[color:var(--ui-surface-border)] bg-[var(--ui-surface-bg)] p-2 hover:border-[color:var(--ui-accent-hover)]"
              aria-label={link.label}
            >
              <img src={link.icon} alt={link.label} className="h-6 w-6" />
            </a>
          ))}
          <a
            href="mailto:kaijualotlart@gmail.com,kaiju@kaijualotl.com?subject=Question%20about%20your%20website&body=Hello,%20I%20have%20a%20question%20about%20your%20website."
            className="text-base text-[color:var(--ui-link)] hover:text-[color:var(--ui-link-hover)]"
          >
            kaiju@kaijualotl.com
          </a>
        </div>
      </footer>
    </div>
  );
}
