'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { categories } from '@/lib/posts';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar glass reveal">
      <div className="container">
        <nav className="navbar-inner" aria-label="Glavna navigacija">
          <Link href="/" className="navbar-logo reveal" id="navbar-logo" aria-label="o0o0o0o početna">
            o0o0o0o
          </Link>

          <ul className="navbar-nav reveal" style={{ animationDelay: '0.1s' }} role="menubar">
            {categories.map((cat, i) => (
              <li key={cat.slug} role="none">
                <Link
                  href={`/${cat.slug}`}
                  role="menuitem"
                  className={pathname === `/${cat.slug}` ? 'active' : ''}
                  id={`nav-${cat.slug}`}
                  style={{ '--delay': `${i * 0.05}s` } as React.CSSProperties}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-search reveal glass" style={{ animationDelay: '0.2s' }} role="search">
            <Search className="search-icon" size={14} aria-hidden="true" />
            <input
              type="search"
              placeholder="Pretražite..."
              aria-label="Pretražite blog"
              id="search-input"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
