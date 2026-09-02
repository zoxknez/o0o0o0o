import Link from 'next/link';
import { categories, getPostsByCategory, getAllPosts } from '@/lib/posts';
import PaginatedPostGrid from '@/components/PaginatedPostGrid';
import {
  BookOpen,
  Terminal,
  Smartphone,
  Monitor,
  BookMarked,
  Gamepad2,
  Radio,
  Sparkles,
  Users,
  ArrowUpRight,
  Flame,
  ExternalLink,
} from 'lucide-react';

// Social Icon Components (SVG)
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const categoryCards = [
  {
    slug: 'tutorijali',
    icon: BookOpen,
    tagline: 'Praktični vodiči i korak-po-korak uputstva',
  },
  {
    slug: 'programi',
    icon: Terminal,
    tagline: 'Korisni softver, alati i aplikacije',
  },
  {
    slug: 'vesti',
    icon: Radio,
    tagline: 'Najnovija dešavanja i analize iz IT sveta',
  },
  {
    slug: 'android',
    icon: Smartphone,
    tagline: 'Mobilne aplikacije, APK i podešavanja',
  },
  {
    slug: 'operativni-sistemi',
    icon: Monitor,
    tagline: 'Windows, Linux i macOS optimizacija',
  },
  {
    slug: 'igre',
    icon: Gamepad2,
    tagline: 'Gaming svet, modovi i zabava',
  },
  {
    slug: 'casopisi',
    icon: BookMarked,
    tagline: 'Digitalna izdanja, PDF i literatura',
  },
  {
    slug: 'saveti',
    icon: Sparkles,
    tagline: 'Korisne prečice, produktivnost i rešenja',
  },
  {
    slug: 'zajednica',
    icon: Users,
    tagline: 'Diskusije, razmena znanja i podrška',
  },
];

export default function HomeCategories() {
  const allPosts = getAllPosts();
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="home-wrap">
      <h1 className="sr-only">o0o0o0o IT blog: tutorijali, vesti, programi i saveti</h1>

      {/* Ambient deep aura lighting */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* Grid of Categories */}
      <main className="bento-grid container" aria-label="Kategorije bloga">
        {categoryCards.map((cfg, i) => {
          const cat = categories.find((c) => c.slug === cfg.slug)!;
          const count = getPostsByCategory(cfg.slug).length;
          const IconComp = cfg.icon;

          return (
            <Link
              key={cfg.slug}
              href={`/${cfg.slug}`}
              className="bento-card shimmer"
              id={`home-cat-${cfg.slug}`}
              aria-label={`${cat.name} - ${count} objava`}
              style={{
                '--c': cat.color,
                animationDelay: `${0.04 + i * 0.03}s`,
              } as React.CSSProperties}
            >
              <div className="bento-noise" aria-hidden="true" />
              <div className="bento-glow" aria-hidden="true" />
              <div className="bento-line" aria-hidden="true" />

              <div className="bento-content">
                <div className="bento-top">
                  <div className="bento-icon-wrap" aria-hidden="true">
                    <IconComp size={24} className="bento-icon-svg" />
                  </div>
                  <span className="bento-count" aria-label={`${count} objava`}>
                    <span className="bento-count-dot" style={{ backgroundColor: cat.color }} />
                    <span className="bento-count-num">{count}</span>
                    <span className="bento-count-label">
                      {count === 1 ? 'objava' : count < 5 ? 'objave' : 'objava'}
                    </span>
                  </span>
                </div>

                <div className="bento-bottom">
                  <div className="bento-name-row">
                    <h2 className="bento-name">{cat.name}</h2>
                    <span className="bento-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <p className="bento-tagline">{cfg.tagline}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </main>

      {/* Latest Posts Section */}
      <section
        className="latest-posts-section container reveal"
        style={{ marginTop: '72px', marginBottom: '40px' }}
      >
        <div className="section-header-modern">
          <div className="section-header-left">
            <div className="section-icon-badge">
              <Flame size={20} className="section-flame-icon" aria-hidden="true" />
            </div>
            <div>
              <div className="section-kicker">SVEŽE PUBLIKACIJE</div>
              <h2 className="section-title-modern">Najnovije objave</h2>
            </div>
          </div>

          <div className="section-meta-pill glass">
            <span className="section-meta-dot" aria-hidden="true" />
            <span>{allPosts.length} objavljenih vodiča</span>
          </div>
        </div>

        <PaginatedPostGrid posts={sortedPosts} itemsPerPage={6} />
      </section>

      {/* Social Hub */}
      <section className="social-hub container reveal" aria-label="Društvene mreže i profil">
        <a
          href="https://github.com/zoxknez"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card github glass shimmer"
          id="hero-social-github"
        >
          <GithubIcon size={34} />
          <div className="social-card-text">
            <span className="social-card-label">GitHub</span>
            <span className="social-card-sub">@zoxknez • Open Source</span>
          </div>
          <ExternalLink size={16} className="social-card-ext" aria-hidden="true" />
        </a>

        <a
          href="https://x.com/KoronVirus"
          target="_blank"
          rel="noopener noreferrer"
          className="social-card x-platform glass shimmer"
          id="hero-social-x"
        >
          <XIcon size={34} />
          <div className="social-card-text">
            <span className="social-card-label">Twitter / X</span>
            <span className="social-card-sub">@KoronVirus • Vesti i najave</span>
          </div>
          <ExternalLink size={16} className="social-card-ext" aria-hidden="true" />
        </a>
      </section>

      <style>{`
        .home-wrap {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-top: clamp(86px, 8vw, 110px);
          padding-bottom: 50px;
          overflow-x: hidden;
          width: 100%;
        }

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 {
          width: 650px; height: 650px;
          background: radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%);
          top: -180px; left: -100px;
          animation: drift1 20s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
          bottom: 10%; right: -120px;
          animation: drift2 24s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%);
          top: 45%; left: 50%;
          transform: translate(-50%, -50%);
          animation: drift3 18s ease-in-out infinite alternate;
        }

        @keyframes drift1 { to { transform: translate(50px, 70px); } }
        @keyframes drift2 { to { transform: translate(-50px, -50px); } }
        @keyframes drift3 { to { transform: translate(-50%, -50%) scale(1.3); } }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
          padding-top: 14px;
          padding-bottom: 20px;
        }

        .bento-card {
          position: relative;
          background: rgba(11, 16, 28, 0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 22px;
          padding: 24px 26px;
          min-height: 185px;
          text-decoration: none;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      border-color 0.3s ease,
                      box-shadow 0.35s ease,
                      background 0.3s ease;
          animation: bentoPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .bento-card:focus-visible,
        .social-card:focus-visible {
          outline: 2px solid var(--c, var(--accent-cyan));
          outline-offset: 3px;
        }

        @keyframes bentoPop {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .bento-card:hover {
          transform: translateY(-7px);
          border-color: color-mix(in srgb, var(--c) 55%, rgba(255,255,255,0.25));
          background: rgba(15, 22, 38, 0.9);
          box-shadow: 0 24px 50px rgba(0,0,0,0.65),
                      0 0 35px color-mix(in srgb, var(--c) 20%, transparent);
        }

        .bento-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.25;
          pointer-events: none;
        }

        .bento-glow {
          position: absolute;
          top: -35px; right: -35px;
          width: 140px; height: 140px;
          background: radial-gradient(circle, var(--c) 0%, transparent 70%);
          opacity: 0.14;
          border-radius: 50%;
          transition: opacity 0.35s ease, transform 0.45s ease;
          pointer-events: none;
        }

        .bento-card:hover .bento-glow {
          opacity: 0.35;
          transform: scale(1.45);
        }

        .bento-line {
          position: absolute;
          top: 0; left: 24px;
          width: 40px; height: 3px;
          background: var(--c);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 0 12px var(--c);
          transition: width 0.3s ease;
        }

        .bento-card:hover .bento-line {
          width: 64px;
        }

        .bento-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .bento-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .bento-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--c) 14%, rgba(255,255,255,0.03));
          border: 1px solid color-mix(in srgb, var(--c) 35%, rgba(255,255,255,0.08));
          color: var(--c);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 16px color-mix(in srgb, var(--c) 18%, transparent);
        }

        .bento-card:hover .bento-icon-wrap {
          transform: scale(1.1) rotate(4deg);
          background: color-mix(in srgb, var(--c) 25%, rgba(255,255,255,0.06));
          border-color: color-mix(in srgb, var(--c) 70%, transparent);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--c) 40%, transparent);
        }

        .bento-icon-svg {
          filter: drop-shadow(0 0 8px var(--c));
        }

        .bento-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--c);
          background: color-mix(in srgb, var(--c) 10%, rgba(255,255,255,0.02));
          border: 1px solid color-mix(in srgb, var(--c) 28%, transparent);
          padding: 5px 11px;
          border-radius: 100px;
          font-weight: 600;
        }

        .bento-count-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 6px currentColor;
        }

        .bento-count-num {
          font-weight: 800;
        }

        .bento-count-label {
          opacity: 0.8;
          font-size: 0.68rem;
        }

        .bento-bottom {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .bento-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .bento-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -0.015em;
          transition: color 0.2s ease;
        }

        .bento-card:hover .bento-name {
          color: var(--c);
        }

        .bento-tagline {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
          transition: color 0.2s ease;
        }

        .bento-card:hover .bento-tagline {
          color: #cbd5e1;
        }

        .bento-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--c);
          opacity: 0.45;
          transform: translate(-3px, 3px);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .bento-card:hover .bento-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* ─── Modern Section Header ─── */
        .section-header-modern {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 34px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .section-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .section-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2));
          border: 1px solid rgba(0, 212, 255, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 212, 255, 0.25);
          flex-shrink: 0;
        }

        .section-flame-icon {
          color: var(--accent-cyan);
          filter: drop-shadow(0 0 6px var(--accent-cyan));
        }

        .section-kicker {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-cyan);
          letter-spacing: 0.14em;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .section-title-modern {
          font-size: 1.9rem;
          font-weight: 900;
          letter-spacing: -0.035em;
          margin: 0;
          color: var(--text-primary);
        }

        .section-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .section-meta-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        /* ─── Social Hub Styles ─── */
        .social-hub {
          margin-top: clamp(48px, 8vw, 80px);
          margin-bottom: 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          padding: 0;
          position: relative;
          z-index: 1;
        }

        .social-card {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 24px 30px;
          background: rgba(11, 16, 28, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 22px;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          min-width: 0;
          width: 100%;
          backdrop-filter: blur(18px);
          position: relative;
        }

        .social-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 50px rgba(0,0,0,0.6);
          background: rgba(16, 24, 42, 0.9);
        }

        .social-card.github:hover {
          border-color: rgba(255, 255, 255, 0.4);
          color: #fff;
          box-shadow: 0 0 35px rgba(255, 255, 255, 0.15);
        }
        .social-card.x-platform:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 35px rgba(0, 212, 255, 0.2);
        }

        .social-card-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .social-card-label {
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }

        .social-card-sub {
          font-size: 0.85rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
          opacity: 0.75;
        }

        .social-card-ext {
          opacity: 0.35;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .social-card:hover .social-card-ext {
          opacity: 1;
          transform: translate(2px, -2px);
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }

        @media (max-width: 640px) {
          .bento-grid { grid-template-columns: 1fr; gap: 12px; }
          .bento-card { min-height: 140px; padding: 18px 20px; border-radius: 16px; }
          .bento-icon-wrap { width: 42px; height: 42px; border-radius: 11px; }
          .bento-name { font-size: 1.1rem; }
          .bento-tagline { font-size: 0.78rem; }
          .social-hub { grid-template-columns: 1fr; gap: 14px; }
          .section-title-modern { font-size: 1.5rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb,
          .bento-card,
          .social-card,
          .bento-glow,
          .bento-icon-wrap {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
