import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getCategoryInfo, getAllPosts } from '@/lib/posts';
import { Clock, Calendar, ChevronRight, ArrowLeft } from 'lucide-react';
import ReadingProgress from '@/components/ReadingProgress';
import MarkdownContent from '@/components/MarkdownContent';

type Params = { slug: string };

const articleParticles: CSSProperties[] = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 17 + 9) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  '--duration': `${15 + ((i * 7) % 15)}s`,
}));

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

  // Extract first image from markdown or fallback
  const imgMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  let postImage = imgMatch ? imgMatch[1] : '/images/ai-chat.jpg';
  if (postImage.endsWith('.svg')) {
    const pngAlternative = postImage.replace(/\.svg$/, '.png');
    postImage = pngAlternative;
  }

  return {
    title: {
      absolute: `${post.title} - o0o0o0o`
    },
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    creator: post.author,
    alternates: {
      canonical: `/post/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/post/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [postImage],
    }
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
      <div className="article-ambient">
        <div className="light-beam article-beam-left" />
        <div className="light-beam" style={{ right: '-5%', top: '40%', animationDelay: '-5s', background: `linear-gradient(to bottom, ${cat?.color || 'var(--accent-cyan)'}, transparent)` }} />
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              ...articleParticles[i],
              background: i % 2 === 0 ? cat?.color || 'var(--accent-cyan)' : '#fff',
            }}
          />
        ))}
      </div>
      
      {/* ── Prism Header ── */}
      <header
        className="post-header post-hero reveal"
        aria-label="Zaglavlje objave"
      >
        {/* Dynamic Mesh Background */}
        <div className="liquid-bg" style={{ 
          background: cat 
            ? `radial-gradient(circle at 30% 20%, ${cat.color}25 0%, transparent 40%),
               radial-gradient(circle at 70% 60%, ${cat.color}15 0%, transparent 45%)`
            : `radial-gradient(circle at 30% 20%, var(--accent-cyan)20 0%, transparent 40%)`
        }} aria-hidden="true" />

        <div className="container post-hero-inner">
          <div className="editorial-grid post-hero-grid">
            
            {/* Breadcrumb Pilled */}
            <nav className="breadcrumb post-breadcrumb glass-prism reveal stagger-1">
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
            <div className="post-hero-copy">
              <h1 className="post-title post-hero-title reveal stagger-2">
                {post.title}
              </h1>

              {/* Meta Data Prism */}
              <div className="reveal stagger-3 glass-prism post-hero-meta">
                <span className="post-meta-chip">
                  <Calendar size={14} style={{ color: cat?.color || 'var(--accent-cyan)' }} />
                  {new Date(post.date).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="post-meta-chip">
                  <Clock size={14} style={{ color: cat?.color || 'var(--accent-cyan)' }} />
                  {post.readTime}
                </span>
                <div className="post-meta-divider" />
                <span className="post-meta-chip">
                  Autor: <strong style={{ color: cat?.color || 'var(--accent-cyan)' }}>{post.author}</strong>
                </span>
              </div>

              {/* Tags Cloud */}
              <div className="reveal stagger-4 post-tags-cloud">
                {post.tags.map((tag) => (
                  <span key={tag} className="glass-prism post-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container post-shell">
        <div className="post-body">
          {/* Excerpt highlight */}
          <div
            className="reveal glass-prism stagger-4 post-excerpt-card"
            style={{
              animationDelay: '0.4s',
              borderLeft: `4px solid ${cat?.color || 'var(--accent-cyan)'}`,
              boxShadow: 'var(--shadow-premium)',
              position: 'relative',
              zIndex: 1
            }}
            aria-label="Kratak opis objave"
          >
            {post.excerpt}
          </div>

          <div className="post-content reveal animate-in stagger-5" style={{ position: 'relative', zIndex: 1 }} aria-label="Sadržaj objave">
            <MarkdownContent 
              content={post.content}
              accentColor={cat?.color || 'var(--accent-cyan)'}
            />
          </div>

          {/* Back button */}
          <div className="reveal stagger-5 post-back-wrap">
            <Link
              href={cat ? `/${post.category}` : '/'}
              className="glass-prism stagger-5 post-back-link"
              id="post-back-btn"
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
