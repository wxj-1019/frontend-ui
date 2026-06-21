---
name: tailwind-design-system
description: Tailwind v4 CSS-first design system — @theme config, CVA components, Compound Components, dark mode, native CSS animations. Use when building a Tailwind-based design system.
---

# Tailwind Design System (v4)

Build a CSS-first design system with Tailwind CSS v4.

## @theme Configuration

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-bg: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-border: #e5e5e5;
  --font-sans: var(--font-inter), sans-serif;
  --radius: 0.5rem;
}
```

## CVA (Class Variance Authority)

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("rounded-lg font-medium transition-colors", {
  variants: {
    variant: {
      primary: "bg-primary text-white hover:bg-primary-hover",
      secondary: "border border-border text-text hover:bg-bg-secondary",
    },
    size: { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2" },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
```

## Compound Components

```tsx
// Card as compound component
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border p-6">{children}</div>;
}
Card.Header = function Header({ children }) { ... };
Card.Body = function Body({ children }) { ... };
Card.Footer = function Footer({ children }) { ... };
```

## Dark Mode

```css
/* Use CSS variables for theme switching */
:root { --color-bg: #fff; --color-text: #1a1a1a; }
.dark { --color-bg: #0a0a0a; --color-text: #fafafa; }
```

## Native CSS Animations

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```
