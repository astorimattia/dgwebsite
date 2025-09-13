import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mattia Astori',
  description: 'Photographer documenting the extreme, the obscure, and the culturally electric',
  icons: {
    icon: '/assets/favicon_chaos.webp',
    apple: '/assets/favicon_chaos.webp',
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
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}