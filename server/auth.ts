import { UserLoginStatus } from "@prisma/client";
import { prisma } from "@server/prisma";
import { getCookie, setCookie } from "cookies-next";
import { Address, verify_signature } from "ergo-lib-wasm-nodejs";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestInternal, Session, User } from "next-auth";
import {
  JWTDecodeParams,
  JWTEncodeParams,
  decode,
  encode,
} from "next-auth/jwt";
import { ProviderType } from "next-auth/providers/index";
import jwt from "jsonwebtoken";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Account {
    id: string;
    userId?: string;
    type: ProviderType;
    provider: string;
    providerAccountId: string;
    refreshToken?: string | null;
    accessToken?: string | null;
    expiresAt?: number | null;
    tokenType?: string | null;
    scope?: string | null;
    idToken?: string | null;
    sessionState?: string | null;
    user: User;
  }

  interface Session {
    user: {
      id: string;
      address?: string;
      jwt?: string;
    };
  }

  interface User {
    id: string;
    address: string | null;
    nonce: string | null;
  }

  interface Wallet {
    id: number;
    type: string | null;
    changeAddress: string;
    unusedAddresses: string[];
    usedAddresses: string[];
    userId: string;
    user?: User;
  }
}

const signUser = async (
  user: User,
  credentials: Credentials
): Promise<User | null> => {
  const walletParse: ParsedWallet = JSON.parse(credentials.wallet);
  const signatureParse = JSON.parse(credentials.signature);
  if (walletParse.type === "nautilus") {
    const signedMessageSplit = signatureParse.signedMessage.split(";");
    const nonce = signedMessageSplit[0];
    if (nonce !== user.nonce) {
      throw new Error(`Nonce doesn't match`);
    }
  } else if (walletParse.type === "mobile") {
    const nonce = signatureParse.signedMessage.slice(20, 41);
    if (nonce !== user.nonce) {
      throw new Error(`Nonce doesn't match`);
    }
  } else {
    throw new Error("Unrecognized wallet type");
  }

  const result = verifySignature(
    walletParse.defaultAddress,
    signatureParse.signedMessage,
    signatureParse.proof,
    walletParse.type
  );
  if (result) {
    const newNonce = nanoid();
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        nonce: newNonce,
      },
    });
    const newUser = { ...user, walletType: walletParse.type };
    return newUser;
  }
  return null;
};

export const createNewUser = async (
  user: User,
  credentials: Credentials
): Promise<User | null> => {
  const { nonce, userId, signature, wallet } = credentials;
  const walletParse: ParsedWallet = JSON.parse(wallet);
  const signatureParse = JSON.parse(signature);

  if (walletParse.type === "nautilus") {
    const signedMessageSplit = signatureParse.signedMessage.split(";");
    const nonce = signedMessageSplit[0];
    if (nonce !== user.nonce) {
      throw new Error(`Nonce doesn't match`);
    }
  } else if (walletParse.type === "mobile") {
    const nonce = signatureParse.signedMessage.slice(20, 41);
    if (nonce !== user.nonce) {
      throw new Error(`Nonce doesn't match`);
    }
  } else {
    throw new Error("Unrecognized wallet type");
  }

  try {
    const result = verifySignature(
      walletParse.defaultAddress,
      signatureParse.signedMessage,
      signatureParse.proof,
      walletParse.type
    );

    if (!result) {
      await prisma.user.delete({ where: { id: userId } });
      throw new Error("Verification failed.");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        address: walletParse.defaultAddress,
        nonce,
        wallets: {
          create: [
            {
              type: walletParse.type,
              changeAddress: walletParse.defaultAddress,
              unusedAddresses: walletParse.unusedAddresses,
              usedAddresses: walletParse.usedAddresses,
            },
          ],
        },
      },
    });

    if (!user) {
      await prisma.user.delete({ where: { id: userId } });
      throw new Error("User update failed.");
    }

    const account = await prisma.account.create({
      data: {
        userId: user.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: walletParse.defaultAddress,
      },
    });

    if (user && account && result) {
      const newNonce = nanoid();
      await prisma.user.update({
        where: { id: user.id },
        data: {
          nonce: newNonce,
          status: UserLoginStatus.ACTIVE,
        },
      });
      return user;
    } else {
      await prisma.user.delete({ where: { id: userId } });
      throw new Error("Failed to create account or update nonce."); // Throw error if account creation or nonce update fails
    }
  } catch (error) {
    console.error("Error creating new user: ", error);
    await prisma.user.delete({ where: { id: userId } });
    return null;
  }
};

export const authorize = async (
  credentials: any,
  req: Pick<RequestInternal, "query" | "body" | "headers" | "method">,
  res: NextApiResponse
): Promise<User | null> => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return null;
    }

    const { nonce, userId, signature, wallet } = credentials as Credentials;

    if (!nonce || !userId || !signature || !wallet) {
      return null;
    }
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        wallets: true,
      },
    });

    if (user && user.wallets.length > 0) {
      return signUser(user, credentials as Credentials);
    } else if (user && user.wallets.length === 0) {
      return createNewUser(user, credentials as Credentials);
    } else throw new Error("Unable to verify user");
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signInCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { user, account }: any
) => {
  if (nextAuthInclude(req, "callback") && nextAuthInclude(req, "credentials")) {
    if (!user) return true;

    const sessionToken = nanoid();
    const sessionMaxAge = 60 * 60 * 24 * 30;
    const sessionExpiry = new Date(Date.now() + sessionMaxAge * 1000);

    await prisma.session.create({
      data: {
        sessionToken: sessionToken,
        userId: user.id,
        expires: sessionExpiry,
        walletType: user.walletType,
      },
    });

    setCookie(`next-auth.session-token`, sessionToken, {
      expires: sessionExpiry,
      req: req,
      res: res,
      httpOnly: true,
      secure: process.env.AUTH_DOMAIN !== "http://localhost:3000", // support localhost
      sameSite: true,
    });

    return true;
  }

  return false;
};

export const jwtCallback = ({ token, user }: any) => {
  if (user) {
    token.user = user;
  }
  return token;
};

export const sessionCallback = async (
  req: NextApiRequest,
  {
    session,
    user,
  }: {
    session: Session;
    user: any;
  }
) => {
  const cookie = getCookie(`next-auth.session-token`, {
    req: req,
  });
  await prisma.session.findFirstOrThrow({
    where: {
      sessionToken: cookie,
    },
  });
  if (user) {
    session.user = {
      id: user.id,
      address: user.address,
      jwt: jwt.sign(
        {
          sub: user.address,
          permissions: "user",
        },
        process.env.PAIDEIA_API_SECRET ?? "secret",
        { expiresIn: "1h" }
      ),
    };
  }
  return session;
};

export const getJwtHandlers = (req: NextApiRequest) => {
  return {
    encode: async ({
      token,
      secret,
      maxAge,
    }: JWTEncodeParams): Promise<any> => {
      if (
        nextAuthInclude(req, "callback") &&
        nextAuthInclude(req, "credentials") &&
        req.method === "POST"
      ) {
        const cookie = getCookie(`next-auth.session-token`, {
          req: req,
        });
        if (cookie) {
          return cookie;
        } else return "";
      }
      return encode({ token, secret, maxAge });
    },
    decode: async ({ token, secret }: JWTDecodeParams) => {
      if (
        nextAuthInclude(req, "callback") &&
        nextAuthInclude(req, "credentials") &&
        req.method === "POST"
      ) {
        return null;
      }

      return decode({ token, secret });
    },
  };
};

export const verifySignature = (
  address: string,
  message: string,
  proof: string,
  type: string
) => {
  const ergoAddress = Address.from_mainnet_str(address);
  const convertedMessage = Buffer.from(message, "utf-8");
  const convertedProof =
    type === "nautilus"
      ? Buffer.from(proof, "hex")
      : Buffer.from(proof, "base64");
  const result = verify_signature(
    ergoAddress,
    convertedMessage,
    convertedProof
  );
  return result;
};

const nextAuthInclude = (req: NextApiRequest, include: string) => {
  return req.query.nextauth?.includes(include);
};
