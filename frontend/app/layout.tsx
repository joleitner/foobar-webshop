import { Poppins } from 'next/font/google';
import '@picocss/pico';
import './globals.scss';
import './components/Navbar';
import Navbar from './components/Navbar';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'FooBar GmbH Webshop',
  description: 'Generated by create next app',
  viewport: 'width=device-width, initital-scale=1',
  keywords: 'webshop, foobar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={poppins.className}>
      <body className={'container'}>
        <Navbar />
        <main>{children}</main>
        <footer>
          <small>© 2023 FooBar GmbH</small>
        </footer>
      </body>
    </html>
  );
}
