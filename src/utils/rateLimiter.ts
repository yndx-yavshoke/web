import { rateLimit } from "elysia-rate-limit";

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
  headers: true,
  skip: (request) => {
    const url = new URL(request.url);
    // Skip rate limiting for Swagger UI paths
    return url.pathname.startsWith('/swagger');
  }
}); 