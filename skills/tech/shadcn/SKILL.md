---
name: shadcn
description: Project-aware shadcn/ui workflow for searching, adding, composing, and fixing components with correct patterns. Official skill from shadcn/ui.
---

# shadcn/ui Skill

## When to Use

Apply when managing shadcn/ui components: adding, searching, debugging, styling, and composing UI. Provides project context, component docs, and usage patterns.

## Project Detection

Automatically detects:
- isRSC (React Server Components)
- Tailwind CSS version
- Icon library (lucide-react)
- Project structure

## Core Rules

### Composition
- Components compose with each other via props (e.g., `Button` inside `Form`)
- Use `FieldGroup` for form sections (not raw `div` wrappers)
- Use semantic color tokens (destructive, muted, accent)

### Styling
- Components use Tailwind CSS utility classes
- Use `cn()` from `@/lib/utils` for conditional classes
- Customize via `className` prop or CSS variables

### Accessibility
- All interactive elements are keyboard-navigable
- Forms use proper label associations
- Dialogs trap focus and support Escape

## CLI Commands

```bash
npx shadcn@latest add button    # Add a component
npx shadcn@latest add -a        # Add all components
npx shadcn@latest diff          # Check for updates
```

## Component Patterns

### Form with Validation
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

// Use FieldGroup for layout, never raw div
```

### Dialog
```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```
