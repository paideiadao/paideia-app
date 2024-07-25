import { prisma } from "@server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { requestId } = req.query;
  if (typeof requestId !== "string") {
    return res.status(400).json("requestId is required.");
  }
  try {
    const response = await getErgoPaySigningRequest(requestId);
    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(400).json(e.message);
  }
}

const getErgoPaySigningRequest = async (id: string) => {
  const reducedTx = await prisma.ergoPayRequest.findFirst({
    where: { id: id },
  });
  if (reducedTx === null) {
    throw new Error(`requestId ${id} not found.`);
  }
  return {
    reducedTx: reducedTx.reducedTx,
    message: "Submit payment to paideia.im",
    messageSeverity: "INFORMATION",
  };
};
