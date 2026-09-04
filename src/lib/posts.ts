import postsData from '@/data/posts.json';

export interface Post {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const categories = [
  { slug: 'tutorijali', name: 'Tutorijali', description: 'Vodiči i tutorijali za sve nivoe', color: '#00d4ff' },
  { slug: 'programi', name: 'Programi', description: 'Softver, alati i aplikacije', color: '#7c3aed' },
  { slug: 'android', name: 'Android', description: 'APK igre i aplikacije', color: '#10b981' },
  { slug: 'operativni-sistemi', name: 'Operativni sistemi', description: 'Windows, Linux, macOS i više', color: '#059669' },
  { slug: 'casopisi', name: 'Časopisi i e-knjige', description: 'Digitalne publikacije i e-knjige', color: '#d97706' },
  { slug: 'igre', name: 'Igre i zabava', description: 'Gaming, emulatori i zabava', color: '#dc2626' },
  { slug: 'vesti', name: 'Vesti', description: 'Najnovije iz IT sveta', color: '#2563eb' },
  { slug: 'saveti', name: 'Saveti i trikovi', description: 'Korisni saveti i skriveni trikovi', color: '#0d9488' },
  { slug: 'zajednica', name: 'Zajednica', description: 'Forum, diskusije i zajednica', color: '#9333ea' },
];

const allPosts = postsData as Post[];

function normalizeSearchValue(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getSearchScore(post: Post, normalizedQuery: string): number {
  const categoryInfo = getCategoryInfo(post.category);
  const normalizedTitle = normalizeSearchValue(post.title);
  const normalizedExcerpt = normalizeSearchValue(post.excerpt);
  const normalizedContent = normalizeSearchValue(post.content);
  const normalizedAuthor = normalizeSearchValue(post.author);
  const normalizedSlug = normalizeSearchValue(post.slug);
  const normalizedCategory = normalizeSearchValue(
    `${post.category} ${categoryInfo?.name ?? ''} ${categoryInfo?.description ?? ''}`
  );
  const normalizedTags = post.tags.map(normalizeSearchValue);

  let score = 0;

  if (normalizedTitle.startsWith(normalizedQuery)) {
    score += 12;
  } else if (normalizedTitle.includes(normalizedQuery)) {
    score += 8;
  }

  if (normalizedSlug.includes(normalizedQuery)) {
    score += 6;
  }

  if (normalizedTags.some((tag) => tag.includes(normalizedQuery))) {
    score += 6;
  }

  if (normalizedExcerpt.includes(normalizedQuery)) {
    score += 4;
  }

  if (normalizedCategory.includes(normalizedQuery)) {
    score += 3;
  }

  if (normalizedAuthor.includes(normalizedQuery)) {
    score += 2;
  }

  if (normalizedContent.includes(normalizedQuery)) {
    score += 1;
  }

  return score;
}

export function getAllPosts(): Post[] {
  return allPosts;
}

export function getFeaturedPosts(): Post[] {
  return allPosts.filter(p => p.featured).slice(0, 4);
}

export function getLatestPosts(count = 8): Post[] {
  return [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getPostsByCategory(category: string): Post[] {
  return allPosts.filter(p => p.category === category);
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find(p => p.slug === slug);
}

export function searchPosts(query: string): Post[] {
  const normalizedQuery = normalizeSearchValue(query).trim();

  if (!normalizedQuery) {
    return [];
  }

  return [...allPosts]
    .map((post) => ({
      post,
      score: getSearchScore(post, normalizedQuery),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .map((item) => item.post);
}

export function getCategoryInfo(slug: string) {
  return categories.find(c => c.slug === slug);
}

export function getPostImage(post: Post): string | null {
  const match = post.content.match(/!\[.*?\]\((.*?)\)/);
  if (!match) return null;
  let url = match[1];
  if (url.endsWith('.svg')) {
    url = url.replace(/\.svg$/, '.png');
  }
  return url;
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const sameCategory = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = allPosts
    .filter(p => p.category !== post.category && p.id !== post.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...sameCategory, ...others].slice(0, limit);
}
