import { Elysia } from "elysia";

// Request logging middleware for monitoring
export const requestLogger = new Elysia()
  .onRequest(({ request }) => {
    const timestamp = new Date().toISOString();
    const method = request.method;
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    console.log(`[${timestamp}] ${method} ${url.pathname} - IP: ${ip} - UA: ${userAgent.slice(0, 100)}`);
  })
  .onAfterHandle(({ request, response }) => {
    const timestamp = new Date().toISOString();
    const method = request.method;
    const url = new URL(request.url);
    
    console.log(`[${timestamp}] ${method} ${url.pathname} - Response sent`);
  }); 