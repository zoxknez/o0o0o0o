import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getCategoryInfo, getAllPosts, getRelatedPosts } from '@/lib/posts';
import { Clock, Calendar, ChevronRight, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import ReadingProgress from '@/components/ReadingProgress';
import MarkdownContent from '@/components/MarkdownContent';
import PostCard from '@/components/PostCard';
import TableOfContents from '@/components/TableOfContents';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://o0o0o0o.vercel.app';

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

  // Extract first image from markdown or fallback
  const imgMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  let postImage = imgMatch ? imgMatch[1] : '/images/ai-chat.jpg';
  if (postImage.endsWith('.svg')) {
    const pngAlternative = postImage.replace(/\.svg$/, '.png');
    postImage = pngAlternative;
  }

  const articleUrl = `${SITE_URL}/post/${post.slug}`;
  const imageUrl = postImage.startsWith('http') ? postImage : `${SITE_URL}${postImage}`;
  const seoTitle = post.seoTitle || post.title;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: `${seoTitle} - o0o0o0o`,
    },
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    creator: post.author,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: seoTitle,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: post.excerpt,
      images: [imageUrl],
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
  const accentColor = cat?.color || 'var(--accent-cyan)';
  const relatedPosts = getRelatedPosts(post, 3);

  const articleUrl = `${SITE_URL}/post/${post.slug}`;
  const imgMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  let postImage = imgMatch ? imgMatch[1] : '/images/ai-chat.jpg';
  if (postImage.endsWith('.svg')) {
    postImage = postImage.replace(/\.svg$/, '.png');
  }
  const imageUrl = postImage.startsWith('http') ? postImage : `${SITE_URL}${postImage}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'o0o0o0o',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: cat?.name || 'Tutorijali',
    inLanguage: 'sr-RS',
  };

  return (
    <article className="post-page">
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress color={accentColor} />

      {/* ── Ambient Reading Glow ── */}
      <div className="article-ambient" aria-hidden="true">
        <div
          className="post-ambient-glow post-ambient-left"
          style={{ background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)` }}
        />
        <div
          className="post-ambient-glow post-ambient-right"
          style={{ background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)` }}
        />
      </div>

      {/* ── Prism Header ── */}
      <header
        className="post-header post-hero reveal"
        aria-label="Zaglavlje objave"
      >
        <div
          className="liquid-bg"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${accentColor}25 0%, transparent 45%),
                         radial-gradient(circle at 75% 55%, ${accentColor}15 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />

        <div className="container post-hero-inner">
          <div className="editorial-grid post-hero-grid">
            {/* Breadcrumb Pilled */}
            <nav className="breadcrumb post-breadcrumb glass-prism reveal stagger-1">
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                Početna
              </Link>
              <ChevronRight size={11} style={{ opacity: 0.5 }} />
              {cat && (
                <>
                  <Link
                    href={`/${post.category}`}
                    style={{ color: cat.color, textDecoration: 'none', fontWeight: 700 }}
                  >
                    {cat.name}
                  </Link>
                  <ChevronRight size={11} style={{ opacity: 0.5 }} />
                </>
              )}
              <span style={{ opacity: 0.85 }}>Članak</span>
            </nav>

            {/* Title Block */}
            <div className="post-hero-copy">
              <h1 className="post-title post-hero-title reveal stagger-2">
                {post.title}
              </h1>

              {/* Meta Data Prism */}
              <div className="reveal stagger-3 glass-prism post-hero-meta">
                <span className="post-meta-chip">
                  <Calendar size={14} style={{ color: accentColor }} aria-hidden="true" />
                  {new Date(post.date).toLocaleDateString('sr-RS', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="post-meta-chip">
                  <Clock size={14} style={{ color: accentColor }} aria-hidden="true" />
                  {post.readTime}
                </span>
                <div className="post-meta-divider" />
                <span className="post-meta-chip">
                  Autor: <strong style={{ color: accentColor }}>{post.author}</strong>
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
          {/* Excerpt highlight card */}
          <div
            className="reveal glass-prism stagger-4 post-excerpt-card"
            style={{
              animationDelay: '0.4s',
              borderLeft: `4px solid ${accentColor}`,
              boxShadow: 'var(--shadow-premium)',
              position: 'relative',
              zIndex: 1,
            }}
            aria-label="Kratak opis objave"
          >
            <div className="post-excerpt-badge" style={{ color: accentColor }}>
              <Sparkles size={14} aria-hidden="true" />
              <span>Sažetak</span>
            </div>
            <p className="post-excerpt-text">{post.excerpt}</p>
          </div>

          {/* Table of Contents */}
          <TableOfContents content={post.content} accentColor={accentColor} />

          <div
            className="post-content reveal animate-in stagger-5"
            style={{ position: 'relative', zIndex: 1 }}
            aria-label="Sadržaj objave"
          >
            <MarkdownContent
              content={post.content}
              accentColor={accentColor}
            />
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="post-related-section reveal stagger-5" aria-label="Povezane objave">
              <div className="post-related-header">
                <div className="post-related-badge" style={{ color: accentColor }}>
                  <BookOpen size={16} aria-hidden="true" />
                  <span>Istražite još</span>
                </div>
                <h3 className="post-related-title">
                  Povezane objave {cat ? `iz rubrike ${cat.name}` : ''}
                </h3>
              </div>
              <div className="posts-grid post-related-grid">
                {relatedPosts.map((relPost) => (
                  <PostCard key={relPost.id} post={relPost} />
                ))}
              </div>
            </section>
          )}

          {/* Back button */}
          <div className="reveal stagger-5 post-back-wrap">
            <Link
              href={cat ? `/${post.category}` : '/'}
              className="glass-prism stagger-5 post-back-link"
              id="post-back-btn"
            >
              <ArrowLeft size={18} aria-hidden="true" style={{ color: accentColor }} />
              <span>Povratak na {cat?.name || 'početnu'}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
