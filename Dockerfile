# Frontend UI — 文档站 Docker 镜像
# 构建: docker compose build --no-cache
# 运行: docker compose up -d

# ── Stage 1: 依赖安装 ──
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/docs/package.json ./apps/docs/
COPY packages/ui/package.json ./packages/ui/

RUN pnpm install --frozen-lockfile

# ── Stage 2: 构建 ──
FROM deps AS builder
WORKDIR /app

COPY packages/ui/ packages/ui/
COPY apps/docs/ apps/docs/
COPY tsconfig.base.json ./

ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV SKIP_DTS="1"
RUN pnpm --filter @frontend-ui/ui build

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter docs build

# ── Stage 3: 生产运行 ──
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN apk add --no-cache curl \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=builder /app/apps/docs/public ./apps/docs/public
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/packages/ui/package.json ./packages/ui/package.json

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

CMD ["node", "apps/docs/server.js"]
