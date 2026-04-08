export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass reveal" style={{ borderTop: 'none', background: 'transparent', padding: '60px 0 40px' }} role="contentinfo">
      <div className="container" style={{ position: 'relative' }}>
        
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
