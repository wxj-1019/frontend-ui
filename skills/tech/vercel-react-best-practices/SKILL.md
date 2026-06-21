---
name: vercel-react-best-practices
description: 62 rules across 8 categories for React/Next.js performance — waterfall elimination, bundle optimization, server-side performance, re-render optimization. Official Vercel skill.
---

# Vercel React Best Practices

62 rules across 8 categories for production-grade React/Next.js applications.

## Performance Categories

### 1. Waterfall Elimination
- Prefer parallel data fetching (Promise.all)
- Use React.cache() for deduplication
- Avoid client→server→client request chains

### 2. Bundle Optimization
- Dynamic imports for non-critical code
- Tree-shakeable imports (named imports only)
- Use next/dynamic for heavy components
- Analyze bundle with @next/bundle-analyzer

### 3. Server-Side Performance
- Server Components by default, Client Components only when needed
- Streaming with Suspense boundaries
- Cache expensive computations

### 4. Re-render Optimization
- React.memo for pure components
- useMemo/useCallback for expensive computations/references
- Avoid inline object/function props

### 5. Image Optimization
- Always use next/image
- Specify width/height to prevent layout shift
- Use priority for above-fold images

### 6. Font Loading
- Use next/font for automatic optimization
- Subset fonts to latin if that's all you need

### 7. Data Fetching
- Server Components for data fetching (no client waterfalls)
- React Query/TanStack Query for client-side data
- Cache and deduplicate requests

### 8. Core Web Vitals
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Avoid layout shift (reserve space for dynamic content)
