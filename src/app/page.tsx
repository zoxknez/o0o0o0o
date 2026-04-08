import type { Metadata } from 'next';
import HomeCategories from '@/components/HomeCategories';

export const metadata: Metadata = {
  title: 'o0o0o0o - IT Blog | Tutorijali, Vesti, Programi',
  description: 'Najsavremeniji IT blog na srpskom. Tutorijali, programi, operativni sistemi, vesti, igre i zabava - sve na jednom mestu.',
};

export default function HomePage() {
  return <HomeCategories />;
}
