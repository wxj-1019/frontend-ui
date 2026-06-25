---
name: docker-deployment
description: Docker deployment for Frontend UI monorepo — Dockerfile, docker-compose, multi-stage builds, and production optimization. Use when containerizing the docs app or component library.
---

# Docker Deployment

Docker containerization patterns for the Frontend UI monorepo, covering multi-stage builds, pnpm in Docker, and production deployment optimization.

## When to Use

- Containerizing the docs Next.js app
- Building production Docker images
- Setting up local development with Docker Compose
- Optimizing image size for deployment
- Configuring CI/CD Docker builds

---

## 1. Dockerfile for Next.js App

### 1.1 Multi-Stage Production Build

```dockerfile
# Dockerfile (root of monorepo)
# Multi-stage build for Frontend UI docs app

# ─── Stage 1: Dependencies ─────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* ./
COPY apps/docs/package.json ./apps/docs/
COPY packages/ui/package.json ./packages/ui/
COPY packages/cli/package.json ./packages/cli/

# Install dependencies
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ──────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/docs/node_modules ./apps/docs/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules

# Copy source code
COPY . .

# Build the packages and app
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm --filter @frontend-ui/ui build
RUN pnpm --filter docs build

# ─── Stage 3: Production Runner ────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 1.2 Next.js Output Configuration

```typescript
// apps/docs/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment
  transpilePackages: ['@frontend-ui/ui'],
  // ... other config
};

export default nextConfig;
```

---

## 2. Docker Compose

### 2.1 Development Setup

```yaml
# docker-compose.yml (root)
version: '3.8'

services:
  docs:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  docs-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/apps/docs/node_modules
      - /app/packages/ui/node_modules
    environment:
      - NODE_ENV=development
    command: pnpm dev
```

### 2.2 Development Dockerfile

```dockerfile
# Dockerfile.dev
FROM node:20-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy dependency files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY apps/docs/package.json ./apps/docs/
COPY packages/ui/package.json ./packages/ui/
COPY packages/cli/package.json ./packages/cli/

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
```

---

## 3. Image Optimization

### 3.1 Size Reduction Strategies

```dockerfile
# Use Alpine base
FROM node:20-alpine

# Only copy necessary files
COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/.next/static ./.next/static
COPY --from=builder /app/apps/docs/public ./public

# Remove unnecessary files
RUN rm -rf /app/apps/docs/src
RUN rm -rf /app/packages/ui/src

# Use .dockerignore
echo "node_modules
.git
.next
dist
*.md
.env.local
.vscode
.github" > .dockerignore
```

### 3.2 .dockerignore

```
# .dockerignore
node_modules
.git
.gitignore

# Build outputs
.next
dist
storybook-static

# Development files
.env.local
.env.development
.vscode
.idea

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Documentation
*.md
!README.md
docs/

# Tests
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx
coverage/

# CI/CD
.github/
```

---

## 4. Common Commands

```bash
# Build production image
docker build -t frontend-ui/docs:latest .

# Run container
docker run -p 3000:3000 frontend-ui/docs:latest

# Development with compose
docker-compose up docs-dev

# Production with compose
docker-compose up -d docs

# Build and push to registry
docker build -t registry.example.com/frontend-ui/docs:v1.0.0 .
docker push registry.example.com/frontend-ui/docs:v1.0.0

# Multi-platform build
docker buildx build --platform linux/amd64,linux/arm64 -t frontend-ui/docs:latest .
```

---

## 5. Health Checks

```dockerfile
# Add to Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1
```

```yaml
# docker-compose.yml
services:
  docs:
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

*Version: 1.0.0 | For Frontend UI Docker Deployment*
