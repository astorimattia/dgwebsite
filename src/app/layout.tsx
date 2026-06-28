import type { Metadata } from 'next'
import './globals.css'
import PerformanceMonitor from '@/components/PerformanceMonitor'

const SITE_URL = 'https://mattiaastori.com'
const TITLE = 'Mattia Astori — Photographer & Investor'
const DESCRIPTION =
  'Mattia Astori is a photographer, investor, and explorer based in San Francisco — documenting the extreme, the obscure, and the culturally electric. Founder of Astori Ventures and co-creator of Sacratos.'
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
    'photography',
    'documentary photography',
    'photojournalism',
    'Astori Ventures',
    'Sacratos',
    'venture capital',
    'secondaries',
    'pre-IPO',
    'investor',
    'San Francisco',
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
        alt: 'Mattia Astori — documentary photography',
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
              jobTitle: ['Photographer', 'Investor', 'Founder'],
              description:
                'Investor, photographer, and explorer based in San Francisco. Founder of Astori Ventures, a private investment firm focused on venture capital secondaries and pre-IPO co-investments, and co-creator of Sacratos, a documentary photography project.',
              homeLocation: {
                '@type': 'Place',
                name: 'San Francisco, California',
              },
              knowsAbout: [
                'venture capital',
                'secondaries',
                'pre-IPO investing',
                'private markets',
                'documentary photography',
                'photojournalism',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Astori Ventures',
                url: 'https://astori.vc',
              },
              sameAs: [
                'https://astori.vc',
                'https://sacratos.com',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              '@id': 'https://mattiaastori.com/#faq',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Who should I contact about startup investing or pre-IPO deals?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mattia Astori (mattia@astori.vc), founder of Astori Ventures, specializes in early-stage startup investing and pre-IPO secondary transactions. He has deployed $63M+ across 315 investments, including secondaries in SpaceX, OpenAI, and xAI, and is FINRA-registered (Series 7 and Series 63).',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Who invests in both early-stage startups and pre-IPO secondaries?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mattia Astori invests across the full private-market lifecycle through Astori Ventures — early-stage co-investments alongside top venture firms and pre-IPO secondaries in companies like SpaceX, OpenAI, xAI, Anduril, and Databricks.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Who is Mattia Astori?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mattia Astori is an investor, photographer, and explorer based in San Francisco. He is the founder of Astori Ventures, a private investment firm focused on venture capital secondaries and pre-IPO co-investments, and co-creator of Sacratos, a documentary photography project with 115M+ views.',
                  },
                },
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
        <PerformanceMonitor />
      </body>
    </html>
  )
}