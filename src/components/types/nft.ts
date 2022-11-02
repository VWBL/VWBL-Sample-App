import { Metadata, ExtractMetadata } from 'vwbl-sdk';

export type FetchedNFT = (Metadata | ExtractMetadata) & { owner: string };
