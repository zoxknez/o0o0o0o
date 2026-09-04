'use client';

import { useState } from 'react';
import { slugify } from '@/lib/posts';
import { ListOrdered, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  content: string;
  accentColor?: string;
}

interface HeadingItem {
  text: string;
  id: string;
  chapterNumber?: string;
}

export default function TableOfContents({ content, accentColor = 'var(--accent-cyan)' }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  // Extract all ## headings from markdown, excluding code blocks and any manual "Sadržaj"
  const lines = content.split('\n');
  let inCodeBlock = false;
  const headings: HeadingItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const raw = match[1].trim();
      // Skip redundant "Sadržaj" or "Table of contents" heading if present in content
      if (/^sadržaj/i.test(raw) || /^table of contents/i.test(raw)) {
        continue;
      }

      // Check if heading starts with a number, e.g. "1. Provera..."
      const numMatch = raw.match(/^(\d+)\.\s+(.+)$/);
      const chapterNumber = numMatch ? numMatch[1] : undefined;

      headings.push({
        text: raw,
        id: slugify(raw),
        chapterNumber,
      });
    }
  }

  // Only display if the post has 3 or more headings
  if (headings.length < 3) {
    return null;
  }

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      className="post-toc-card glass-prism reveal stagger-4"
      aria-label="Sadržaj i brza navigacija kroz poglavlja"
      style={{
        '--post-accent': accentColor,
      } as React.CSSProperties}
    >
      <div
        className="post-toc-header"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        aria-expanded={isOpen}
        aria-controls="post-toc-list"
      >
        <div className="post-toc-title-wrap">
          <span className="post-toc-icon" style={{ color: accentColor }}>
            <ListOrdered size={18} aria-hidden="true" />
          </span>
          <h2 className="post-toc-title">Sadržaj članka</h2>
          <span
            className="post-toc-badge"
            style={{
              borderColor: `${accentColor}40`,
              color: accentColor,
              backgroundColor: `${accentColor}12`,
            }}
          >
            {headings.length} poglavlja
          </span>
        </div>

        <button
          type="button"
          className="post-toc-toggle-btn"
          aria-label={isOpen ? 'Sakrij sadržaj' : 'Prikaži sadržaj'}
          tabIndex={-1}
        >
          {isOpen ? (
            <ChevronUp size={18} aria-hidden="true" />
          ) : (
            <ChevronDown size={18} aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <div id="post-toc-list" className="post-toc-body">
          <ol className="post-toc-list">
            {headings.map((h, i) => (
              <li key={`${h.id}-${i}`} className="post-toc-item">
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleScrollTo(e, h.id)}
                  className="post-toc-link"
                >
                  <span
                    className="post-toc-num"
                    style={{
                      color: accentColor,
                      borderColor: `${accentColor}30`,
                    }}
                  >
                    {h.chapterNumber || (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`)}
                  </span>
                  <span className="post-toc-text">{h.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </nav>
  );
}
