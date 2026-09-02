import Link from 'next/link';
import { type Post, getCategoryInfo, getPostImage } from '@/lib/posts';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const categoryEmojis: Record<string, string> = {
  'tutorijali': '📚',
  'programi': '⚙️',
  'operativni-sistemi': '🖥️',
  'casopisi': '📖',
  'igre': '🎮',
  'vesti': '📡',
  'saveti': '💡',
  'zajednica': '👥',
  'android': '📱',
};

export default function PostCard({ post }: PostCardProps) {
  const catInfo = getCategoryInfo(post.category);
  const emoji = categoryEmojis[post.category] || '⚡';
  const imageUrl = getPostImage(post);
  const accentColor = catInfo?.color || 'var(--accent-cyan)';

  return (
    <Link
      href={`/post/${post.slug}`}
      className="post-card shimmer reveal glass"
      id={`post-card-${post.id}`}
      aria-label={`Pročitajte: ${post.title}`}
      style={{
        '--post-accent': accentColor,
      } as React.CSSProperties}
    >
      {/* Thumbnail */}
      <div className="post-card-image">
        {imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              loading="lazy"
              className="post-card-thumb-img"
            />
            <div className="post-card-img-overlay" aria-hidden="true" />
          </>
        ) : (
          <div
            className="post-card-placeholder"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${accentColor}25 0%, transparent 60%),
                           linear-gradient(135deg, rgba(13, 18, 30, 0.95), rgba(7, 10, 19, 0.98))`,
            }}
          >
            <div className="post-card-placeholder-mesh" aria-hidden="true" />
            <div className="post-card-placeholder-icon" style={{ color: accentColor }}>
              {emoji}
            </div>
          </div>
        )}

        {/* Category badge */}
        {catInfo && (
          <span
            className="post-card-cat-badge glass"
            style={{
              background: `${accentColor}22`,
              color: accentColor,
              borderColor: `${accentColor}44`,
              boxShadow: `0 4px 12px ${accentColor}20`,
            }}
          >
            <span
              className="post-card-cat-dot"
              style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
              aria-hidden="true"
            />
            {catInfo.name}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="post-card-body">
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>

        {/* Meta */}
        <div className="post-card-meta">
          <div className="post-card-meta-left">
            <span className="post-card-meta-item">
              <Calendar size={13} style={{ color: accentColor }} aria-hidden="true" />
              {new Date(post.date).toLocaleDateString('sr-RS', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span className="post-card-meta-item">
              <Clock size={13} style={{ color: accentColor }} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          <span className="post-card-meta-action" style={{ color: accentColor }}>
            <span>Čitajte</span>
            <ArrowRight size={13} className="post-card-arrow" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
