import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { fitnessRouter } from "./routers/fitness";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  fitness: fitnessRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
