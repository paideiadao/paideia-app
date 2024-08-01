import { createTRPCRouter } from "@server/trpc";
import { authRouter } from "./auth";
import { transactionRouter } from "./transaction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
