import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Footer from '../components/global/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type LinkItem = {
  href: string;
  key: string;
};

const links: LinkItem[] = [
  {
    href: '/',
    key: 'home',
  },
  {
    href: '/signUp',
    key: 'signUp',
  },
  {
    href: '/login',
    key: 'login',
  },
  {
    href: '/service',
    key: '고객센터',
  }
];

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
    <body className={inter.className}>
    <header>
      <div>
        <ul className="flex bg-slate-500">
          {links.map(({ href, key }) => (
              <li className="flex-auto" key={key}>
                <Link href={href}>
                  {key}
                </Link>
              </li>
          ))}
        </ul>
      </div>
    </header>
    {children}
    <Footer />
    </body>
    </html>
  );
}
