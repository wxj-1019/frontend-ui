---
name: frontend-ui-engineering
description: Component architecture, design systems, state management, responsive design, WCAG 2.1 AA accessibility. Auto-triggers when building or modifying user-facing interfaces.
---

# Frontend UI Engineering

Comprehensive guide for building production-grade frontend interfaces.

## Component Architecture

### File Structure
```
components/
├── Button/
│   ├── Button.tsx          # Component
│   ├── Button.test.tsx     # Tests
│   ├── Button.stories.tsx  # Storybook
│   └── index.ts            # Export
```

### Component Rules
- One component per file
- Props interface exported: `ComponentNameProps`
- Use composition over inheritance
- Compound components for complex patterns
- Render props only when hooks can't solve it

### Naming
- PascalCase for components: `UserProfile`
- camelCase for instances/props: `userProfile`
- Event handlers: `onClick`, `onSubmit`
- Boolean props: `isLoading`, `hasError`

## State Management Patterns

| Type | Tool | When |
|------|------|------|
| Server | TanStack Query | API data, caching |
| Form | React Hook Form + Zod | Complex forms |
| URL | nuqs / useSearchParams | Filters, pagination |
| Local | useState / useReducer | UI state |
| Global | Zustand | Shared app state |

## Responsive Design

- Mobile-first breakpoints
- Use Tailwind responsive prefixes: `sm:` `md:` `lg:` `xl:`
- Test at 375px, 768px, 1440px
- Touch targets minimum 44x44px

## Accessibility (WCAG 2.1 AA)

- Semantic HTML first (`<button>`, not `<div>`)
- All images have alt text
- Color contrast 4.5:1 minimum
- Keyboard navigation for all interactive elements
- ARIA only when HTML semantics aren't enough
