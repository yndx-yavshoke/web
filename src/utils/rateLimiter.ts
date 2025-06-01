import { rateLimit } from "elysia-rate-limit";

// Custom key generator that handles cases where server IP detection fails
const customKeyGenerator = (req: Request, server: any) => {
  // Try multiple methods to get the client IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const serverIP = server?.requestIP?.(req)?.address;
  
  const ip = forwardedFor?.split(',')[0]?.trim() || 
            realIP || 
            serverIP || 
            '127.0.0.1'; // fallback to localhost for development
  
  const userAgent = req.headers.get('User-Agent') ?? 'unknown';
  // Create a hash-like key combining IP and User-Agent
  return `${ip}:${userAgent.slice(0, 50)}`;
};

// Simple fallback key generator for global rate limiting
const simpleKeyGenerator = (req: Request, server: any) => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const serverIP = server?.requestIP?.(req)?.address;
  
  return forwardedFor?.split(',')[0]?.trim() || 
         realIP || 
         serverIP || 
         '127.0.0.1';
};

// Global rate limit - applies to all requests
export const globalRateLimit = rateLimit({
  duration: 60000, // 1 minute
  max: 100, // 100 requests per minute per IP
  errorResponse: new Response(
    JSON.stringify({ 
      error: "Too many requests", 
      message: "Превышен лимит запросов. Попробуйте позже.",
      retryAfter: 60
    }),
    {
      status: 429,
      headers: { 
        "Content-Type": "application/json",
        "Retry-After": "60"
      }
    }
  ),
  scoping: "global",
  generator: simpleKeyGenerator,
  headers: true
});

// Strict rate limit for auth endpoints (login/register) - 5 minute ban
export const authRateLimit = rateLimit({
  duration: 300000, // 5 minutes
  max: 5, // 5 attempts per 5 minutes per IP+UserAgent
  errorResponse: new Response(
    JSON.stringify({ 
      error: "Too many authentication attempts", 
      message: "Слишком много попыток входа. Попробуйте через 5 минут.",
      retryAfter: 300
    }),
    {
      status: 429,
      headers: { 
        "Content-Type": "application/json",
        "Retry-After": "300"
      }
    }
  ),
  scoping: "scoped",
  generator: customKeyGenerator,
  headers: true,
  countFailedRequest: true // Count failed requests towards the limit
});

// Moderate rate limit for API endpoints
export const apiRateLimit = rateLimit({
  duration: 60000, // 1 minute
  max: 30, // 30 requests per minute per IP
  errorResponse: new Response(
    JSON.stringify({ 
      error: "API rate limit exceeded", 
      message: "Превышен лимит API запросов. Попробуйте позже.",
      retryAfter: 60
    }),
    {
      status: 429,
      headers: { 
        "Content-Type": "application/json",
        "Retry-After": "60"
      }
    }
  ),
  scoping: "scoped",
  generator: simpleKeyGenerator,
  headers: true
});

// Strict rate limit for database-heavy operations (like user existence checks)
export const dbRateLimit = rateLimit({
  duration: 60000, // 1 minute
  max: 10, // 10 requests per minute per IP
  errorResponse: new Response(
    JSON.stringify({ 
      error: "Database query limit exceeded", 
      message: "Превышен лимит запросов к базе данных. Попробуйте позже.",
      retryAfter: 60
    }),
    {
      status: 429,
      headers: { 
        "Content-Type": "application/json",
        "Retry-After": "60"
      }
    }
  ),
  scoping: "scoped",
  generator: simpleKeyGenerator,
  headers: true
});

// Lenient rate limit for public endpoints (like experiments)
export const publicRateLimit = rateLimit({
  duration: 60000, // 1 minute
  max: 60, // 60 requests per minute per IP
  errorResponse: new Response(
    JSON.stringify({ 
      error: "Public API rate limit exceeded", 
      message: "Превышен лимит запросов к публичному API. Попробуйте позже.",
      retryAfter: 60
    }),
    {
      status: 429,
      headers: { 
        "Content-Type": "application/json",
        "Retry-After": "60"
      }
    }
  ),
  scoping: "scoped",
  generator: simpleKeyGenerator,
  headers: true
}); 