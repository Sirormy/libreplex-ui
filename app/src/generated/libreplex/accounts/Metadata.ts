/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beet from '@metaplex-foundation/beet'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import { NftMetadata, nftMetadataBeet } from '../types/NftMetadata'

/**
 * Arguments used to create {@link Metadata}
 * @category Accounts
 * @category generated
 */
export type MetadataArgs = {
  collection: web3.PublicKey
  mint: web3.PublicKey
  name: string
  url: string
  isMutable: boolean
  nftData: beet.COption<NftMetadata>
}

export const metadataDiscriminator = [72, 11, 121, 26, 111, 181, 85, 93]
/**
 * Holds the data for the {@link Metadata} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Metadata implements MetadataArgs {
  private constructor(
    readonly collection: web3.PublicKey,
    readonly mint: web3.PublicKey,
    readonly name: string,
    readonly url: string,
    readonly isMutable: boolean,
    readonly nftData: beet.COption<NftMetadata>
  ) {}

  /**
   * Creates a {@link Metadata} instance from the provided args.
   */
  static fromArgs(args: MetadataArgs) {
    return new Metadata(
      args.collection,
      args.mint,
      args.name,
      args.url,
      args.isMutable,
      args.nftData
    )
  }

  /**
   * Deserializes the {@link Metadata} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [Metadata, number] {
    return Metadata.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Metadata} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Metadata> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find Metadata account at ${address}`)
    }
    return Metadata.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      'AJ5Hh5q4HegZWWu1ScY7ZRA6zELXmRzEWS5EXFSKqBC6'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, metadataBeet)
  }

  /**
   * Deserializes the {@link Metadata} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Metadata, number] {
    return metadataBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link Metadata} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return metadataBeet.serialize({
      accountDiscriminator: metadataDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Metadata} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: MetadataArgs) {
    const instance = Metadata.fromArgs(args)
    return metadataBeet.toFixedFromValue({
      accountDiscriminator: metadataDiscriminator,
      ...instance,
    }).byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Metadata} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: MetadataArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      Metadata.byteSize(args),
      commitment
    )
  }

  /**
   * Returns a readable version of {@link Metadata} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      collection: this.collection.toBase58(),
      mint: this.mint.toBase58(),
      name: this.name,
      url: this.url,
      isMutable: this.isMutable,
      nftData: this.nftData,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const metadataBeet = new beet.FixableBeetStruct<
  Metadata,
  MetadataArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['collection', beetSolana.publicKey],
    ['mint', beetSolana.publicKey],
    ['name', beet.utf8String],
    ['url', beet.utf8String],
    ['isMutable', beet.bool],
    ['nftData', beet.coption(nftMetadataBeet)],
  ],
  Metadata.fromArgs,
  'Metadata'
)