import Link from 'next/link';
import { type Post, getCategoryInfo } from '@/lib/posts';
import { Clock, Calendar } from 'lucide-react';

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
};

export default function PostCard({ post }: PostCardProps) {
  const catInfo = getCategoryInfo(post.category);
  const emoji = categoryEmojis[post.category] || '📝';

  return (
    <Link
      href={`/post/${post.slug}`}
      className="post-card shimmer reveal glass"
      id={`post-card-${post.id}`}
      aria-label={`Pročitajte: ${post.title}`}
    >
      {/* Thumbnail */}
      <div className="post-card-image" style={{ background: `linear-gradient(135deg, ${catInfo?.color}05, ${catInfo?.color}15)` }}>
        <div className="post-card-image-inner" style={{ color: catInfo?.color, opacity: 0.2 }}>{emoji}</div>

        {/* Category badge */}
        {catInfo && (
          <span
            className="post-card-cat-badge glass"
            style={{
              background: `${catInfo.color}15`,
              color: catInfo.color,
              border: `1px solid ${catInfo.color}30`,
              backdropFilter: 'blur(10px)',
              fontWeight: 700
            }}
          >
            {catInfo.name}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="post-card-body">
        <h3 className="post-card-title" style={{ color: 'var(--text-primary)' }}>{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>

        {/* Meta */}
        <div className="post-card-meta">
          <div className="post-card-meta-left">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={12} style={{ color: catInfo?.color || 'var(--accent-cyan)' }} aria-hidden="true" />
              {new Date(post.date).toLocaleDateString('sr-RS', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} style={{ color: catInfo?.color || 'var(--accent-cyan)' }} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          <span style={{ color: catInfo?.color || 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 800 }}>
            PROČITAJTE →
          </span>
        </div>
      </div>
    </Link>
  );
}
