import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { id: 'github', name: 'GitHub', url: 'https://github.com/zoxknez' },
    { id: 'x', name: 'X', url: 'https://x.com/KoronVirus' },
  ];

  return (
    <footer className="footer glass reveal" style={{ borderTop: 'none', background: 'transparent', padding: '100px 0 40px' }} role="contentinfo">
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Minimal Social Section */}
        <div className="footer-social-minimal reveal" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px', 
          marginBottom: '60px' 
        }}>
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass shimmer"
              id={`footer-social-${social.id}`}
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                padding: '10px 24px',
                borderRadius: '100px',
                transition: 'all 0.3s',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom glass" style={{ borderRadius: '100px', padding: '16px 32px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            © {currentYear} <span className="footer-bottom-brand text-gradient" style={{ fontWeight: 800 }}>o0o0o0o</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.6 }}>
            v2.0 · Built with Precision
          </span>
        </div>
      </div>
    </footer>
  );
}
