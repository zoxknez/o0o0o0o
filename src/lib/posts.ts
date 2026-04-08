import postsData from '@/data/posts.json';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export const categories = [
  { slug: 'tutorijali', name: 'Tutorijali', description: 'Vodiči i tutorijali za sve nivoe', color: '#00d4ff' },
  { slug: 'programi', name: 'Programi', description: 'Softver, alati i aplikacije', color: '#7c3aed' },
  { slug: 'operativni-sistemi', name: 'Operativni sistemi', description: 'Windows, Linux, macOS i više', color: '#059669' },
  { slug: 'casopisi', name: 'Časopisi i e-knjige', description: 'Digitalne publikacije i e-knjige', color: '#d97706' },
  { slug: 'igre', name: 'Igre i zabava', description: 'Gaming, emulatori i zabava', color: '#dc2626' },
  { slug: 'vesti', name: 'Vesti', description: 'Najnovije iz IT sveta', color: '#2563eb' },
  { slug: 'saveti', name: 'Saveti i trikovi', description: 'Korisni saveti i skriveni trikovi', color: '#0d9488' },
  { slug: 'zajednica', name: 'Zajednica', description: 'Forum, diskusije i zajednica', color: '#9333ea' },
];

export function getAllPosts(): Post[] {
  return postsData as Post[];
}

export function getFeaturedPosts(): Post[] {
  return (postsData as Post[]).filter(p => p.featured).slice(0, 4);
}

export function getLatestPosts(count = 8): Post[] {
  return [...(postsData as Post[])]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getPostsByCategory(category: string): Post[] {
  return (postsData as Post[]).filter(p => p.category === category);
}

export function getPostBySlug(slug: string): Post | undefined {
  return (postsData as Post[]).find(p => p.slug === slug);
}

export function getCategoryInfo(slug: string) {
  return categories.find(c => c.slug === slug);
}
