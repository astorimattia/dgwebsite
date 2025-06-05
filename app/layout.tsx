import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mattia Astori',
  description: 'Personal website of Mattia Astori',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{
      '--arc-palette-focus': '#C1A07AF9',
      '--arc-palette-foregroundSecondary': '#EFA663FF',
      '--arc-palette-cutoutColor': '#FCEDE0FF',
      '--arc-palette-background': '#F2ECE4F4',
      '--arc-palette-foregroundPrimary': '#EFA663FF',
      '--arc-palette-title': '#2A1600F6',
      '--arc-background-simple-color': '#EFA663FF',
      '--arc-palette-foregroundTertiary': '#FCEDE0FF',
      '--arc-palette-maxContrastColor': '#88480EFF',
      '--arc-palette-hover': '#E5D8C9F5',
      '--arc-palette-backgroundExtra': '#FEFDFCF2',
      '--arc-palette-minContrastColor': '#FCEDE0FF',
      '--arc-palette-subtitle': '#CDB394F7'
    } as React.CSSProperties}>
      <head>
        <link rel="icon" href="/assets/favicon_emoji.png" sizes="32x32" />
        <link rel="icon" href="/assets/favicon_emoji.png" sizes="192x192" />
      </head>
      <body>
        <div className="header">
          <section></section>
        </div>
        <div id="content">
          {children}
        </div>
      </body>
    </html>
  )
} 