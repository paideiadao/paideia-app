import { prisma } from "@server/prisma";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { LoginRequestStatus, UserLoginStatus } from "@prisma/client";
import { generateNonceForLogin, deleteEmptyUser } from "@server/services/user";

export const authRouter = createTRPCRouter({
  getNonce: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userAddress } = input;
      const nonce = await generateNonceForLogin(userAddress);

      if (!nonce) {
        throw new Error("Address already in use by another user account");
      }

      return { ...nonce };
    }),
  initiateLogin: publicProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const verificationId = nanoid();
      const nonce = await generateNonceForLogin(input.address); // this will create the user if one doesn't exist
      const user = await prisma.user.findUnique({
        where: { id: nonce.userId },
      });

      if (!user) {
        throw new Error(`User account creation failed`);
      }

      if (!user.nonce) {
        await deleteEmptyUser(nonce.userId); // remove empty user if something went wrong
        throw new Error(`Nonce not generated correctly`);
      }

      const existingLoginRequests = await prisma.loginRequest.findMany({
        where: { userId: user.id },
      });

      for (const request of existingLoginRequests) {
        await prisma.loginRequest.delete({ where: { id: request.id } });
      }

      await prisma.loginRequest.create({
        data: {
          userId: user.id,
          verificationId: verificationId as string,
          message: user.nonce,
          status: UserLoginStatus.PENDING,
        },
      });

      return { verificationId, nonce: nonce };
    }),
  checkLoginStatus: publicProcedure
    .input(
      z.object({
        verificationId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const loginRequest = await prisma.loginRequest.findUnique({
        where: { verificationId: input.verificationId },
      });

      if (!loginRequest) {
        throw new Error("Invalid verificationId");
      }

      if (loginRequest.status === LoginRequestStatus.PENDING) {
        return { status: LoginRequestStatus.SIGNED };
      }

      if (loginRequest.status === LoginRequestStatus.SIGNED) {
        return {
          status: LoginRequestStatus.SIGNED,
          signedMessage: loginRequest.signedMessage,
          proof: loginRequest.proof,
        };
      }
    }),
  deleteEmptyUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const deleteUser = await deleteEmptyUser(input.userId);
      if (deleteUser.success) return { success: true };
      else return { error: deleteUser.error };
    }),
});
