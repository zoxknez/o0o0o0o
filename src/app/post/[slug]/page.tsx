import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getCategoryInfo, getAllPosts } from '@/lib/posts';
import { Clock, Calendar, Tag, ChevronRight, ArrowLeft } from 'lucide-react';
import ReadingProgress from '@/components/ReadingProgress';

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Nije pronađeno' };
  return {
    title: {
      absolute: `${post.title} - o0o0o0o`
    },
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const cat = getCategoryInfo(post.category);

  return (
    <article className="post-page">
      <ReadingProgress color={cat?.color || 'var(--accent-cyan)'} />
      
      {/* ── Ambient Reading Layer ── */}
      <div className="article-ambient" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="light-beam" style={{ left: '-5%', top: '10%' }} />
        <div className="light-beam" style={{ right: '-5%', top: '40%', animationDelay: '-5s', background: `linear-gradient(to bottom, ${cat?.color || 'var(--accent-cyan)'}, transparent)` }} />
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? cat?.color || 'var(--accent-cyan)' : '#fff',
              '--duration': `${15 + Math.random() * 15}s`
            } as any} 
          />
        ))}
      </div>
      
      {/* ── Prism Header ── */}
      <header
        className="post-header reveal"
        aria-label="Zaglavlje objave"
        style={{ 
          position: 'relative', 
          overflow: 'hidden',
          padding: '120px 0 80px',
          background: 'var(--bg-primary)'
        }}
      >
        {/* Dynamic Mesh Background */}
        <div className="liquid-bg" style={{ 
          background: cat 
            ? `radial-gradient(circle at 30% 20%, ${cat.color}25 0%, transparent 40%),
               radial-gradient(circle at 70% 60%, ${cat.color}15 0%, transparent 45%)`
            : `radial-gradient(circle at 30% 20%, var(--accent-cyan)20 0%, transparent 40%)`
        }} aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="editorial-grid" style={{ flexDirection: 'column', gap: '20px' }}>
            
            {/* Breadcrumb Pilled */}
            <nav className="breadcrumb glass-prism reveal stagger-1" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '100px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Početna</Link>
              <ChevronRight size={10} style={{ opacity: 0.5 }} />
              {cat && (
                <>
                  <Link href={`/${post.category}`} style={{ color: cat.color, textDecoration: 'none', fontWeight: 700 }}>{cat.name}</Link>
                  <ChevronRight size={10} style={{ opacity: 0.5 }} />
                </>
              )}
              <span style={{ opacity: 0.8 }}>Članak</span>
            </nav>

            {/* Title Block */}
            <div style={{ maxWidth: '900px' }}>
              <h1 className="post-title reveal stagger-2" style={{ 
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '-0.06em',
                lineHeight: 0.95,
                marginBottom: '32px',
                color: 'var(--text-primary)',
                textShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                {post.title}
              </h1>

              {/* Meta Data Prism */}
              <div className="reveal stagger-3 glass-prism" style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '24px',
                padding: '16px 32px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={14} style={{ color: cat?.color || 'var(--accent-cyan)' }} />
                  {new Date(post.date).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} style={{ color: cat?.color || 'var(--accent-cyan)' }} />
                  {post.readTime}
                </span>
                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
                <span>
                  Autor: <strong style={{ color: cat?.color || 'var(--accent-cyan)' }}>{post.author}</strong>
                </span>
              </div>

              {/* Tags Cloud */}
              <div className="reveal stagger-4" style={{ marginTop: '32px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {post.tags.map((tag) => (
                  <span key={tag} className="glass-prism" style={{ 
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container" style={{ padding: '60px 24px 100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Excerpt highlight */}
          <div
            className="reveal glass-prism stagger-4"
            style={{
              animationDelay: '0.4s',
              borderLeft: `4px solid ${cat?.color || 'var(--accent-cyan)'}`,
              padding: '40px',
              marginBottom: '80px',
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              lineHeight: '1.7',
              fontStyle: 'italic',
              fontWeight: 500,
              boxShadow: 'var(--shadow-premium)',
              position: 'relative',
              zIndex: 1
            }}
            aria-label="Kratak opis objave"
          >
            {post.excerpt}
          </div>

          {/* Main content */}
          <div className="post-content reveal animate-in stagger-5" style={{ position: 'relative', zIndex: 1 }} aria-label="Sadržaj objave">
            <p className="reveal-on-scroll">{post.content}</p>
            
            <div className="glass-prism" style={{ 
              margin: '80px 0', 
              padding: '60px', 
              borderRadius: 'var(--radius-xl)',
              background: cat ? `${cat.color}05` : 'rgba(255,255,255,0.02)',
              position: 'relative'
            }}>
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '-20px', 
                  left: '40px', 
                  background: cat?.color || 'var(--accent-cyan)', 
                  color: '#000', 
                  padding: '6px 16px', 
                  borderRadius: '100px', 
                  fontWeight: 800, 
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: `0 10px 20px ${cat?.color || 'var(--accent-cyan)'}40`
                }}
              >
                INSIGHT
              </div>
              <h2 style={{ marginTop: 0, fontSize: '1.8rem' }}>O čemu se radi?</h2>
              <p className="reveal-on-scroll">
                Ova objava pripada kategoriji <strong>{cat?.name}</strong> i pokriva sve ključne aspekte teme.
                Svaka sekcija je pažljivo pripremljena kako bi vam pružila jasne informacije i korisne savete.
              </p>
              <p className="reveal-on-scroll" style={{ marginBottom: 0 }}>
                Pratite <strong>o0o0o0o blog</strong> za redovna ažuriranja, tutorijale i najnovije vesti iz sveta IT tehnologije.
                Naš tim je posvećen pružanju tačnih i korisnih informacija na srpskom jeziku.
              </p>
            </div>

            <h2 className="reveal-on-scroll">Zaključak</h2>
            <p className="reveal-on-scroll">
              Nadam se da vam je ovaj članak bio od pomoći. Slobodno ostavite komentar ili podelite ovaj sadržaj
              sa prijateljima koji bi mogli imati koristi od ovih informacija.
            </p>
            <p className="reveal-on-scroll">
              Za više sličnih sadržaja, posetite 
              {cat && (
                <Link href={`/${post.category}`} style={{ 
                  color: cat.color, 
                  textDecoration: 'none', 
                  margin: '0 8px', 
                  fontWeight: 700,
                  borderBottom: `2px solid ${cat.color}30`
                }}>
                  {cat.name}
                </Link>
              )}
              kategoriju.
            </p>
          </div>

          {/* Back button */}
          <div className="reveal stagger-5" style={{ 
            marginTop: '100px', 
            paddingTop: '60px', 
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <Link
              href={cat ? `/${post.category}` : '/'}
              className="glass-prism stagger-5"
              id="post-back-btn"
              style={{ padding: '16px 40px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', fontWeight: 700 }}
            >
              <ArrowLeft size={18} aria-hidden="true" style={{ color: cat?.color || 'var(--accent-cyan)' }} />
              Povratak na {cat?.name || 'početnu'}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

