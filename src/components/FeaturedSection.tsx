import Link from 'next/link';
import { getFeaturedPosts, getCategoryInfo } from '@/lib/posts';
import { Star, Clock, ArrowRight } from 'lucide-react';

export default function FeaturedSection() {
  const featured = getFeaturedPosts();
  const mainPost = featured[0];
  const sidePosts = featured.slice(1, 3);

  if (!mainPost) return null;

  const mainCat = getCategoryInfo(mainPost.category);

  return (
    <section className="section" aria-label="Istaknute objave">
      <div className="section-header">
        <h2 className="section-title">
          <span className="accent">{'>'}</span> Istaknuto
        </h2>
        <Link href="/vesti" className="section-link" id="featured-see-all">
          Sve objave <ArrowRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        {/* Main featured card */}
        <Link
          href={`/post/${mainPost.slug}`}
          className="featured-post"
          id="featured-main-post"
          aria-label={`Istaknuto: ${mainPost.title}`}
          style={{ gridTemplateColumns: '1fr' }}
        >
          <div
            className="featured-post-image"
            style={{ minHeight: '280px' }}
            aria-hidden="true"
          >
            <div className="featured-post-image-text">o0o</div>
            {mainCat && (
              <span
                className="post-card-cat-badge"
                style={{
                  background: `${mainCat.color}18`,
                  color: mainCat.color,
                  border: `1px solid ${mainCat.color}30`,
                  top: '16px', left: '16px',
                  position: 'absolute',
                }}
              >
                ★ {mainCat.name}
              </span>
            )}
          </div>
          <div className="featured-post-body">
            <div className="featured-label">
              <Star size={12} fill="currentColor" aria-hidden="true" />
              Istaknuta objava
            </div>
            <h3 className="featured-post-title">{mainPost.title}</h3>
            <p className="featured-post-excerpt">{mainPost.excerpt}</p>
            <div className="featured-post-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={13} aria-hidden="true" /> {mainPost.readTime}
              </span>
              <span>{new Date(mainPost.date).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long' })}</span>
              <span className="read-more-btn" style={{ marginLeft: 'auto' }}>
                Čitajte dalje <ArrowRight size={14} aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>

        {/* Side featured posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sidePosts.map((post) => {
            const cat = getCategoryInfo(post.category);
            return (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="post-card"
                id={`featured-side-${post.id}`}
                style={{ flex: 1 }}
                aria-label={`Istaknuto: ${post.title}`}
              >
                <div className="post-card-image" style={{ height: '120px' }}>
                  <div className="post-card-image-inner" style={{ fontSize: '2rem' }}>o</div>
                  {cat && (
                    <span
                      className="post-card-cat-badge"
                      style={{
                        background: `${cat.color}18`,
                        color: cat.color,
                        border: `1px solid ${cat.color}30`,
                      }}
                    >
                      {cat.name}
                    </span>
                  )}
                </div>
                <div className="post-card-body" style={{ padding: '16px' }}>
                  <h3 className="post-card-title" style={{ fontSize: '0.9rem' }}>{post.title}</h3>
                  <div className="post-card-meta" style={{ paddingTop: '10px', marginTop: 'auto' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}>
                      <Clock size={11} aria-hidden="true" /> {post.readTime}
                    </span>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.72rem', fontWeight: 600 }}>Čitajte →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
