'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/london', label: 'London', icon: '🎡' },
  { href: '/paris', label: 'Paris', icon: '🗼' },
  { href: '/travel', label: 'Travel', icon: '✈️' },
  { href: '/packing', label: 'Packing', icon: '🧳' },
  { href: '/activities', label: 'Activities', icon: '📋' },
];

export function Navbar() {
  const pathname = usePathname();
  if (pathname === '/login') return null;

  return (
    <>
      {/* Desktop top bar */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center px-6 gap-1"
        style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <Link href="/" className="font-serif text-lg mr-6" style={{ color: 'var(--text)' }}>
          🌍 EuroTrip 2026
        </Link>
        <div className="flex gap-1 flex-1">
          {NAV_ITEMS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? 'var(--accent-light)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </nav>

      {/* Mobile bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
        style={{
          background: 'var(--card)',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
              style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="text-[10px] font-medium leading-none">{label}</span>
              {active && (
                <span
                  className="absolute top-0 w-8 h-0.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
