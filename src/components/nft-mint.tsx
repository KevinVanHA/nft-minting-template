"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Minus, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import type { ThirdwebContract } from "thirdweb";
import {
    ClaimButton,
    ConnectButton,
    MediaRenderer,
    NFT,
    useActiveAccount,
    useReadContract,
} from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import React from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

type Props = {
    contract: ThirdwebContract;
    displayName: string;
    description: string;
    contractImage: string;
    pricePerToken: number | null;
    currencySymbol: string | null;
    isERC1155: boolean;
    isERC721: boolean;
    tokenId: bigint;
    isMintClosed: boolean;
};

export function NftMint(props: Props) {
    const [isMinting, setIsMinting] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [useCustomAddress, setUseCustomAddress] = useState(false);
    const [customAddress, setCustomAddress] = useState("");
    const { theme, setTheme } = useTheme();
    const account = useActiveAccount();

    // Fallback to "POL" if currencySymbol is null or undefined
    const symbol = props.currencySymbol || "POL";

    // Fetch total supply and max supply for ERC721
    const { data: totalSupply, isLoading: isTotalSupplyLoading } = useReadContract({
        contract: props.contract,
        method: "totalSupply",
        params: [],
    });
    const { data: maxSupply, isLoading: isMaxSupplyLoading } = useReadContract({
        contract: props.contract,
        method: "maxSupply",
        params: [],
    });

    // Fetch remaining supply for ERC1155
    const { data: remainingSupply, isLoading: isRemainingSupplyLoading } = useReadContract({
        contract: props.contract,
        method: "balanceOf",
        params: [props.contract.address, props.tokenId],
    });

    // Calculate remaining supply based on contract type
    const remainingNFTs = props.isERC721
        ? maxSupply && totalSupply
            ? Number(maxSupply) - Number(totalSupply)
            : null
        : props.isERC1155
        ? remainingSupply
            ? Number(remainingSupply)
            : null
        : null;

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1); // Assuming a max of 10 NFTs can be minted at once
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value);
        if (!Number.isNaN(value)) {
            setQuantity(Math.min(Math.max(1, value)));
        }
    };

    // Handle loading state
    if (isTotalSupplyLoading || isMaxSupplyLoading || isRemainingSupplyLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-white">Loading...</div>
            </div>
        );
    }

    // Handle invalid pricePerToken or closed mint
    if (props.pricePerToken === null || props.pricePerToken === undefined || props.isMintClosed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-center text-white bg-red-500 p-6 rounded-lg">
                    {props.isMintClosed
                        ? "Minting is currently closed. Please check back later."
                        : "Invalid price information. Minting is unavailable."}
                </div>
                {/* Twitter and Discord Buttons */}
                <div className="flex gap-4">
                    <Button
                        onClick={() => window.open("https://x.com/eacnft", "_blank")}
                        className="bg-black hover:bg-blue-600 text-white"
                    >
                        X
                    </Button>
                    <Button
                        onClick={() => window.open("https://discord.gg/eacnft", "_blank")}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                        Discord
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen transition-colors duration-200 pt-10 pb-15 relative"
            style={{
                backgroundColor: "#8400e9",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay to darken the background */}
            <div className="absolute inset-0 bg-black bg-opacity-0"></div>

            {/* Card and content */}
            <div className="relative z-10 w-full max-w-4xl">
                <Card className="w-full bg-[#000000] bg-opacity-90 rounded-lg overflow-hidden">
                    <CardContent className="p-6 flex flex-col sm:flex-row gap-8 items-center">
                        {/* Image Section */}
                        <div className="flex-shrink-0 w-full sm:w-1/2 m-4">
                            <div className="aspect-square overflow-hidden rounded-lg relative">
                                {props.isERC1155 ? (
                                    <NFT contract={props.contract} tokenId={props.tokenId}>
                                        <React.Suspense
                                            fallback={<Skeleton className="w-full h-full object-cover" />}
                                        >
                                            <NFT.Media className="w-full h-full object-cover" />
                                        </React.Suspense>
                                    </NFT>
                                ) : (
                                    <MediaRenderer
                                        client={client}
                                        className="w-full h-full object-cover"
                                        alt=""
                                        src={props.contractImage || "/LO.png?height=400&width=400"}
                                    />
                                )}
                                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm font-semibold">
                                    {props.pricePerToken} {symbol}/each
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex-grow w-full sm:w-1/2 space-y-4 m-4 p-4">
                            <h2 className="text-2xl font-bold text-white text-align-center">{props.displayName}</h2>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                        aria-label="Decrease quantity"
                                        className="rounded-r-none"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-20 text-center rounded-none border-x-0 pl-6"
                                        min="1"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={increaseQuantity}
                                        aria-label="Increase quantity"
                                        className="rounded-l-none"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="text-base pr-1 font-semibold text-white">
                                    Total: <br /> {props.pricePerToken * quantity} {symbol}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="custom-address"
                                    checked={useCustomAddress}
                                    onCheckedChange={setUseCustomAddress}
                                />
                                <Label
                                    htmlFor="custom-address"
                                    className={`${useCustomAddress ? "text-white" : "text-gray-400"} cursor-pointer`}
                                >
                                    Mint to a custom address
                                </Label>
                            </div>

                            {useCustomAddress && (
                                <div>
                                    <Input
                                        id="address-input"
                                        type="text"
                                        placeholder="Enter recipient address"
                                        value={customAddress}
                                        onChange={(e) => setCustomAddress(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            <div>
                                {account ? (
                                    <ClaimButton
                                        theme={"light"}
                                        contractAddress={props.contract.address}
                                        chain={props.contract.chain}
                                        client={props.contract.client}
                                        claimParams={
                                            props.isERC1155
                                                ? {
                                                        type: "ERC1155",
                                                        tokenId: props.tokenId,
                                                        quantity: BigInt(quantity),
                                                        to: customAddress,
                                                        from: account.address,
                                                    }
                                                : props.isERC721
                                                ? {
                                                        type: "ERC721",
                                                        quantity: BigInt(quantity),
                                                        to: customAddress,
                                                        from: account.address,
                                                    }
                                                : {
                                                        type: "ERC20",
                                                        quantity: String(quantity),
                                                        to: customAddress,
                                                        from: account.address,
                                                    }
                                        }
                                        style={{
                                            backgroundColor: "#8400e9",
                                            color: "white",
                                            width: "100%",
                                            marginBottom: "30px",
                                        }}
                                        disabled={isMinting}
                                        onTransactionSent={() => toast.info("Minting NFT")}
                                        onTransactionConfirmed={() =>
                                            toast.success("Minted successfully")
                                        }
                                        onError={(err) => toast.error(err.message)}
                                    >
                                        Mint {quantity} NFT{quantity > 1 ? "s" : ""}
                                    </ClaimButton>
                                ) : (
                                    <div className="w-full">
                                        <ConnectButton
                                            client={client}
                                            connectButton={{ style: { width: "100%" } }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}