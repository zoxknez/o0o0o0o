'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '@/lib/posts';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Enable/disable scroll on body when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Avoid hydration mismatch by rendering a stable structure
  const headerClasses = [
    'navbar',
    'glass',
    'reveal',
    !isVisible ? 'navbar-hidden' : '',
    isMenuOpen ? 'menu-open' : ''
  ].filter(Boolean).join(' ');

  const mobileMenuClasses = [
    'mobile-menu',
    'glass',
    isMenuOpen ? 'open' : ''
  ].filter(Boolean).join(' ');

  if (!mounted) {
    return (
      <header className="navbar glass">
        <div className="container">
          <nav className="navbar-inner">
            <div className="navbar-brand">
              <span className="navbar-logo">o0o0o0o</span>
              <span className="navbar-subtitle">IT BLOG</span>
            </div>
          </nav>
        </div>
      </header>
    );
  }

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
            <div className="navbar-search glass desktop-only" role="search">
              <Search className="search-icon" size={14} aria-hidden="true" />
              <input
                type="search"
                placeholder="Pretražite..."
                aria-label="Pretražite blog"
                id="search-input"
              />
            </div>
            
            <button 
              className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      </header>

      {/* Mobile Menu Overlay */}
      <div className={mobileMenuClasses}>
        <div className="mobile-menu-inner">
          <div className="mobile-search-container">
            <div className="navbar-search glass" role="search">
              <Search className="search-icon" size={16} aria-hidden="true" />
              <input
                type="search"
                placeholder="Pretražite blog..."
                aria-label="Pretražite blog"
              />
            </div>
          </div>
          <ul className="mobile-nav">
            {categories.map((cat, i) => (
              <li key={cat.slug} className="reveal-item" style={{ '--delay': `${i * 0.05 + 0.1}s` } as React.CSSProperties}>
                <Link
                  href={`/${cat.slug}`}
                  className={pathname === `/${cat.slug}` ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
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

