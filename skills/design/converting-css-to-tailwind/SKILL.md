---
name: converting-css-to-tailwind
description: Convert plain CSS stylesheets to Tailwind utility classes — selectors, media queries, pseudo-classes, animations, and arbitrary values. Use when migrating from CSS/SCSS to Tailwind or converting legacy styles.
---

# Converting CSS to Tailwind

Systematic guide for converting CSS, SCSS, or styled-components to Tailwind CSS utility classes.

## When to Use

- Migrating a project from CSS to Tailwind
- Converting a component's custom styles to utilities
- Refactoring legacy stylesheets
- Converting Figma-generated CSS to Tailwind

## Conversion Map

### Layout
| CSS | Tailwind |
|-----|---------|
| `display: flex` | `flex` |
| `display: grid` | `grid` |
| `flex-direction: column` | `flex-col` |
| `justify-content: center` | `justify-center` |
| `align-items: center` | `items-center` |
| `gap: 8px` | `gap-2` |
| `position: absolute` | `absolute` |
| `position: relative` | `relative` |
| `position: fixed` | `fixed` |

### Spacing
| CSS | Tailwind |
|-----|---------|
| `padding: 16px` | `p-4` |
| `margin: 24px` | `m-6` |
| `width: 100%` | `w-full` |
| `max-width: 1200px` | `max-w-6xl` |
| `height: 100vh` | `h-screen` |

### Typography
| CSS | Tailwind |
|-----|---------|
| `font-size: 18px` | `text-lg` |
| `font-weight: 700` | `font-bold` |
| `text-align: center` | `text-center` |
| `line-height: 1.5` | `leading-normal` |
| `color: #333` | `text-gray-800` |

### Visual
| CSS | Tailwind |
|-----|---------|
| `background: #fff` | `bg-white` |
| `border-radius: 8px` | `rounded-lg` |
| `box-shadow: ...` | `shadow-md` |
| `opacity: 0.5` | `opacity-50` |
| `border: 1px solid #eee` | `border border-gray-200` |

### Transitions
| CSS | Tailwind |
|-----|---------|
| `transition: all 0.3s` | `transition-all duration-300` |
| `cursor: pointer` | `cursor-pointer` |
| `overflow: hidden` | `overflow-hidden` |

## Conversion Rules

1. **Remove the CSS file** after confirming all styles are converted
2. **Use arbitrary values sparingly** — prefer Tailwind's scale: `w-[327px]` only when needed
3. **Group related utilities** logically: layout → spacing → typography → visual → interaction
4. **Extract repeated patterns** into components, not `@apply`
5. **Media queries** → responsive prefixes: `md:flex`, `lg:grid-cols-3`
6. **Pseudo-classes** → state variants: `hover:bg-blue-600`, `focus:ring-2`
7. **Dark mode** → `dark:` prefix after enabling class-based dark mode
