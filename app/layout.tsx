import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import CustomCursor from '@/components/CustomCursor'
import './globals.css'

const syne = Syne({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jordan Toia | Director, Cinematographer, Editor',
  description:
    'Award-winning cinematographer and director specialising in commercial and narrative filmmaking.',
  keywords: ['cinematographer', 'director', 'editor', 'filmmaker', 'commercial production'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://vumbnail.com" />
        <link rel="preconnect" href="https://player.vimeo.com" />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
