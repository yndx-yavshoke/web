#!/bin/bash
set -euo pipefail  # Strict error handling

# Color output for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Database connection parameters with defaults
if [ -n "${DATABASE_URL:-}" ]; then
    log "🔗 Using DATABASE_URL for all database operations."
else
    log_error "❌ DATABASE_URL is not set. Please provide a valid DATABASE_URL environment variable."
    exit 1
fi

log "🚀 Starting server setup..."

# Function to test database connectivity
test_db_connection() {
    psql "$DATABASE_URL" -c "SELECT 1;" >/dev/null 2>&1
}

# Wait for database with exponential backoff and timeout
log "🔄 Waiting for database connection..."
max_attempts=30
attempt=1
wait_time=1

while [ $attempt -le $max_attempts ]; do
    if test_db_connection; then
        log_success "✓ Database service is ready"
        break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
        log_error "❌ Database connection failed after $max_attempts attempts"
        exit 1
    fi
    
    log "⏳ Database not ready, waiting ${wait_time}s (attempt $attempt/$max_attempts)"
    sleep $wait_time
    
    # Exponential backoff (cap at 5 seconds)
    wait_time=$((wait_time < 5 ? wait_time * 2 : 5))
    attempt=$((attempt + 1))
done

# Run database migrations based on environment
log "📊 Setting up database schema..."
if [ "${NODE_ENV:-development}" = "production" ]; then
    log "🏭 Production mode: Running migrations..."
    if ! bun run db:migrate; then
        log_error "❌ Database migration failed"
        exit 1
    fi
    log_success "✓ Database migrations completed"
else
    log "🛠️  Development mode: Pushing schema..."
    if ! bun run db:push; then
        log_error "❌ Database schema push failed"
        exit 1
    fi
    log_success "✓ Database schema synchronized"
fi


log_success "🎉 Database setup complete!"
log "🌐 Starting Elysia server..."

# Use exec to replace the shell process, ensuring proper signal handling
exec bun run dev