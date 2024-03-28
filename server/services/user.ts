import { prisma } from "@server/prisma";
import { nanoid } from "nanoid";
import { UserLoginStatus } from "@prisma/client";

export const generateNonceForLogin = async (userAddress: string) => {
  // First, check if a user exists with the given userAddress as the defaultAddress.
  let user = await prisma.user.findUnique({
    where: { address: userAddress },
  });

  // If no user exists with the defaultAddress, then check using the getUserIdByAddress function
  if (!user) {
    const userId = await getUserIdByAddress(userAddress);
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    }
  }

  // If still no user found, then create a new one
  if (!user) {
    user = await prisma.user.create({
      data: {
        address: userAddress,
        status: UserLoginStatus.PENDING,
      },
    });
  }

  if (!user) {
    throw new Error("Database error");
  }

  const nonce = nanoid();

  // Update the user's nonce in the database
  await prisma.user.update({
    where: { id: user.id },
    data: { nonce },
  });

  return { nonce, userId: user.id };
};

export const generateNonceForAddWallet = async (userId: string) => {
  const nonce = nanoid();

  // Update the user's nonce in the database
  const user = await prisma.user.update({
    where: { id: userId },
    data: { nonce },
  });

  if (!user) {
    throw new Error("User doesn't exist");
  }

  return nonce;
};

export async function checkAddressAvailability(address: string) {
  const [userWithAddress, walletWithChangeAddress, walletWithAddressInArrays] =
    await prisma.$transaction([
      prisma.user.findUnique({
        where: {
          address: address,
        },
        select: { id: true },
      }),
      prisma.wallet.findUnique({
        where: {
          changeAddress: address,
        },
        select: { id: true },
      }),
      prisma.wallet.findFirst({
        where: {
          OR: [
            { unusedAddresses: { has: address } },
            { usedAddresses: { has: address } },
          ],
        },
        select: { id: true },
      }),
    ]);

  if (userWithAddress || walletWithChangeAddress || walletWithAddressInArrays) {
    return { status: "unavailable" };
  }
  return { status: "available" };
}

export async function getUserIdByAddress(address: string) {
  const [walletWithChangeAddress, walletWithAddressInArrays] =
    await prisma.$transaction([
      prisma.wallet.findUnique({
        where: {
          changeAddress: address,
        },
        select: { userId: true },
      }),
      prisma.wallet.findFirst({
        where: {
          OR: [
            { unusedAddresses: { has: address } },
            { usedAddresses: { has: address } },
          ],
        },
        select: { userId: true },
      }),
    ]);

  // If the address is a change address in a wallet or exists in the arrays of a wallet,
  // return the user ID associated with that wallet
  if (walletWithChangeAddress) {
    return walletWithChangeAddress.userId;
  }

  if (walletWithAddressInArrays) {
    return walletWithAddressInArrays.userId;
  }

  // If none of the above conditions match, the address is not associated with any user
  return null;
}

export const deleteEmptyUser = async (
  userId: string
): Promise<DeleteEmptyUserResponse> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      wallets: true,
      accounts: true,
      sessions: true,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  if (
    user.wallets.length === 0 &&
    user.accounts.length === 0 &&
    user.sessions.length === 0 &&
    user.status === UserLoginStatus.PENDING
  ) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return { success: true };
  } else {
    return { error: "User account not empty" };
  }
};
