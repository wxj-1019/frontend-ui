---
name: monorepo-engineering
description: pnpm workspace + Turborepo best practices for frontend monorepos. Package management, build orchestration, caching, dependency management, and release workflows. Use when working with the Frontend UI monorepo structure.
---

# Monorepo Engineering

Best practices for managing the Frontend UI pnpm + Turborepo monorepo, covering workspace configuration, build pipelines, caching, dependency management, and release workflows.

## When to Use

- Adding a new package to the monorepo
- Configuring build pipelines and caching
- Managing cross-package dependencies
- Setting up CI/CD for the monorepo
- Publishing packages to npm
- Troubleshooting build issues

---

## 1. Workspace Structure

### 1.1 Directory Layout

```
frontend-ui/
├── apps/
│   └── docs/                    # Next.js documentation site
│       ├── app/                 # App Router
│       ├── components/          # Site-specific components
│       ├── lib/                 # Utilities, registries
│       ├── package.json         # Depends on @frontend-ui/ui
│       └── next.config.ts
├── packages/
│   ├── ui/                      # Core component library
│   │   ├── src/                 # Component source
│   │   ├── dist/                # Build output
│   │   ├── package.json         # Published package
│   │   └── tsup.config.ts       # Build config
│   └── cli/                     # CLI tool
│       ├── src/
│       ├── bin/
│       └── package.json
├── packages/ui/                 # ⚠️ Duplicate check — ensure no nested packages
├── pnpm-workspace.yaml          # Workspace definition
├── turbo.json                   # Pipeline configuration
├── package.json                 # Root workspace
└── tsconfig.base.json           # Shared TypeScript config
```

### 1.2 Workspace Definition

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 1.3 Root package.json

```json
{
  "name": "frontend-ui",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "test:watch": "turbo run test:watch",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.4.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

---

## 2. Turborepo Pipeline

### 2.1 Pipeline Configuration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "globalEnv": ["NODE_ENV"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"],
      "env": ["NEXT_PUBLIC_*"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

### 2.2 Dependency Graph Rules

```
^build  →  "dependsOn": ["^build"] means build dependencies first
build   →  "dependsOn": ["build"] means build self before test

Example: apps/docs depends on packages/ui
  1. packages/ui build → generates dist/
  2. apps/docs build → can import from @frontend-ui/ui
```

### 2.3 Task Caching Strategy

| Task | Cacheable | Inputs | Outputs |
|------|-----------|--------|---------|
| `build` | ✅ | `src/**/*`, `tsconfig.json`, `package.json` | `dist/`, `.next/` |
| `lint` | ✅ | `src/**/*`, `eslint.config.*` | — |
| `test` | ✅ | `src/**/*`, `*.test.{ts,tsx}` | `coverage/` |
| `dev` | ❌ | — | — |
| `clean` | ❌ | — | — |

---

## 3. Package Configuration

### 3.1 Component Library Package (`packages/ui`)

```json
{
  "name": "@frontend-ui/ui",
  "version": "0.1.0",
  "description": "Animation component library",
  "sideEffects": false,
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./text-animations/*": {
      "types": "./dist/text-animations/*.d.ts",
      "import": "./dist/text-animations/*.mjs"
    },
    "./animations/*": {
      "types": "./dist/animations/*.d.ts",
      "import": "./dist/animations/*.mjs"
    },
    "./components/*": {
      "types": "./dist/components/*.d.ts",
      "import": "./dist/components/*.mjs"
    },
    "./backgrounds/*": {
      "types": "./dist/backgrounds/*.d.ts",
      "import": "./dist/backgrounds/*.mjs"
    },
    "./gsap-animations/*": {
      "types": "./dist/gsap-animations/*.d.ts",
      "import": "./dist/gsap-animations/*.mjs"
    },
    "./blocks/*": {
      "types": "./dist/blocks/*.d.ts",
      "import": "./dist/blocks/*.mjs"
    },
    "./hooks/*": {
      "types": "./dist/hooks/*.d.ts",
      "import": "./dist/hooks/*.mjs"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "tailwindcss": ">=4.0.0"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "@react-spring/web": "^10.1.1",
    "animejs": "^4.5.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "gsap": "^3.15.0",
    "lenis": "^1.3.23",
    "motion": "^12.40.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/react": "^19.2.17",
    "tsup": "^8.0.0",
    "typescript": "^5.4.5",
    "vitest": "^2.0.0"
  }
}
```

### 3.2 CLI Package (`packages/cli`)

```json
{
  "name": "@frontend-ui/cli",
  "version": "0.1.0",
  "description": "CLI tool for Frontend UI",
  "type": "module",
  "bin": {
    "frontend-ui": "./bin/frontend-ui.js"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "bin"],
  "scripts": {
    "build": "tsup src/index.ts --format esm --out-dir dist",
    "dev": "tsup src/index.ts --format esm --out-dir dist --watch",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "commander": "^12.0.0",
    "chalk": "^5.3.0",
    "prompts": "^2.4.2",
    "fs-extra": "^11.2.0",
    "cosmiconfig": "^9.0.0"
  },
  "devDependencies": {
    "@types/prompts": "^2.4.9",
    "@types/fs-extra": "^11.0.4",
    "tsup": "^8.0.0",
    "typescript": "^5.4.5"
  }
}
```

### 3.3 Docs App (`apps/docs`)

```json
{
  "name": "docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@frontend-ui/ui": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "tailwindcss": "^4.0.0",
    "@types/react": "^19.2.17"
  }
}
```

---

## 4. Cross-Package Dependencies

### 4.1 Workspace Protocol

```json
{
  "dependencies": {
    "@frontend-ui/ui": "workspace:*"
  }
}
```

- `workspace:*` — Always use the latest local version
- `workspace:^0.1.0` — Use local version matching semver range
- `workspace:../ui` — Relative path (avoid if possible)

### 4.2 Dependency Types

| Type | Use For | Example |
|------|---------|---------|
| `dependencies` | Runtime deps needed by consumers | `motion`, `gsap` |
| `devDependencies` | Build/test tools only | `vitest`, `eslint` |
| `peerDependencies` | Required by consumer's project | `react`, `react-dom`, `tailwindcss` |
| `optionalDependencies` | Optional runtime deps | `three` (for 3D components) |

### 4.3 Dependency Checklist

Before adding a dependency to `@frontend-ui/ui`:

```
✅ Is it needed at runtime? → dependencies
✅ Is it only for build/test? → devDependencies
✅ Will consumers need to install it? → peerDependencies
✅ Is it heavy and optional? → optionalDependencies
✅ Is it already in the monorepo? → workspace:*
```

---

## 5. Build Configuration

### 5.1 tsup Config for UI Package

```typescript
// packages/ui/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/text-animations/*/index.ts',
    'src/animations/*/index.ts',
    'src/components/*/index.ts',
    'src/backgrounds/*/index.ts',
    'src/gsap-animations/*/index.ts',
    'src/blocks/*/index.ts',
    'src/hooks/*/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    'tailwindcss',
    'motion',
    'gsap',
    '@gsap/react',
    '@react-spring/web',
    'animejs',
    'lenis',
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],
  banner: {
    js: '"use client";',
  },
});
```

### 5.2 Build Output Structure

```
packages/ui/dist/
├── index.js              # CJS entry
├── index.mjs             # ESM entry
├── index.d.ts            # Type declarations
├── text-animations/
│   ├── blur-text.js
│   ├── blur-text.mjs
│   └── blur-text.d.ts
├── animations/
├── components/
├── backgrounds/
├── gsap-animations/
├── blocks/
└── hooks/
```

### 5.3 Build Verification

```bash
# After building, verify exports
pnpm --filter @frontend-ui/ui build

# Check all entry points exist
node -e "
const pkg = require('./packages/ui/package.json');
Object.keys(pkg.exports).forEach(key => {
  const exp = pkg.exports[key];
  console.log(key, '→', exp.import.replace('./dist', 'dist'));
});
"

# Verify bundle size
pnpm --filter @frontend-ui/ui build --analyze
```

---

## 6. TypeScript Configuration

### 6.1 Base tsconfig

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  }
}
```

### 6.2 Package tsconfig

```json
// packages/ui/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 6.3 Path Aliases

```typescript
// In component files
import { cn } from '@/lib/utils';
import { BlurText } from '@/text-animations/blur-text';

// tsup resolves via tsconfig paths
// Next.js resolves via jsconfig/tsconfig
```

---

## 7. Common Commands

### 7.1 Development

```bash
# Start all dev servers (docs + ui watch)
pnpm dev

# Start specific package
pnpm --filter @frontend-ui/ui dev
pnpm --filter docs dev

# Start CLI in dev mode
pnpm --filter @frontend-ui/cli dev
```

### 7.2 Building

```bash
# Build all packages (topological order)
pnpm build

# Build specific package
pnpm --filter @frontend-ui/ui build

# Build with cache bust
pnpm build --force
```

### 7.3 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @frontend-ui/ui test

# Run tests with coverage
pnpm --filter @frontend-ui/ui test --coverage

# Run tests in watch mode
pnpm --filter @frontend-ui/ui test:watch
```

### 7.4 Linting

```bash
# Lint all packages
pnpm lint

# Lint specific package
pnpm --filter @frontend-ui/ui lint

# Fix lint issues
pnpm --filter @frontend-ui/ui lint --fix
```

### 7.5 Adding Dependencies

```bash
# Add dependency to root (shared dev tools)
pnpm add -D turbo@latest -w

# Add to specific package
pnpm --filter @frontend-ui/ui add motion

# Add dev dependency
pnpm --filter @frontend-ui/ui add -D @types/react

# Add peer dependency (manual in package.json)
# Then run: pnpm install
```

---

## 8. Troubleshooting

### 8.1 "Cannot find module '@frontend-ui/ui'"

```bash
# Solution 1: Build the dependency first
pnpm --filter @frontend-ui/ui build

# Solution 2: Use dev mode (symlinks active)
pnpm dev

# Solution 3: Check workspace protocol
# Ensure apps/docs/package.json has:
# "@frontend-ui/ui": "workspace:*"
```

### 8.2 "Types not found" for workspace packages

```bash
# Build types first
pnpm --filter @frontend-ui/ui build

# Or add to tsconfig paths
{
  "compilerOptions": {
    "paths": {
      "@frontend-ui/ui": ["../packages/ui/src/index.ts"]
    }
  }
}
```

### 8.3 "Module not found" in Next.js app

```bash
# Ensure transpilePackages is configured
// apps/docs/next.config.ts
const nextConfig = {
  transpilePackages: ['@frontend-ui/ui'],
};
export default nextConfig;
```

### 8.4 Duplicate React instances

```bash
# Check for duplicate React in lockfile
pnpm list react --depth=10

# Solution: hoist React to root
// pnpm-workspace.yaml
packageExtensions:
  "react@*":
    peerDependencies:
      react: "*"
```

### 8.5 Cache Invalidation

```bash
# Clear all caches
pnpm clean
rm -rf .turbo
rm -rf node_modules/.cache

# Reinstall and rebuild
pnpm install
pnpm build
```

---

## 9. Adding a New Package

### 9.1 Step-by-Step

```bash
# 1. Create directory
mkdir packages/new-package

# 2. Create package.json
cat > packages/new-package/package.json << 'EOF'
{
  "name": "@frontend-ui/new-package",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {},
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.4.5"
  }
}
EOF

# 3. Create tsconfig.json
cat > packages/new-package/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# 4. Create source directory
mkdir -p packages/new-package/src

# 5. Add entry point
echo 'export const hello = () => "world";' > packages/new-package/src/index.ts

# 6. Create tsup config
cat > packages/new-package/tsup.config.ts << 'EOF'
import { defineConfig } from 'tsup';
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
EOF

# 7. Install dependencies
pnpm install

# 8. Add to turbo pipeline (if needed)
# Edit turbo.json to include new package tasks

# 9. Build
pnpm --filter @frontend-ui/new-package build
```

---

## 10. Release Workflow

### 10.1 Versioning with Changesets

```bash
# 1. Add changeset
pnpm changeset

# 2. Select packages and bump type (patch/minor/major)

# 3. Version packages
pnpm changeset version

# 4. Update lockfile
pnpm install

# 5. Build all packages
pnpm build

# 6. Publish
pnpm changeset publish
```

### 10.2 Pre-publish Checklist

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Test
pnpm test

# Build
pnpm build

# Verify exports
node -e "require('./packages/ui/package.json')"

# Check bundle size
pnpm --filter @frontend-ui/ui build --analyze
```

---

*Version: 1.0.0 | For Frontend UI Monorepo*
