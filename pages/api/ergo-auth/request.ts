import { UserLoginStatus } from "@prisma/client";
import { prisma } from "@server/prisma";
import { deleteEmptyUser } from "@server/services/user";
import { Address } from "ergo-lib-wasm-nodejs";
import { NextApiRequest, NextApiResponse } from "next";

interface ErgoAuthRequest {
  address: string;
  signingMessage: string;
  sigmaBoolean: string;
  userMessage: string;
  messageSeverity: "INFORMATION";
  replyTo: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { verificationId, address } = req.query;
  const addressString = address?.toString();

  const loginRequest = await prisma.loginRequest.findUnique({
    where: { verificationId: verificationId as string },
  });

  if (!loginRequest) {
    return res.status(404).json({ error: "Invalid login request" });
  }

  const user = await prisma.user.findUnique({
    where: { id: loginRequest.userId },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!addressString) {
    if (user.status === UserLoginStatus.PENDING) deleteEmptyUser(user.id);
    return res.status(400).json({ error: "No address provided" });
  }

  if (!user.nonce) {
    if (user.status === UserLoginStatus.PENDING) deleteEmptyUser(user.id);
    return res
      .status(400)
      .json({ error: "Signing message was not generated, please try again" });
  }

  try {
    const replyTo = `${process.env.ERGOAUTH_DOMAIN}/api/ergo-auth/verify?verificationId=${verificationId}`;
    const addr = Address.from_base58(addressString);
    const tree = addr.to_ergo_tree();
    const treeBytes = Array.from(tree.sigma_serialize_bytes());
    treeBytes.shift();
    treeBytes.shift();
    const sigmaBoolean = Buffer.from(treeBytes).toString("base64");
    const ergoAuthRequest: ErgoAuthRequest = {
      address: addressString,
      signingMessage: user.nonce,
      sigmaBoolean: sigmaBoolean,
      userMessage: "Sign the message to sign in to Paideia",
      messageSeverity: "INFORMATION",
      replyTo,
    };
    res.status(200).json(ergoAuthRequest);
  } catch (e: any) {
    if (user.status === UserLoginStatus.PENDING) deleteEmptyUser(user.id);
    res.status(500).json({ error: `ERR::login::${e.message}` });
  }
}
