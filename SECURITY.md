# Security and Rate Limiting

This document describes the security measures implemented in the server to prevent abuse and protect the database.

## Rate Limiting

The server implements multiple layers of rate limiting using [elysia-rate-limit](https://github.com/rayriffy/elysia-rate-limit):

### Global Rate Limit
- **Limit**: 100 requests per minute per IP
- **Duration**: 60 seconds
- **Scope**: All endpoints
- **Purpose**: Prevent general abuse and DoS attacks

### Authentication Rate Limit
- **Limit**: 5 attempts per 5 minutes per IP+UserAgent
- **Duration**: 300 seconds (5 minutes)
- **Endpoints**: `/auth/login`, `/auth/register`
- **Purpose**: Prevent brute force attacks on authentication
- **Features**: 
  - Counts failed requests towards the limit
  - Uses IP + User-Agent for better tracking
  - Moderate cooldown period for security

### API Rate Limit
- **Limit**: 30 requests per minute per IP
- **Duration**: 60 seconds
- **Endpoints**: `/api/user/*`
- **Purpose**: Protect user-related API endpoints

### Database Rate Limit
- **Limit**: 10 requests per minute per IP
- **Duration**: 60 seconds
- **Endpoints**: `/api/db/exist`
- **Purpose**: Protect database-heavy operations
- **Features**: Uses IP + User-Agent for tracking

### Public Rate Limit
- **Limit**: 60 requests per minute per IP
- **Duration**: 60 seconds
- **Endpoints**: `/api/public/experiments`
- **Purpose**: Allow higher limits for public endpoints

## Security Middleware

### Request Security
- **Payload Size Limit**: 1MB maximum request size
- **Suspicious Pattern Detection**: Blocks requests with:
  - Directory traversal attempts (`../`)
  - System file access (`/etc/passwd`, `/proc/`)
  - SQL injection patterns (`SELECT`, `UNION`, `DROP`, etc.)
  - XSS patterns (`<script>`, `javascript:`, etc.)

### Security Headers
The server automatically adds security headers to all responses:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy: default-src 'self'`

### Bot Detection and Testing Tool Support
- **Allows testing tools**: Postman, Insomnia, curl, wget, HTTPie, Charles, Fiddler, etc.
- **Blocks malicious tools**: masscan, nmap, sqlmap, nikto, dirb, gobuster, etc.
- **Logs testing tools**: For monitoring and debugging purposes
- **Blocks malicious bots**: Returns 403 Forbidden for security scanning tools

### Request Logging
- Logs all incoming requests with:
  - Timestamp
  - HTTP method and path
  - Client IP address
  - User-Agent (truncated to 100 chars)
- Logs response completion

## Endpoint Structure

```
/health                    - Health check (no rate limiting)
/auth/*                   - Authentication (strict rate limiting)
  /auth/login
  /auth/register
/api/*                    - API endpoints (moderate rate limiting)
  /api/user/*            - User operations
  /api/db/*              - Database operations (strict rate limiting)
    /api/db/exist
  /api/public/*          - Public endpoints (lenient rate limiting)
    /api/public/experiments
```

## Rate Limit Headers

When rate limits are hit, the server returns:
- **Status Code**: 429 (Too Many Requests)
- **Headers**: 
  - `Retry-After`: Seconds until the limit resets
  - `RateLimit-Limit`: Maximum requests allowed
  - `RateLimit-Remaining`: Requests remaining in current window
  - `RateLimit-Reset`: Timestamp when the limit resets

## Error Responses

All rate limit errors return JSON responses in Russian:

```json
{
  "error": "Too many authentication attempts",
  "message": "Слишком много попыток входа. Попробуйте через 5 минут.",
  "retryAfter": 300
}
```

## Monitoring

The server logs:
- All incoming requests with IP and User-Agent
- Suspicious request patterns
- Bot detection events
- Rate limit violations
- Security middleware errors

## Configuration

Rate limits can be adjusted in `/src/utils/rateLimiter.ts`:
- Modify `duration` to change the time window
- Modify `max` to change the request limit
- Modify `errorResponse` to customize error messages
- Add custom `generator` functions for different key strategies

## Best Practices for Students

When using the API:
1. **Respect rate limits** - Don't make excessive requests
2. **Handle 429 responses** - Implement retry logic with exponential backoff
3. **Use appropriate endpoints** - Don't use database endpoints unnecessarily
4. **Cache responses** - Store experiment data locally when possible
5. **Implement proper error handling** - Check for rate limit errors

### Recommended Testing Tools
The following tools are allowed and recommended for testing:
- **Postman** - Popular API testing tool
- **Insomnia** - Alternative API client
- **curl** - Command line HTTP client
- **wget** - Command line downloader
- **HTTPie** - User-friendly command line HTTP client
- **Charles Proxy** - HTTP proxy for debugging
- **Fiddler** - Web debugging proxy
- **Browser DevTools** - Built-in browser debugging tools

### Blocked Security Tools
The following security scanning tools are blocked:
- masscan, nmap, sqlmap, nikto, dirb, gobuster, wpscan, nuclei, etc.
- These tools will receive a 403 Forbidden response

## Production Considerations

For production deployment:
1. Consider using Redis for distributed rate limiting
2. Implement IP whitelisting for admin endpoints
3. Add monitoring and alerting for security events
4. Consider using a reverse proxy (nginx) for additional protection
5. Implement proper logging aggregation and analysis 