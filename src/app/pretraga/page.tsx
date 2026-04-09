import type { Metadata } from 'next';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { categories, getLatestPosts, searchPosts } from '@/lib/posts';

type SearchParams = {
  q?: string;
};

function getResultLabel(count: number) {
  if (count === 1) {
    return 'rezultat';
  }

  return 'rezultata';
}

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<SearchParams> }
): Promise<Metadata> {
  const { q = '' } = await searchParams;
  const query = q.trim();

  if (!query) {
    return {
      title: 'Pretraga',
      description: 'Pretražite objave na o0o0o0o IT blogu.',
    };
  }

  return {
    title: `Pretraga: ${query}`,
    description: `Rezultati pretrage za "${query}" na o0o0o0o IT blogu.`,
  };
}

export default async function SearchPage(
  { searchParams }: { searchParams: Promise<SearchParams> }
) {
  const { q = '' } = await searchParams;
  const query = q.trim();
  const results = query ? searchPosts(query) : [];
  const suggestedPosts = getLatestPosts(6);

  return (
    <section className="section" aria-label="Pretraga bloga">
      <div className="container" style={{ display: 'grid', gap: '32px' }}>
        <div
          className="glass-prism"
          style={{
            padding: '32px',
            borderRadius: '24px',
            display: 'grid',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
            }}
          >
            Pretraga
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1 }}>
            {query ? `Rezultati za "${query}"` : 'Pretražite objave'}
          </h1>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px' }}>
            {query
              ? `Pronađeno je ${results.length} ${getResultLabel(results.length)} za uneti pojam.`
              : 'Unesite naziv teme, aplikacije, kategorije ili ključnu reč da brzo pronađete odgovarajuću objavu.'}
          </p>

          <form
            action="/pretraga"
            method="get"
            role="search"
            className="glass"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              padding: '14px 16px',
              borderRadius: '18px',
            }}
          >
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Na primer: android, gmail, tutorijali..."
              aria-label="Pretražite objave"
              enterKeyHint="search"
              minLength={2}
              required
              style={{
                flex: '1 1 280px',
                minWidth: 0,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
              Pretraži
            </button>
          </form>

          {!query ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="glass"
                  style={{
                    textDecoration: 'none',
                    color: category.color,
                    padding: '8px 14px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {query && results.length > 0 ? (
          <div className="posts-grid">
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : null}

        {query && results.length === 0 ? (
          <div
            className="glass-prism"
            style={{
              padding: '28px',
              borderRadius: '24px',
              display: 'grid',
              gap: '20px',
            }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>
              Nema direktnog poklapanja za uneti pojam. Probajte kraći izraz ili otvorite neku od kategorija ispod.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="glass"
                  style={{
                    textDecoration: 'none',
                    color: category.color,
                    padding: '8px 14px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="posts-grid">
              {suggestedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : null}

        {!query ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Najnovije objave</h2>
            <div className="posts-grid">
              {suggestedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
