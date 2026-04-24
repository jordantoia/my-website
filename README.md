# Jordan Toia - Cinematographer Portfolio

A modern, cinematic portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎬 Dark, cinematic design aesthetic
- 📱 Fully responsive layout
- 🎥 Vimeo video integration with automatic thumbnails
- ⚡ Optimized performance with Next.js 14
- 🎨 Smooth animations and hover effects
- 🔍 SEO optimized

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Cormorant Garamond (display) + Inter (body)
- **Video Platform**: Vimeo
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Method 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow the prompts to link your project

4. For production deployment:

```bash
vercel --prod
```

### Method 2: Deploy via GitHub

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)

3. Click "Add New Project"

4. Import your GitHub repository

5. Vercel will auto-detect Next.js and configure everything

6. Click "Deploy"

### Method 3: Deploy via Vercel Dashboard

1. Create a new repository on GitHub

2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

3. Visit [vercel.com/new](https://vercel.com/new)

4. Import your GitHub repository

5. Vercel will automatically:
   - Detect it's a Next.js project
   - Set the correct build settings
   - Deploy your site

6. Your site will be live at: `your-project-name.vercel.app`

## Custom Domain Setup

After deploying to Vercel:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions
5. Update your domain's DNS records at your registrar

## Customization

### Update Contact Information

Edit `/app/page.tsx`:

```typescript
<a href="tel:YOUR_PHONE">YOUR_PHONE</a>
<a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a>
```

### Add/Remove Videos

Edit the `portfolioVideos` array in `/app/page.tsx`:

```typescript
const portfolioVideos = [
  { title: 'Video Title', url: 'https://vimeo.com/VIDEO_ID', id: 'VIDEO_ID' },
  // Add more videos here
]
```

### Change Colors

Edit `/tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  'cinema-black': '#0a0a0a',
  'cinema-dark': '#1a1a1a',
  'cinema-gray': '#2a2a2a',
  'cinema-light': '#e8e8e8',
  'cinema-accent': '#c9a961', // Change this for different accent color
}
```

### Update Fonts

Edit `/app/layout.tsx` to use different Google Fonts:

```typescript
import { YourDisplayFont, YourBodyFont } from 'next/font/google'
```

## Performance Optimization

The site is optimized for performance with:

- Image optimization via Vimeo CDN
- Lazy loading of video thumbnails
- CSS animations (no JavaScript animation libraries)
- Minimal bundle size
- Static generation where possible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved © 2024 Jordan Toia

## Support

For issues or questions, contact: jordan@zoomfilmtv.com.au
