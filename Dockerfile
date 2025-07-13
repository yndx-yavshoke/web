FROM node:18-alpine as base
WORKDIR /usr/src/app

# Accept build arguments
ARG EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL

# Install system dependencies
RUN apk add --no-cache git

# Copy package.json
COPY package.json ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build for web
RUN pnpm run web:build

# Production stage
FROM nginx:alpine as production
WORKDIR /usr/share/nginx/html

# Copy built files (Expo exports to dist by default)
COPY --from=base /usr/src/app/dist ./

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"] 