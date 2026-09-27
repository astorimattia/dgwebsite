import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './globals.css'
import PerformanceMonitor from '@/components/PerformanceMonitor'

const SITE_URL = 'https://mattiaastori.com'
const TITLE = 'Mattia Astori - Investor & Founder of Astori Ventures'
const DESCRIPTION =
  'Mattia Astori is a technology investor and founder of Astori Ventures, backing companies from early stage through growth. He is also a co-creator of Sacratos, a documentary project.'
const OG_IMAGE = '/assets/images/tultepec-analog.webp'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Mattia Astori',
  },
  description: DESCRIPTION,
  keywords: [
    'Mattia Astori',
    'Astori Ventures',
    'technology investor',
    'investor',
    'early-stage investing',
    'growth investing',
    'venture capital',
    'Sacratos',
    'documentary project',
  ],
  authors: [{ name: 'Mattia Astori' }],
  creator: 'Mattia Astori',
  publisher: 'Mattia Astori',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    types: {
      'text/plain': '/llms.txt',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Mattia Astori',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Mattia Astori - founder of Astori Ventures and co-creator of Sacratos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://mattiaastori.com/#mattia-astori',
              name: 'Mattia Astori',
              url: 'https://mattiaastori.com',
              image: 'https://mattiaastori.com/assets/images/tultepec-analog.webp',
              jobTitle: ['Investor', 'Founder'],
              description: DESCRIPTION,
              knowsAbout: [
                'technology investing',
                'early-stage investing',
                'growth-stage investing',
                'private companies',
                'venture capital',
                'documentary projects',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Astori Ventures',
                url: 'https://astori.vc',
              },
              sameAs: [
                'https://astori.vc',
                'https://sacratos.com',
                'https://www.linkedin.com/in/mattiaastori',
                'https://www.crunchbase.com/person/mattia-astori',
              ],
            }),
          }}
        />
        <link rel="preconnect" href="https://gc.zgo.at" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              data-goatcounter="https://mattia.goatcounter.com/count"
              async
              src="//gc.zgo.at/count.js"
            />
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "t6xnykjbjr");
                `
              }}
            />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  // Only register service worker in production
                  if ('${process.env.NODE_ENV}' === 'production') {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  } else {
                    // Unregister service worker in development to avoid caching issues
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                      for(let registration of registrations) {
                        registration.unregister();
                        console.log('SW unregistered (dev mode)');
                      }
                    });
                  }
                });
              }
            `
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <Analytics />
        <SpeedInsights />
        <PerformanceMonitor />
      </body>
    </html>
  )
}
