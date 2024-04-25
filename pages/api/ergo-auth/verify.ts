import { prisma } from "@server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { verificationId } = req.query;
  const { signedMessage, proof } = req.body;

  if (!verificationId || !signedMessage || !proof) {
    return res
      .status(400)
      .json({ error: "Bad Request: Missing required fields." });
  }

  try {
    await prisma.loginRequest.update({
      where: { verificationId: verificationId.toString() },
      data: {
        status: "SIGNED",
        signedMessage,
        proof,
      },
    });

    return res.status(200).json({
      status: "SIGNED",
      signedMessage,
      proof,
    });
  } catch (error) {
    console.error("Error updating login request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
