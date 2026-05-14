import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'A&R Asset Recovery Team | Free Surplus Funds Consultation',
  description:
    'A&R Asset Recovery Team helps people recover unclaimed funds, lost assets, tax sale overages, and foreclosure surplus funds with no upfront fees.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
      )}
    >
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
