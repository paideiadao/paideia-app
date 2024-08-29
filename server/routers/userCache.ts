import { prisma } from "@server/prisma";
import { paideiaApi } from "@server/services/axios";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@server/trpc";
import { z } from "zod";

export const userCacheRouter = createTRPCRouter({
  updateCache: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        dao: z.string(),
        profileImageUrl: z.optional(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const authId = await getAuthId(input.dao, input.name);
      if (!authId || authId?.address !== ctx.session.user.address) {
        throw Error("Unauthorized resource access attempted.");
      }
      const userExists = await prisma.userDetails.findFirst({
        where: {
          userDetailsId: authId.userDetailsId,
        },
      });
      if (userExists) {
        const userDetails = await prisma.userDetails.update({
          where: {
            userDetailsId: authId.userDetailsId,
          },
          data: {
            name: input.name,
            dao: input.dao,
            profileImageUrl: input.profileImageUrl,
          },
        });
        return userDetails;
      }
      const userDetails = await prisma.userDetails.create({
        data: {
          userDetailsId: authId.userDetailsId,
          name: input.name,
          dao: input.dao,
          profileImageUrl: input.profileImageUrl,
        },
      });
      return userDetails;
    }),
  getCache: publicProcedure
    .input(
      z.object({
        userDetailsId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userExists = await prisma.userDetails.findFirst({
        where: {
          userDetailsId: input.userDetailsId,
        },
      });
      return userExists;
    }),
});

export interface AuthId {
  address: string;
  userDetailsId: string;
}

export const getAuthId = async (dao: string, name: string) => {
  try {
    const res = await paideiaApi.get(`/users/details_by_slug/${dao}-${name}`);
    const authId: AuthId = {
      address: res.data.address,
      userDetailsId: res.data.id,
    };
    return authId;
  } catch (e: any) {
    console.error(e);
    return null;
  }
};
