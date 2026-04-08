'use client';

import { useState } from 'react';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
  itemsPerPage?: number;
}

export default function PaginatedPostGrid({ posts, itemsPerPage = 9 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <>
      <div className="posts-grid category-posts-grid">
        {currentPosts.map((post, i) => (
          <div key={post.id} className="reveal animate-in" style={{ animationDelay: `${0.1 + (i % itemsPerPage) * 0.1}s` }}>
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls glass-prism" style={{ 
          display: 'inline-flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '8px', 
          marginTop: '64px',
          padding: '12px 24px',
          borderRadius: '100px',
          left: '50%',
          position: 'relative',
          transform: 'translateX(-50%)',
          width: 'max-content'
        }}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ 
              opacity: currentPage === 1 ? 0.3 : 0.8, 
              padding: '8px 16px', 
              border: 'none', 
              background: 'none', 
              color: 'var(--text-primary)', 
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            &larr; Nazad
          </button>
          
          <div style={{ display: 'flex', gap: '4px', margin: '0 8px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                  border: 'none',
                  background: page === currentPage ? 'var(--accent-cyan)' : 'transparent',
                  color: page === currentPage ? '#000' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
             style={{ 
              opacity: currentPage === totalPages ? 0.3 : 0.8, 
              padding: '8px 16px', 
              border: 'none', 
              background: 'none', 
              color: 'var(--text-primary)', 
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            Napred &rarr;
          </button>
        </div>
      )}
    </>
  );
}
