import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/auth-context'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF6' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1916' },
  ],
}

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'REXE Smart Roofing Management System | Professional Construction Platform',
  description: 'Manage roofing projects efficiently with REXE - Kenya\'s leading construction management platform. Real-time project tracking, team coordination, inventory management, and financial insights.',
  keywords: 'roofing management, construction platform, project management, Kenya construction, roofing software, contractor management',
  generator: 'v0.app',
  creator: 'REXE Systems',
  publisher: 'REXE Systems',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://rexe-roofing.vercel.app'),
  openGraph: {
    title: 'REXE Smart Roofing Management System',
    description: 'Professional construction management platform for roofing projects in Kenya',
    url: 'https://rexe-roofing.vercel.app',
    siteName: 'REXE Smart Roofing',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'REXE Smart Roofing Management System',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REXE Smart Roofing Management System',
    description: 'Professional construction management platform for roofing projects',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  other: {
    'google-site-verification': 'verification-code-here',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
