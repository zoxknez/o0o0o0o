'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string;
  accentColor?: string;
}

// Helper to extract text from React children for slug generation
function getNodeText(node: unknown): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    const reactElem = node as { props?: { children?: unknown } };
    return getNodeText(reactElem.props?.children);
  }
  return '';
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // Keep alphanumeric unicode characters
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function MarkdownContent({ content, accentColor = 'var(--accent-cyan)' }: Props) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2(props) {
            const { children, node, ...rest } = props as typeof props & { node?: unknown };
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h2 id={id} {...rest}>
                {children}
              </h2>
            );
          },
          h3(props) {
            const { children, node, ...rest } = props as typeof props & { node?: unknown };
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h3 id={id} {...rest}>
                {children}
              </h3>
            );
          },
          // External links: open in new tab + show URL
          a(props) {
            const { href, children, node, ...rest } = props as typeof props & { node?: unknown };
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                {...rest}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                title={isExternal ? 'Otvara se u novom prozoru' : undefined}
              >
                {children}
                {isExternal && (
                  <span
                    style={{
                      opacity: 0.45,
                      fontSize: '0.75em',
                      marginLeft: '5px',
                      wordBreak: 'break-all',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    ({href})
                  </span>
                )}
              </a>
            );
          },
          // Images: styled with rounded corners and centered layout
          img(props) {
            const { src, alt, node, ...rest } = props as typeof props & { node?: unknown };
            return (
              <span
                style={{
                  display: 'block',
                  margin: '28px auto',
                  textAlign: 'center',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || ''}
                  {...rest}
                  style={{
                    maxWidth: '100%',
                    borderRadius: '12px',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`,
                    display: 'inline-block',
                  }}
                />
                {alt && (
                  <span
                    style={{
                      display: 'block',
                      marginTop: '10px',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    {alt}
                  </span>
                )}
              </span>
            );
          },
          // Bold highlight with accent color
          strong(props) {
            const { children, node, ...rest } = props as typeof props & { node?: unknown };
            return (
              <strong style={{ color: accentColor, fontWeight: 700 }} {...rest}>
                {children}
              </strong>
            );
          },
          // Blockquotes: styled as premium callout boxes
          blockquote(props) {
            const { children, node, ...rest } = props as typeof props & { node?: unknown };
            return (
              <blockquote
                {...rest}
                style={{
                  borderLeft: `4px solid ${accentColor}`,
                  background: `${accentColor}08`,
                  padding: '16px 20px',
                  borderRadius: '0 10px 10px 0',
                  margin: '24px 0',
                  color: 'var(--text-secondary)',
                  fontStyle: 'normal',
                }}
              >
                {children}
              </blockquote>
            );
          },
          // Inline code
          code(props) {
            const { children, className, node, ...rest } = props as typeof props & { node?: unknown };
            return (
              <code
                className={className}
                {...rest}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88em',
                  color: accentColor,
                }}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
