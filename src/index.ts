import { Elysia, t } from "elysia";
import { authController } from "./controllers/auth";
import { experimentsController } from "./controllers/experiments";
import { existController } from "./controllers/exist";
import { userController } from "./controllers/user";
import { swagger } from "@elysiajs/swagger";
import { SharedModel } from "./models/sharedModel";
import cors from "@elysiajs/cors";
import { 
  globalRateLimit, 
  authRateLimit, 
  apiRateLimit, 
  dbRateLimit, 
  publicRateLimit 
} from "./utils/rateLimiter";
import { securityMiddleware, requestLogger } from "./utils/security";
import { db, dbPool } from "./db";

const app = new Elysia()
  .use(cors())
  .use(securityMiddleware) // Apply security middleware first
  .use(requestLogger) // Log all requests for monitoring
  .use(globalRateLimit) // Apply global rate limit to all routes
  .use(SharedModel)
  .get("/health", async () => {
    try {
      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        database: "connected",
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development"
      };
    } catch (error) {
      return {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
        error: error instanceof Error ? error.message : "Unknown database error"
      };
    }
  })
  .group("/auth", (app) => 
    app.use(authRateLimit).use(authController)
  )
  .group("/api", (app) => 
    app
      .use(apiRateLimit)
      .use(userController)
      .group("/db", (dbApp) => 
        dbApp.use(dbRateLimit).use(existController)
      )
      .group("/public", (publicApp) => 
        publicApp.use(publicRateLimit).use(experimentsController)
      )
  );

app
  .use(
    swagger({
      documentation: {
        info: {
          title: "App API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      provider: "swagger-ui",
      swaggerOptions: {
        persistAuthorization: true,
      },
      excludeStaticFile: false,
      path: "/swagger"
    })
  )
  .listen(3000);

export type App = typeof app;

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await dbPool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await dbPool.end();
  process.exit(0);
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
