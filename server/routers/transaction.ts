import { prisma } from "@server/prisma";
import { explorerApi } from "@server/services/axios";
import { createTRPCRouter, protectedProcedure } from "@server/trpc";
import {
  BlockHeaders,
  ErgoBoxes,
  ErgoStateContext,
  PreHeader,
  ReducedTransaction,
  UnsignedTransaction,
} from "ergo-lib-wasm-nodejs";
import { nanoid } from "nanoid";
import { z } from "zod";

interface PowSolutions {
  pk: string;
  w: string;
  n: string;
  d: string;
}

interface BlockHeader {
  id: string;
  parentId: string;
  version: number;
  timestamp: number;
  height: number;
  nBits: number;
  votes: string;
  stateRoot: string;
  adProofsRoot: string;
  transactionsRoot: string;
  extensionHash: string;
  powSolutions: PowSolutions;
}

export const transactionRouter = createTRPCRouter({
  generateErgoPayQrCode: protectedProcedure
    .input(
      z.object({
        unsignedTransaction: z.any(), // must confirm to unsigned tx
      })
    )
    .mutation(async ({ input }) => {
      const tx = UnsignedTransaction.from_json(JSON.stringify(input.unsignedTransaction));
      const reduced = await getTxReducedB64Safe(
        tx,
        ErgoBoxes.from_boxes_json(input.unsignedTransaction.inputs ?? []),
        ErgoBoxes.from_boxes_json(input.unsignedTransaction.dataInputs ?? [])
      );
      const qr = await getErgoPaySigningUrl(reduced);
      return {
        qrCode: qr,
      };
    }),
});

const getErgoPaySigningUrl = async (reducedTx: string) => {
  const id = nanoid();
  await prisma.ergoPayRequest.create({
    data: {
      id: id,
      reducedTx: reducedTx,
    },
  });
  return `${process.env.ERGOPAY_DOMAIN}/api/ergopay/${id}`;
};

const getTxReducedB64Safe = async (
  unsignedTx: UnsignedTransaction,
  inputs: ErgoBoxes,
  dataInputs: ErgoBoxes
) => {
  const reduced = await getTxReduced(unsignedTx, inputs, dataInputs);
  const txReducedBase64 = btoa(
    String.fromCharCode(...reduced.sigma_serialize_bytes())
  );
  const ergoPayTx = txReducedBase64.replace(/\//g, "_").replace(/\+/g, "-");
  return ergoPayTx;
};

const getTxReduced = async (
  unsignedTx: UnsignedTransaction,
  inputs: ErgoBoxes,
  dataInputs: ErgoBoxes
) => {
  const ctx = await getErgoStateContext();
  return ReducedTransaction.from_unsigned_tx(
    unsignedTx,
    inputs,
    dataInputs,
    ctx
  );
};

const getErgoStateContext = async () => {
  const res = await getExplorerBlockHeaders();
  const block_headers = BlockHeaders.from_json(res);
  const pre_header = PreHeader.from_block_header(block_headers.get(0));
  return new ErgoStateContext(pre_header, block_headers);
};

const getExplorerBlockHeaders = async () => {
  const headers = (
    await explorerApi.get(`/api/v1/blocks/headers`)
  ).data.items.slice(0, 10);
  return headers as BlockHeader[];
};
