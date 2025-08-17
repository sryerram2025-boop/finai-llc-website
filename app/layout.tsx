import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinAI LLC - Professional Web Development Services',
  description: 'Transform your digital presence with our expert web development team. We create stunning, responsive websites and web applications that drive results.',
  keywords: 'web development, website design, react, next.js, web applications, digital agency, fintech',
  authors: [{ name: 'FinAI LLC' }],
  openGraph: {
    title: 'FinAI LLC - Professional Web Development Services',
    description: 'Transform your digital presence with our expert web development team.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
