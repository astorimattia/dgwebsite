# Mattia Astori Photography Website

A modern Next.js photography portfolio website showcasing Mattia Astori's analog photography work.

## Features

- **Modern React Architecture**: Built with Next.js 15 and TypeScript
- **Responsive Design**: Mobile-first approach with desktop sidebar and mobile header
- **Image Gallery**: Interactive photo gallery with keyboard and touch navigation
- **Custom Typography**: GT America font family for clean, modern aesthetics
- **Static Export**: Optimized for static hosting (GitHub Pages, Vercel, etc.)
- **Analytics Integration**: GoatCounter and Microsoft Clarity tracking
- **Location Display**: Real-time location updates from external API

## Project Structure

```
src/
├── app/
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with analytics
│   └── page.tsx              # Home page with gallery
├── components/
│   ├── About.tsx             # About page content
│   ├── Gallery.tsx           # Photo gallery component
│   ├── Location.tsx          # Location display component
│   ├── MobileHeader.tsx      # Mobile navigation header
│   ├── Sidebar.tsx           # Desktop sidebar navigation
│   └── SocialIcons.tsx       # Social media links
└── public/
    └── assets/               # Images, fonts, and static assets
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

The site is configured for static export and can be deployed to:

- **GitHub Pages**: Push to main branch
- **Vercel**: Connect GitHub repository
- **Netlify**: Deploy from build folder
- **Any static hosting**: Use the `out` folder after build

## Technologies Used

- Next.js 15 with App Router
- TypeScript
- CSS Modules
- Next.js Image Optimization
- Custom GT America Fonts
- Responsive Design

## Original Features Preserved

- All original photography and content
- Exact visual design and typography
- Mobile and desktop responsive layouts
- Gallery navigation and thumbnails
- Location tracking functionality
- Analytics integration
- Social media links

## Migration Notes

This project was migrated from a static HTML/CSS/JavaScript website to a modern Next.js application while preserving all original functionality and design.