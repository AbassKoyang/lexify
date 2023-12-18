import { Noto_Serif, Roboto } from 'next/font/google'
import './globals.css';

const noto_Serif = Noto_Serif({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
const roboto = Roboto({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: 'Lexify',
  description: 'The only web dictionary you need.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body>{children}</body>
    </html>
  )
}
