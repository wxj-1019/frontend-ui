---
name: storybook-patterns
description: Storybook patterns for Frontend UI — component stories, decorators, controls, documentation, and visual testing. Use when writing or configuring Storybook for component documentation.
---

# Storybook Patterns

Best practices for documenting Frontend UI components with Storybook, covering story structure, controls, decorators, and visual testing.

## When to Use

- Writing stories for new components
- Configuring Storybook for the monorepo
- Setting up component controls and args
- Creating documentation-only pages
- Implementing visual regression testing

---

## 1. Story Structure

### 1.1 File Naming

```
ComponentName.stories.tsx    // Component story file
ComponentName.tsx            // Component source
ComponentName.test.tsx       // Component tests
index.ts                     // Public export
```

### 1.2 Basic Story Template

```tsx
// packages/ui/src/components/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    ...Default.args,
    variant: 'primary',
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: 'destructive',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    variant: 'link',
  },
};

// Size variants
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
    loadingText: 'Loading...',
  },
};
```

---

## 2. Animation Component Stories

### 2.1 Text Animation Story

```tsx
// packages/ui/src/text-animations/blur-text/blur-text.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BlurText } from './blur-text';

const meta: Meta<typeof BlurText> = {
  title: 'Text Animations/BlurText',
  component: BlurText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    delay: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello World',
  },
};

export const LongText: Story = {
  args: {
    text: 'The quick brown fox jumps over the lazy dog',
    delay: 0.05,
  },
};

export const CustomStyling: Story = {
  args: {
    text: 'Styled Text',
    className: 'text-4xl font-bold text-primary',
  },
};
```

### 2.2 Background Animation Story

```tsx
// packages/ui/src/backgrounds/particles/particles.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Particles } from './particles';

const meta: Meta<typeof Particles> = {
  title: 'Backgrounds/Particles',
  component: Particles,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'range', min: 10, max: 200, step: 10 },
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 50,
    color: '#ffffff',
  },
};

export const Dense: Story = {
  args: {
    count: 150,
    color: '#a0a0ff',
  },
};

export const Colored: Story = {
  args: {
    count: 80,
    color: '#ff6b6b',
  },
};
```

---

## 3. Decorators

### 3.1 Global Decorators

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

### 3.2 Component-Level Decorators

```tsx
// For dark background components
const darkBackgroundDecorator = (Story: React.ComponentType) => (
  <div className="bg-black p-8 rounded-lg">
    <Story />
  </div>
);

export const DarkMode: Story = {
  decorators: [darkBackgroundDecorator],
  args: {
    text: 'Neon Glow',
  },
};

// For full-width components
const fullWidthDecorator = (Story: React.ComponentType) => (
  <div className="w-full h-96">
    <Story />
  </div>
);

export const FullWidth: Story = {
  decorators: [fullWidthDecorator],
  parameters: {
    layout: 'fullscreen',
  },
};
```

### 3.3 Theme Toggle Decorator

```tsx
// .storybook/decorators/with-theme.tsx
import React, { useState } from 'react';

export const withTheme = (Story: React.ComponentType) => {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800"
        >
          {isDark ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="bg-background text-foreground p-8">
        <Story />
      </div>
    </div>
  );
};
```

---

## 4. Controls & Args

### 4.1 Custom Control Types

```tsx
const meta: Meta<typeof Component> = {
  argTypes: {
    // Range slider
    duration: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
    },
    // Color picker
    color: {
      control: 'color',
    },
    // Object editor
    config: {
      control: 'object',
    },
    // File upload
    image: {
      control: { type: 'file', accept: '.png,.jpg' },
    },
    // Date picker
    date: {
      control: 'date',
    },
    // Disable control
    internalProp: {
      control: false,
      table: { disable: true },
    },
  },
};
```

### 4.2 Conditional Controls

```tsx
const meta: Meta<typeof Component> = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled'],
    },
    // Only show borderColor when variant is 'outline'
    borderColor: {
      control: 'color',
      if: { arg: 'variant', eq: 'outline' },
    },
    // Only show when variant is 'filled'
    fillColor: {
      control: 'color',
      if: { arg: 'variant', eq: 'filled' },
    },
  },
};
```

---

## 5. Documentation

### 5.1 MDX Documentation

```tsx
// packages/ui/src/components/button/button.mdx
import { Meta, Story, Canvas, Controls } from '@storybook/blocks';
import * as ButtonStories from './button.stories';

<Meta of={ButtonStories} />

# Button

The Button component is the primary interactive element in the Frontend UI library.

## Variants

<Canvas of={ButtonStories.Default} />
<Canvas of={ButtonStories.Primary} />
<Canvas of={ButtonStories.Destructive} />

## Controls

<Controls of={ButtonStories.Default} />

## Usage

```tsx
import { Button } from '@frontend-ui/ui';

// Default button
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="destructive">Delete</Button>

// With size
<Button size="lg">Large Button</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

## Accessibility

- Buttons are rendered as `<button>` elements by default
- Supports keyboard navigation (Tab, Enter, Space)
- Disabled state prevents interaction and applies appropriate styling
```

### 5.2 Autodocs Configuration

```tsx
const meta: Meta<typeof Component> = {
  tags: ['autodocs'], // Enable automatic documentation
  parameters: {
    docs: {
      description: {
        component: 'A brief description of the component.',
      },
      canvas: {
        sourceState: 'shown', // 'hidden' | 'shown' | 'none'
      },
    },
  },
};
```

---

## 6. Story Organization

### 6.1 Sidebar Structure

```tsx
// Organize stories by category
const meta: Meta<typeof Component> = {
  title: 'Category/Subcategory/ComponentName',
  // Examples:
  // 'Text Animations/BlurText'
  // 'Animations/FadeContent'
  // 'Backgrounds/Particles'
  // 'Components/Button'
  // 'GSAP Animations/ScrollReveal'
};
```

### 6.2 Grouping Related Stories

```tsx
// Use story names for grouping
export const _Primary: Story = { /* ... */ };
_Primary.storyName = 'Variants/Primary';

export const _SizeLarge: Story = { /* ... */ };
_SizeLarge.storyName = 'Sizes/Large';
```

---

## 7. Advanced Patterns

### 7.1 Play Function (Interactive Stories)

```tsx
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const ClickInteraction: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};

export const HoverInteraction: Story = {
  args: {
    children: 'Hover me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.hover(button);
    // Verify hover state
  },
};
```

### 7.2 Template for Multiple Stories

```tsx
// Create a reusable template
const Template = (args: ButtonProps) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Button' };

export const Primary = Template.bind({});
Primary.args = { ...Default.args, variant: 'primary' };
```

### 7.3 Story with Loading State

```tsx
export const LoadingState: Story = {
  args: {
    isLoading: true,
    loadingText: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button shows loading spinner and prevents clicks.',
      },
    },
  },
};
```

---

## 8. Visual Testing

### 8.1 Chromatic Setup

```bash
# Install Chromatic
pnpm add -D chromatic

# Add to package.json scripts
{
  "scripts": {
    "chromatic": "chromatic --project-token=YOUR_TOKEN"
  }
}
```

### 8.2 Snapshot Testing

```tsx
export const Snapshot: Story = {
  args: {
    children: 'Snapshot Test',
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

// Disable snapshot for animated components
export const AnimatedComponent: Story = {
  args: { /* ... */ },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
```

---

## 9. Monorepo Configuration

### 9.1 Storybook Config for Monorepo

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../apps/docs/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Resolve monorepo aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../packages/ui/src'),
    };
    return config;
  },
};

export default config;
```

### 9.2 Package-Level Stories

```typescript
// Each package can have its own storybook
// packages/ui/.storybook/main.ts
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
};

export default config;
```

---

*Version: 1.0.0 | For Frontend UI Storybook Documentation*
