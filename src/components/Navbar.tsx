'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '@/lib/posts';

const MOBILE_MEDIA_QUERY = '(max-width: 1200px)';

type MenuState = {
  open: boolean;
  pathname: string;
};

function subscribeToMobileViewport(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  const listener = () => callback();

  mediaQuery.addEventListener('change', listener);
  return () => mediaQuery.removeEventListener('change', listener);
}

function getMobileViewportSnapshot() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export default function Navbar() {
  const pathname = usePathname();
  const isMobileViewport = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    () => false
  );
  const [menuState, setMenuState] = useState<MenuState>({ open: false, pathname: '' });
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isMenuOpen = isMobileViewport && menuState.open && menuState.pathname === pathname;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const nextVisible = !(currentScrollY > lastScrollYRef.current && currentScrollY > 100);
      lastScrollYRef.current = currentScrollY;

      if (nextVisible !== isVisibleRef.current) {
        isVisibleRef.current = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enable/disable scroll on body when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (!isMobileViewport) {
      return;
    }

    setMenuState((current) => {
      const isCurrentlyOpen =
        isMobileViewport && current.open && current.pathname === pathname;

      return {
        open: !isCurrentlyOpen,
        pathname,
      };
    });
  };

  const closeMenu = () => {
    setMenuState({ open: false, pathname });
  };

  const headerClasses = [
    'navbar',
    'glass',
    'reveal',
    !isVisible && !isMenuOpen ? 'navbar-hidden' : '',
    isMenuOpen ? 'menu-open' : ''
  ].filter(Boolean).join(' ');

  const mobileMenuClasses = [
    'mobile-menu',
    'glass',
    isMenuOpen ? 'open' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClasses}>
      <div className="container">
        <nav className="navbar-inner" aria-label="Glavna navigacija">
          <Link href="/" className="navbar-brand" id="navbar-logo" aria-label="o0o0o0o početna">
            <span className="navbar-logo">o0o0o0o</span>
            <span className="navbar-subtitle">IT BLOG</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar-nav desktop-only" role="menubar">
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

          <div className="navbar-actions">
            <form className="navbar-search glass desktop-only" role="search" action="/pretraga">
              <button type="submit" className="search-submit" aria-label="Pokrenite pretragu">
                <Search className="search-icon" size={14} aria-hidden="true" />
              </button>
              <input
                name="q"
                type="search"
                placeholder="Pretražite..."
                aria-label="Pretražite blog"
                id="search-input"
                enterKeyHint="search"
                minLength={2}
                required
              />
            </form>
            
            <button
              className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      </header>

      {/* Mobile Menu Overlay */}
      <div className={mobileMenuClasses} id="mobile-menu" aria-hidden={!isMenuOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-search-container">
            <form className="navbar-search glass" role="search" action="/pretraga" onSubmit={closeMenu}>
              <button type="submit" className="search-submit" aria-label="Pokrenite pretragu">
                <Search className="search-icon" size={16} aria-hidden="true" />
              </button>
              <input
                name="q"
                type="search"
                placeholder="Pretražite blog..."
                aria-label="Pretražite blog"
                id="mobile-search-input"
                enterKeyHint="search"
                minLength={2}
                required
              />
            </form>
          </div>
          <ul className="mobile-nav">
            {categories.map((cat, i) => (
              <li key={cat.slug} className="reveal-item" style={{ '--delay': `${i * 0.05 + 0.1}s` } as React.CSSProperties}>
                <Link
                  href={`/${cat.slug}`}
                  className={pathname === `/${cat.slug}` ? 'active' : ''}
                  onClick={closeMenu}
                >
                  <span className="cat-info">
                    <span className="cat-name">{cat.name}</span>
                    <span className="cat-desc">{cat.description}</span>
                  </span>
                  <span className="cat-dot" style={{ backgroundColor: cat.color }}></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-footer">
            <p>© 2026 o0o0o0o IT Blog. Sva prava zadržana.</p>
          </div>
        </div>
      </div>
    </>
  );
}
