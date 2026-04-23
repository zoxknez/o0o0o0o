import Link from 'next/link';
import { categories, getPostsByCategory, getAllPosts } from '@/lib/posts';
import PaginatedPostGrid from '@/components/PaginatedPostGrid';

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

const categoryConfig = [
  {
    slug: 'tutorijali',
    emoji: '📚',
    span: 'col-2',
    tagline: 'Uči. Primeni. Napreduj.',
  },
  {
    slug: 'vesti',
    emoji: '📡',
    span: 'col-1',
    tagline: 'Budi u toku',
  },
  {
    slug: 'programi',
    emoji: '⚙️',
    span: 'col-1',
    tagline: 'Alati koji rade za tebe',
  },
  {
    slug: 'android',
    emoji: '🤖',
    span: 'col-1',
    tagline: 'Svet u tvom džepu',
  },
  {
    slug: 'igre',
    emoji: '🎮',
    span: 'col-1',
    tagline: 'Igraj. Istraži. Uživaj.',
  },
  {
    slug: 'operativni-sistemi',
    emoji: '🖥️',
    span: 'col-2',
    tagline: 'Tvoj OS, tvoja pravila',
  },
  {
    slug: 'casopisi',
    emoji: '📖',
    span: 'col-1',
    tagline: 'Čitaj znanje',
  },
  {
    slug: 'saveti',
    emoji: '💡',
    span: 'col-1',
    tagline: 'Sitni trikovi, veliki rezultati',
  },
  {
    slug: 'zajednica',
    emoji: '👥',
    span: 'col-2',
    tagline: 'Zajedno rastemo',
  },
];

export default function HomeCategories() {
  return (
    <div className="home-wrap">
      <h1 className="sr-only">o0o0o0o IT blog: tutorijali, vesti, programi i saveti</h1>

      {/* ── Ambient background orbs ── */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* ── Prism Hero ── */}
      <header className="home-header home-hero reveal">
        {/* Dynamic Mesh Background */}
        <div className="liquid-bg" style={{ 
          background: `radial-gradient(circle at 50% 50%, var(--accent-cyan)15 0%, transparent 60%),
                       radial-gradient(circle at 80% 20%, var(--accent-purple)10 0%, transparent 40%)`,
          opacity: 0.4
        }} aria-hidden="true" />

        <div className="home-header-inner">
        </div>
      </header>

      {/* ── Bento grid ── */}
      <main className="bento-grid container" aria-label="Kategorije bloga">
        {categoryConfig.map((cfg, i) => {
          const cat = categories.find((c) => c.slug === cfg.slug)!;
          const count = getPostsByCategory(cfg.slug).length;

          return (
            <Link
              key={cfg.slug}
              href={`/${cfg.slug}`}
              className={`bento-card shimmer ${cfg.span}`}
              id={`home-cat-${cfg.slug}`}
              aria-label={`${cat.name} - ${count} objava`}
              style={{
                '--c': cat.color,
                animationDelay: `${0.1 + i * 0.05}s`,
              } as React.CSSProperties}
            >
              <div className="bento-noise" aria-hidden="true" />
              <div className="bento-glow" aria-hidden="true" />
              <div className="bento-line" aria-hidden="true" />

              <div className="bento-content">
                <div className="bento-top">
                  <span className="bento-emoji" aria-hidden="true">
                    {cfg.emoji}
                  </span>
                  <span className="bento-count" aria-label={`${count} objava`}>
                    {String(count).padStart(2, '0')}
                  </span>
                </div>

                <div className="bento-bottom">
                  <div className="bento-name">{cat.name}</div>
                  <div className="bento-tagline">{cfg.tagline}</div>
                </div>
              </div>

              <div className="bento-arrow" aria-hidden="true">→</div>
            </Link>
          );
        })}
      </main>

      {/* ── Latest Posts Section ── */}
      <section className="latest-posts-section container reveal" style={{ marginTop: '80px', marginBottom: '40px' }}>
        <div className="section-header" style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '40px', height: '40px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0, 212, 255, 0.2)',
            flexShrink: 0
          }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem' }}>⚡</span>
          </div>
          <h2 className="section-title" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
            Najnovije objave
          </h2>
          <div className="section-line" style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--border), transparent)', marginTop: '4px' }} />
        </div>
        
        <PaginatedPostGrid 
          posts={[...getAllPosts()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())} 
          itemsPerPage={6} 
        />
      </section>

      {/* ── Social Hub ── */}
      <section className="social-hub container reveal">
        <a 
          href="https://github.com/zoxknez" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-card github glass shimmer"
          id="hero-social-github"
        >
          <GithubIcon size={36} />
          <div className="social-card-text">
            <span className="social-card-label">GitHub</span>
            <span className="social-card-sub">@zoxknez</span>
          </div>
        </a>
        
        <a 
          href="https://x.com/KoronVirus" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-card x-platform glass shimmer"
          id="hero-social-x"
        >
          <XIcon size={36} />
          <div className="social-card-text">
            <span className="social-card-label">Twitter / X</span>
            <span className="social-card-sub">@KoronVirus</span>
          </div>
        </a>
      </section>

      <style>{`
        .home-wrap {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-bottom: 40px;
          overflow-x: hidden;
          width: 100%;
        }

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%);
          top: -200px; left: -100px;
          animation: drift1 18s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
          bottom: 0; right: -120px;
          animation: drift2 22s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: drift3 15s ease-in-out infinite alternate;
        }

        @keyframes drift1 { to { transform: translate(60px, 80px); } }
        @keyframes drift2 { to { transform: translate(-40px, -60px); } }
        @keyframes drift3 { to { transform: translate(-50%, -50%) scale(1.4); } }

        .home-header {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .home-hero {
          overflow: hidden;
          padding: clamp(24px, 6vw, 72px) 0 clamp(20px, 4vw, 40px);
        }
        .home-header-inner {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          min-height: 8px;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          position: relative;
          z-index: 1;
          padding-top: 0;
          padding-bottom: 32px;
        }

        .col-1 { grid-column: span 1; }
        .col-2 { grid-column: span 2; }

        .bento-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          min-height: 200px;
          text-decoration: none;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      border-color 0.25s ease,
                      box-shadow 0.3s ease;
          animation: bentoPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .bento-card:focus-visible,
        .social-card:focus-visible {
          outline: 2px solid var(--c, var(--accent-cyan));
          outline-offset: 3px;
        }

        @keyframes bentoPop {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }

        .bento-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--c);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5),
                      inset 0 0 40px color-mix(in srgb, var(--c) 10%, transparent);
        }

        .bento-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .bento-glow {
          position: absolute;
          top: -40px; right: -40px;
          width: 140px; height: 140px;
          background: radial-gradient(circle, var(--c) 0%, transparent 70%);
          opacity: 0.12;
          border-radius: 50%;
          transition: opacity 0.3s ease, transform 0.4s ease;
        }

        .bento-card:hover .bento-glow {
          opacity: 0.22;
          transform: scale(1.3);
        }

        .bento-line {
          position: absolute;
          top: 0; left: 28px;
          width: 40px; height: 3px;
          background: var(--c);
          border-radius: 0 0 4px 4px;
        }

        .bento-card.col-2 .bento-line {
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
        }

        .bento-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        
        /* Centered style for wide cards */
        .bento-card.col-2 .bento-content {
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .bento-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
        }

        .bento-card.col-2 .bento-top {
          justify-content: center;
        }

        .bento-emoji {
          font-size: 2.6rem;
          line-height: 1;
          filter: drop-shadow(0 0 12px var(--c));
        }

        .bento-count {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--c);
          background: color-mix(in srgb, var(--c) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 25%, transparent);
          padding: 4px 9px;
          border-radius: 100px;
        }

        .bento-card.col-2 .bento-count {
          position: absolute;
          top: 0;
          right: 0;
        }

        .bento-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 5px;
        }

        .bento-tagline {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .bento-arrow {
          position: absolute;
          bottom: 22px;
          right: 24px;
          font-size: 1.1rem;
          color: var(--c);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .bento-card:hover .bento-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ─── Social Hub Styles ─── */
        .social-hub {
          margin-top: clamp(48px, 8vw, 80px);
          margin-bottom: 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .social-card {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 28px 32px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 30px;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          min-width: 0;
          width: 100%;
          backdrop-filter: blur(20px);
          justify-content: center;
        }

        .social-card:hover {
          transform: translateY(-12px) scale(1.05);
          box-shadow: 0 40px 80px rgba(0,0,0,0.7);
          background: rgba(255, 255, 255, 0.04);
        }

        .social-card.github:hover { border-color: #fff; color: #fff; box-shadow: 0 0 40px rgba(255,255,255,0.1); }
        .social-card.x-platform:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); box-shadow: 0 0 40px rgba(0,212,255,0.1); }

        .social-card-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .social-card-label {
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
        }

        .social-card-sub {
          font-size: 0.9rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
          opacity: 0.6;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1100px) {
          .bento-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 850px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-card { min-height: 160px; }
          .home-header { padding: 48px 24px 32px; }
        }

        @media (max-width: 768px) {
          .orb {
            filter: blur(90px);
            opacity: 0.75;
          }
          .orb-1,
          .orb-2 {
            width: 360px;
            height: 360px;
          }
          .orb-3 {
            width: 220px;
            height: 220px;
          }
          .home-wrap {
            padding-bottom: 56px;
          }
          .home-hero {
            padding-top: 100px;
            padding-bottom: 12px;
          }
          .bento-grid {
            gap: 14px;
          }
          .bento-card {
            min-height: 172px;
            padding: 22px;
            border-radius: 18px;
          }
          .bento-name {
            font-size: 1.1rem;
          }
          .bento-tagline {
            font-size: 0.72rem;
            line-height: 1.5;
          }
          .bento-arrow {
            opacity: 1;
            transform: translateX(0);
          }
          .social-hub {
            gap: 16px;
            padding: 0 16px;
          }
          .social-card {
            padding: 24px;
            justify-content: flex-start;
            gap: 18px;
            border-radius: 24px;
          }
          .social-card-label {
            font-size: 1.1rem;
          }
          .social-card-sub {
            font-size: 0.8rem;
          }
          .latest-posts-section {
            margin-top: 56px !important;
            padding: 0 12px !important;
          }
          .latest-posts-section .section-header {
            gap: 12px !important;
            margin-bottom: 20px !important;
          }
          .latest-posts-section .section-header > div:first-child {
            width: 32px !important;
            height: 32px !important;
            border-radius: 8px !important;
          }
          .latest-posts-section .section-header > div:first-child span {
            font-size: 0.9rem !important;
          }
          .latest-posts-section .section-title {
            font-size: 1.4rem !important;
            line-height: 1 !important;
          }
          .section-line {
            display: none !important;
          }
        }

        @media (max-width: 580px) {
          .social-hub {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 0 12px;
          }
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            padding: 0 12px;
          }
          .bento-card {
            min-height: 130px;
            padding: 14px;
            border-radius: 16px;
          }
          .bento-emoji {
            font-size: 1.6rem;
          }
          .bento-name {
            font-size: 0.9rem;
            margin-bottom: 2px;
          }
          .bento-tagline {
            font-size: 0.62rem;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .bento-count {
            font-size: 0.58rem;
            padding: 2px 6px;
          }
          .bento-line {
            left: 14px;
            width: 24px;
          }
          .bento-card.col-2 .bento-line {
            width: 40px;
          }
          .latest-posts-section {
            padding: 0 12px !important;
            margin-top: 40px !important;
          }
          .section-title {
            font-size: 1.4rem !important;
          }
          .social-card {
            padding: 16px;
            border-radius: 20px;
          }
          .social-card-label {
            font-size: 1.1rem;
          }
          .social-card-sub {
            font-size: 0.75rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb,
          .bento-card,
          .social-card,
          .bento-glow {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
