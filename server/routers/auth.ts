import { prisma } from "@server/prisma";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { LoginRequestStatus, UserLoginStatus } from "@prisma/client";
import {
  generateNonceForLogin,
  deleteEmptyUser,
  generateNonceForChangeAddress,
} from "@server/services/user";
import { verifySignature } from "@server/auth";
import jwt from "jsonwebtoken";
import { paideiaApi } from "@server/services/axios";

export const authRouter = createTRPCRouter({
  getNonce: publicProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { address } = input;
      const nonce = await generateNonceForLogin(address);

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
        return { status: LoginRequestStatus.PENDING };
      }

      if (loginRequest.status === LoginRequestStatus.SIGNED) {
        return {
          status: LoginRequestStatus.SIGNED,
          signedMessage: loginRequest.signedMessage,
          proof: loginRequest.proof,
        };
      }

      return { status: LoginRequestStatus.EXPIRED };
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
  getNonceForChangeAddress: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const nonce = await generateNonceForChangeAddress(userId);
    return { ...nonce };
  }),
  verifyNonceForChangeAddress: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        signedMessage: z.string(),
        proof: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { address, signedMessage, proof } = input;
      const signedMessageSplit = signedMessage.split(";");
      const userId = ctx.session.user.id;
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });
      const nonce = signedMessageSplit[0];
      if (nonce !== user.nonce) {
        throw new Error("Nonce doesn't match");
      }
      const result = verifySignature(address, signedMessage, proof, "nautilus");
      if (result) {
        const updateToken = jwt.sign(
          {
            sub: user.address,
            update_sub: address,
            permissions: "user",
          },
          process.env.PAIDEIA_API_SECRET ?? "secret",
          { expiresIn: "1h" }
        );
        const res = await paideiaApi.post(
          "/auth/change_primary_address",
          {},
          {
            headers: {
              Authorization: `Bearer ${updateToken}`,
            },
          }
        );
        if (res.status !== 200) {
          throw new Error("Invalid Signature");
        }
        const config = res.data;
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            address: address,
            nonce: nanoid(),
          },
        });
        return {
          id: config.id,
          alias: config.alias,
          registered_addresses: config.registered_addresses,
          jwt: jwt.sign(
            {
              sub: address,
              permissions: "user",
            },
            process.env.PAIDEIA_API_SECRET ?? "secret",
            { expiresIn: "1h" }
          ),
        };
      }
      throw new Error("Invalid Signature");
    }),
});
