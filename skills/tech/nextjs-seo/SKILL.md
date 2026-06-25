---
name: nextjs-seo
description: Next.js SEO optimization for Frontend UI docs — metadata, OpenGraph, sitemap, robots.txt, and structured data. Use when optimizing the docs app for search engines.
---

# Next.js SEO

SEO optimization patterns for the Frontend UI documentation site, covering metadata, OpenGraph, sitemap generation, and structured data.

## When to Use

- Adding page metadata
- Configuring OpenGraph images
- Generating sitemap.xml
- Setting up robots.txt
- Adding structured data (JSON-LD)

---

## 1. Metadata Configuration

### 1.1 Root Layout Metadata

```tsx
// apps/docs/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Frontend UI - React Animation Components',
    template: '%s | Frontend UI',
  },
  description: 'Production-ready React animation components for modern web applications.',
  keywords: ['React', 'animation', 'components', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
  authors: [{ name: 'Frontend UI' }],
  creator: 'Frontend UI',
  metadataBase: new URL('https://frontend-ui.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frontend-ui.com',
    siteName: 'Frontend UI',
    title: 'Frontend UI - React Animation Components',
    description: 'Production-ready React animation components.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Frontend UI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend UI',
    description: 'React animation components library.',
    images: ['/og-image.png'],
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
};
```

### 1.2 Dynamic Page Metadata

```tsx
// apps/docs/app/(docs)/components/[slug]/page.tsx
import type { Metadata } from 'next';
import { componentRegistry } from '@/lib/component-registry';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const component = componentRegistry.find(c => c.slug === params.slug);

  if (!component) {
    return { title: 'Not Found' };
  }

  return {
    title: component.name,
    description: component.description,
    openGraph: {
      title: `${component.name} | Frontend UI`,
      description: component.description,
      images: [`/og/${component.slug}.png`], // Dynamic OG image
    },
  };
}
```

---

## 2. OpenGraph Images

### 2.1 Dynamic OG Image Generation

```tsx
// apps/docs/app/og/[slug]/route.tsx
import { ImageResponse } from 'next/og';
import { componentRegistry } from '@/lib/component-registry';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const component = componentRegistry.find(c => c.slug === params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0c29, #302b63)',
          color: 'white',
          padding: '40px',
        }}
      >
        <h1 style={{ fontSize: '60px', fontWeight: 'bold' }}>
          {component?.name || 'Frontend UI'}
        </h1>
        <p style={{ fontSize: '30px', opacity: 0.8 }}>
          {component?.description || 'React Animation Components'}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## 3. Sitemap

### 3.1 Static Sitemap

```tsx
// apps/docs/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { componentRegistry } from '@/lib/component-registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://frontend-ui.com';

  const routes = [
    '',
    '/docs',
    '/docs/getting-started',
    '/docs/components',
    '/docs/animations',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const components = componentRegistry.map(component => ({
    url: `${baseUrl}/docs/components/${component.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...components];
}
```

---

## 4. Structured Data

```tsx
// apps/docs/app/layout.tsx
import Script from 'next/script';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Frontend UI',
  url: 'https://frontend-ui.com',
  description: 'React animation components library',
  publisher: {
    '@type': 'Organization',
    name: 'Frontend UI',
    logo: {
      '@type': 'ImageObject',
      url: 'https://frontend-ui.com/logo.png',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 5. robots.txt

```
# apps/docs/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: 'https://frontend-ui.com/sitemap.xml',
  };
}
```

---

*Version: 1.0.0 | For Frontend UI Next.js SEO*
