import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json({ message: "Hello World!" });
  } catch (e: any) {
    return res.status(400).json(e.message);
  }
};

/**
 * Testing Util
 */
const parse = (object: any) => {
  return JSON.parse(
    JSON.stringify(
      object,
      (key, value) =>
        typeof value === "bigint" ? Number(value.toString()) : value // return everything else unchanged
    )
  );
};

export default handler;
