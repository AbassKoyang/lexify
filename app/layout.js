import { Noto_Serif, Roboto, Poppins, Work_Sans, Montserrat, Noto_Sans, Inter, Diphylleia, Sevillana, Ubuntu, Lobster, Inconsolata, Cairo, Pacifico} from 'next/font/google';
import './globals.css';
import { Providers } from '@/redux/Provider';

export const notoserif = Noto_Serif({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
export const roboto = Roboto({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
export const poppins = Poppins({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
export const worksans = Work_Sans({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
export const montserrat = Montserrat({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
export const notosans = Noto_Sans({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
export const inter = Inter({ subsets: ['latin'],  weight: ['100', '300', '400', '500', '700', '900'] });
export const diphylleia = Diphylleia({ subsets: ['latin'],  weight: ['400'] });
export const sevillana = Sevillana({ subsets: ['latin'],  weight: ['400'] });
export const ubuntu = Ubuntu({ subsets: ['latin'],  weight: ['300', '400', '500', '700'] });
export const lobster = Lobster({ subsets: ['latin'],  weight: ['400'] });
export const inconsolata = Inconsolata({ subsets: ['latin'],  weight: ['200', '300', '400', '500', '700', '900'] });
export const cairo = Cairo({ subsets: ['latin'],  weight: ['300', '400', '500', '700', '900'] });
export const pacifico = Pacifico({ subsets: ['latin'],  weight: ['400'] });

const metadata = {
  title: 'Lexify',
  description: 'The only web dictionary you need.',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body>{children}</body>
    </html>
    </Providers>
  )
}
