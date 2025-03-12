"use client"

import { NftMint } from "@/components/nft-mint";
import { NavigationMenu } from "@/components/NavigationMenu";
import {
	defaultChainId,
	EACTraitNftContractAddress,
	defaultTokenId,
} from "@/lib/constants";
import { client } from "@/lib/thirdwebClient";
import { defineChain, getContract, toTokens } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
	getActiveClaimCondition as getActiveClaimCondition1155,
	getNFT,
	isERC1155,
} from "thirdweb/extensions/erc1155";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import {
	getActiveClaimCondition as getActiveClaimCondition721,
	isERC721,
} from "thirdweb/extensions/erc721";
import { getActiveClaimCondition as getActiveClaimCondition20 } from "thirdweb/extensions/erc20";
import { useReadContract } from "thirdweb/react";

export default function EAC() {
	const tokenId = defaultTokenId;
	const chain = defineChain(defaultChainId);
	const contract = getContract({
		address: EACTraitNftContractAddress,
		chain,
		client,
	});

	// Queries for contract type and metadata
	const isERC721Query = useReadContract(isERC721, { contract });
	const isERC1155Query = useReadContract(isERC1155, { contract });
	const contractMetadataQuery = useReadContract(getContractMetadata, {
		contract,
	});

	// Query for NFT details (ERC1155 only)
	const nftQuery = useReadContract(getNFT, {
		contract,
		tokenId,
		queryOptions: { enabled: isERC1155Query.data },
	});

	// Query for claim conditions
	const claimCondition1155 = useReadContract(getActiveClaimCondition1155, {
		contract,
		tokenId,
		queryOptions: {
			enabled: isERC1155Query.data,
		},
	});

	const claimCondition721 = useReadContract(getActiveClaimCondition721, {
		contract,
		queryOptions: { enabled: isERC721Query.data },
	});

	const claimCondition20 = useReadContract(getActiveClaimCondition20, {
		contract,
		queryOptions: { enabled: !isERC721Query.data && !isERC1155Query.data },
	});

	// Determine display name and description
	const displayName = isERC1155Query.data
		? nftQuery.data?.metadata.name
		: contractMetadataQuery.data?.name;

	const description = isERC1155Query.data
		? nftQuery.data?.metadata.description
		: contractMetadataQuery.data?.description;

	// Determine price and currency
	const priceInWei = isERC1155Query.data
		? claimCondition1155.data?.pricePerToken
		: isERC721Query.data
			? claimCondition721.data?.pricePerToken
			: claimCondition20.data?.pricePerToken;

	const currency = isERC1155Query.data
		? claimCondition1155.data?.currency
		: isERC721Query.data
			? claimCondition721.data?.currency
			: claimCondition20.data?.currency;

	// Check if we have a valid currency
	const hasCurrency = !!currency;
	
	// Always use the main contract (or any valid contract) to get a valid contract reference 
	// that satisfies type requirements, but disable the query if there's no currency
	const currencyMetadata = useReadContract(getCurrencyMetadata, {
		contract: currency 
			? getContract({ address: currency, chain, client }) 
			: contract, // Use main contract as fallback to satisfy type requirements
		queryOptions: { 
			enabled: hasCurrency 
		},
	});

	const currencySymbol = currencyMetadata.data?.symbol || "";

	// Calculate price per token
	const pricePerToken =
		currencyMetadata.data && priceInWei !== null && priceInWei !== undefined
			? Number(toTokens(priceInWei, currencyMetadata.data.decimals))
			: null;

	// Check if mint is closed
	const isMintClosed = pricePerToken === null || pricePerToken === undefined;

	return (
		<div className="bg-[#8400e9]">
			{/* Navigation Menu */}
			<NavigationMenu />

			{/* NFT Mint Component */}
			<NftMint
				contract={contract}
				displayName={displayName || ""}
				contractImage={contractMetadataQuery.data?.image || ""}
				description={description || ""}
				currencySymbol={currencySymbol}
				pricePerToken={pricePerToken}
				isERC1155={!!isERC1155Query.data}
				isERC721={!!isERC721Query.data}
				tokenId={tokenId}
			/>
		</div>
	);
}