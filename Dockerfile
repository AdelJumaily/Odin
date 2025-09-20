# Multi-stage Dockerfile for Odin Desktop Application
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create data directory for SQLite
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

# Copy database schema
COPY --from=builder /app/database/local/migrations/001_initial_schema.sql ./database/local/migrations/

# Set environment variables for local deployment
ENV LOCAL_DATABASE_PATH=/app/data/odin_local.db
ENV LOCAL_DATABASE_WAL=true
ENV LOCAL_DATABASE_FOREIGN_KEYS=true
ENV PORT=3000

USER nextjs

EXPOSE 3000

ENV HOSTNAME "0.0.0.0"

# Initialize database on startup
RUN node -e "
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Create data directory
const dataDir = '/app/data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize SQLite database
const db = new Database('/app/data/odin_local.db');
const schemaPath = '/app/database/local/migrations/001_initial_schema.sql';
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);
db.close();
console.log('Local database initialized');
"

CMD ["node", "server.js"]
