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

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
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
        <div className="pagination-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '64px' }}>
          <div className="pagination-controls glass-prism">
            <button
              className="pagination-btn prev"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Prethodna stranica"
            >
              <span className="btn-text">&larr; Nazad</span>
              <span className="btn-icon">&larr;</span>
            </button>
            
            <div className="pagination-numbers">
              {getVisiblePages().map((page, i) => (
                <button
                  key={i}
                  className={`page-number ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              className="pagination-btn next"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Sledeća stranica"
            >
              <span className="btn-text">Napred &rarr;</span>
              <span className="btn-icon">&rarr;</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
