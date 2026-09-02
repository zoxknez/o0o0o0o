'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, ExternalLink, Copy, Check } from 'lucide-react';

interface Props {
  content: string;
  accentColor?: string;
}

// Helper to extract plain text from React children for slugs / copy
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
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getHostBadge(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host.includes('mega.nz')) return 'MEGA';
    if (host.includes('mediafire.com')) return 'MediaFire';
    if (host.includes('drive.google.com')) return 'Google Drive';
    if (host.includes('github.com')) return 'GitHub';
    if (host.includes('dropbox.com')) return 'Dropbox';
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return 'Preuzimanje';
  }
}

export default function MarkdownContent({ content, accentColor = 'var(--accent-cyan)' }: Props) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2(props) {
            const { children, ...rest } = props;
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h2 id={id} {...rest}>
                <span className="h-anchor" aria-hidden="true">#</span>
                {children}
              </h2>
            );
          },
          h3(props) {
            const { children, ...rest } = props;
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h3 id={id} {...rest}>
                {children}
              </h3>
            );
          },
          // Enhanced links: clean download badges vs styled external links
          a(props) {
            const { href, children, ...rest } = props;
            const isExternal = href?.startsWith('http');
            const text = getNodeText(children);
            const isDownload =
              href &&
              (/(mega\.nz|mediafire\.com|drive\.google\.com|dropbox\.com)/i.test(href) ||
                /preuzmi|download|part \d+/i.test(text));

            if (isDownload && href) {
              const hostName = getHostBadge(href);
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md-download-card glass shimmer"
                  title={`Preuzmite fajl sa ${hostName}`}
                  {...rest}
                >
                  <span className="md-download-icon-wrap" style={{ color: accentColor }}>
                    <Download size={15} aria-hidden="true" />
                  </span>
                  <span className="md-download-label">{children}</span>
                  <span className="md-download-badge" style={{ borderColor: `${accentColor}40`, color: accentColor }}>
                    {hostName}
                  </span>
                </a>
              );
            }

            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={isExternal ? 'md-external-link' : undefined}
                {...rest}
              >
                <span>{children}</span>
                {isExternal && (
                  <ExternalLink size={12} className="md-ext-icon" aria-hidden="true" />
                )}
              </a>
            );
          },
          p(props) {
            const { children, node, ...rest } = props as typeof props & {
              node?: unknown;
            };

            const paragraphNode = node as
              | {
                  children?: Array<{
                    type?: string;
                    tagName?: string;
                    properties?: {
                      alt?: unknown;
                    };
                  }>;
                }
              | undefined;

            const onlyChild =
              paragraphNode?.children?.length === 1
                ? paragraphNode.children[0]
                : undefined;

            const isStandaloneImage =
              onlyChild?.type === 'element' &&
              onlyChild?.tagName === 'img';

            if (isStandaloneImage) {
              const alt = String(
                onlyChild?.properties?.alt ?? ''
              );

              return (
                <figure className="md-image-figure">
                  {children}
                  {alt && (
                    <figcaption className="md-image-caption">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return <p {...rest}>{children}</p>;
          },
          // Images: render clean img; standalone images wrapped in figure by p renderer
          img(props) {
            const { src, alt, node, ...rest } = props as typeof props & {
              node?: unknown;
            };

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || ''}
                loading="lazy"
                {...rest}
                className="md-image"
              />
            );
          },
          // Bold highlight with accent color
          strong(props) {
            const { children, ...rest } = props;
            return (
              <strong style={{ color: accentColor, fontWeight: 700 }} {...rest}>
                {children}
              </strong>
            );
          },
          // Blockquotes as premium callout cards
          blockquote(props) {
            const { children, ...rest } = props;
            return (
              <blockquote
                className="md-blockquote glass"
                style={{
                  borderLeftColor: accentColor,
                  background: `linear-gradient(90deg, ${accentColor}12 0%, rgba(13, 18, 30, 0.4) 100%)`,
                }}
                {...rest}
              >
                {children}
              </blockquote>
            );
          },
          // Code blocks with copy button & language pill
          pre(props) {
            const { children } = props;
            return <CodeBlockContainer>{children}</CodeBlockContainer>;
          },
          // Inline code
          code(props) {
            const { children, className, ...rest } = props;
            // If inside pre, CodeBlockContainer handles it
            return (
              <code className={className || 'md-inline-code'} {...rest}>
                {children}
              </code>
            );
          },
          // Tables wrapped in responsive glass container
          table(props) {
            return (
              <div className="md-table-wrap glass">
                <table className="md-table" {...props} />
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlockContainer({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const text = getNodeText(children);

  // Extract language from children if available
  let lang = 'kod';
  if (
    children &&
    typeof children === 'object' &&
    'props' in children &&
    children.props &&
    typeof children.props === 'object' &&
    'className' in children.props &&
    typeof children.props.className === 'string'
  ) {
    const match = /language-(\w+)/.exec(children.props.className);
    if (match) lang = match[1];
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="md-code-card glass">
      <div className="md-code-header">
        <div className="md-code-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="md-code-lang">{lang}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="md-code-copy-btn"
          aria-label="Kopirajte kôd u clipboard"
        >
          {copied ? (
            <>
              <Check size={13} className="md-copy-check-icon" aria-hidden="true" />
              <span>Kopirano!</span>
            </>
          ) : (
            <>
              <Copy size={13} aria-hidden="true" />
              <span>Kopiraj</span>
            </>
          )}
        </button>
      </div>
      <pre className="md-code-pre">{children}</pre>
    </div>
  );
}
