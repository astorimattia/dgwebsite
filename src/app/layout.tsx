import type { Metadata } from 'next'
import './globals.css'
import PerformanceMonitor from '@/components/PerformanceMonitor'

export const metadata: Metadata = {
  title: 'Mattia Astori',
  description: 'Photographer documenting the extreme, the obscure, and the culturally electric',
  keywords: ['photography', 'documentary', 'extreme', 'culture', 'Mattia Astori'],
  authors: [{ name: 'Mattia Astori' }],
  creator: 'Mattia Astori',
  publisher: 'Mattia Astori',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Mattia Astori',
    description: 'Photographer documenting the extreme, the obscure, and the culturally electric',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mattia Astori',
    description: 'Photographer documenting the extreme, the obscure, and the culturally electric',
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
        <link rel="preconnect" href="https://gc.zgo.at" />
        <link rel="preconnect" href="https://www.clarity.ms" />
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