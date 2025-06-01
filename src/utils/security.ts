import { Elysia } from "elysia";

// Security middleware for additional protection
export const securityMiddleware = new Elysia()
  .onRequest(({ request, set }) => {
    const url = new URL(request.url);
    
    // Relaxed CSP for Swagger UI endpoints
    if (url.pathname.startsWith('/swagger')) {
      set.headers['Content-Security-Policy'] = [
        "default-src 'self'",
        "style-src 'self' 'unsafe-inline' https://unpkg.com",
        "script-src 'self' 'unsafe-inline' https://unpkg.com",
        "img-src 'self' data: https:",
        "font-src 'self' https://unpkg.com"
      ].join('; ');
    } else {
      // Strict CSP for all other endpoints
      set.headers['Content-Security-Policy'] = "default-src 'self'";
    }

    // Add other security headers
    set.headers['X-Content-Type-Options'] = 'nosniff';
    set.headers['X-Frame-Options'] = 'DENY';
    set.headers['X-XSS-Protection'] = '1; mode=block';
    set.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';

    // Check for suspicious patterns in URL
    const suspiciousPatterns = [
      /\.\./,           // Directory traversal
      /\/etc\/passwd/,  // System file access
      /\/proc\//,       // Process information
      /\bselect\b.*\bfrom\b/i, // SQL injection patterns
      /\bunion\b.*\bselect\b/i,
      /\bdrop\b.*\btable\b/i,
      /\binsert\b.*\binto\b/i,
      /\bdelete\b.*\bfrom\b/i,
      /<script/i,       // XSS patterns
      /javascript:/i,
      /vbscript:/i,
      /onload=/i,
      /onerror=/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url.pathname) || pattern.test(url.search)) {
        console.warn(`Suspicious request detected from ${request.headers.get('x-forwarded-for') || 'unknown'}: ${url.pathname}${url.search}`);
        set.status = 400;
        return { error: "Bad Request", message: "Подозрительный запрос заблокирован" };
      }
    }

    // Check request size (prevent large payload attacks)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1024 * 1024) { // 1MB limit
      set.status = 413;
      return { error: "Payload Too Large", message: "Размер запроса превышает допустимый лимит" };
    }

    // Check for malicious bot patterns in User-Agent (allow testing tools)
    const userAgent = request.headers.get('user-agent') || '';
    const maliciousBotPatterns = [
      /masscan/i,
      /nmap/i,
      /sqlmap/i,
      /nikto/i,
      /dirb/i,
      /gobuster/i,
      /wpscan/i,
      /nuclei/i,
      /burpsuite/i,
      /owasp/i,
    ];

    // Allow testing tools but log them for monitoring
    const testingToolPatterns = [
      /postman/i,
      /insomnia/i,
      /curl/i,
      /wget/i,
      /httpie/i,
      /charles/i,
      /fiddler/i,
      /python-requests/i,
      /axios/i,
      /fetch/i,
    ];

    const isMaliciousBot = maliciousBotPatterns.some(pattern => pattern.test(userAgent));
    const isTestingTool = testingToolPatterns.some(pattern => pattern.test(userAgent));

    if (isMaliciousBot) {
      console.warn(`Malicious bot detected and blocked: ${userAgent} accessing ${url.pathname}`);
      set.status = 403;
      return { error: "Forbidden", message: "Доступ запрещен для данного инструмента" };
    }

    if (isTestingTool && !url.pathname.includes('/health')) {
      console.log(`Testing tool detected: ${userAgent} accessing ${url.pathname}`);
      // Allow testing tools but log them for monitoring
    }
  })
  .onError(({ error, set }) => {
    // Log security-related errors
    console.error('Security middleware error:', error);
    set.status = 500;
    return { error: "Internal Server Error", message: "Произошла ошибка сервера" };
  });

// IP whitelist middleware for admin endpoints (if needed)
export const createIPWhitelist = (allowedIPs: string[]) => {
  return new Elysia().onRequest(({ request, set }) => {
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    if (!allowedIPs.includes(clientIP)) {
      set.status = 403;
      return { error: "Forbidden", message: "Доступ запрещен" };
    }
  });
};

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