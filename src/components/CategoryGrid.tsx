import Link from 'next/link';
import { categories, getPostsByCategory } from '@/lib/posts';
import {
  BookOpen, AppWindow, Monitor, Library,
  Gamepad2, Newspaper, Lightbulb, Users,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'tutorijali':        <BookOpen size={22} />,
  'programi':          <AppWindow size={22} />,
  'operativni-sistemi':<Monitor size={22} />,
  'casopisi':          <Library size={22} />,
  'igre':              <Gamepad2 size={22} />,
  'vesti':             <Newspaper size={22} />,
  'saveti':            <Lightbulb size={22} />,
  'zajednica':         <Users size={22} />,
};

export default function CategoryGrid() {
  return (
    <div className="category-grid" role="list" aria-label="Kategorije bloga">
      {categories.map((cat, i) => {
        const count = getPostsByCategory(cat.slug).length;
        const icon = iconMap[cat.slug];

        return (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="category-card animate-in"
            id={`category-card-${cat.slug}`}
            role="listitem"
            aria-label={`${cat.name} - ${count} objava`}
            style={{
              '--cat-color': cat.color,
              animationDelay: `${i * 0.06}s`,
            } as React.CSSProperties}
          >
            {/* Icon */}
            <div
              className="category-icon"
              style={{
                background: `${cat.color}14`,
                color: cat.color,
                border: `1px solid ${cat.color}25`,
              }}
              aria-hidden="true"
            >
              {icon}
            </div>

            {/* Info */}
            <div className="category-info">
              <div className="category-name">{cat.name}</div>
              <div className="category-desc">{cat.description}</div>
            </div>

            {/* Count */}
            <div className="category-count" aria-label={`${count} objava`}>
              {count} {count === 1 ? 'post' : 'posts'}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
