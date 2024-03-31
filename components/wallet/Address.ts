import * as blake from "blakejs";
import * as bs58 from "bs58";
import * as ec from "elliptic";

const { curve } = new ec.ec("secp256k1");

declare const console: any;
declare const Buffer: any;

export enum Network {
  Mainnet = 0 << 4,
  Testnet = 1 << 4,
}
export enum AddressKind {
  P2PK = 1,
  P2SH = 2,
  P2S = 3,
}

export class Address {
  get publicKey(): Buffer {
    return this.addrBytes.slice(1, 34);
  }

  get ergoTree(): string {
    if (this.getType() === AddressKind.P2PK) {
      return Buffer.concat([
        Buffer.from([0x00, 0x08, 0xcd]),
        this.publicKey,
      ]).toString("hex");
    } else {
      return this.addrBytes.slice(1, this.addrBytes.length - 4).toString("hex");
    }
  }

  public static fromErgoTree(
    ergoTree: string,
    network: Network = Network.Mainnet
  ): Address {
    if (ergoTree.startsWith("0008cd")) {
      const prefixByte = Buffer.from([network + AddressKind.P2PK]);

      const pk = ergoTree.slice(6, 72);
      const contentBytes = Buffer.from(pk, "hex");
      const checksum = Buffer.from(
        blake.blake2b(Buffer.concat([prefixByte, contentBytes]), undefined, 32),
        "hex"
      );
      const address = Buffer.concat([prefixByte, contentBytes, checksum]).slice(
        0,
        38
      );
      return new Address(bs58.encode(address));
    } else {
      const prefixByte = Buffer.from([network + AddressKind.P2S]);
      const contentBytes = Buffer.from(ergoTree, "hex");
      const hash = blake.blake2b(
        Buffer.concat([prefixByte, contentBytes]),
        undefined,
        32
      );
      const checksum = Buffer.from(hash, "hex").slice(0, 4);
      const address = Buffer.concat([prefixByte, contentBytes, checksum]);
      return new Address(bs58.encode(address));
    }
  }

  public static fromPk(
    pk: string,
    network: Network = Network.Mainnet
  ): Address {
    const prefixByte = Buffer.from([network + AddressKind.P2PK]);
    const contentBytes = Buffer.from(pk, "hex");
    const checksum = Buffer.from(
      blake.blake2b(Buffer.concat([prefixByte, contentBytes]), undefined, 32),
      "hex"
    );
    const address = Buffer.concat([prefixByte, contentBytes, checksum]).slice(
      0,
      38
    );

    return new Address(bs58.encode(address));
  }

  public static fromSk(
    sk: string,
    network: Network = Network.Mainnet
  ): Address {
    const pk = Buffer.from(curve.g.mul(sk).encodeCompressed());
    return this.fromPk(pk, network);
  }

  public address: string;
  public addrBytes: Buffer;

  constructor(address: string) {
    this.address = address;
    // @ts-ignore
    this.addrBytes = bs58.decode(this.address);
  }

  public static fromBase58(address: string): Address {
    const addr = new Address(address);
    if (!addr.isValid()) {
      throw new Error(`Invalid Ergo address ${address}`);
    }
    return addr;
  }

  public static fromBytes(bytes: Buffer): Address {
    const address = bs58.encode(bytes);
    return Address.fromBase58(address);
  }

  public isValid(): boolean {
    const size = this.addrBytes.length;
    const script = this.addrBytes.slice(0, size - 4);
    const checksum = this.addrBytes.slice(size - 4, size);
    const calculatedChecksum = Buffer.from(
      blake.blake2b(script, undefined, 32),
      "hex"
    ).slice(0, 4);
    return calculatedChecksum.toString("hex") === checksum.toString("hex");
  }

  public getNetwork(): Network {
    return this.headByte() & 0xf0;
  }

  public getType(): AddressKind {
    return this.headByte() & 0xf;
  }

  private headByte() {
    return this.addrBytes[0];
  }
}
