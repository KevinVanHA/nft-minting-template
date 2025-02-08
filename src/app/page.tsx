"use client";

import { NftMint } from "@/components/nft-mint";
import {
	defaultChainId,
	defaultNftContractAddress,
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

// Add types for the component props
interface NftData {
	displayName: string;
	description: string;
	contractImage: string;
	pricePerToken: number | null;
	currencySymbol: string;
}

// This page renders on the client.
// If you are looking for a server-rendered version, checkout src/ssr/page.tsx
export default function Home() {
	const tokenId = defaultTokenId;
	const chain = defineChain(defaultChainId);

	// Add validation for contract address
	if (!defaultNftContractAddress) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-600">No contract address provided</p>
			</div>
		);
	}

	const contract = getContract({
		address: defaultNftContractAddress,
		chain,
		client,
	});

	// First, check if it's ERC721
	const isERC721Query = useReadContract(isERC721, {
		contract,
		queryOptions: {
			enabled: !!contract,
			retry: 1, // Limit retries
		},
	});

	// Then check if it's ERC1155 only if it's not ERC721
	const isERC1155Query = useReadContract(isERC1155, {
		contract,
		queryOptions: {
			enabled: !!contract && isERC721Query.isSuccess && !isERC721Query.data,
			retry: 1, // Limit retries
		},
	});

	// Only fetch metadata once we know the contract type
	const contractMetadataQuery = useReadContract(getContractMetadata, {
		contract,
		queryOptions: {
			enabled: !!contract && (isERC721Query.isSuccess || isERC1155Query.isSuccess),
		},
	});

	// Only fetch NFT data for ERC1155
	const nftQuery = useReadContract(getNFT, {
		contract,
		tokenId,
		queryOptions: { 
			enabled: !!isERC1155Query.data,
		},
	});

	// Get claim conditions based on contract type
	const claimCondition1155 = useReadContract(getActiveClaimCondition1155, {
		contract,
		tokenId,
		queryOptions: {
			enabled: !!isERC1155Query.data,
		},
	});

	const claimCondition721 = useReadContract(getActiveClaimCondition721, {
		contract,
		queryOptions: { 
			enabled: !!isERC721Query.data,
		},
	});

	const claimCondition20 = useReadContract(getActiveClaimCondition20, {
		contract,
		queryOptions: { 
			enabled: isERC721Query.isSuccess && !isERC721Query.data && isERC1155Query.isSuccess && !isERC1155Query.data,
		},
	});

	const displayName = isERC1155Query.data
		? nftQuery.data?.metadata.name
		: contractMetadataQuery.data?.name;

	const description = isERC1155Query.data
		? nftQuery.data?.metadata.description
		: contractMetadataQuery.data?.description;

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

	const currencyContract = getContract({
		address: currency || "",
		chain,
		client,
	});

	const currencyMetadata = useReadContract(getCurrencyMetadata, {
		contract: currencyContract,
		queryOptions: { enabled: !!currency },
	});

	const currencySymbol = currencyMetadata.data?.symbol || "";

	const pricePerToken =
		currencyMetadata.data && priceInWei !== null && priceInWei !== undefined
			? Number(toTokens(priceInWei, currencyMetadata.data.decimals))
			: null;

	// Add loading state check
	const isLoading = 
		isERC721Query.isLoading ||
		isERC1155Query.isLoading ||
		contractMetadataQuery.isLoading ||
		(isERC1155Query.data && nftQuery.isLoading) ||
		(!!currency && currencyMetadata.isLoading);

	// Add error handling
	const error = 
		isERC721Query.error ||
		isERC1155Query.error ||
		contractMetadataQuery.error ||
		nftQuery.error ||
		currencyMetadata.error;

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-4">
				<h1 className="text-xl font-bold text-red-500 mb-2">Error Loading NFT</h1>
				<p className="text-gray-600">{error.message || "Something went wrong"}</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
				<div className="relative">
					<div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
					<div className="mt-4 text-gray-600 font-medium">Loading NFT Data...</div>
					<div className="mt-2 text-sm text-gray-400">Please wait while we fetch the latest information</div>
				</div>
			</div>
		);
	}

	// Type guard to ensure contract type is determined
	if (isERC721Query.data === undefined && isERC1155Query.data === undefined) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-600">Unable to determine contract type</p>
			</div>
		);
	}

	// Validate required data before rendering
	const nftData: NftData = {
		displayName: displayName || "Untitled NFT",
		description: description || "No description available",
		contractImage: contractMetadataQuery.data?.image || "",
		pricePerToken,
		currencySymbol,
	};

	return (
		<NftMint
			contract={contract}
			{...nftData}
			isERC1155={!!isERC1155Query.data}
			isERC721={!!isERC721Query.data}
			tokenId={tokenId}
		/>
	);
}
