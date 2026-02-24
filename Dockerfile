# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Instala dependências apenas quando necessário
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instala dependências baseado no gerenciador de pacotes preferido
# Copia apenas arquivos de lock primeiro para melhor cache do Docker
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Reconstrói o código fonte apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copia arquivos de configuração primeiro (mudam menos frequentemente)
# Agrupa arquivos de config em uma única camada para melhor cache
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* \
    next.config.ts tsconfig.json \
    postcss.config.mjs eslint.config.mjs \
    components.json ./

# Desabilita telemetria do Next.js para build mais rápido
ENV NEXT_TELEMETRY_DISABLED=1

# Build args para configuração da API
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copia código fonte (muda mais frequentemente)
COPY public ./public
COPY src ./src

RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Imagem de produção, copia todos os arquivos e executa o Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria usuário não-root em um único RUN para reduzir layers
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copia apenas arquivos necessários para produção
# Aproveita automaticamente os traces de output para reduzir o tamanho da imagem
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Agrupa cópias com mesmo chown para reduzir layers
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js é criado pelo next build a partir do output standalone
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]
