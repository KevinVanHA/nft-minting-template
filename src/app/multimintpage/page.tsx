"use client";

import { NftMint } from "@/components/nft-mint"; // Adjust the import path as needed
import {
  LittleOnesNftContractAddress,
  DarkOnesNftContractAddress,
  MasterClassNftContractAddress,
  EACTraitNftContractAddress,
  defaultChainId,
} from "@/lib/constants";
import { ThirdwebContract } from "thirdweb";
import { client } from "@/lib/thirdwebClient";

// Mock data for each NFT contract
const nftContracts = [
  {
    contractAddress: LittleOnesNftContractAddress,
    displayName: "Little Ones NFT",
    description: "Adorable little creatures waiting to be minted!",
    contractImage: "/images/little-ones.png", // Replace with actual image path
    pricePerToken: 0.1,
    currencySymbol: "POL",
    isERC1155: false,
    isERC721: true,
    tokenId: BigInt(1), // Replace with actual token ID if needed
  },
  {
    contractAddress: DarkOnesNftContractAddress,
    displayName: "Dark Ones NFT",
    description: "Mysterious and dark, these NFTs are not for the faint of heart.",
    contractImage: "/images/dark-ones.png", // Replace with actual image path
    pricePerToken: 0.2,
    currencySymbol: "POL",
    isERC1155: false,
    isERC721: true,
    tokenId: BigInt(1), // Replace with actual token ID if needed
  },
  {
    contractAddress: MasterClassNftContractAddress,
    displayName: "Master Class NFT",
    description: "The pinnacle of NFT artistry. Own a piece of history.",
    contractImage: "/images/master-class.png", // Replace with actual image path
    pricePerToken: 1.0,
    currencySymbol: "POL",
    isERC1155: false,
    isERC721: true,
    tokenId: BigInt(1), // Replace with actual token ID if needed
  },
  {
    contractAddress: EACTraitNftContractAddress,
    displayName: "EAC Trait NFT",
    description: "Unique traits for your EAC collection. Enhance your NFTs!",
    contractImage: "/images/eac-trait.png", // Replace with actual image path
    pricePerToken: 0.05,
    currencySymbol: "POL",
    isERC1155: true,
    isERC721: false,
    tokenId: BigInt(1), // Replace with actual token ID if needed
  },
];

export default function MultiMintPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          Mint Your NFTs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nftContracts.map((nft, index) => (
            <NftMint
              key={index}
              contract={{
                address: nft.contractAddress,
                chain: defaultChainId,
                client: client,
              }}
              displayName={nft.displayName}
              description={nft.description}
              contractImage={nft.contractImage}
              pricePerToken={nft.pricePerToken}
              currencySymbol={nft.currencySymbol}
              isERC1155={nft.isERC1155}
              isERC721={nft.isERC721}
              tokenId={nft.tokenId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}