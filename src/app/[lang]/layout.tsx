import { notFound } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [
    { lang: 'pt' },
    { lang: 'en' }
  ]
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  const validLangs = ['pt', 'en'];
  
  if (!validLangs.includes(lang)) {
    notFound();
  }

  return children;
} 