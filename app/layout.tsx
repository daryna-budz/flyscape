import './globals.css'
import { Albert_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';


const albertsans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: 'FLYSCAPE',
  description: 'Your premium flight booking service',
  icons: {
    icon: '/images/logo.png', 
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={albertsans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
