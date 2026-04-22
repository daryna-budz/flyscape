import './globals.css'
import { Albert_Sans } from 'next/font/google';


const albertsans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={albertsans.className}>
        {children}
      </body>
    </html>
  )
}
