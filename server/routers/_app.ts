import { createTRPCRouter } from "@server/trpc";
import { authRouter } from "./auth";
import { transactionRouter } from "./transaction";
import { userCacheRouter } from "./userCache";
import { transactionActivityRouter } from "./transactionActivity";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  transaction: transactionRouter,
  userCache: userCacheRouter,
  transactionActivity: transactionActivityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
