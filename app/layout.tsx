import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import { person } from '@/content/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });

export const metadata: Metadata = {
  title: `${person.name}, designer who can build`,
  description: `${person.name}, ${person.city}. ${person.intro}`,
};

export const viewport: Viewport = { themeColor: '#efe7d6' };

// Runs before paint: restores the chosen mode and flags whether scroll motion is allowed.
const boot = `(function(){var d=document.documentElement;try{var m=localStorage.getItem('mode');if(m==='weird'||m==='pro')d.dataset.mode=m}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js-motion')})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="pro" className={`${fraunces.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
