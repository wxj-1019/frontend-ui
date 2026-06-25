---
name: typescript-component-types
description: TypeScript advanced patterns for component libraries — generic components, forwardRef types, CVA variants, conditional props, and strict type inference. Use when defining component types in the Frontend UI library.
---

# TypeScript Component Types

Advanced TypeScript patterns for building type-safe components in the Frontend UI library, covering generic components, forwardRef, polymorphic components, CVA integration, and strict inference.

## When to Use

- Defining component Props interfaces
- Building generic or polymorphic components
- Integrating with class-variance-authority (CVA)
- Typing forwardRef components
- Creating compound component patterns
- Building type-safe component APIs

---

## 1. Component Props Patterns

### 1.1 Base Props + Variant Props

```tsx
// packages/ui/src/components/button/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Extract variant props from CVA
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

// Usage: TypeScript knows all variant/size combinations
// <Button variant="destructive" size="sm">Delete</Button>
// ✅ variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
// ✅ size: "default" | "sm" | "lg" | "icon"
```

### 1.2 Conditional Props (Discriminated Unions)

```tsx
// Component with mutually exclusive props
type LoadingButtonProps = {
  isLoading: true;
  loadingText: string;
};

type NormalButtonProps = {
  isLoading?: false;
  loadingText?: never; // Forbidden when not loading
};

export type SmartButtonProps = ButtonProps &
  (LoadingButtonProps | NormalButtonProps);

// Usage:
// <SmartButton isLoading loadingText="Saving..." /> ✅
// <SmartButton isLoading /> ❌ loadingText required when isLoading
// <SmartButton loadingText="Text" /> ❌ loadingText not allowed without isLoading
```

---

## 2. forwardRef Types

### 2.1 Standard forwardRef

```tsx
import { forwardRef } from 'react';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

### 2.2 Generic forwardRef (for polymorphic components)

```tsx
// packages/ui/src/components/text/text.tsx
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

// Polymorphic component that renders as any HTML element
interface TextProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'accent' | 'danger';
}

// Map size to Tailwind classes
const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const;

export const Text = forwardRef<
  HTMLElement,
  TextProps & React.HTMLAttributes<HTMLElement>
>(
  (
    {
      as: Component = 'span',
      size = 'base',
      weight = 'normal',
      color = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          sizeMap[size],
          weight === 'normal' && 'font-normal',
          weight === 'medium' && 'font-medium',
          weight === 'semibold' && 'font-semibold',
          weight === 'bold' && 'font-bold',
          color === 'default' && 'text-foreground',
          color === 'muted' && 'text-muted-foreground',
          color === 'accent' && 'text-accent-foreground',
          color === 'danger' && 'text-destructive',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
```

### 2.3 Strict forwardRef with Slot Pattern

```tsx
// packages/ui/src/components/slot/slot.tsx
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface SlotWrapperProps extends ComponentPropsWithoutRef<typeof Slot> {
  asChild?: boolean;
}

export const SlotWrapper = forwardRef<ElementRef<typeof Slot>, SlotWrapperProps>(
  ({ asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);

SlotWrapper.displayName = 'SlotWrapper';
```

---

## 3. Generic Components

### 3.1 Generic List Component

```tsx
// packages/ui/src/components/animated-list/animated-list.tsx
import { forwardRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
  animation?: 'fade' | 'slide' | 'scale';
  staggerDelay?: number;
}

export function AnimatedList<T>({
  items,
  keyExtractor,
  renderItem,
  animation = 'fade',
  staggerDelay = 0.05,
}: AnimatedListProps<T>) {
  const variants = {
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slide: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  };

  return (
    <AnimatePresence mode="popLayout">
      {items.map((item, index) => (
        <motion.div
          key={keyExtractor(item)}
          variants={variants[animation]}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ delay: index * staggerDelay }}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// Usage with full type inference:
// <AnimatedList
//   items={users}
//   keyExtractor={u => u.id}
//   renderItem={u => <UserCard user={u} />}
//   animation="slide"
// />
// TypeScript knows `u` is User type
```

### 3.2 Generic Animation Wrapper

```tsx
interface AnimatedWrapperProps<T extends HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  animation: 'fadeIn' | 'slideUp' | 'scale';
  delay?: number;
  className?: string;
  ref?: React.Ref<T>;
}

export function AnimatedWrapper<T extends HTMLElement>({
  as: Component = 'div',
  children,
  animation,
  delay = 0,
  className,
  ref,
}: AnimatedWrapperProps<T>) {
  const animations = {
    fadeIn: { opacity: [0, 1] },
    slideUp: { opacity: [0, 1], y: [20, 0] },
    scale: { opacity: [0, 1], scale: [0.95, 1] },
  };

  return (
    <motion.div
      ref={ref as any}
      initial={animations[animation]}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## 4. Compound Component Types

### 4.1 Compound Component Pattern

```tsx
// packages/ui/src/components/card/card.tsx
import { createContext, useContext, type ReactNode } from 'react';

// Context for sharing state between compound components
interface CardContextValue {
  variant?: 'default' | 'outlined' | 'elevated';
}

const CardContext = createContext<CardContextValue>({});

// Root component
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  children: ReactNode;
  className?: string;
}

export function Card({ variant = 'default', children, className }: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={cn('rounded-lg border bg-card', className)}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

// Sub-components with access to context
Card.Header = function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('p-6', className)}>{children}</div>;
};

Card.Title = function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h3 className={cn('font-semibold leading-none', className)}>{children}</h3>;
};

Card.Content = function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('flex items-center p-6 pt-0', className)}>{children}</div>;
};

// Usage:
// <Card variant="elevated">
//   <Card.Header>
//     <Card.Title>Title</Card.Title>
//   </Card.Header>
//   <Card.Content>Content</Card.Content>
//   <Card.Footer>Actions</Card.Footer>
// </Card>
```

---

## 5. Event Handler Types

### 5.1 Custom Event Types

```tsx
// packages/ui/src/components/draggable/draggable.tsx
interface DragEvent {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

interface DraggableProps {
  children: React.ReactNode;
  onDragStart?: (event: DragEvent) => void;
  onDrag?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  boundary?: 'parent' | 'viewport' | { width: number; height: number };
  axis?: 'x' | 'y' | 'both';
}

// Ensure event types match native events where possible
interface ClickSparkEvent extends MouseEvent {
  sparkX: number;
  sparkY: number;
}
```

### 5.2 Animation Callback Types

```tsx
interface AnimationCallbacks {
  onStart?: () => void;
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
  onReverse?: () => void;
}

interface TextAnimationProps extends AnimationCallbacks {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}
```

---

## 6. Utility Types

### 6.1 Component Library Utilities

```typescript
// packages/ui/src/types/utils.ts

// Extract variant props from CVA
export type VariantProps<T extends (...args: any[]) => any> =
  Parameters<T>[0] extends undefined ? never : Parameters<T>[0];

// Merge component props with HTML attributes
export type MergeProps<
  T extends React.ElementType,
  P extends object = {}
> = Omit<React.ComponentPropsWithoutRef<T>, keyof P> & P;

// Polymorphic ref helper
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

// Strict Omit (ensures key exists)
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

// Require specific keys
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Forbid specific keys
export type ForbidKeys<T, K extends keyof any> = T & {
  [P in K]?: never;
};
```

### 6.2 Props Composition Helper

```typescript
// Combine props from multiple sources
type CombineProps<
  Base extends React.ElementType,
  Custom extends object = {},
  CVAVariants extends object = {}
> = React.ComponentPropsWithoutRef<Base> &
  Custom &
  CVAVariants;

// Example:
interface MyButtonProps
  extends CombineProps<
    'button',
    { isLoading?: boolean },
    VariantProps<typeof buttonVariants>
  > {}
```

---

## 7. Strict Type Checking

### 7.1 TypeScript Config for Component Library

```json
// packages/ui/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 7.2 Type Safety Checklist

```typescript
// ✅ Use 'as const' for immutable maps
const colorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
} as const;

// ✅ Infer return types from functions
function createVariants() {
  return { sm: 'text-sm', lg: 'text-lg' } as const;
}
// type Variants = ReturnType<typeof createVariants>;

// ✅ Use satisfies for type checking without widening
const config = {
  duration: 1000,
  easing: 'ease-in-out',
} satisfies AnimationConfig;

// ✅ Use branded types for IDs
export type ComponentId = string & { __brand: 'ComponentId' };

// ✅ Use const assertion for variant arrays
export const VARIANTS = ['default', 'primary', 'destructive'] as const;
export type Variant = (typeof VARIANTS)[number];
```

---

## 8. Pattern Decision Guide

| Pattern | Use When | Example |
|---------|----------|---------|
| **CVA + VariantProps** | Component with style variants | Button, Badge, Alert |
| **forwardRef** | Component needs ref forwarding | Button, Input, Link |
| **Polymorphic `as` prop** | Component can render as different element | Text, Box, Container |
| **Generic `<T>`** | Component works with data types | List, Table, Select |
| **Discriminated Union** | Mutually exclusive props | Loading states, Modal modes |
| **Compound Components** | Complex component with related sub-components | Card, Dialog, Form |
| **Render Props** | Customizable rendering logic | DataTable, VirtualList |
| **Context + Hook** | Shared state between components | Tabs, Accordion |

---

*Version: 1.0.0 | For Frontend UI TypeScript Component Types*
