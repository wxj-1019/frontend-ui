---
name: next-best-practices
description: Next.js 15+ best practices — file conventions, RSC boundaries, async params, Runtime selection, hydration errors, Suspense, Server Actions. Official Vercel skill.
---

# Next.js Best Practices

Next.js 15+ App Router patterns and conventions.

## File Conventions

```
app/
├── layout.tsx       # Shared layout (preserves state across navigation)
├── page.tsx         # Route UI
├── loading.tsx      # Loading UI (Suspense boundary)
├── error.tsx        # Error boundary (must be Client Component)
├── not-found.tsx    # 404 page
├── route.ts         # API route handler
└── (group)/         # Route group (doesn't affect URL)
```

## RSC Boundaries

- Server Components by default
- Add "use client" only when needed (event handlers, hooks, browser APIs)
- Push client boundary as deep as possible (leaf nodes)

## Async Patterns

```tsx
// Server Component with async data
export default async function Page({ params }) {
  const { slug } = await params; // params is a Promise in Next.js 15+
  const data = await fetch(`/api/${slug}`);
  return <Content data={data} />;
}
```

## Server Actions

```tsx
// app/actions.ts
"use server";
export async function createItem(formData: FormData) { ... }

// Client usage
import { createItem } from "@/app/actions";
<form action={createItem}>...</form>
```

## Suspense

- Wrap async components in Suspense for streaming
- Use loading.tsx for route-level loading states
- Granular Suspense for independent data sections

## Hydration Errors

Common causes and fixes:
- Browser extensions injecting DOM → ignore with `suppressHydrationWarning`
- Date/time formatting → use `suppressHydrationWarning` or client-only rendering
- Mismatched HTML → check for `&nbsp;` vs spaces, `<p>` inside `<p>`
