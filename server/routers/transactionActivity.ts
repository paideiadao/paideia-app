import { prisma } from "@server/prisma";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@server/trpc";
import { z } from "zod";
import { getAuthId } from "./userCache";

export const transactionActivityRouter = createTRPCRouter({
  putTransactionActivity: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        dao: z.string(),
        transactionId: z.string(),
        href: z.optional(z.string()),
        action: z.string(),
        value: z.optional(z.string()),
        category: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const authId = await getAuthId(input.dao, input.name);
      if (!authId || authId?.address !== ctx.session.user.address) {
        throw Error("Unauthorized resource access attempted.");
      }
      const activity = await prisma.transactionActivity.create({
        data: {
          userDetailsId: authId.userDetailsId,
          ...input,
        },
      });
      return activity;
    }),
  getUserTransactionActivities: publicProcedure
    .input(
      z.object({
        userDetailsId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const res = await prisma.transactionActivity.findMany({
        where: {
          userDetailsId: input.userDetailsId,
        },
        include: {
          userDetails: true,
        },
      });
      return res;
    }),
  getTransactionActivities: publicProcedure.query(async () => {
    const res = await prisma.transactionActivity.findMany({
      include: {
        userDetails: true,
      },
      take: 100,
      orderBy: {
        date: "desc",
      },
    });
    return res;
  }),
});
