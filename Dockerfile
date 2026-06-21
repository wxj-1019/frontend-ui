# ═══════════════════════════════════════════════════════════════
# Frontend UI — 文档站 Docker 镜像
# 基于 pnpm Monorepo 多阶段构建
#
# 构建: docker compose build --no-cache
# 运行: docker compose up -d
# ═══════════════════════════════════════════════════════════════

# ── Stage 1: 依赖安装 ──
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat \
    && corepack enable \
    && corepack prepare pnpm@9 --activate

WORKDIR /app

# 复制 workspace 配置和锁文件（利用 Docker 层缓存）
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/docs/package.json ./apps/docs/
COPY packages/ui/package.json ./packages/ui/

# 安装全部依赖（含 devDependencies，供构建阶段使用）
RUN pnpm install --frozen-lockfile

# ── Stage 2: 构建 ──
FROM deps AS builder
WORKDIR /app

# 复制源码
COPY packages/ui/ packages/ui/
COPY apps/docs/ apps/docs/

# 构建 UI 组件库
RUN pnpm --filter @frontend-ui/ui build

# 构建文档站（standalone 模式）
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter docs build

# ── Stage 3: 生产运行 ──
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# 运行时依赖（curl 仅用于 HEALTHCHECK）
RUN apk add --no-cache curl \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# 复制 standalone 输出（server.js 位于 apps/docs/ 下）
COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=builder /app/apps/docs/public ./apps/docs/public

# 复制 UI 包产物（standalone 可能已包含，作为兜底保留）
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/packages/ui/package.json ./packages/ui/package.json

# 所有权切换
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

CMD ["node", "apps/docs/server.js"]
# Frontend UI — 文档站 Docker 镜像
# 基于 pnpm Monorepo 多阶段构建
#
# 构建: docker compose build --no-cache
# 运行: docker compose up -d
# ═══════════════════════════════════════════════════════════════

# ── Stage 1: 依赖安装 ──
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# 复制 workspace 配置和锁文件（利用 Docker 层缓存）
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/docs/package.json ./apps/docs/
COPY packages/ui/package.json ./packages/ui/

# 安装全部依赖（含 devDependencies，供构建阶段使用）
RUN pnpm install --frozen-lockfile

# ── Stage 2: 构建 ──
FROM deps AS builder
WORKDIR /app

# 复制源码
COPY packages/ui/ packages/ui/
COPY apps/docs/ apps/docs/

# 构建 UI 组件库
RUN pnpm --filter @frontend-ui/ui build

# 构建文档站（standalone 模式）
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter docs build

# ── Stage 3: 生产运行 ──
FROM node:20-alpine AS runner
RUN apk add --no-cache curl

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制 standalone 输出（server.js 位于 apps/docs/ 下）
COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=builder /app/apps/docs/public ./apps/docs/public

# 复制 UI 包产物（standalone 可能已包含，作为兜底保留）
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/packages/ui/package.json ./packages/ui/package.json

# 所有权切换
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

CMD ["node", "apps/docs/server.js"]
