import Link from 'next/link';
import { categories } from '@/lib/posts';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-premium" role="contentinfo">
      <div className="container footer-inner">
        {/* Top footer columns */}
        <div className="footer-columns">
          {/* Brand Col */}
          <div className="footer-col footer-col-brand">
            <Link href="/" className="footer-brand" aria-label="o0o0o0o početna">
              <span className="navbar-logo">o0o0o0o</span>
              <span className="navbar-subtitle">IT BLOG</span>
            </Link>
            <p className="footer-desc">
              Najsavremeniji IT portal i blog na srpskom jeziku. Detaljni tehnički vodiči, operativni sistemi, programiranje, alati i novosti iz sveta tehnologije.
            </p>
            <div className="footer-status-badge glass">
              <span className="footer-status-dot" aria-hidden="true" />
              <span>Verzija 2026 • Redovno ažurirano</span>
            </div>
          </div>

          {/* Quick categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Rubrike</h4>
            <ul className="footer-links">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="footer-link">
                    <span className="footer-link-dot" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Istražite</h4>
            <ul className="footer-links">
              {categories.slice(5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="footer-link">
                    <span className="footer-link-dot" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pretraga" className="footer-link footer-link-search">
                  🔍 Pretraga celog bloga
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Povezivanje</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://github.com/zoxknez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub @zoxknez
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/KoronVirus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Twitter / X @KoronVirus
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} <span className="text-gradient" style={{ fontWeight: 800 }}>o0o0o0o</span>. Sva prava zadržana.
          </p>
          <div className="footer-tag">
            <span className="footer-dot-tech" />
            <span>Optimizovano za brzinu i performanse</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
