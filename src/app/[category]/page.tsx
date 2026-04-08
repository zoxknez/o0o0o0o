import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getPostsByCategory, getCategoryInfo, categories,
} from '@/lib/posts';
import PostCard from '@/components/PostCard';
import {
  BookOpen, AppWindow, Monitor, Library,
  Gamepad2, Newspaper, Lightbulb, Users, ChevronRight,
} from 'lucide-react';

// Valid category slugs
const validSlugs = categories.map((c) => c.slug);

const iconMap: Record<string, React.ReactNode> = {
  'tutorijali':         <BookOpen size={32} />,
  'programi':           <AppWindow size={32} />,
  'operativni-sistemi': <Monitor size={32} />,
  'casopisi':           <Library size={32} />,
  'igre':               <Gamepad2 size={32} />,
  'vesti':              <Newspaper size={32} />,
  'saveti':             <Lightbulb size={32} />,
  'zajednica':          <Users size={32} />,
};

type Params = { category: string };

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryInfo(category);
  if (!cat) return { title: 'Nije pronađeno' };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage(
  { params }: { params: Promise<Params> }
) {
  const { category } = await params;

  if (!validSlugs.includes(category)) notFound();

  const cat = getCategoryInfo(category)!;
  const posts = getPostsByCategory(category);
  const icon = iconMap[category];

  return (
    <>
      {/* ── Prism Header ── */}
      <header
        className="category-header reveal"
        aria-label={`Kategorija: ${cat.name}`}
        style={{ 
          position: 'relative',
          padding: '120px 0 80px',
          overflow: 'hidden',
          background: 'var(--bg-primary)'
        }}
      >
        {/* Dynamic Mesh Background */}
        <div className="liquid-bg" style={{ 
          background: `radial-gradient(circle at 30% 20%, ${cat.color}30 0%, transparent 40%),
                       radial-gradient(circle at 70% 60%, ${cat.color}20 0%, transparent 45%)`
        }} aria-hidden="true" />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="editorial-grid">
            
            {/* Left Column: Glass Prism Icon */}
            <div className="reveal glass-prism stagger-1" style={{
              width: '120px',
              height: '120px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cat.color,
              flexShrink: 0
            }}>
              <div style={{ filter: `drop-shadow(0 0 15px ${cat.color}80)` }}>
                {icon}
              </div>
            </div>

            {/* Right Column: Title & Info */}
            <div style={{ flex: 1 }}>
              {/* Breadcrumb Pilled */}
              <nav className="breadcrumb glass-prism reveal stagger-2" style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                marginBottom: '32px',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Početna</Link>
                <ChevronRight size={10} style={{ opacity: 0.5 }} />
                <span style={{ color: cat.color, fontWeight: 700 }}>{cat.name}</span>
              </nav>

              <h1 className="category-header-title reveal stagger-3" style={{ 
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 900,
                letterSpacing: '-0.06em',
                lineHeight: 0.9,
                marginBottom: '24px',
                color: 'var(--text-primary)',
                textShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                {cat.name}
              </h1>

              <p className="category-header-desc reveal stagger-4" style={{ 
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                maxWidth: '650px',
                lineHeight: 1.6,
                fontWeight: 500,
                marginBottom: '32px'
              }}>
                {cat.description}
              </p>

              <div className="reveal stagger-5" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div className="glass-prism" style={{
                  padding: '6px 16px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: cat.color,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: '6px', height: '6px', background: cat.color, borderRadius: '50%', boxShadow: `0 0 10px ${cat.color}` }} />
                  {posts.length} {posts.length === 1 ? 'objava' : posts.length < 5 ? 'objave' : 'objava'}
                </div>
                <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${cat.color}40, transparent)` }} />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Posts */}
      <section className="section reveal" style={{ animationDelay: '0.4s' }} aria-label={`Objave u kategoriji ${cat.name}`}>
        <div className="container">
          {posts.length === 0 ? (
            <div className="glass" style={{ textAlign: 'center', padding: '100px 48px', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '24px', filter: 'grayscale(0.5)' }}>📭</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Još nema sadržaja</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Aktivno radimo na pripremi kvalitetnih materijala za ovaj deo bloga.</p>
              <Link href="/" className="btn-primary">
                Istražite druge kategorije
              </Link>
            </div>
          ) : (
            <div className="posts-grid" style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {posts.map((post, i) => (
                <div key={post.id} className="reveal" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

