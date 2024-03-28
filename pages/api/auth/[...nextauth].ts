import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  authorize,
  signInCallback,
  jwtCallback,
  sessionCallback,
  getJwtHandlers,
} from "@server/auth";
import { prisma } from "@server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, {
  NextAuthOptions,
  Session,
  getServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// type @lib/types/types.d.ts Credentials
const CREDENTIALS_PATH = {
  nonce: {
    label: "Nonce",
    type: "text",
    placeholder: "",
  },
  userId: {
    label: "UserId",
    type: "text",
    placeholder: "",
  },
  signature: {
    label: "Signature",
    type: "text",
    placeholder: "",
  },
  wallet: {
    label: "Wallet",
    type: "text",
    placeholder: "",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, authOptions(req, res));
}

const authOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  return {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: CREDENTIALS_PATH,
        authorize: (credentials, req) => authorize(credentials, req, res),
      }),
    ],
    callbacks: {
      signIn: async ({ user, account }: any) =>
        await signInCallback(req, res, { user, account }),
      jwt: jwtCallback,
      session: async ({ session, user }: { session: Session; user: any }) =>
        await sessionCallback(req, { session, user }),
    },
    jwt: getJwtHandlers(req),
  };
};

export const getServerAuthSession = (req: any, res: any) => {
  return getServerSession(req, res, authOptions(req, res));
};
