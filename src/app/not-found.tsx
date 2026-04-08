import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Stranica nije pronađena',
};

export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found" role="main" aria-label="Stranica nije pronađena">
        <div className="not-found-code" aria-label="Greška 404">404</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Stranica nije pronađena</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
          Izgleda da ova stranica ne postoji ili je premeštena. Vratite se na početnu.
        </p>
        <Link href="/" className="btn-primary" id="not-found-home-btn" style={{ marginTop: '8px' }}>
          Vratite se na početnu
        </Link>
      </div>
    </div>
  );
}
